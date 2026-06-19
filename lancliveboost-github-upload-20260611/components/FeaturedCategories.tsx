import Link from "next/link";
import { categories } from "@/data/homepage";
import { ArrowIcon } from "./Icons";

export default function FeaturedCategories() {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Browse our range</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Shop by Category</h2>
          </div>
          <Link href="/collections" className="inline-flex items-center gap-2 font-bold text-brand hover:text-brand-dark">
            View all collections
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.handle}
              href={`/collections/${category.handle}`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-1 hover:bg-brand-dark hover:shadow-soft md:text-base"
            >
              {category.title}
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
