import Link from "next/link";
import { ArrowIcon, CartIcon, ShieldIcon, TruckIcon, WhatsAppIcon } from "./Icons";

const steps = [
  {
    icon: CartIcon,
    title: "Choose products",
    text: "Browse kitchen, cleaning, personal care, daily use, and storage products."
  },
  {
    icon: WhatsAppIcon,
    title: "Confirm on WhatsApp",
    text: "Ask questions, request bundles, or confirm Cash on Delivery before dispatch."
  },
  {
    icon: TruckIcon,
    title: "Receive at home",
    text: "Orders are packed carefully and shipped through trusted Pakistan couriers."
  }
];

export default function HomeBuyingGuide() {
  return (
    <section className="section-pad bg-white">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Built for Pakistan shoppers</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Simple shopping with COD, support, and clear policies.</h2>
            <p className="mt-4 max-w-2xl text-muted">
              Pak Home Essentials is designed for customers who want practical home products, quick
              answers, and payment options that feel familiar.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/collections" className="button button-primary">
                Browse collections
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link href="/faq" className="button button-secondary">
                Read FAQ
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="card grid gap-4 p-5 shadow-card sm:grid-cols-[auto_1fr]">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-brand">Step {index + 1}</span>
                      {index === 1 ? (
                        <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-black text-accent">Recommended</span>
                      ) : null}
                    </div>
                    <h3 className="mt-1 text-lg font-black">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{step.text}</p>
                  </div>
                </article>
              );
            })}

            <div className="flex items-start gap-3 rounded-xl bg-[#f4fbf7] p-5 text-sm text-muted">
              <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p>
                Damaged or wrong item support is handled through the return policy. Keep parcel
                photos and order details ready for faster help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
