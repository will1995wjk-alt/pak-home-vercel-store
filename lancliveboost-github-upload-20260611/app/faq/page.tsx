import PageHero from "@/components/PageHero";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { faqs } from "@/data/faq";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "FAQ", path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ordering, delivery, payment, and returns."
      />
      <section className="section-pad">
        <div className="container max-w-3xl grid gap-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="card p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-black">
                {faq.question}
                <span className="text-brand transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <WhatsAppCTA />
    </>
  );
}
