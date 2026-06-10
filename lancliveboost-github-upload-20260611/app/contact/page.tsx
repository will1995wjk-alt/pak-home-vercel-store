import WhatsAppButton from "@/components/WhatsAppButton";
import { pages, supportHours } from "@/data/policies";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: pages.contact.title, path: "/contact" });

export default function ContactPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-black">Contact Us</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form className="card grid gap-4 p-5" action={`mailto:${siteConfig.supportEmail}`} method="post">
          <input className="field" name="name" placeholder="Your name" />
          <input className="field" name="email" placeholder="Email or phone" />
          <textarea className="min-h-32 rounded-lg border border-line p-3" name="message" placeholder="How can we help?" />
          <button className="button button-primary" type="submit">
            Send message
          </button>
        </form>
        <div className="card grid content-start gap-4 p-5">
          <p className="text-muted">Support hours: {supportHours}</p>
          <p>Phone: {siteConfig.supportPhone}</p>
          <p>Email: {siteConfig.supportEmail}</p>
          <WhatsAppButton label="Chat on WhatsApp" />
          <div className="flex flex-wrap gap-3 text-sm font-bold">
            {siteConfig.facebookUrl ? <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a> : null}
            {siteConfig.instagramUrl ? <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a> : null}
            {siteConfig.tiktokUrl ? <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer">TikTok</a> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
