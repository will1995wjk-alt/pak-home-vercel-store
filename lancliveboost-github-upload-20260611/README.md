# Pak Home Essentials Storefront

Next.js + Vercel storefront for selling home appliances and daily essentials in Pakistan.

Current operating mode: the storefront displays local catalog products and sends shoppers to the matching Shopify product page or WhatsApp for checkout. This works without Shopify Storefront API access. The Storefront API client is still kept in the codebase so the site can be switched back to full Headless mode later.

## What Is Included

- Next.js App Router project with TypeScript and Tailwind CSS
- Optional Shopify Storefront API GraphQL client for future Headless mode
- Product, collection, search, Shopify product-page checkout links, and static policy pages
- WhatsApp buttons on product cards, product pages, cart, header, hero, and floating support
- Cash on Delivery, Bank Transfer, JazzCash, and Easypaisa guidance in copy and docs
- GA4 and Meta Pixel placeholders that only load when environment variables are set
- Shopify-compatible CSV with 30 sample Pakistan-market products
- Vercel deployment and Shopify setup documentation

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in your public site settings, WhatsApp number, and optional Shopify store URL.
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
NEXT_PUBLIC_SITE_NAME=Pak Home Essentials
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=923XXXXXXXXX
NEXT_PUBLIC_SHOPIFY_STORE_URL=https://your-store.myshopify.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@example.com
NEXT_PUBLIC_SUPPORT_PHONE=+92XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

No Shopify Storefront API token is required in the temporary operating mode. `NEXT_PUBLIC_SHOPIFY_STORE_URL` is used to build product-page checkout links from local product handles.

## Deploy To Vercel

Push this folder to GitHub, import the repo in Vercel, add the environment variables above, and deploy. You can test on the generated `vercel.app` domain before buying or connecting a custom domain.

## Shopify Notes

Use `products/shopify-products.csv` to import starter products into Shopify. Keep Shopify product handles aligned with local product handles so product buttons can open matching Shopify product pages.

Read the files in `docs/` before launch.
