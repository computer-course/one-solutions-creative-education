export interface Vacancy {
  title: string;
  department: string;
  type: string; // Full-time, Internship…
  location: string;
  summary: string;
}

/** Add only real, currently open positions. Leave empty when not hiring. */
export const vacancies: Vacancy[] = [];

export const cultureValues = [
  { icon: "users", title: "Collaborative", text: "Developers, designers and marketers work as one team." },
  { icon: "sparkles", title: "Always learning", text: "Time and support to grow your craft." },
  { icon: "target", title: "Ownership", text: "Clear responsibilities and trust to deliver." },
  { icon: "shield", title: "Respect", text: "Honest feedback and fair treatment for everyone." },
];
