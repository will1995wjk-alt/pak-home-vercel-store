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
    <section className="bg-navy text-white">
      <div className="container grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold">
            <span className="h-2 w-2 rounded-full bg-brand" />
            COD available across Pakistan
          </p>
          <h1 className="mt-5 text-balance text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            Affordable Home Appliances &amp; Daily Essentials in Pakistan
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
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
              <div key={item.label} className="flex items-center gap-2 text-sm font-bold text-white/85">
                <item.icon className="h-5 w-5 text-brand" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <HeroSlideshow />
          <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl bg-white p-4 text-ink shadow-lift md:left-6 md:right-auto md:w-72">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand">Easy Returns</p>
              <p className="text-sm font-bold leading-tight">On damaged or wrong items</p>
            </div>
            <ShieldIcon className="h-9 w-9 text-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
