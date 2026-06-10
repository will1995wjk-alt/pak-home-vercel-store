import Image from "next/image";
import type { Product } from "@/lib/shopify/types";

export default function ProductGallery({ product }: { product: Product }) {
  const images = product.images.length ? product.images : product.featuredImage ? [product.featuredImage] : [];

  if (!images.length) {
    return <div className="grid aspect-square place-items-center rounded-lg bg-white text-muted">No image available</div>;
  }

  return (
    <div className="grid gap-3">
      {images.map((image) => (
        <Image key={image.url} src={image.url} alt={image.altText || product.title} width={1000} height={1000} className="rounded-lg bg-white object-cover" />
      ))}
    </div>
  );
}
