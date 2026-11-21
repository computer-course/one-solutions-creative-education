/** Types of institutions we serve (rendered on /institutions). */
export interface Industry {
  slug: string;
  name: string;
  icon: string;
  intro: string;
  challenges: string[];
  solutions: string[];
  services: string[];
}

export const industries: Industry[] = [
  { slug: "universities", name: "Universities", icon: "building", intro: "Connected systems and one identity across faculties.", challenges: ["Many departments, many formats", "Ranking and accreditation data", "Large admission funnel"], solutions: ["University website & portals", "ERP and annual data dashboards", "Programme-wise campaigns"], services: ["institutional-websites", "erp", "naac-nirf-support"] },
  { slug: "colleges", name: "Degree Colleges", icon: "graduation", intro: "Stronger admissions and simpler administration.", challenges: ["Seasonal admission pressure", "Manual fee and exam records", "Low online visibility"], solutions: ["Admission campaigns & CRM", "Campus ERP", "Local SEO"], services: ["admission-services", "erp", "seo"] },
  { slug: "schools", name: "Schools", icon: "book", intro: "Clear communication with parents and a trusted image.", challenges: ["Parent communication", "Fee follow-ups", "Standing out locally"], solutions: ["School website & parent portal", "Fee and attendance system", "Social media & branding"], services: ["institutional-websites", "erp", "social-media"] },
  { slug: "medical-nursing", name: "Medical & Nursing Colleges", icon: "heart", intro: "Credible presentation for regulated programmes.", challenges: ["Strict disclosure norms", "Counselling-based admissions", "Clinical training records"], solutions: ["Compliant websites", "Student guidance content", "Records and reporting systems"], services: ["institutional-websites", "admission-services", "erp"] },
  { slug: "engineering-technical", name: "Engineering & Technical Institutes", icon: "code", intro: "Showcase labs, placements and outcomes.", challenges: ["Placement visibility", "Accreditation documentation", "Competitive admissions"], solutions: ["Outcome-focused websites", "NAAC & NIRF data support", "Performance campaigns"], services: ["institutional-websites", "naac-nirf-support", "digital-marketing"] },
  { slug: "management-institutes", name: "Management Institutes", icon: "briefcase", intro: "A brand that matches your ambition.", challenges: ["Crowded market", "Corporate perception", "Lead quality"], solutions: ["Brand identity & films", "LinkedIn-led social media", "Tracked lead campaigns"], services: ["graphics-branding", "social-media", "admission-services"] },
  { slug: "coaching-institutes", name: "Coaching Institutes", icon: "target", intro: "Fill batches and deliver learning online.", challenges: ["Batch-wise enrolment", "Result promotion", "Online classes"], solutions: ["Result and batch campaigns", "LMS with tests", "Creative production"], services: ["digital-marketing", "lms", "graphics-branding"] },
  { slug: "teacher-education", name: "B.Ed & Teacher Training Colleges", icon: "users", intro: "Organised admissions and documentation.", challenges: ["Counselling-driven intake", "Inspection records", "Limited staff time"], solutions: ["Admission guidance support", "Document systems", "Simple websites"], services: ["admission-services", "naac-nirf-support", "institutional-websites"] },
  { slug: "skill-vocational", name: "Skill & Vocational Institutes", icon: "hammer", intro: "Reach learners who want job-ready skills.", challenges: ["Awareness of short courses", "Enquiry follow-up", "Placement stories"], solutions: ["Local campaigns", "Lead CRM", "Social storytelling"], services: ["digital-marketing", "admission-services", "social-media"] },
];
