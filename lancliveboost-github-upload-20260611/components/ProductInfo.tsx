"use client";

import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify/utils";
import AddToCartButton from "./AddToCartButton";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductInfo({ product, isFallback = false }: { product: Product; isFallback?: boolean }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const variant = useMemo<ProductVariant | undefined>(() => product.variants.find((item) => item.id === variantId), [product.variants, variantId]);
  const hasShopifyVariant = Boolean(variant?.id?.startsWith("gid://shopify/"));
  const unavailableReason = !hasShopifyVariant
    ? "Shopify checkout is not connected yet."
    : !variant?.availableForSale
      ? "This product is out of stock."
      : "";

  return (
    <div className="grid content-start gap-5">
      <div>
        <h1 className="text-4xl font-black">{product.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <strong className="text-2xl">{formatMoney(variant?.price || product.priceRange.minVariantPrice)}</strong>
          {variant?.compareAtPrice ? <span className="text-muted line-through">{formatMoney(variant.compareAtPrice)}</span> : null}
          {variant?.compareAtPrice && Number(variant.compareAtPrice.amount) > Number(variant.price.amount) ? (
            <span className="rounded bg-accent px-2 py-1 text-xs font-black text-white">Discount available</span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2 text-sm text-muted">
        {variant?.sku ? <p>SKU: {variant.sku}</p> : null}
        <p>{isFallback ? "Demo product - order by WhatsApp" : variant?.availableForSale ? "In stock" : "Out of stock"}</p>
      </div>

      {product.variants.length > 1 ? (
        <label className="grid gap-2">
          <span className="font-black">Variant</span>
          <select className="field" value={variantId} onChange={(event) => setVariantId(event.target.value)}>
            {product.variants.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="grid gap-2">
        <span className="font-black">Quantity</span>
        <input className="field w-28" type="number" min="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))} />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <AddToCartButton merchandiseId={variantId} quantity={quantity} unavailableReason={unavailableReason} />
        <a className="button button-primary" href="/cart">
          Checkout
        </a>
        <WhatsAppButton product={{ title: product.title, handle: product.handle, price: variant?.price || product.priceRange.minVariantPrice }} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <strong className="block text-ink">Cash on Delivery</strong>
          <span className="mt-1 block text-sm text-muted">Pay after the parcel reaches your door.</span>
        </div>
        <div className="card p-4">
          <strong className="block text-ink">Fast Dispatch</strong>
          <span className="mt-1 block text-sm text-muted">Major city orders are packed quickly after confirmation.</span>
        </div>
        <div className="card p-4">
          <strong className="block text-ink">WhatsApp Support</strong>
          <span className="mt-1 block text-sm text-muted">Ask for product details, bundles, or bulk pricing.</span>
        </div>
      </div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
    </div>
  );
}
