import { siteConfig } from "@/lib/config";
import type { Money } from "@/lib/shopify/types";
import { cleanPhoneNumber, formatMoney } from "@/lib/shopify/utils";
import { CartIcon, WhatsAppIcon } from "./Icons";

type Props = {
  label?: string;
  product: {
    title: string;
    handle: string;
    price?: Money;
    shopifyProductUrl?: string;
  };
  className?: string;
};

export default function BuyNowButton({ label = "Buy Now", product, className = "button button-secondary" }: Props) {
  if (product.shopifyProductUrl) {
    return (
      <a className={className} href={product.shopifyProductUrl} target="_blank" rel="noopener noreferrer">
        <CartIcon className="h-5 w-5" />
        {label}
      </a>
    );
  }

  const phone = cleanPhoneNumber(siteConfig.whatsappNumber);
  const message = `Hi, I want to order this product:\nProduct: ${product.title}\nPrice: ${formatMoney(product.price)}\nLink: ${siteConfig.url}/products/${product.handle}`;

  if (!phone) {
    return (
      <a className={className} href="/contact">
        <CartIcon className="h-5 w-5" />
        {label}
      </a>
    );
  }

  return (
    <a
      className={className}
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon className="h-5 w-5" />
      {label}
    </a>
  );
}
