# Setup Guide

## Local development

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Add your public site settings, WhatsApp number, and optional Shopify store URL.
4. Run:

```bash
npm install
npm run dev
```

5. Open `http://localhost:3000`.

## Temporary Shopify product-page checkout mode

This mode does not need a Storefront API token. The storefront uses local catalog products and sends shoppers to Shopify product pages or WhatsApp.

Set this optional public value when your Shopify product handles match the local product handles:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_URL=https://your-store.myshopify.com
```

The storefront builds product URLs like:

```text
https://your-store.myshopify.com/products/electric-kettle
```

If this value is empty, Buy Now and Checkout buttons fall back to WhatsApp.

Shopify still needs:

1. Products with active status.
2. Product images.
3. Inventory and prices.
4. Product handles matching the local catalog where possible.
5. Shopify checkout enabled on product pages.
6. Manual payments and shipping rates configured in Shopify.

## Useful checks

1. Open homepage and confirm products load.
2. Open a product page.
3. Click Buy Now or Checkout and confirm it opens Shopify product page or WhatsApp.
4. Open cart and confirm it explains Shopify product-page checkout.
5. Test WhatsApp buttons.
6. Test mobile layout.
