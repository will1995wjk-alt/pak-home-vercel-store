export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width?: number | null;
  height?: number | null;
};

export type ProductOption = {
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  sku?: string | null;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: Money;
  compareAtPrice?: Money | null;
  selectedOptions: { name: string; value: string }[];
  image?: ShopifyImage | null;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  availableForSale: boolean;
  totalInventory?: number | null;
  tags: string[];
  featuredImage?: ShopifyImage | null;
  images: ShopifyImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  compareAtPriceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  seo?: { title?: string | null; description?: string | null };
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage | null;
  products?: Product[];
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: ProductVariant & { product: Pick<Product, "handle" | "title" | "featuredImage"> };
  cost: { totalAmount: Money };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: { subtotalAmount: Money; totalAmount: Money };
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor?: string | null;
};
