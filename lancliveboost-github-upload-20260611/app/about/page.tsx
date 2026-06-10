import { pages } from "@/data/policies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.about.title, path: "/about" });

export default function AboutPage() {
  return <PolicyPage title={pages.about.title} body={pages.about.body} />;
}

function PolicyPage({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-4xl font-black">{title}</h1>
      <div className="mt-6 grid gap-4 text-lg leading-8 text-muted">{body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </div>
  );
}
