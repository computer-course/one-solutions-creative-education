"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { Icon } from "./Icon";

// On a static host (e.g. GitHub Pages) set NEXT_PUBLIC_CONTACT_ENDPOINT to a form service URL.
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/contact`;

type Status = { state: "idle" | "sending" | "success" | "error"; message?: string; fields?: Record<string, string> };
type Kind = "institution" | "student";

const timelines = ["Flexible", "Within 1 month", "1–3 months", "This admission session", "Next academic year"];
const qualifications = ["Class 10", "Class 12 — Medical (PCB)", "Class 12 — Non-Medical (PCM)", "Class 12 — Commerce", "Class 12 — Arts", "Diploma", "Graduate", "Postgraduate"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [kind, setKind] = useState<Kind>("institution");
  const [course, setCourse] = useState("");
  const started = useRef(Date.now());
  const err = (name: string) => status.fields?.[name];

  // Arriving from a course card: /contact?course=MBBS
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("course");
    if (c) {
      setCourse(c.slice(0, 80));
      setKind("student");
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = { ...Object.fromEntries(fd.entries()), enquiryType: kind, services: fd.getAll("services"), elapsed: Date.now() - started.current };
    setStatus({ state: "sending" });
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.ok === true || data.success === true)) {
        setStatus({ state: "success" });
        form.reset();
        setCourse("");
      } else {
        setStatus({ state: "error", message: data.message || "We could not send your message. Please try again.", fields: data.fields });
      }
    } catch {
      setStatus({ state: "error", message: "Network error — your message was not sent. Please check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div className="form-result" role="status">
        <span className="icon-chip lg"><Icon name="check" size={24} /></span>
        <h3>Message received</h3>
        <p>Thank you. Your enquiry was delivered to our team and we will respond soon.</p>
        <button type="button" className="btn btn-secondary" onClick={() => { started.current = Date.now(); setStatus({ state: "idle" }); }}>Send another message</button>
      </div>
    );
  }

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div className="field">
      <label htmlFor={name}>{label}{optional && <span className="opt">Optional</span>}</label>
      <input id={name} name={name} aria-invalid={err(name) ? true : undefined} aria-describedby={err(name) ? `${name}-err` : undefined} {...props} />
      {err(name) && <p className="field-err" id={`${name}-err`}>{err(name)}</p>}
    </div>
  );

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="field">
        <legend>I am enquiring as</legend>
        <div className="kind-switch" role="radiogroup">
          {([["institution", "An institution", "building"], ["student", "A student or parent", "graduation"]] as const).map(([value, label, icon]) => (
            <label key={value} data-active={kind === value || undefined}>
              <input type="radio" name="kind" value={value} checked={kind === value} onChange={() => setKind(value)} />
              <Icon name={icon} size={18} /><span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form-row">
        {field("name", "Name", { required: true, autoComplete: "name", maxLength: 100 })}
        {field("email", "Email", { required: true, type: "email", autoComplete: "email", maxLength: 160 })}
      </div>

      {kind === "institution" ? (
        <>
          <div className="form-row">
            {field("phone", "Phone", { type: "tel", autoComplete: "tel", maxLength: 30 }, true)}
            {field("company", "Institution name", { required: true, autoComplete: "organization", maxLength: 120 })}
          </div>
          <div className="field">
            <label htmlFor="industry">Institution type</label>
            <select id="industry" name="industry" required defaultValue="">
              <option value="" disabled>Select a type</option>
              {industries.map((i) => <option key={i.slug}>{i.name}</option>)}
              <option>Other</option>
            </select>
          </div>
          <fieldset className="field">
            <legend>Services required</legend>
            <div className="check-chips">
              {services.map((s) => (
                <label key={s.slug}><input type="checkbox" name="services" value={s.short} /><span>{s.short}</span></label>
              ))}
            </div>
          </fieldset>
        </>
      ) : (
        <>
          <div className="form-row">
            {field("phone", "Phone", { type: "tel", autoComplete: "tel", maxLength: 30 }, true)}
            {field("course", "Course of interest", { required: true, maxLength: 80, value: course, onChange: (e) => setCourse(e.target.value), placeholder: "e.g. B.Sc Nursing" })}
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="qualification">Current qualification</label>
              <select id="qualification" name="qualification" required defaultValue="">
                <option value="" disabled>Select</option>
                {qualifications.map((q) => <option key={q}>{q}</option>)}
              </select>
            </div>
            {field("city", "City", { maxLength: 80, autoComplete: "address-level2" }, true)}
          </div>
        </>
      )}

      <div className="field">
        <label htmlFor="message">{kind === "institution" ? "What would you like to achieve?" : "Your question"}</label>
        <textarea id="message" name="message" rows={5} required minLength={20} maxLength={4000} aria-invalid={err("message") ? true : undefined} />
        {err("message") && <p className="field-err">{err("message")}</p>}
      </div>
      <div className="field">
        <label htmlFor="timeline">Timeline<span className="opt">Optional</span></label>
        <select id="timeline" name="timeline" defaultValue=""><option value="">Select</option>{timelines.map((b) => <option key={b}>{b}</option>)}</select>
      </div>
      {/* Honeypot: hidden from people, tempting for bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree to my details being used to respond to this enquiry, as described in the <Link href="/privacy-policy">Privacy Policy</Link>.</span>
      </label>
      {status.state === "error" && (
        <div className="form-alert" role="alert">
          <strong>Not sent.</strong> {status.message}
          {site.email && <> You can also email us at <a href={`mailto:${site.email}`}>{site.email}</a>.</>}
        </div>
      )}
      <button type="submit" className="btn btn-primary btn-lg" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send enquiry"} <Icon name="arrow" size={18} />
      </button>
    </form>
  );
}
