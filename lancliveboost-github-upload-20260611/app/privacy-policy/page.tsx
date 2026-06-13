import PageHero from "@/components/PageHero";
import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.privacy.title, path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title={pages.privacy.title} subtitle="How we handle and protect your information." />
      <section className="section-pad">
        <div className="container max-w-3xl grid gap-4 text-lg leading-relaxed text-muted">
          {pages.privacy.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
