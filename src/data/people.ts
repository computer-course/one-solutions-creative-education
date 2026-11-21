/**
 * SINGLE SOURCE OF TRUTH for every person shown on the website.
 * Leadership page, Teams pages and the homepage preview all read from here.
 *
 * To add a person: copy an entry, change the fields, save.
 * To add a photo: put the file in /public/images/people/ and set
 *   photo: "/images/people/your-file.jpg"   (portrait, 4:5, at least 800×1000px)
 *
 * Never add private contact details (personal phone, home address, etc.).
 */

export type LeadershipLevel = "founder" | "patron" | "director" | "co-founder" | "department-head" | "team-lead";

export type DepartmentSlug =
  | "it"
  | "admissions"
  | "creative"
  | "marketing"
  | "business-development"
  | "operations";

export interface Person {
  id: string;
  name: string;
  title: string;
  /** Team the person belongs to (omit for company-level leadership). */
  department?: DepartmentSlug;
  /** Set to list the person on the Leadership page. */
  leadership?: LeadershipLevel;
  photo?: string;
  /** Focus point of the photo inside the frame, e.g. "50% 10%" (default "50% 20%"). */
  photoPosition?: string;
  /** Short professional introduction. Leave empty until approved. */
  bio?: string;
  /** Longer background, shown in the expandable section on the Leadership page. */
  background?: string;
  /** Skills or areas of responsibility. */
  focus?: string[];
  linkedin?: string;
  /** Internal note only shown when `showAffiliation` is true. */
  affiliation?: string;
  showAffiliation?: boolean;
  /** Placeholder entries are only visible in development. */
  placeholder?: boolean;
  /** Set false to hide a person without deleting them. */
  published?: boolean;
  order?: number;
}

export const people: Person[] = [
  // ───────────── Leadership ─────────────
  {
    id: "mahendra-singh",
    name: "Mr. Mahendra Singh",
    title: "Founder",
    leadership: "founder",
    photo: "",
    bio: "",
    background: "",
    focus: [],
    linkedin: "",
  },
  {
    id: "himmat-singh-dewal",
    name: "Himmat Singh Dewal",
    title: "Patron",
    leadership: "patron",
    photo: "/images/people/himmat-singh-dewal.jpg", // low resolution (200px) — replace with a larger file when available
    photoPosition: "50% 30%",
    bio: "",
    background: "",
    focus: [],
    linkedin: "",
    affiliation: "Assistant Superintendent of Police",
    showAffiliation: true,
  },
  {
    id: "ajay-singh-amera",
    name: "Dr. Ajay Singh Amera",
    title: "Co-Founder",
    leadership: "co-founder",
    photo: "/images/people/ajay-singh-amera.jpg",
    photoPosition: "50% 0%",
    bio: "",
    focus: [],
    linkedin: "",
  },

  // ───────────── Admissions team ─────────────
  {
    id: "kailash-dwasi",
    name: "Mr. Kailash Dwasi",
    photo: "/images/people/kailash-dwasi.jpg",
    photoPosition: "50% 10%",
    title: "Admission Counsellor",
    department: "admissions",
    focus: ["Admission guidance", "Student counselling"],
  },

  // ───────────── IT team ─────────────
  {
    id: "abishek-meena",
    name: "Mr. Abishek Meena",
    photo: "/images/people/abishek-meena.jpg",
    photoPosition: "50% 15%",
    title: "Social Media",
    department: "it",
    focus: ["Social media", "Content"],
  },
  {
    id: "gulasha",
    name: "Mr. Gulasha",
    photo: "/images/people/gulasha.jpg",
    photoPosition: "50% 20%",
    title: "Web Developer",
    department: "it",
    focus: ["Web development", "Websites"],
  },
];

export const leadershipLevels: {
  level: LeadershipLevel;
  label: string;
  plural: string;
  summary: string;
  visible: boolean;
}[] = [
  {
    level: "founder",
    label: "Founder",
    plural: "Founder",
    summary: "Founded the company and sets its vision and long-term direction.",
    visible: true,
  },
  {
    level: "patron",
    label: "Patron",
    plural: "Patron",
    summary: "Guides and supports the company as its patron.",
    visible: true,
  },
  {
    level: "director",
    label: "Director",
    plural: "Director",
    summary: "Sets the company's vision, priorities and long-term direction.",
    visible: true,
  },
  {
    level: "co-founder",
    label: "Co-Founder",
    plural: "Co-Founders",
    summary: "Helped establish the company and continues to shape its growth.",
    visible: true,
  },
  {
    level: "department-head",
    label: "Department Head",
    plural: "Department Heads",
    summary: "Lead each discipline and are accountable for the quality of its work.",
    visible: true,
  },
  {
    level: "team-lead",
    label: "Team Lead",
    plural: "Team Leads",
    summary: "Guide day-to-day delivery inside each department.",
    visible: true,
  },
];
