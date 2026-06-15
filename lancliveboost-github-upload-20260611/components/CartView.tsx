"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { getCartAction, removeFromCartAction, updateCartAction } from "@/app/actions";
import type { Cart } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify/utils";
import WhatsAppButton from "./WhatsAppButton";

const CART_ID_KEY = "pak_home_cart_id";

export default function CartView() {
  const [cartId, setCartId] = useState("");
  const [cart, setCart] = useState<Cart | null>(null);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const storedCartId = window.localStorage.getItem(CART_ID_KEY) || "";
    setCartId(storedCartId);
    if (!storedCartId) return;
    startTransition(async () => {
      try {
        setCart(await getCartAction(storedCartId));
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load cart.");
      }
    });
  }, []);

  function refresh(nextCart: Cart | null) {
    setCart(nextCart);
  }

  if (pending && !cart) return <div className="card p-8 text-muted">Loading cart...</div>;
  if (error) return <div className="card p-8 text-muted">{error}</div>;
  if (!cartId || !cart || !cart.lines.length) {
    return (
      <div className="card grid gap-5 p-8">
        <div>
          <h2 className="text-2xl font-black">Your cart is empty.</h2>
          <p className="mt-2 max-w-xl text-muted">
            Browse products for your home, or message us on WhatsApp if you want help choosing a
            kitchen, cleaning, personal care, daily use, or storage item.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="button button-primary" href="/collections">
            Browse products
          </Link>
          <WhatsAppButton label="Ask for recommendations" message="Hi, I need help choosing home products. Please guide me." />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        {cart.lines.map((line) => {
          const image = line.merchandise.image || line.merchandise.product.featuredImage;
          return (
            <div key={line.id} className="card grid gap-4 p-4 sm:grid-cols-[110px_1fr_auto]">
              {image ? <Image src={image.url} alt={image.altText || line.merchandise.product.title} width={220} height={220} className="rounded-lg" /> : null}
              <div>
                <h2 className="font-black">{line.merchandise.product.title}</h2>
                <p className="text-sm text-muted">{line.merchandise.title}</p>
                <label className="mt-3 flex items-center gap-2">
                  <span className="font-bold">Qty</span>
                  <input
                    className="field w-24"
                    type="number"
                    min="0"
                    defaultValue={line.quantity}
                    onBlur={(event) =>
                      startTransition(async () => refresh(await updateCartAction(cartId, line.id, Math.max(0, Number(event.target.value)))))
                    }
                  />
                </label>
                <button className="mt-3 text-sm font-bold text-accent" type="button" onClick={() => startTransition(async () => refresh(await removeFromCartAction(cartId, line.id)))}>
                  Remove
                </button>
              </div>
              <strong>{formatMoney(line.cost.totalAmount)}</strong>
            </div>
          );
        })}
      </div>

      <div className="card grid gap-4 p-5 md:grid-cols-[1fr_auto]">
        <div className="grid gap-2 text-sm text-muted">
          <p>Cash on Delivery available across Pakistan.</p>
          <p>Shipping options and payment methods are confirmed in Shopify checkout.</p>
        </div>
        <div className="grid gap-3">
          <p className="text-xl font-black">Subtotal: {formatMoney(cart.cost.subtotalAmount)}</p>
          <a className="button button-primary" href={cart.checkoutUrl}>
            Checkout on Shopify
          </a>
          <WhatsAppButton label="Confirm order on WhatsApp" message="Hi, I want to confirm my order. Please guide me for Cash on Delivery." />
        </div>
      </div>
    </div>
  );
}
