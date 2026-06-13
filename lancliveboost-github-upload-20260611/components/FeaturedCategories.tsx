import Image from "next/image";
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
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.handle}
              href={`/collections/${category.handle}`}
              className="card group overflow-hidden shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="overflow-hidden bg-paper">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={700}
                  height={520}
                  className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-black leading-tight">{category.title}</h3>
                <p className="mt-1 text-sm text-muted">{category.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">
                  Shop now
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
