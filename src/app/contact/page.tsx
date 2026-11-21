import { DevNote, PageHero } from "@/components/Basics";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Contact One Solutions Creative For Education about services for your institution or guidance on a course.",
  path: "/contact",
});

export default function ContactPage() {
  const items = [
    site.email && { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    site.phone && { icon: "phone", label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    site.whatsapp && { icon: "whatsapp", label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${site.whatsapp}` },
    site.address && { icon: "pin", label: "Office", value: site.address },
  ].filter(Boolean) as { icon: string; label: string; value: string; href?: string }[];
  const socials = Object.entries(site.social).filter(([, v]) => v);

  return (
    <>
      <PageHero crumbs={[{ label: "Contact" }]} eyebrow="Contact" title="Tell us what you need." text="For institutions: services and proposals. For students and parents: course guidance." />
      <section className="section">
        <div className="container contact-layout">
          <div className="panel"><ContactForm /></div>
          <aside className="contact-info">
            {items.length > 0 && (
              <div className="panel">
                {items.map((i) => (
                  <div className="contact-item" key={i.label}>
                    <span className="icon-chip"><Icon name={i.icon} /></span>
                    <div><strong>{i.label}</strong>{i.href ? <a href={i.href}>{i.value}</a> : <span>{i.value}</span>}</div>
                  </div>
                ))}
                {socials.length > 0 && (
                  <div className="chips" style={{ marginTop: 24 }}>
                    {socials.map(([k, v]) => <a key={k} className="chip" href={v} target="_blank" rel="noopener noreferrer" style={{ textTransform: "capitalize" }}>{k}</a>)}
                  </div>
                )}
              </div>
            )}
            <div className="panel">
              <div className="contact-item"><span className="icon-chip"><Icon name="message" /></span><div><strong>1. You share the details</strong><span>Institution needs or course interest.</span></div></div>
              <div className="contact-item"><span className="icon-chip"><Icon name="search" /></span><div><strong>2. We review it</strong><span>And ask any questions.</span></div></div>
              <div className="contact-item"><span className="icon-chip"><Icon name="file" /></span><div><strong>3. You get a clear answer</strong><span>A proposal, or counselling guidance.</span></div></div>
            </div>
            <div className="notice"><Icon name="shield" /><p>Your details are used only to respond to this enquiry and are never sold.</p></div>
            <DevNote>Add official email, phone, WhatsApp, address and social links in <code>src/data/site.ts</code>. Configure SMTP in <code>.env.local</code> so the form can deliver messages.</DevNote>
          </aside>
        </div>
      </section>
    </>
  );
}
