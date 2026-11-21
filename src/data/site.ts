/**
 * Central company configuration.
 * Leave a field empty ("") and it will NOT be shown on the website.
 * Only fill in verified information.
 */
export const site = {
  name: "One Solutions Creative For Education",
  shortName: "One Solutions Creative",
  parent: { name: "One Solution Creative", url: "" }, // main company website URL (empty = no link)
  legalName: "", // Official registered company name, if different
  tagline: "One Partner for Every Campus Goal.",
  secondaryTagline: "Technology, Admissions & Reputation — Connected.",
  description:
    "One Solutions Creative For Education helps universities, colleges and schools grow with websites, ERP and LMS, SEO, graphics, social media, NAAC and NIRF data support and admission services — and guides students to the right course.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // --- Verified company details (empty = hidden) ---
  yearEstablished: "",
  registration: "", // e.g. CIN / GST / registration number
  email: "",
  phone: "",
  whatsapp: "", // digits only with country code, e.g. 919876543210
  address: "",
  recruitmentEmail: "",

  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
    x: "",
  },

  features: {
    careers: true, // show the Careers page in navigation
    insights: true, // show Insights / Blog in navigation
    acceptOpenApplications: true, // "expression of interest" when no vacancies
  },
};

/** Editor notes and placeholder profiles are visible in development only. */
export const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Institutions", href: "/institutions" },
  { label: "Our Work", href: "/work" },
];

export const companyNav = [
  { label: "About Us", href: "/about", desc: "Who we are and how we work", icon: "building" },
  { label: "Leadership", href: "/leadership", desc: "The people guiding our direction", icon: "compass" },
  { label: "Our Teams", href: "/teams", desc: "Specialists across every discipline", icon: "users" },
  ...(site.features.careers
    ? [{ label: "Careers", href: "/careers", desc: "Build your career with us", icon: "briefcase" }]
    : []),
  ...(site.features.insights
    ? [{ label: "Insights", href: "/insights", desc: "Ideas for campuses and admissions", icon: "book" }]
    : []),
];

/**
 * Yellow "Editor note" boxes: shown while developing (npm run dev), never on the live site.
 * To hide them in development too, set NEXT_PUBLIC_SHOW_EDITOR_NOTES=false in .env.local
 */
export const showEditorNotes =
  process.env.NEXT_PUBLIC_SHOW_EDITOR_NOTES === "true" ||
  (process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SHOW_EDITOR_NOTES !== "false");

/** Absolute URL for a site path (keeps any sub-path in the site URL, e.g. GitHub Pages project sites). */
export const absoluteUrl = (path: string) => site.url.replace(/\/$/, "") + (path === "/" ? "/" : path);
