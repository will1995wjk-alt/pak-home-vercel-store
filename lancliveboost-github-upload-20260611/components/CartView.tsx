import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";

export default function CartView() {
  return (
    <div className="card grid gap-5 p-8">
      <div>
        <h2 className="text-2xl font-black">Checkout is handled on Shopify product page.</h2>
        <p className="mt-2 max-w-2xl text-muted">
          During the temporary operating mode, this storefront shows the product catalog and sends
          customers to the matching Shopify product page to complete checkout. If a Shopify product
          link is not available yet, customers can order through WhatsApp.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link className="button button-primary" href="/collections">
          Browse products
        </Link>
        <WhatsAppButton label="Order on WhatsApp" message="Hi, I want to place an order. Please guide me." />
      </div>
    </div>
  );
}
