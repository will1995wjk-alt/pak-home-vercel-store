"use client";

import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify/utils";
import AddToCartButton from "./AddToCartButton";
import StarRating from "./StarRating";
import WhatsAppButton from "./WhatsAppButton";

type ReviewSummary = { count: number; average: number };

export default function ProductInfo({ product, reviewSummary }: { product: Product; reviewSummary?: ReviewSummary }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const variant = useMemo<ProductVariant | undefined>(() => product.variants.find((item) => item.id === variantId), [product.variants, variantId]);

  return (
    <div className="grid content-start gap-5">
      <div>
        <h1 className="text-4xl font-black">{product.title}</h1>
        {reviewSummary && reviewSummary.count > 0 ? (
          <a href="#reviews" className="mt-2 inline-flex items-center gap-2 text-sm">
            <StarRating value={reviewSummary.average} size={16} />
            <span className="font-bold">{reviewSummary.average.toFixed(1)}</span>
            <span className="text-muted underline-offset-2 hover:underline">
              ({reviewSummary.count} review{reviewSummary.count > 1 ? "s" : ""})
            </span>
          </a>
        ) : null}
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
        <p>{variant?.availableForSale ? "In stock" : "Out of stock"}</p>
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
        <AddToCartButton merchandiseId={variantId} quantity={quantity} disabled={!variant?.availableForSale} />
        <a className="button button-primary" href="/cart">
          Checkout
        </a>
        <WhatsAppButton product={{ title: product.title, handle: product.handle, price: variant?.price || product.priceRange.minVariantPrice }} />
      </div>

      <div className="grid gap-3">
        <div className="card p-4">Cash on Delivery available across Pakistan.</div>
        <div className="card p-4">Fast delivery in major cities and nationwide shipping.</div>
        <div className="card p-4">Easy return for damaged or wrong items after delivery.</div>
      </div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
    </div>
  );
}
