# One Solutions Creative For Education — Website

The education division site of One Solution Creative: services for universities, colleges and schools, plus a grouped course catalogue for students.

Multi-page corporate website built with **Next.js (App Router) + React + TypeScript**, **Three.js**, CSS design tokens and Lucide icons.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Requires Node.js 20 or newer.

## Where to edit content (no code knowledge needed)

| What | File |
| --- | --- |
| Company name, email, phone, address, WhatsApp, social links, year, registration | `src/data/site.ts` |
| **All people** — Director, Co-Directors, department heads, team members | `src/data/people.ts` |
| Departments / teams (add, rename, hide) | `src/data/teams.ts` |
| Services and their detail pages | `src/data/services.ts` |
| **Course catalogue** (groups, courses, duration, eligibility) | `src/data/courses.ts` |
| Institution types (the /institutions page) | `src/data/industries.ts` |
| Portfolio / case studies | `src/data/projects.ts` |
| Job vacancies | `src/data/careers.ts` |
| Blog articles | `src/data/insights.ts` |
| Values, "why us", approach steps | `src/data/company.ts` |

Rules built into the site:

- **Empty fields are hidden.** Nothing unverified is shown (no email → no email on the site).
- **People are defined once** in `people.ts` and reused on Home, Leadership and Teams.
- **Placeholders** (`placeholder: true`) appear only in `npm run dev`, never on the live site.
- **Editor notes** (yellow hint boxes) appear only in `npm run dev`, never on the live site. To hide them in development too, set `NEXT_PUBLIC_SHOW_EDITOR_NOTES=false` in `.env.local`.
- **Empty departments** are hidden from the team directory and from search engines.
- **Concept projects** are labelled "Concept" until replaced with real work (`concept: false`).

### Add a team member

Add an entry to `people` in `src/data/people.ts`:

```ts
{
  id: "full-name",
  name: "Full Name",
  title: "Job Title",
  department: "it",            // it | admissions | creative | marketing | business-development | operations
  photo: "/images/people/full-name.jpg",   // optional — file goes in public/images/people/
  bio: "Short professional introduction.",
  focus: ["Skill one", "Skill two"],
  linkedin: "https://www.linkedin.com/in/…", // optional
},
```

To list someone on the Leadership page add `leadership: "director" | "co-founder" | "department-head" | "team-lead"`.

Portraits: 4:5 ratio, at least 800×1000 px. Without a photo a monogram is shown.

### Add a new team / department

1. Add the slug to `DepartmentSlug` in `src/data/people.ts`.
2. Add an entry to `departments` in `src/data/teams.ts`.

The page `/teams/<slug>`, the filter and the sitemap update automatically.

### Add or edit a course

In `src/data/courses.ts`, add a line inside the right group:

```ts
c("B.Sc Nursing", "Bachelor of Science in Nursing", "UG", "4 years", "10+2 with PCB"),
```

To add a new group, copy an existing group block and change its `slug`, `name` and courses. The Courses page, filters, homepage tiles and search update automatically. Durations and eligibility are shown as *typical* values with a disclaimer — keep them accurate for your region.

## Contact form

The form has two modes — institution (services) and student or parent (course guidance). A course card links to `/contact?course=NAME`, which pre-selects student mode.

`POST /api/contact` validates on the server, applies a honeypot, a minimum-time check, a same-origin check and a per-IP rate limit, then sends the enquiry by SMTP.
The visitor sees "Message received" **only** when the mail server accepts the message. If SMTP is not configured the form says the message was not sent.

Set in `.env.local` (or your host's environment settings): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`. These stay on the server and are never sent to the browser.

## Theme

Light is the default design; dark is a separately tuned palette. The choice is saved in `localStorage` (`osc-theme`); before a choice is made the operating-system preference is used. A small inline script sets the theme before first paint to avoid a flash. All colours are tokens at the top of `src/app/globals.css`.

## 3D visual

The homepage runs a full-page scroll-driven scene (`src/lib/homeScene.ts`): 1,000 blocks rearrange into a new formation (graduation cap, open book, helix, campus building, rising bars, globe) for each section marked with `data-scene="n"`. `<PageHero scene={n}>` shows a formation behind an inner page hero. Cards marked `data-tilt` get a pointer-driven 3D tilt (`src/components/Tilt.tsx`). Scroll effects on the HTML (tilt-in, stacked cards, horizontal gallery) live in `src/components/ScrollFx.tsx`. It loads after the page is idle, pauses when hidden, lowers quality on slow devices, renders a single still frame for reduced-motion users and falls back to an SVG when WebGL is unavailable.

## SEO

Per-page titles, descriptions, canonical URLs and Open Graph tags (`src/lib/seo.ts`), `sitemap.xml`, `robots.txt`, and Organization / Breadcrumb / Service / FAQ structured data. Set `NEXT_PUBLIC_SITE_URL` to the live domain.

## Deployment

**Vercel (simplest):** import the project, add the environment variables, deploy.

**Any Node server / VPS:**

```bash
npm ci
npm run build
npm start            # serves on port 3000; put Nginx or similar in front
```

Note: the in-memory rate limit is per server instance. For multi-instance or serverless hosting, add a shared limiter or a CAPTCHA service if spam becomes a problem.

## Hosting on GitHub Pages (free, static)

GitHub Pages serves static files only, so the site is built in static mode (`GITHUB_PAGES=true`). The workflow in `.github/workflows/deploy-pages.yml` does this automatically on every push to `main`.

1. Create a new repository on GitHub (for example `one-solutions-creative-education`).
2. Push this project to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/one-solutions-creative-education.git
   git push -u origin main
   ```

3. On GitHub open the repository → **Settings → Pages** → under **Build and deployment** set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish (about 2 minutes). The site is then live at `https://YOUR-USERNAME.github.io/one-solutions-creative-education/`.
5. **Contact form:** a static site has no server, so the built-in email sending is not available. Create a form at a form service (Formspree, Web3Forms or similar), then in **Settings → Secrets and variables → Actions → Variables** add `CONTACT_ENDPOINT` with the form URL and re-run the workflow. Without it the form honestly reports "not sent".
6. **Custom domain (optional):** in **Settings → Pages → Custom domain** enter your domain and add the DNS records GitHub shows. The workflow picks up the new address on the next run.

To test the static build locally:

```bash
GITHUB_PAGES=true npm run build
npx serve out
```

Static mode differences: no `/api/contact`, no server security headers, photos are served as-is (not resized). For the full feature set use Vercel or a Node server (above).

## Before going live

- [ ] Fill in `src/data/site.ts` (email, phone, address, social links)
- [ ] Add portraits, biographies and LinkedIn links in `src/data/people.ts`
- [ ] Replace concept projects with approved client work
- [ ] Configure SMTP and send a test enquiry
- [ ] Have the Privacy Policy and Terms reviewed
- [ ] Set `NEXT_PUBLIC_SITE_URL`

## Structure

```
src/
  app/          routes (pages, API, sitemap, robots, 404)
  components/   SiteHeader, NavigationMenu, ThemeToggle, SiteFooter, PageHero, SectionHeading,
                ServiceCard, IndustryCard, LeadershipProfile, TeamMemberCard, TeamFilter,
                ContactForm, Breadcrumbs, CTASection, HeroVisual, Mockup …
  data/         all editable content
  lib/          SEO helper, Three.js scene
```
