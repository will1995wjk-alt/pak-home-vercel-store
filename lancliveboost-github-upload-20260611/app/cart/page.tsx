import CartView from "@/components/CartView";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Cart", description: "Review your cart and continue to Shopify checkout.", path: "/cart" });

export default function CartPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-black">Cart</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
