"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import SearchBar from "./SearchBar";
import WhatsAppButton from "./WhatsAppButton";
import { CartIcon } from "./Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/survey", label: "Survey" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 text-ink shadow-card backdrop-blur">
      <div className="container flex min-h-16 items-center gap-3 py-2 sm:gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.name} home`}>
          <img
            src="/brand/pakfamilypro-logo.png"
            alt={siteConfig.name}
            className="h-9 w-auto max-w-[170px] object-contain sm:h-10 sm:max-w-[230px]"
          />
        </Link>

        <div className="ml-auto hidden max-w-md flex-1 md:block">
          <SearchBar />
        </div>

        <Link className="button button-primary gap-2" href="/cart" aria-label="Cart">
          <CartIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
        </Link>

        <WhatsAppButton label="WhatsApp" />
      </div>

      <div className="container pb-3 md:hidden">
        <SearchBar />
      </div>

      <nav className="border-t border-line bg-white">
        <div className="container flex items-center gap-1 overflow-x-auto py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold text-brand hover:bg-brand/10 hover:text-brand-dark"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
