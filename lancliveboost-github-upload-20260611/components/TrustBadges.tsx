import { trustBadges } from "@/data/homepage";

export default function TrustBadges() {
  return (
    <section className="bg-white py-8">
      <div className="container grid grid-cols-2 gap-3 md:grid-cols-5">
        {trustBadges.map((badge) => (
          <div key={badge.title} className="rounded-lg border border-line p-4">
            <div className="text-sm font-black">{badge.title}</div>
            <p className="mt-1 text-sm text-muted">{badge.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
