import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const links = [
    ["/delivery-policy", "Delivery Policy"],
    ["/return-policy", "Return & Warranty"],
    ["/privacy-policy", "Privacy Policy"],
    ["/terms", "Terms"],
    ["/faq", "FAQ"]
  ];

  return (
    <footer className="mt-12 border-t border-line bg-white">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="text-xl font-black">{siteConfig.name}</h2>
          <p className="mt-3 max-w-md text-muted">
            Affordable home appliances and daily essentials in Pakistan with COD, WhatsApp support, and quality checked products.
          </p>
        </div>
        <div>
          <h3 className="font-black">Support</h3>
          <p className="mt-3 text-muted">{siteConfig.supportPhone}</p>
          <p className="text-muted">{siteConfig.supportEmail}</p>
        </div>
        <div>
          <h3 className="font-black">Pages</h3>
          <div className="mt-3 grid gap-2">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="text-muted hover:text-ink">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
