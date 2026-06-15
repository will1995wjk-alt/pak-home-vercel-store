import WhatsAppButton from "./WhatsAppButton";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppCTA() {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="flex flex-col items-start gap-6 rounded-xl bg-brand p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div className="flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-white/15 sm:grid">
              <WhatsAppIcon className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Need help choosing a product?</h2>
              <p className="mt-2 max-w-xl text-pretty text-white/85">
                Chat with us on WhatsApp and our team will help you place your order.
              </p>
            </div>
          </div>
          <WhatsAppButton label="Chat on WhatsApp" className="button bg-white text-brand-dark shadow-lift" />
        </div>
      </div>
    </section>
  );
}
