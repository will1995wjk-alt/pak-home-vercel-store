import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.privacy.title, path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-4xl font-black">{pages.privacy.title}</h1>
      <div className="mt-6 grid gap-4 text-lg leading-8 text-muted">{pages.privacy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </div>
  );
}
