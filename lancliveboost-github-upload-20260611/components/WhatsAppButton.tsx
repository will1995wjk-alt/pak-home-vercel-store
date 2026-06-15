import { siteConfig } from "@/lib/config";
import { cleanPhoneNumber, formatMoney } from "@/lib/shopify/utils";
import type { Money } from "@/lib/shopify/types";
import { WhatsAppIcon } from "./Icons";

type Props = {
  label?: string;
  message?: string;
  product?: {
    title: string;
    handle: string;
    price?: Money;
  };
  className?: string;
  showIcon?: boolean;
};

export default function WhatsAppButton({
  label = "Order on WhatsApp",
  message,
  product,
  className = "button button-whatsapp",
  showIcon = true
}: Props) {
  const phone = cleanPhoneNumber(siteConfig.whatsappNumber);
  if (!phone) return null;

  const productMessage = product
    ? `Hi, I want to order this product:\nProduct: ${product.title}\nPrice: ${formatMoney(product.price)}\nLink: ${siteConfig.url}/products/${product.handle}`
    : message || "Hi, I need help with my order.";

  return (
    <a
      className={className}
      href={`https://wa.me/${phone}?text=${encodeURIComponent(productMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {showIcon ? <WhatsAppIcon className="h-5 w-5" /> : null}
      {label}
    </a>
  );
}
