import type { Money, Product } from "./types";

export function formatMoney(money?: Money | null) {
  if (!money) return "";
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: money.currencyCode || "PKR",
    maximumFractionDigits: 0
  }).format(Number(money.amount));
}

export function getProductPrice(product: Product) {
  return product.priceRange.minVariantPrice;
}

export function getCompareAtPrice(product: Product) {
  const amount = Number(product.compareAtPriceRange.minVariantPrice.amount);
  return amount > 0 ? product.compareAtPriceRange.minVariantPrice : null;
}

export function isDiscounted(product: Product) {
  const price = Number(product.priceRange.minVariantPrice.amount);
  const compareAt = Number(product.compareAtPriceRange.minVariantPrice.amount);
  return compareAt > price;
}

export function getDiscountPercent(product: Product) {
  const price = Number(product.priceRange.minVariantPrice.amount);
  const compareAt = Number(product.compareAtPriceRange.minVariantPrice.amount);
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function cleanPhoneNumber(phone: string) {
  return phone.replace(/[^\d]/g, "");
}
