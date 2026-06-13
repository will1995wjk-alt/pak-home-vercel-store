import PageHero from "@/components/PageHero";
import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.returns.title, path: "/return-policy" });

export default function ReturnPolicyPage() {
  return (
    <>
      <PageHero title={pages.returns.title} subtitle="Easy support for damaged or wrong items within a limited time." />
      <section className="section-pad">
        <div className="container max-w-3xl grid gap-4 text-lg leading-relaxed text-muted">
          {pages.returns.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
