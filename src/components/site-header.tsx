"use client";

import { LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteBrand } from "@/lib/site-content";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${siteBrand.name}, home`}>
        <span>STUDIO</span>
        <strong>MALASKO</strong>
      </Link>
      <div className="header-actions">
        <nav className={menuOpen ? "is-open" : undefined} aria-label="Main navigation">
          <Link href="/work" onClick={() => setMenuOpen(false)}>Our work</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Say hello</Link>
        </nav>
        <Link className="admin-entry" href="/admin/login" aria-label="Admin sign in" title="Admin sign in">
          <LogIn aria-hidden="true" />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Menu aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
