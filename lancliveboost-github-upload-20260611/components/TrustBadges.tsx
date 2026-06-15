import { trustBadges } from "@/data/homepage";
import { trustIconMap } from "./Icons";

export default function TrustBadges() {
  return (
    <section className="bg-white py-12">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Why shop with us</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Trusted by Homes Across Pakistan</h2>
          <p className="mt-3 text-pretty text-muted">
            We make online shopping safe and simple, so you can order with full confidence.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {trustBadges.map((badge) => {
            const Icon = trustIconMap[badge.icon as keyof typeof trustIconMap];
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center rounded-xl border border-line bg-paper p-5 text-center transition hover:border-brand hover:shadow-card"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
                  {Icon ? <Icon className="h-7 w-7" /> : null}
                </span>
                <h3 className="mt-4 text-sm font-black">{badge.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{badge.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
