import type { MockupKind } from "./services";

export const workCategories = ["Websites", "ERP & LMS", "Branding", "SEO & Marketing", "Social Media", "Admissions", "NAAC & NIRF"] as const;
export type WorkCategory = (typeof workCategories)[number];

export interface Project {
  slug: string;
  title: string;
  /** Only add an institution's name with written permission. */
  client?: string;
  industry: string;
  categories: WorkCategory[];
  visual: MockupKind;
  screenshots?: string[];
  /** true = illustrative sample, clearly labelled on the site. */
  concept: boolean;
  objective: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  /** Only add verified, institution-approved results. */
  results?: string[];
  featured?: boolean;
}

/** All entries are CONCEPT projects. Replace with real, approved case studies (concept: false). */
export const projects: Project[] = [
  { slug: "university-website-concept", title: "University Website", industry: "University", categories: ["Websites"], visual: "browser", concept: true, featured: true, objective: "Present every faculty and programme in one clear structure.", challenge: "Hundreds of pages with no common design.", approach: "A shared design system with programme-led navigation.", deliverables: ["Information architecture", "UI design", "CMS", "Disclosure sections"] },
  { slug: "campus-erp-concept", title: "Campus ERP", industry: "Degree College", categories: ["ERP & LMS"], visual: "erp", concept: true, featured: true, objective: "Connect admissions, fees and examinations.", challenge: "Separate records in each office.", approach: "Phased rollout beginning with admissions and fees.", deliverables: ["Admission module", "Fee module", "Student portal", "Reports"] },
  { slug: "admission-campaign-concept", title: "Admission Campaign", industry: "Nursing College", categories: ["Admissions", "SEO & Marketing"], visual: "growth", concept: true, featured: true, objective: "Generate qualified enquiries for the new session.", challenge: "Leads lost between calls and follow-ups.", approach: "Tracked campaigns feeding one CRM with follow-up rules.", deliverables: ["Campaign plan", "Landing pages", "Lead CRM", "Weekly reports"] },
  { slug: "prospectus-brand-concept", title: "Prospectus & Identity", industry: "Management Institute", categories: ["Branding"], visual: "brand", concept: true, featured: true, objective: "A modern identity carried through every touchpoint.", challenge: "Inconsistent materials from different vendors.", approach: "Identity system, prospectus and creative templates.", deliverables: ["Brand guide", "Prospectus", "Creative kit"] },
  { slug: "naac-data-concept", title: "Accreditation Data Workspace", industry: "Engineering Institute", categories: ["NAAC & NIRF"], visual: "accred", concept: true, featured: true, objective: "Keep criterion-wise evidence organised through the year.", challenge: "Data compiled in a rush before submission.", approach: "Templates, an evidence repository and annual dashboards.", deliverables: ["Data templates", "Evidence repository", "Dashboards"] },
  { slug: "school-social-concept", title: "School Social Media", industry: "School", categories: ["Social Media"], visual: "social", concept: true, featured: true, objective: "Share activities and results with parents every week.", challenge: "Irregular posting and mixed visual styles.", approach: "Template-led monthly calendar with event coverage.", deliverables: ["Content calendar", "Templates", "Reels"] },
  { slug: "college-lms-concept", title: "Blended Learning Platform", industry: "Degree College", categories: ["ERP & LMS"], visual: "lms", concept: true, objective: "Deliver course material and assessments online.", challenge: "Notes shared across unconnected apps.", approach: "A branded LMS with semester-wise course rooms.", deliverables: ["LMS setup", "Course templates", "Faculty training"] },
  { slug: "local-seo-concept", title: "Programme SEO", industry: "Pharmacy College", categories: ["SEO & Marketing", "Websites"], visual: "search", concept: true, objective: "Appear for programme searches in the admission region.", challenge: "Aggregator portals outranking the college.", approach: "Technical fixes, programme pages and listings.", deliverables: ["SEO audit", "Programme pages", "Monthly reports"] },
  { slug: "nirf-dashboard-concept", title: "Annual Data Dashboard", industry: "University", categories: ["NAAC & NIRF", "ERP & LMS"], visual: "dashboard", concept: true, objective: "One view of the figures needed for annual submissions.", challenge: "Numbers held in departmental spreadsheets.", approach: "Structured collection with validation and a dashboard.", deliverables: ["Collection forms", "Validation rules", "Dashboard"] },
];

export const featuredProjects = () => projects.filter((p) => p.featured);
