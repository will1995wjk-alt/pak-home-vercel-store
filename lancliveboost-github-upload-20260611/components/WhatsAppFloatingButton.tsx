import { siteConfig } from "@/lib/config";
import { cleanPhoneNumber } from "@/lib/shopify/utils";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloatingButton() {
  const phone = cleanPhoneNumber(siteConfig.whatsappNumber);
  if (!phone) return null;

  const message = encodeURIComponent("Hi, I need help with my order.");

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
