import { DevNote, PageHero } from "@/components/Basics";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Privacy Policy", description: `How ${site.name} collects, uses and protects personal information.`, path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Privacy Policy" }]} title="Privacy Policy" text="How we handle the information you share with us." />
      <section className="section">
        <div className="container prose">
          <DevNote>This is a general template. Have it reviewed by a legal professional and add your company and contact details before publishing.</DevNote>
          <h2>Information we collect</h2>
          <p>When you submit our contact form we collect the details you provide: your name, email, phone number (optional), institution or school, the services or course you are interested in and your message.</p>
          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry, prepare a proposal or provide course guidance.</li>
            <li>To communicate with you about a project you have requested.</li>
          </ul>
          <p>We do not sell your personal information or use it for unrelated marketing.</p>
          <h2>Storage and security</h2>
          <p>Enquiries are delivered to our business email. We limit access to people who need it to respond to you and take reasonable measures to protect it.</p>
          <h2>Cookies and preferences</h2>
          <p>This website stores your light or dark theme choice in your browser. It does not use this for tracking.</p>
          <h2>Your choices</h2>
          <p>You may ask us to access, correct or delete the information you have shared{site.email ? <> by writing to <a href={`mailto:${site.email}`}>{site.email}</a></> : " by contacting us through the contact page"}.</p>
          <h2>Changes</h2>
          <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
        </div>
      </section>
    </>
  );
}
