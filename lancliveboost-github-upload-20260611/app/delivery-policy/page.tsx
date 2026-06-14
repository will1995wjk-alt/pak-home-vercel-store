import PageHero from "@/components/PageHero";
import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.delivery.title, path: "/delivery-policy" });

export default function DeliveryPolicyPage() {
  return (
    <>
      <PageHero title={pages.delivery.title} subtitle="How and when your order reaches you across Pakistan." />
      <section className="section-pad">
        <div className="container max-w-3xl grid gap-4 text-lg leading-relaxed text-muted">
          {pages.delivery.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
