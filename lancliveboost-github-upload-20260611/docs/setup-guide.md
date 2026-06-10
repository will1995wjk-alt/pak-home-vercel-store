# Setup Guide

## Local development

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Add your Shopify Storefront API credentials and public site settings.
4. Run:

```bash
npm install
npm run dev
```

5. Open `http://localhost:3000`.

## Required Shopify data

The storefront needs:

1. Products with active status.
2. Product images.
3. Inventory and prices.
4. Collections for homepage and category pages.
5. Shopify checkout enabled.
6. Manual payments and shipping rates configured in Shopify.

## Useful checks

1. Open homepage and confirm products load.
2. Open a product page.
3. Add a product to cart.
4. Open cart and click Shopify checkout.
5. Test WhatsApp buttons.
6. Test mobile layout.
