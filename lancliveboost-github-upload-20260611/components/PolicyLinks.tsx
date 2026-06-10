import Link from "next/link";
import { policyLinks } from "@/data/homepage";

export default function PolicyLinks() {
  return (
    <section className="section-pad">
      <div className="container grid gap-4 md:grid-cols-4">
        {policyLinks.map((link) => (
          <Link key={link.href} href={link.href} className="card p-5 hover:shadow-soft">
            <h2 className="font-black">{link.title}</h2>
            <p className="mt-2 text-sm text-muted">{link.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
