import { faqs } from "@/data/faq";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "FAQ", path: "/faq" });

export default function FaqPage() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-4xl font-black">FAQ</h1>
      <div className="mt-8 grid gap-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="card p-5">
            <summary className="cursor-pointer font-black">{faq.question}</summary>
            <p className="mt-3 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
