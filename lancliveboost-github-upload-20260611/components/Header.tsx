"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import SearchBar from "./SearchBar";
import WhatsAppButton from "./WhatsAppButton";
import { CartIcon, CloseIcon, MenuIcon } from "./Icons";

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
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container flex min-h-16 items-center gap-4 py-2">
        <Link href="/" className="flex items-center gap-2 text-lg font-black">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white">PH</span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <div className="ml-auto hidden max-w-md flex-1 md:block">
          <SearchBar />
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} className="rounded-lg px-3 py-2 font-bold text-ink hover:bg-paper hover:text-brand" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-secondary gap-2" href="/cart" aria-label="Cart">
          <CartIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
        </Link>

        <div className="hidden sm:block">
          <WhatsAppButton label="WhatsApp" />
        </div>

        <button
          className="button button-secondary px-3 lg:hidden"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <div className="container pb-3 md:hidden">
        <SearchBar />
      </div>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container grid gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                className="rounded-lg px-3 py-2.5 font-bold hover:bg-paper hover:text-brand"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2">
              <WhatsAppButton label="Order on WhatsApp" className="button button-whatsapp w-full" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
