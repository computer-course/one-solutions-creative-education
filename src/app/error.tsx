"use client";
import Link from "next/link";

/** Shown if a page fails to render, so visitors never see a blank screen. */
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="notfound">
      <div>
        <p className="eyebrow">Something went wrong</p>
        <h1>This page could not be displayed</h1>
        <p className="lead" style={{ marginInline: "auto" }}>Please try again. If the problem continues, return to the homepage.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <button type="button" className="btn btn-primary" onClick={() => reset()}>Try again</button>
          <Link href="/" className="btn btn-secondary">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
