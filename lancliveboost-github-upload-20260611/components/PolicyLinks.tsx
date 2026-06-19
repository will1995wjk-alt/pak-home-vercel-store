import Link from "next/link";
import { policyLinks, trustBadges } from "@/data/homepage";
import { ArrowIcon } from "./Icons";

export default function PolicyLinks() {
  return (
    <section className="bg-white py-14">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Helpful information</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Policies &amp; Support</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustBadges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col rounded-xl border border-line p-5 transition hover:border-brand hover:shadow-card"
            >
              <h3 className="font-black">{badge.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{badge.text}</p>
            </div>
          ))}
          {policyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col rounded-xl border border-line p-5 transition hover:border-brand hover:shadow-card"
            >
              <h3 className="font-black">{link.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{link.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand">
                Learn more
                <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
