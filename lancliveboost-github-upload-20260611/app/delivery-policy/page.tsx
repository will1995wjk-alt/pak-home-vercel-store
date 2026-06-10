import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.delivery.title, path: "/delivery-policy" });

export default function DeliveryPolicyPage() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-4xl font-black">{pages.delivery.title}</h1>
      <div className="mt-6 grid gap-4 text-lg leading-8 text-muted">{pages.delivery.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </div>
  );
}
