import { ArrowUpRight, Camera } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { siteBrand } from "@/lib/site-content";

export const metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <main className="contact-page public-site">
      <SiteHeader />
      <div className="contact-grid">
        <section className="contact-intro">
          <p className="eyebrow">New project / Collaboration / Say hello</p>
          <h1>Your footage.<br /><em>Our next cut.</em></h1>
          <p>Tell us a little about your project, timeline and format. We will get back to you within one business day.</p>
        </section>
        <form className="contact-form" action={`mailto:${siteBrand.email}`} method="post" encType="text/plain">
          <label>Full name<input name="name" required placeholder="Your name" /></label>
          <label>Email<input type="email" name="email" required placeholder="you@company.com" /></label>
          <label>About your project<textarea name="message" required rows={4} placeholder="Tell us what you have in mind..." /></label>
          <button type="submit">Send inquiry <ArrowUpRight aria-hidden="true" /></button>
        </form>
      </div>
      <div className="contact-meta">
        <a href={`mailto:${siteBrand.email}`}>{siteBrand.email}</a>
        <a href="#"><Camera aria-hidden="true" /> Instagram</a>
        <span>Belgrade · Serbia</span>
      </div>
    </main>
  );
}