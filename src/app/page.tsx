import Link from "next/link";
import { HeroBackground } from "@/components/hero-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/lib/site-content";

export default function Home() {
  return (
    <div className="public-site">
      <main>
        <section className="reference-hero">
          <HeroBackground src={siteContent.hero.videoUrl} poster={siteContent.hero.poster} />
          <SiteHeader />
          <div className="reference-hero-copy">
            <p>{siteContent.hero.tagline}</p>
            <h1>{siteContent.hero.title}</h1>
            <Link className="outline-cta" href="/contact">{siteContent.hero.button}</Link>
          </div>
        </section>

        <section className="studio-story texture-band">
          <h2>{siteContent.about.title}</h2>
          <p>{siteContent.about.text}</p>
          <Link className="outline-cta" href="/work">{siteContent.about.button}</Link>
        </section>

        <section className="studio-statements texture-band">
          <h2>{siteContent.statements.title}</h2>
          <div className="statement-columns">
            {siteContent.statements.items.map((item) => (
              <figure key={item.attribution}>
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>{item.text}</blockquote>
                <figcaption>{item.attribution}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="studio-capabilities texture-band">
          <h2>{siteContent.capabilities.title}</h2>
          <div className="capability-wordmarks">
            {siteContent.capabilities.items.map((item) => <span key={item}>{item}</span>)}
          </div>
          <Link className="outline-cta" href="/contact">{siteContent.hero.button}</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
