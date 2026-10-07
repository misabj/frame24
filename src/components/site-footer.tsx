import Link from "next/link";
import { siteBrand } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-meta">
        <div className="footer-contact">
          <Link className="brand" href="/" aria-label={`${siteBrand.name}, home`}><span>STUDIO</span><strong>MALSKO</strong></Link>
          <a href={`mailto:${siteBrand.email}`}>email: {siteBrand.email}</a>
          <p>Belgrade · Working worldwide</p>
        </div>
        <nav aria-label="Footer navigation"><Link href="/work">OUR WORK</Link><Link href="/contact">CONTACT</Link></nav>
      </div>
      <p className="footer-credit">© {new Date().getFullYear()} {siteBrand.name}</p>
    </footer>
  );
}
