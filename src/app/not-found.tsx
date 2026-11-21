import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="notfound">
      <div>
        <p className="code">4<span>0</span>4</p>
        <h1>This page could not be found</h1>
        <p className="lead" style={{ marginInline: "auto" }}>The link may be outdated, or the page may have moved.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/services" className="btn btn-secondary">View services</Link>
        </div>
      </div>
    </section>
  );
}
