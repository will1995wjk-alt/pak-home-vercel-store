"use client";

import { useState } from "react";
import type { Money } from "@/lib/shopify/types";
import { CartIcon } from "./Icons";

type Props = {
  label?: string;
  product: {
    title: string;
    handle: string;
    price?: Money;
    variantId?: string;
    shopifyProductUrl?: string;
  };
  className?: string;
  checkout?: boolean;
  quantity?: number;
};

const CART_STORAGE_KEY = "pak-family-pro-cart-id";

export default function BuyNowButton({ label = "Add to Cart", product, className = "button button-secondary", checkout = false, quantity = 1 }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "added" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleClick() {
    if (!product.variantId || product.variantId.startsWith("fallback-")) {
      if (product.shopifyProductUrl) {
        window.open(product.shopifyProductUrl, "_blank", "noopener,noreferrer");
        return;
      }
      setStatus("error");
      setMessage("Shopify checkout is temporarily unavailable. Please order on WhatsApp.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          merchandiseId: product.variantId,
          quantity
        })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to add product.");

      window.localStorage.setItem(CART_STORAGE_KEY, payload.cartId);
      setStatus("added");

      if (checkout && payload.cart?.checkoutUrl) {
        window.location.href = payload.cart.checkoutUrl;
        return;
      }

      setMessage("Added to cart.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Shopify checkout is temporarily unavailable. Please order on WhatsApp.");
    }
  }

  return (
    <div className="grid gap-1">
      <button className={className} type="button" onClick={handleClick} disabled={status === "loading"}>
        <CartIcon className="h-5 w-5" />
        {status === "loading" ? "Adding..." : label}
      </button>
      {message ? (
        <span className={`text-xs ${status === "error" ? "text-red-700" : "text-muted"}`} role="status">
          {message}
        </span>
      ) : null}
    </div>
  );
}
