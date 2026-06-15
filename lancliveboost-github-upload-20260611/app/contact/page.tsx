import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/PageHero";
import { ClockIcon, MailIcon, PhoneIcon } from "@/components/Icons";
import { supportHours } from "@/data/policies";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Contact Us", path: "/contact" });

export default function ContactPage() {
  const hasSupportEmail = Boolean(siteConfig.supportEmail);
  const hasSupportPhone = Boolean(siteConfig.supportPhone);
  const socials = [
    [siteConfig.facebookUrl, "Facebook"],
    [siteConfig.instagramUrl, "Instagram"],
    [siteConfig.tiktokUrl, "TikTok"]
  ].filter(([href]) => Boolean(href));

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Questions about a product, delivery, Cash on Delivery, returns, or warranty? Our team is here to help."
      />
      <section className="section-pad">
        <div className="container grid gap-6 lg:grid-cols-2">
          <form
            className="card grid gap-4 p-6"
            action={hasSupportEmail ? `mailto:${siteConfig.supportEmail}` : undefined}
            method="post"
          >
            <h2 className="text-xl font-black">Send us a message</h2>
            <input className="field" name="name" placeholder="Your name" />
            <input className="field" name="email" placeholder="Email or phone" />
            <textarea
              className="min-h-32 rounded-xl border border-line p-3 outline-none focus:border-brand"
              name="message"
              placeholder="How can we help?"
            />
            <button className="button button-primary" type="submit" disabled={!hasSupportEmail}>
              {hasSupportEmail ? "Send message" : "Email support is being configured"}
            </button>
          </form>

          <div className="grid content-start gap-4">
            <div className="card grid gap-4 p-6">
              <h2 className="text-xl font-black">Reach us directly</h2>
              {hasSupportPhone ? (
                <a href={`tel:${siteConfig.supportPhone}`} className="flex items-center gap-3 hover:text-brand">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">Phone</span>
                    <span className="font-bold">{siteConfig.supportPhone}</span>
                  </span>
                </a>
              ) : null}
              {hasSupportEmail ? (
                <a href={`mailto:${siteConfig.supportEmail}`} className="flex items-center gap-3 hover:text-brand">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">Email</span>
                    <span className="font-bold">{siteConfig.supportEmail}</span>
                  </span>
                </a>
              ) : null}
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Support hours</span>
                  <span className="font-bold">{supportHours}</span>
                </span>
              </div>
              <WhatsAppButton label="Chat on WhatsApp" />
            </div>

            {socials.length ? (
              <div className="card grid gap-3 p-6">
                <h2 className="text-xl font-black">Follow us</h2>
                <div className="flex flex-wrap gap-3 text-sm font-bold">
                  {socials.map(([href, label]) => (
                    <a
                      key={label}
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-line px-4 py-2 hover:border-brand hover:text-brand"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
