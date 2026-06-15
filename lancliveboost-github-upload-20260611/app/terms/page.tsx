import PageHero from "@/components/PageHero";
import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.terms.title, path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHero title={pages.terms.title} subtitle="The terms that apply when you shop with us." />
      <section className="section-pad">
        <div className="container max-w-3xl grid gap-4 text-lg leading-relaxed text-muted">
          {pages.terms.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
