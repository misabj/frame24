import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-meta">
        <div className="footer-contact">
          <Link className="brand" href="/" aria-label="FRAME 24, home"><span>FRAME</span><strong>/24</strong></Link>
          <a href="mailto:studio@frame24.rs">email: studio@frame24.rs</a>
          <p>Belgrade · Working worldwide</p>
        </div>
        <nav aria-label="Footer navigation"><Link href="/work">OUR WORK</Link><Link href="/contact">CONTACT</Link></nav>
      </div>
      <p className="footer-credit">© {new Date().getFullYear()} FRAME/24</p>
    </footer>
  );
}
