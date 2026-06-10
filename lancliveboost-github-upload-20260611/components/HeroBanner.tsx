import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";

export default function HeroBanner() {
  return (
    <section className="relative grid min-h-[620px] items-end overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,21,17,.88),rgba(12,21,17,.46),rgba(12,21,17,.12)),url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=84')] bg-cover bg-center" />
      <div className="container relative py-20">
        <p className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold">COD available across Pakistan</p>
        <h1 className="max-w-3xl text-5xl font-black leading-none md:text-7xl">Affordable Home Appliances & Daily Essentials in Pakistan</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">
          Quality checked products, fast delivery, and easy Cash on Delivery service across Pakistan.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link className="button button-primary bg-white text-ink" href="/collections">
            Shop Now
          </Link>
          <WhatsAppButton label="Order on WhatsApp" className="button border border-white/30 bg-white/10 text-white" />
        </div>
      </div>
    </section>
  );
}
