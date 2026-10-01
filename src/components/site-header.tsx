"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="FRAME 24, home">
        <span>FRAME</span>
        <strong>/24</strong>
      </Link>
      <nav className={menuOpen ? "is-open" : undefined} aria-label="Main navigation">
        <Link href="/work" onClick={() => setMenuOpen(false)}>Our work</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <Menu aria-hidden="true" />
      </button>
    </header>
  );
}
