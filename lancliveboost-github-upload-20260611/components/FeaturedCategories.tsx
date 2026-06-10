import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/homepage";

export default function FeaturedCategories() {
  return (
    <section className="section-pad">
      <div className="container">
        <h2 className="text-3xl font-black">Shop by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.handle} href={`/collections/${category.handle}`} className="card overflow-hidden hover:shadow-soft">
              <Image src={category.image} alt={category.title} width={700} height={520} className="aspect-[4/3] object-cover" />
              <div className="p-3 font-black">{category.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
