/**
 * Course catalogue shown on /courses.
 * These are courses our counsellors commonly guide students on.
 * Durations and eligibility are TYPICAL values — they vary by university, state and regulator.
 * Add, edit or remove entries freely; the page updates automatically.
 */
export type CourseLevel = "Diploma" | "UG" | "PG" | "Doctoral" | "Certificate";

export interface Course {
  name: string;
  full: string;
  level: CourseLevel;
  duration: string;
  eligibility: string;
}

export interface CourseGroup {
  slug: string;
  name: string;
  short: string;
  icon: string;
  intro: string;
  courses: Course[];
}

const c = (name: string, full: string, level: CourseLevel, duration: string, eligibility: string): Course => ({ name, full, level, duration, eligibility });

export const courseGroups: CourseGroup[] = [
  {
    slug: "medical",
    name: "Medical & Dental",
    short: "Medical",
    icon: "heart",
    intro: "Regulated programmes with admission through national entrance examinations and counselling.",
    courses: [
      c("MBBS", "Bachelor of Medicine, Bachelor of Surgery", "UG", "5.5 years (incl. internship)", "10+2 with PCB · NEET-UG"),
      c("BDS", "Bachelor of Dental Surgery", "UG", "5 years (incl. internship)", "10+2 with PCB · NEET-UG"),
      c("BAMS", "Bachelor of Ayurvedic Medicine & Surgery", "UG", "5.5 years", "10+2 with PCB · NEET-UG"),
      c("BHMS", "Bachelor of Homeopathic Medicine & Surgery", "UG", "5.5 years", "10+2 with PCB · NEET-UG"),
      c("BUMS", "Bachelor of Unani Medicine & Surgery", "UG", "5.5 years", "10+2 with PCB · NEET-UG"),
      c("BNYS", "Bachelor of Naturopathy & Yogic Sciences", "UG", "5.5 years", "10+2 with PCB"),
      c("B.V.Sc & AH", "Bachelor of Veterinary Science & Animal Husbandry", "UG", "5.5 years", "10+2 with PCB · NEET-UG"),
      c("MD / MS", "Doctor of Medicine / Master of Surgery", "PG", "3 years", "MBBS · NEET-PG"),
      c("MDS", "Master of Dental Surgery", "PG", "3 years", "BDS · NEET-MDS"),
    ],
  },
  {
    slug: "nursing-paramedical",
    name: "Nursing & Paramedical",
    short: "Nursing & Paramedical",
    icon: "lifebuoy",
    intro: "Careers in patient care, diagnostics and allied health.",
    courses: [
      c("B.Sc Nursing", "Bachelor of Science in Nursing", "UG", "4 years", "10+2 with PCB"),
      c("GNM", "General Nursing & Midwifery", "Diploma", "3 years", "10+2"),
      c("ANM", "Auxiliary Nurse Midwife", "Diploma", "2 years", "10+2"),
      c("Post Basic B.Sc Nursing", "Post Basic Bachelor of Science in Nursing", "UG", "2 years", "GNM"),
      c("M.Sc Nursing", "Master of Science in Nursing", "PG", "2 years", "B.Sc Nursing"),
      c("BPT", "Bachelor of Physiotherapy", "UG", "4.5 years", "10+2 with PCB"),
      c("BOT", "Bachelor of Occupational Therapy", "UG", "4.5 years", "10+2 with PCB"),
      c("BMLT", "Bachelor of Medical Laboratory Technology", "UG", "3 years", "10+2 with Science"),
      c("DMLT", "Diploma in Medical Laboratory Technology", "Diploma", "2 years", "10+2 with Science"),
      c("B.Sc Radiology", "Radiology & Imaging Technology", "UG", "3 years", "10+2 with Science"),
      c("B.Optom", "Bachelor of Optometry", "UG", "4 years", "10+2 with Science"),
      c("OT Technician", "Diploma in Operation Theatre Technology", "Diploma", "2 years", "10+2 with Science"),
    ],
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    short: "Pharmacy",
    icon: "sprout",
    intro: "From dispensing to pharmaceutical research.",
    courses: [
      c("D.Pharm", "Diploma in Pharmacy", "Diploma", "2 years", "10+2 with Science"),
      c("B.Pharm", "Bachelor of Pharmacy", "UG", "4 years", "10+2 with PCB or PCM"),
      c("M.Pharm", "Master of Pharmacy", "PG", "2 years", "B.Pharm"),
      c("Pharm.D", "Doctor of Pharmacy", "Doctoral", "6 years", "10+2 with PCB or PCM"),
    ],
  },
  {
    slug: "non-medical-science",
    name: "Non-Medical & Science",
    short: "Non-Medical",
    icon: "lightbulb",
    intro: "Pure and applied sciences for the PCM and PCB streams.",
    courses: [
      c("B.Sc (PCM)", "Bachelor of Science — Physics, Chemistry, Mathematics", "UG", "3–4 years", "10+2 with PCM"),
      c("B.Sc (PCB)", "Bachelor of Science — Physics, Chemistry, Biology", "UG", "3–4 years", "10+2 with PCB"),
      c("B.Sc (Hons)", "Honours in Physics, Chemistry, Mathematics and more", "UG", "3–4 years", "10+2 with Science"),
      c("B.Sc Biotechnology", "Bachelor of Science in Biotechnology", "UG", "3–4 years", "10+2 with Science"),
      c("B.Sc Agriculture", "Bachelor of Science in Agriculture", "UG", "4 years", "10+2 with Science or Agriculture"),
      c("B.Sc Home Science", "Bachelor of Science in Home Science", "UG", "3–4 years", "10+2"),
      c("M.Sc", "Master of Science (various subjects)", "PG", "2 years", "B.Sc in a relevant subject"),
    ],
  },
  {
    slug: "engineering-technical",
    name: "Engineering & Technical",
    short: "Technical",
    icon: "settings",
    intro: "Engineering degrees, diplomas and trade programmes.",
    courses: [
      c("B.Tech / B.E.", "Bachelor of Technology / Engineering", "UG", "4 years", "10+2 with PCM · JEE or state entrance"),
      c("B.Tech (Lateral Entry)", "Direct second-year admission", "UG", "3 years", "Engineering diploma or B.Sc"),
      c("M.Tech", "Master of Technology", "PG", "2 years", "B.Tech / B.E. · GATE preferred"),
      c("Polytechnic Diploma", "Diploma in Engineering", "Diploma", "3 years", "Class 10"),
      c("ITI", "Industrial Training Institute trades", "Certificate", "1–2 years", "Class 8 or 10 (by trade)"),
      c("B.Arch", "Bachelor of Architecture", "UG", "5 years", "10+2 with Mathematics · NATA"),
    ],
  },
  {
    slug: "computer-it",
    name: "Computer & IT",
    short: "Computer & IT",
    icon: "code",
    intro: "Software, data and information technology.",
    courses: [
      c("BCA", "Bachelor of Computer Applications", "UG", "3–4 years", "10+2"),
      c("MCA", "Master of Computer Applications", "PG", "2 years", "Graduation with Mathematics (as per university)"),
      c("B.Sc IT / CS", "Bachelor of Science in IT / Computer Science", "UG", "3–4 years", "10+2 with Science"),
      c("M.Sc IT / CS", "Master of Science in IT / Computer Science", "PG", "2 years", "Relevant graduation"),
      c("PGDCA", "Post Graduate Diploma in Computer Applications", "Diploma", "1 year", "Graduation"),
      c("DCA", "Diploma in Computer Applications", "Diploma", "1 year", "10+2"),
    ],
  },
  {
    slug: "management-commerce",
    name: "Management & Commerce",
    short: "Management",
    icon: "briefcase",
    intro: "Business, finance and hospitality careers.",
    courses: [
      c("BBA", "Bachelor of Business Administration", "UG", "3–4 years", "10+2"),
      c("MBA", "Master of Business Administration", "PG", "2 years", "Graduation · CAT / MAT / CMAT or university test"),
      c("PGDM", "Post Graduate Diploma in Management", "PG", "2 years", "Graduation · management entrance"),
      c("B.Com", "Bachelor of Commerce", "UG", "3–4 years", "10+2"),
      c("M.Com", "Master of Commerce", "PG", "2 years", "B.Com"),
      c("BHM", "Bachelor of Hotel Management", "UG", "3–4 years", "10+2"),
    ],
  },
  {
    slug: "arts-general",
    name: "Arts, Humanities & General",
    short: "General",
    icon: "palette",
    intro: "General degrees across languages, social sciences and media.",
    courses: [
      c("BA", "Bachelor of Arts", "UG", "3–4 years", "10+2"),
      c("MA", "Master of Arts (various subjects)", "PG", "2 years", "Graduation"),
      c("BSW", "Bachelor of Social Work", "UG", "3 years", "10+2"),
      c("MSW", "Master of Social Work", "PG", "2 years", "Graduation"),
      c("BJMC", "Bachelor of Journalism & Mass Communication", "UG", "3 years", "10+2"),
      c("BFA", "Bachelor of Fine Arts", "UG", "4 years", "10+2"),
      c("B.Lib.I.Sc", "Bachelor of Library & Information Science", "UG", "1 year", "Graduation"),
      c("Ph.D", "Doctor of Philosophy", "Doctoral", "3–6 years", "Master's degree · entrance / NET"),
    ],
  },
  {
    slug: "teacher-education",
    name: "Teacher Education",
    short: "Teaching",
    icon: "users",
    intro: "Qualifications for school teaching careers.",
    courses: [
      c("B.Ed", "Bachelor of Education", "UG", "2 years", "Graduation · state entrance where applicable"),
      c("D.El.Ed (BSTC)", "Diploma in Elementary Education", "Diploma", "2 years", "10+2 · state entrance where applicable"),
      c("BA B.Ed / B.Sc B.Ed", "Integrated teacher education", "UG", "4 years", "10+2"),
      c("M.Ed", "Master of Education", "PG", "2 years", "B.Ed"),
      c("B.P.Ed", "Bachelor of Physical Education", "UG", "2 years", "Graduation"),
    ],
  },
  {
    slug: "law",
    name: "Law",
    short: "Law",
    icon: "shield",
    intro: "Legal education after school or graduation.",
    courses: [
      c("LLB", "Bachelor of Laws", "UG", "3 years", "Graduation"),
      c("BA LLB", "Integrated Bachelor of Arts & Laws", "UG", "5 years", "10+2 · CLAT or university test"),
      c("BBA LLB", "Integrated Business Administration & Laws", "UG", "5 years", "10+2 · CLAT or university test"),
      c("LLM", "Master of Laws", "PG", "1–2 years", "LLB"),
    ],
  },
  {
    slug: "vocational",
    name: "Vocational & Skill",
    short: "Vocational",
    icon: "hammer",
    intro: "Shorter, job-oriented programmes.",
    courses: [
      c("B.Voc", "Bachelor of Vocation", "UG", "3 years", "10+2"),
      c("Fire & Safety", "Diploma in Fire & Industrial Safety", "Diploma", "1 year", "10+2"),
      c("Fashion Design", "Diploma in Fashion Design", "Diploma", "1–2 years", "Class 10 or 10+2"),
      c("Yoga", "Diploma / PG Diploma in Yoga", "Diploma", "1 year", "10+2 or graduation"),
    ],
  },
];

export const allCourses = () => courseGroups.flatMap((g) => g.courses.map((course) => ({ ...course, group: g.slug })));
export const courseLevels: CourseLevel[] = ["Certificate", "Diploma", "UG", "PG", "Doctoral"];
