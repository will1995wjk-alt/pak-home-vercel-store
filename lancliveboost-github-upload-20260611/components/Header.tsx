"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import SearchBar from "./SearchBar";
import WhatsAppButton from "./WhatsAppButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container flex min-h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-black">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white">PH</span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} className="rounded-lg px-3 py-2 font-bold hover:bg-white" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <SearchBar />
        <Link className="button button-secondary" href="/cart">
          Cart
        </Link>
        <div className="hidden sm:block">
          <WhatsAppButton label="WhatsApp" />
        </div>
        <button className="button button-secondary lg:hidden" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
          Menu
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container grid gap-2 py-4">
            {links.map((link) => (
              <Link key={link.href} className="rounded-lg px-3 py-2 font-bold hover:bg-paper" href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <WhatsAppButton label="Order on WhatsApp" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
