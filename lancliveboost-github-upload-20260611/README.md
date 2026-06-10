# Pak Home Essentials Headless Store

Next.js + Vercel storefront for selling home appliances and daily essentials in Pakistan, with Shopify as the backend for products, inventory, cart, checkout, orders, payment, and shipping.

## What Is Included

- Next.js App Router project with TypeScript and Tailwind CSS
- Shopify Storefront API GraphQL client
- Product, collection, search, cart, checkout, and static policy pages
- WhatsApp buttons on product cards, product pages, cart, header, hero, and floating support
- Cash on Delivery, Bank Transfer, JazzCash, and Easypaisa guidance in copy and docs
- GA4 and Meta Pixel placeholders that only load when environment variables are set
- Shopify-compatible CSV with 30 sample Pakistan-market products
- Vercel deployment and Shopify setup documentation

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in your Shopify Storefront API credentials.
3. Install dependencies:

```bash
npm install
```

4. Start local development:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Required Environment Variables

Set these locally and in Vercel Project Settings > Environment Variables:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
NEXT_PUBLIC_SITE_NAME=Pak Home Essentials
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=923XXXXXXXXX
NEXT_PUBLIC_SUPPORT_EMAIL=support@example.com
NEXT_PUBLIC_SUPPORT_PHONE=+92XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

Do not commit real API tokens. Shopify domain, token, and WhatsApp number are read from environment variables, not hardcoded.

## Deploy To Vercel

Push this folder to GitHub, import the repo in Vercel, add the environment variables above, and deploy. You can test on the generated `vercel.app` domain before buying or connecting a custom domain.

## Shopify Notes

Use `products/shopify-products.csv` to import starter products into Shopify. Create collections matching the handles used by the frontend, such as `kitchen-appliances`, `home-cleaning`, `personal-care`, `daily-use-products`, and `storage-organization`.

Read the files in `docs/` before launch.
