export type MockupKind =
  | "browser" | "dashboard" | "erp" | "lms" | "brand" | "growth" | "search" | "social" | "campus" | "flow" | "accred";

export interface Service {
  slug: string;
  name: string;
  short: string;
  category: "Technology" | "Creative" | "Growth" | "Compliance";
  icon: string;
  visual: MockupKind;
  summary: string;
  overview: string;
  problems: string[];
  deliverables: string[];
  examples: { industry: string; text: string }[];
  faqs: { q: string; a: string }[];
  disclaimer?: string;
  homeTitle?: string;
}

export const workflow = [
  { step: "Discover", icon: "search", text: "We learn your institution, audience and goals." },
  { step: "Plan", icon: "map", text: "Scope, calendar and deliverables agreed in writing." },
  { step: "Build", icon: "hammer", text: "Designed, developed and reviewed in clear stages." },
  { step: "Improve", icon: "trending", text: "Launch, measure, support and keep optimising." },
];

const eg = (a: string, b: string, c: string) => [
  { industry: "Universities", text: a },
  { industry: "Colleges", text: b },
  { industry: "Schools", text: c },
];

export const services: Service[] = [
  {
    slug: "institutional-websites",
    name: "Institutional Websites",
    homeTitle: "Institutional Websites",
    short: "Websites",
    category: "Technology",
    icon: "globe",
    visual: "browser",
    summary: "Fast, accessible websites that present programmes clearly and turn visitors into enquiries.",
    overview:
      "Your website is where students, parents, faculty and accreditation teams look first. We plan the structure, design the experience and build it to load quickly, rank well and stay easy for your staff to update.",
    problems: ["Outdated site that is hard to update", "Programme and fee details buried or missing", "Mandatory disclosures scattered across PDFs"],
    deliverables: ["University & college websites", "School websites", "Department microsites", "Programme pages", "Mandatory disclosure sections", "Content management", "Speed & mobile optimisation", "Hosting & maintenance"],
    examples: eg("Multi-department site with shared design system.", "Programme-led site with admission enquiry flow.", "Parent-friendly site with notices and calendar."),
    faqs: [
      { q: "Can our staff update the website?", a: "Yes. We set up content management for notices, events and pages, and train your team." },
      { q: "Do you migrate existing content?", a: "Yes. Migration is planned as its own stage so nothing important is lost." },
      { q: "Will it work on mobile?", a: "Every page is designed and tested for phones, tablets and desktops." },
    ],
  },
  {
    slug: "erp",
    name: "Campus ERP",
    homeTitle: "Campus ERP & LMS",
    short: "ERP",
    category: "Technology",
    icon: "layers",
    visual: "erp",
    summary: "Admissions, fees, attendance, examinations and reports connected in one system.",
    overview:
      "A campus ERP brings daily administration into one place. We map your processes, configure the modules you need, migrate data carefully and train the people who will use it every day.",
    problems: ["Separate records in every department", "Fee and attendance reports prepared by hand", "No single view of a student's journey"],
    deliverables: ["Admission module", "Fee management", "Attendance", "Examination & results", "Student & parent portal", "Staff & HR", "Reports & dashboards", "Training & support"],
    examples: eg("Faculty-wise rollout across departments.", "Admission-to-alumni student records.", "Fees, attendance and parent communication."),
    faqs: [
      { q: "Do we have to start with every module?", a: "No. Most institutions begin with admissions and fees, then expand in phases." },
      { q: "What happens to existing data?", a: "It is cleaned and migrated with checks before go-live." },
      { q: "Is student data secure?", a: "Access is role-based and data handling is agreed with the institution in advance." },
    ],
  },
  {
    slug: "lms",
    name: "Learning Management System",
    short: "LMS",
    category: "Technology",
    icon: "book",
    visual: "lms",
    summary: "Online and blended learning with courses, assessments and progress tracking.",
    overview:
      "We set up and brand a learning platform that makes it simple for faculty to publish material, run assessments and follow each learner's progress — on any device.",
    problems: ["Course material spread across apps", "No reliable progress tracking", "Slow, manual assessments"],
    deliverables: ["LMS setup & branding", "Course structure", "Assessments & quizzes", "Progress tracking", "Certificates", "Live class integration", "Faculty training", "Platform support"],
    examples: eg("Blended learning across programmes.", "Semester-wise course rooms.", "Homework, quizzes and parent visibility."),
    faqs: [
      { q: "Can it connect to our ERP?", a: "Yes, integration is planned during discovery." },
      { q: "Is it mobile friendly?", a: "The platforms we implement work on phones and tablets." },
      { q: "Who manages it after launch?", a: "Your administrators, with our support available." },
    ],
  },
  {
    slug: "seo",
    name: "SEO for Institutions",
    homeTitle: "SEO & Digital Marketing",
    short: "SEO",
    category: "Growth",
    icon: "search",
    visual: "search",
    summary: "Be found when students search for programmes, colleges and schools in your area.",
    overview:
      "Students research online long before they apply. We fix technical foundations, build strong programme pages and improve local visibility — then report on progress in plain language.",
    problems: ["Low visibility for programme searches", "Aggregator sites outranking your own", "Incorrect listings and map details"],
    deliverables: ["SEO audit", "Technical SEO", "Programme page optimisation", "Local SEO & listings", "Content planning", "Structured data", "Monthly ranking reports"],
    examples: eg("Programme-level visibility across faculties.", "Local search presence in the admission region.", "Map and listing accuracy for parents."),
    faqs: [
      { q: "How soon will we see results?", a: "SEO typically takes months. Early technical fixes come first, with monthly progress reports." },
      { q: "Do you guarantee rankings?", a: "No. Rankings depend on search engines and competition, and no one can honestly promise them." },
      { q: "Is content writing included?", a: "It can be, based on what the audit finds." },
    ],
  },
  {
    slug: "graphics-branding",
    name: "Graphics & Branding",
    homeTitle: "Graphics & Branding",
    short: "Graphics",
    category: "Creative",
    icon: "palette",
    visual: "brand",
    summary: "Prospectuses, admission creatives, campus branding and video with one consistent identity.",
    overview:
      "A consistent identity builds trust with students and parents. We design the visual system and produce everything that carries it — from the prospectus to the admission hoarding.",
    problems: ["Every department designs differently", "Admission creatives made at the last minute", "Dated prospectus and brochures"],
    deliverables: ["Brand identity", "Prospectus & brochures", "Admission creatives", "Hoardings & print", "Event branding", "Campus films & video", "Motion graphics", "Presentation templates"],
    examples: eg("Identity system used across faculties.", "Admission-season campaign kit.", "Annual day and event branding."),
    faqs: [
      { q: "What files do we receive?", a: "Print-ready and digital files, plus a brand guide." },
      { q: "Can you refresh our existing identity?", a: "Yes. A careful refinement is often better than starting over." },
      { q: "How many revisions?", a: "Revision rounds are defined in the proposal." },
    ],
  },
  {
    slug: "social-media",
    name: "Social Media Management",
    homeTitle: "Social Media Management",
    short: "Social media",
    category: "Growth",
    icon: "share",
    visual: "social",
    summary: "Campus stories, achievements and admission updates published on a steady calendar.",
    overview:
      "We plan the calendar, create the content, publish on schedule and respond to your community — so your channels stay active through the academic year.",
    problems: ["Irregular posting", "Achievements that never get shared", "Comments and messages left unanswered"],
    deliverables: ["Social strategy", "Monthly content calendar", "Reels & short videos", "Event coverage", "Copywriting", "Community management", "Monthly reporting"],
    examples: eg("Faculty and research highlights.", "Campus life and placement stories.", "Activities, results and parent updates."),
    faqs: [
      { q: "Do we approve content first?", a: "Yes. An approval step is built into the calendar." },
      { q: "Which platforms?", a: "We recommend platforms based on where your students and parents are." },
      { q: "Do you cover events on campus?", a: "Coverage can be included; it is scoped separately." },
    ],
  },
  {
    slug: "admission-services",
    name: "Admission Marketing & Counselling",
    homeTitle: "Admissions",
    short: "Admissions",
    category: "Growth",
    icon: "graduation",
    visual: "growth",
    summary: "Lead campaigns, enquiry management and counselling that move students from interest to enrolment.",
    overview:
      "Admissions need more than advertising. We run tracked campaigns, manage every enquiry in a CRM and support follow-up and counselling, so fewer interested students are lost along the way.",
    problems: ["Leads lost between follow-ups", "Ad spend with no clear return", "No visibility of the admission funnel"],
    deliverables: ["Admission campaigns (Google & Meta)", "Landing pages", "Lead management & CRM", "Follow-up workflows", "Student counselling support", "Admission helpdesk", "Funnel reporting"],
    examples: eg("Programme-wise campaigns with a shared CRM.", "Regional lead generation and counselling.", "Session-opening enquiry campaigns."),
    faqs: [
      { q: "Do you guarantee admission numbers?", a: "No. We commit to transparent campaigns, tracked leads and disciplined follow-up." },
      { q: "Who owns the lead data?", a: "The institution. Leads sit in accounts and systems you control." },
      { q: "Do you guide students directly?", a: "Yes, our counsellors guide students on courses and process. See the Courses page." },
    ],
    disclaimer:
      "Admission to regulated courses happens only through the prescribed entrance examinations, counselling and institutional rules. We provide marketing, guidance and support — never a guaranteed seat.",
  },
  {
    slug: "naac-nirf-support",
    name: "NAAC & NIRF Data Support",
    homeTitle: "NAAC & NIRF Support",
    short: "NAAC & NIRF",
    category: "Compliance",
    icon: "shield",
    visual: "accred",
    summary: "Organised data, documentation and digital systems for accreditation and ranking submissions.",
    overview:
      "Accreditation and ranking work depends on accurate, well-organised evidence. We help you collect, structure and present institutional data, and build the digital systems that keep it ready year after year.",
    problems: ["Data scattered across departments", "Evidence that is hard to trace", "Last-minute compilation before deadlines"],
    deliverables: ["Data collection templates", "Criterion-wise documentation support", "Evidence organisation", "NIRF data organisation & reporting", "IQAC digital workflows", "Website disclosure sections", "Dashboards for annual data"],
    examples: eg("Department-wise data consolidation.", "Criterion-wise evidence repository.", "Structured records for board inspections."),
    faqs: [
      { q: "Can you guarantee a grade or rank?", a: "No. Outcomes are decided solely by the accrediting and ranking bodies. We organise data and build supporting systems." },
      { q: "Do you write the data for us?", a: "No. Data and claims come from the institution; we structure, format and present them accurately." },
      { q: "Can this continue every year?", a: "Yes. We set up workflows so data is captured through the year, not only at submission time." },
    ],
    disclaimer:
      "We provide documentation, data organisation and digital support only. Accreditation and ranking outcomes are determined by the relevant bodies and cannot be guaranteed.",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    short: "Marketing",
    category: "Growth",
    icon: "megaphone",
    visual: "dashboard",
    summary: "Search and social campaigns measured against enquiries, not impressions.",
    overview:
      "We plan, run and refine paid campaigns with proper tracking in place, so you can see what was spent, what it produced and what to do next.",
    problems: ["Campaigns without conversion tracking", "Few or poorly qualified leads", "No clear reporting"],
    deliverables: ["Google Ads", "Meta Ads", "Landing page optimisation", "Conversion tracking", "Analytics setup", "Campaign creatives", "Monthly reporting"],
    examples: eg("Programme-wise campaign structure.", "Regional targeting in the admission season.", "Session-opening awareness campaigns."),
    faqs: [
      { q: "What budget do we need?", a: "We recommend a starting budget after reviewing your region and goals." },
      { q: "Who owns the ad accounts?", a: "You do. Campaigns run in accounts owned by your institution." },
      { q: "Can you guarantee results?", a: "No honest agency can. We commit to clear goals and transparent reporting." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Six core services shown on the homepage, in order. */
export const homeServices = ["institutional-websites", "erp", "seo", "graphics-branding", "social-media", "naac-nirf-support"].map((slug) => getService(slug)!);
