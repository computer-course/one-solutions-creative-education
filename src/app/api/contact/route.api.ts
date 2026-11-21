import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/** Simple in-memory rate limit (per server instance): 5 submissions / 10 minutes / IP. */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";
const oneLine = (v: unknown, max: number) => clean(v, max).replace(/[\r\n]+/g, " ");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const fail = (status: number, message: string, fields?: Record<string, string>) =>
  NextResponse.json({ ok: false, message, fields }, { status });

export async function POST(req: Request) {
  // Same-origin check
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return fail(403, "Request not allowed.");

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]!.trim();
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW)) hits.delete(k);
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return fail(429, "Too many submissions. Please try again in a few minutes.");

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 20_000) return fail(413, "Message too large.");
    body = JSON.parse(raw);
  } catch {
    return fail(400, "Invalid request.");
  }

  // Spam protection: honeypot + minimum time-to-submit. Rejected honestly (never reported as sent).
  if (clean(body.website, 200) !== "" || (typeof body.elapsed === "number" && body.elapsed < 2500)) {
    return fail(400, "Your submission could not be verified. Please wait a moment and try again.");
  }

  const data = {
    name: oneLine(body.name, 100),
    email: oneLine(body.email, 160),
    phone: oneLine(body.phone, 30),
    company: oneLine(body.company, 120),
    industry: oneLine(body.industry, 80),
    services: Array.isArray(body.services) ? body.services.slice(0, 12).map((s) => oneLine(s, 60)).filter(Boolean) : [],
    message: clean(body.message, 4000),
    timeline: oneLine(body.timeline, 60),
    enquiryType: body.enquiryType === "student" ? "student" : "institution",
    course: oneLine(body.course, 80),
    qualification: oneLine(body.qualification, 80),
    city: oneLine(body.city, 80),
  };
  const student = data.enquiryType === "student";

  const fields: Record<string, string> = {};
  if (data.name.length < 2) fields.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fields.email = "Please enter a valid email address.";
  if (data.phone && !/^[+\d][\d\s().-]{5,}$/.test(data.phone)) fields.phone = "Please enter a valid phone number.";
  if (!student && data.company.length < 2) fields.company = "Please enter your institution name.";
  if (student && data.course.length < 2) fields.course = "Please enter the course you are interested in.";
  if (data.message.length < 20) fields.message = "Please write at least 20 characters.";
  if (body.consent !== "yes") fields.consent = "Consent is required.";
  if (Object.keys(fields).length) return fail(422, "Please correct the highlighted fields.", fields);

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("[contact] Email delivery is not configured (SMTP_HOST / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).");
    return fail(503, "Our contact form is temporarily unavailable, so your message was not sent.");
  }

  recent.push(now);
  hits.set(ip, recent);

  const rows: [string, string][] = student
    ? [["Enquiry", "Student / parent"], ["Name", data.name], ["Email", data.email], ["Phone", data.phone || "—"], ["Course", data.course], ["Qualification", data.qualification || "—"], ["City", data.city || "—"], ["Timeline", data.timeline || "—"]]
    : [["Enquiry", "Institution"], ["Name", data.name], ["Email", data.email], ["Phone", data.phone || "—"], ["Institution", data.company], ["Type", data.industry || "—"], ["Services", data.services.join(", ") || "—"], ["Timeline", data.timeline || "—"]];

  try {
    const port = Number(SMTP_PORT) || 587;
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    const info = await transport.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: student ? `Course enquiry — ${data.course} (${data.name})` : `Institution enquiry — ${data.company} (${data.name})`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`,
      html: `<table cellpadding="6">${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${esc(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${esc(data.message)}</p>`,
    });
    if (!info.accepted || info.accepted.length === 0) throw new Error("Message was not accepted by the mail server");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Delivery failed:", err);
    return fail(502, "We could not deliver your message. Please try again shortly.");
  }
}
