# Temporary Shopify Product Page Mode

Use this mode while Shopify Storefront API access is unavailable.

## How it works

- The Vercel storefront does not call the Shopify Storefront API.
- Products, collections, and search results come from the local fallback catalog.
- Each product has a `shopifyProductUrl` field.
- Buy Now and Checkout buttons open the matching Shopify product page.
- If a product does not have a Shopify product URL, the buttons open WhatsApp instead.
- The `/cart` page remains available, but it explains that checkout is handled on the Shopify product page.

## Vercel environment variables

Add these public values:

```env
NEXT_PUBLIC_SITE_URL=https://pakfamilypro.com
NEXT_PUBLIC_SITE_NAME=Pak Family Pro
NEXT_PUBLIC_WHATSAPP_NUMBER=your-whatsapp-number
NEXT_PUBLIC_SHOPIFY_STORE_URL=https://your-store.myshopify.com
NEXT_PUBLIC_SUPPORT_EMAIL=your-support-email
NEXT_PUBLIC_SUPPORT_PHONE=your-support-phone
```

Leave these empty until Shopify Storefront API access is available:

```env
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
```

## Product URL rule

The local catalog builds product URLs with:

```text
NEXT_PUBLIC_SHOPIFY_STORE_URL + /products/ + local product handle
```

Example:

```text
https://your-store.myshopify.com/products/electric-kettle
```

Keep Shopify handles aligned with the local handles in `data/fallback-products.ts`.

## Switching back to Headless mode later

When your Shopify plan supports Storefront API:

1. Create a Storefront API token in Shopify.
2. Add `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` in Vercel.
3. Reconnect the page data source imports to `lib/shopify/client.ts`.
4. Redeploy Vercel.
