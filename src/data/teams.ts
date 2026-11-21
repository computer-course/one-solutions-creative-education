import { people, type DepartmentSlug, type LeadershipLevel, type Person } from "./people";
import { showPlaceholders } from "./site";

export interface Department {
  slug: DepartmentSlug;
  name: string;
  short: string;
  description: string;
  icon: string;
  /** What the team does (capabilities, not a claim about headcount). */
  focus: string[];
  /** Set false to hide a department completely. */
  enabled: boolean;
}

/** Add a new department by adding an entry here (and its slug to DepartmentSlug in people.ts). */
export const departments: Department[] = [
  {
    slug: "it",
    name: "IT Team",
    short: "IT & Technology",
    description: "Builds and maintains the websites, ERP and learning systems institutions rely on.",
    icon: "code",
    focus: ["Web development", "Business software", "ERP & LMS", "Hosting & support", "Quality testing"],
    enabled: true,
  },
  {
    slug: "admissions",
    name: "Admission Team",
    short: "Admissions",
    description: "Guides students and families and supports institutions through the admission cycle.",
    icon: "graduation",
    focus: ["Counselling", "Lead management", "Follow-up & CRM", "Admission support"],
    enabled: true,
  },
  {
    slug: "creative",
    name: "Creative & Design Team",
    short: "Creative & Design",
    description: "Shapes brands, interfaces and visual content with clarity and craft.",
    icon: "palette",
    focus: ["Brand identity", "UI/UX design", "Graphic design", "Video & motion"],
    enabled: true,
  },
  {
    slug: "marketing",
    name: "Digital Marketing Team",
    short: "Digital Marketing",
    description: "Plans and runs campaigns that turn visibility into qualified enquiries.",
    icon: "megaphone",
    focus: ["SEO", "Paid campaigns", "Social media", "Content", "Analytics"],
    enabled: true,
  },
  {
    slug: "business-development",
    name: "Business Development & Client Relations",
    short: "Client Relations",
    description: "Keeps every engagement clear, coordinated and moving forward.",
    icon: "handshake",
    focus: ["Client relationships", "Project coordination", "Account management"],
    enabled: true,
  },
  {
    slug: "operations",
    name: "Operations & Administration",
    short: "Operations",
    description: "Keeps the company running smoothly behind every project.",
    icon: "settings",
    focus: ["Project management", "HR & administration", "Finance & accounts"],
    enabled: true,
  },
];

const isVisible = (p: Person) => p.published !== false && (!p.placeholder || showPlaceholders);

export const visiblePeople = () => people.filter(isVisible);

export const enabledDepartments = () => departments.filter((d) => d.enabled);

export const getDepartment = (slug: string) => enabledDepartments().find((d) => d.slug === slug);

export const membersOf = (slug: DepartmentSlug) => visiblePeople().filter((p) => p.department === slug);

/** Departments that currently have at least one publishable member. */
export const populatedDepartments = () => enabledDepartments().filter((d) => membersOf(d.slug).length > 0);

export const leadersAt = (level: LeadershipLevel) =>
  visiblePeople()
    .filter((p) => p.leadership === level)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const initialsOf = (name: string) =>
  name
    .replace(/^(mr|mrs|ms|dr|prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
