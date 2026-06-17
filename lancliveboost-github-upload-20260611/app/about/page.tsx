import PageHero from "@/components/PageHero";
import TrustBadges from "@/components/TrustBadges";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.about.title, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Pak Family Pro"
        subtitle="A Pakistan-based online store making everyday home shopping simple, affordable, and trustworthy."
      />
      <section className="section-pad">
        <div className="container max-w-3xl">
          <div className="grid gap-4 text-lg leading-relaxed text-muted">
            {pages.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <TrustBadges />
      <WhatsAppCTA />
    </>
  );
}
