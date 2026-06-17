"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Cart } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify/utils";
import WhatsAppButton from "./WhatsAppButton";

const CART_STORAGE_KEY = "pak-family-pro-cart-id";

export default function CartView() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadCart() {
    const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!cartId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/cart/get?cartId=${encodeURIComponent(cartId)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to load cart.");
      setCart(payload.cart);
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Shopify checkout is temporarily unavailable. Please order on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function updateLine(lineId: string, quantity: number) {
    const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!cartId) return;

    const response = await fetch("/api/cart/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId, lineId, quantity })
    });
    const payload = await response.json();
    if (response.ok) setCart(payload.cart);
    else setMessage(payload.error || "Unable to update cart.");
  }

  async function removeLine(lineId: string) {
    const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!cartId) return;

    const response = await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId, lineId })
    });
    const payload = await response.json();
    if (response.ok) setCart(payload.cart);
    else setMessage(payload.error || "Unable to remove item.");
  }

  if (loading) {
    return <div className="card p-8 text-muted">Loading your cart...</div>;
  }

  if (!cart?.lines?.length) {
    return (
      <div className="card grid gap-5 p-8">
        <div>
          <h2 className="text-2xl font-black">Your cart is empty.</h2>
          <p className="mt-2 max-w-2xl text-muted">Add a Shopify product to cart, then return here to review quantities and continue to Shopify checkout.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="button button-primary" href="/collections">
            Browse products
          </Link>
          <WhatsAppButton label="Order on WhatsApp" message="Hi, I want to place an order. Please guide me." />
        </div>
        {message ? <p className="text-sm text-red-700">{message}</p> : null}
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        {cart.lines.map((line) => {
          const image = line.merchandise.image || line.merchandise.product.featuredImage;
          return (
            <div key={line.id} className="card grid gap-4 p-4 md:grid-cols-[96px_1fr_auto] md:items-center">
              {image ? <Image src={image.url} alt={image.altText || line.merchandise.product.title} width={120} height={120} className="aspect-square rounded-lg object-cover" /> : null}
              <div>
                <Link href={`/products/${line.merchandise.product.handle}`} className="font-black hover:text-brand">
                  {line.merchandise.product.title}
                </Link>
                <p className="mt-1 text-sm text-muted">{line.merchandise.title}</p>
                <p className="mt-2 font-bold">{formatMoney(line.cost.totalAmount)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  className="field w-24"
                  type="number"
                  min="1"
                  value={line.quantity}
                  onChange={(event) => updateLine(line.id, Math.max(1, Number(event.target.value)))}
                />
                <button className="button button-secondary" type="button" onClick={() => removeLine(line.id)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="text-sm text-muted">Subtotal</p>
          <strong className="text-2xl">{formatMoney(cart.cost.subtotalAmount)}</strong>
        </div>
        <div className="flex flex-wrap gap-3">
          <a className="button button-primary" href={cart.checkoutUrl}>
            Checkout on Shopify
          </a>
          <WhatsAppButton label="Need help?" message="Hi, I need help with my cart before checkout." />
        </div>
      </div>
      {message ? <p className="text-sm text-red-700">{message}</p> : null}
    </div>
  );
}
