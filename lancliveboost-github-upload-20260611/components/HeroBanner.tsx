import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import HeroSlideshow from "./HeroSlideshow";
import { ArrowIcon, CodIcon, ShieldIcon, TruckIcon } from "./Icons";

const highlights = [
  { icon: CodIcon, label: "Cash on Delivery" },
  { icon: TruckIcon, label: "Fast Delivery" },
  { icon: ShieldIcon, label: "Quality Checked" }
];

export default function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-ink">
      <HeroSlideshow />
      <div className="container relative z-10 flex min-h-[620px] items-center py-14 lg:py-20">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/90 px-4 py-2 text-sm font-bold text-brand-dark shadow-card backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent" />
            COD available across Pakistan
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            Affordable Home Appliances &amp; Daily Essentials in Pakistan
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            Shop quality checked products with fast delivery, easy Cash on Delivery, and WhatsApp order support across
            Pakistan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="button button-primary" href="/collections">
              Shop Now
              <ArrowIcon className="h-5 w-5" />
            </Link>
            <WhatsAppButton label="Order on WhatsApp" />
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-sm font-bold text-ink shadow-card backdrop-blur">
                <item.icon className="h-5 w-5 text-brand" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
