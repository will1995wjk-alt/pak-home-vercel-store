import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatMoney, getCompareAtPrice, getDiscountPercent, getProductPrice, isDiscounted } from "@/lib/shopify/utils";
import BuyNowButton from "./BuyNowButton";
import WhatsAppButton from "./WhatsAppButton";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const image = product.featuredImage || product.images[0];
  const price = getProductPrice(product);
  const compareAt = getCompareAtPrice(product);
  const discounted = isDiscounted(product);

  return (
    <article className="card group flex flex-col overflow-hidden shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.handle}`} className="relative block bg-paper">
        {discounted ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-xs font-black text-white">
            {getDiscountPercent(product)}% OFF
          </span>
        ) : null}
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            width={700}
            height={700}
            className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid aspect-square place-items-center bg-paper text-sm text-muted">No image</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h3 className="line-clamp-2 min-h-[2.75rem] font-bold leading-snug">
            <Link href={`/products/${product.handle}`} className="hover:text-brand">
              {product.title}
            </Link>
          </h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <strong className="text-lg text-ink">{formatMoney(price)}</strong>
            {compareAt ? <span className="text-sm text-muted line-through">{formatMoney(compareAt)}</span> : null}
          </div>
        </div>
        <div className="grid gap-2">
          <BuyNowButton product={{ title: product.title, handle: product.handle, price, variantId: product.variants[0]?.id, shopifyProductUrl: product.shopifyProductUrl }} />
          <WhatsAppButton product={{ title: product.title, handle: product.handle, price }} />
        </div>
      </div>
    </article>
  );
}
