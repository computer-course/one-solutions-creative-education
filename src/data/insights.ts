export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  author?: string;
  cover?: string;
}

/** Publish real articles by adding them here (or connect a CMS). */
export const articles: Article[] = [];

export const insightTopics = [
  { icon: "graduation", title: "Admissions" },
  { icon: "layers", title: "Campus ERP & LMS" },
  { icon: "shield", title: "NAAC & NIRF" },
  { icon: "book", title: "Course Guides" },
];
