import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.terms.title, path: "/terms" });

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-4xl font-black">{pages.terms.title}</h1>
      <div className="mt-6 grid gap-4 text-lg leading-8 text-muted">{pages.terms.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </div>
  );
}
