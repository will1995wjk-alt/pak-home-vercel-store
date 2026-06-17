import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { supportHours } from "@/data/policies";
import { cleanPhoneNumber } from "@/lib/shopify/utils";
import { ClockIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  const quickLinks = [
    ["/collections", "Collections"],
    ["/about", "About Us"],
    ["/contact", "Contact"],
    ["/faq", "FAQ"]
  ];

  const policyLinks = [
    ["/delivery-policy", "Delivery Policy"],
    ["/return-policy", "Return & Warranty"],
    ["/privacy-policy", "Privacy Policy"],
    ["/terms", "Terms & Conditions"]
  ];

  const socials = [
    [siteConfig.facebookUrl, "Facebook"],
    [siteConfig.instagramUrl, "Instagram"],
    [siteConfig.tiktokUrl, "TikTok"]
  ].filter(([href]) => Boolean(href));

  const phone = cleanPhoneNumber(siteConfig.whatsappNumber);

  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex rounded-lg bg-white px-3 py-2">
            <img src="/brand/pakfamilypro-logo.png" alt={siteConfig.name} className="h-10 w-auto max-w-[230px] object-contain" />
          </div>
          <p className="mt-4 max-w-xs text-pretty leading-relaxed text-white/70">
            Affordable home appliances and daily essentials in Pakistan with Cash on Delivery, WhatsApp support, and
            quality checked products.
          </p>
          {socials.length ? (
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
              {socials.map(([href, label]) => (
                <a
                  key={label}
                  href={href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-white/85 hover:border-brand hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h3 className="font-black">Quick Links</h3>
          <div className="mt-4 grid gap-2.5">
            {quickLinks.map(([href, label]) => (
              <Link key={href} href={href} className="text-white/70 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black">Policies</h3>
          <div className="mt-4 grid gap-2.5">
            {policyLinks.map(([href, label]) => (
              <Link key={href} href={href} className="text-white/70 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-4 grid gap-3 text-white/70">
            {phone ? (
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5 text-brand" />
                {siteConfig.supportPhone}
              </a>
            ) : null}
            {siteConfig.supportPhone ? (
              <a href={`tel:${siteConfig.supportPhone}`} className="flex items-center gap-2 hover:text-white">
                <PhoneIcon className="h-5 w-5 text-brand" />
                {siteConfig.supportPhone}
              </a>
            ) : null}
            {siteConfig.supportEmail ? (
              <a href={`mailto:${siteConfig.supportEmail}`} className="flex items-center gap-2 hover:text-white">
                <MailIcon className="h-5 w-5 text-brand" />
                {siteConfig.supportEmail}
              </a>
            ) : null}
            <span className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-brand" />
              {supportHours}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
