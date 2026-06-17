# Pak Family Pro Storefront

Next.js + Vercel storefront for selling home appliances and daily essentials in Pakistan.

Current operating mode: Shopify Headless Storefront API is the primary product, collection, cart, checkout, and order flow. Shopify Admin is the source of truth for products, prices, inventory, images, collections, orders, payments, and shipping. If Shopify API access is unavailable, the site falls back to demo products and WhatsApp or temporary Shopify product-page links instead of crashing.

## What Is Included

- Next.js App Router project with TypeScript and Tailwind CSS
- Shopify Storefront API GraphQL client for live products, collections, search, cart, and checkout
- Product, collection, search, cart, checkout, temporary Shopify product-page fallback links, and static policy pages
- WhatsApp buttons on product cards, product pages, cart, header, hero, and floating support
- Cash on Delivery, Bank Transfer, JazzCash, and Easypaisa guidance in copy and docs
- GA4 and Meta Pixel placeholders that only load when environment variables are set
- Shopify-compatible CSV with 30 sample Pakistan-market products
- Vercel deployment and Shopify setup documentation

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in your public site settings, WhatsApp number, Shopify store domain, and Storefront API token.
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
SHOPIFY_STORE_DOMAIN=hjbcjw-h3.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-private-storefront-token
NEXT_PUBLIC_SITE_NAME=Pak Family Pro
NEXT_PUBLIC_SITE_URL=https://pakfamilypro.com
NEXT_PUBLIC_WHATSAPP_NUMBER=923199815828
NEXT_PUBLIC_SHOPIFY_STORE_URL=https://hjbcjw-h3.myshopify.com
NEXT_PUBLIC_SUPPORT_EMAIL=will1995wjk@gmial.com
NEXT_PUBLIC_SUPPORT_PHONE=92 3199815828
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

`SHOPIFY_STOREFRONT_ACCESS_TOKEN` is private. Add it only to `.env.local` for local development and Vercel Environment Variables for production. Never commit it to GitHub. `NEXT_PUBLIC_SHOPIFY_STORE_URL` is retained only as a fallback product-page link source, not as the main catalog data source.

## Deploy To Vercel

Push this folder to GitHub, import the repo in Vercel, add the environment variables above, and deploy. You can test on the generated `vercel.app` domain before buying or connecting a custom domain.

## Shopify Notes

Use Shopify Admin to create and maintain real products. Products must be Active, priced, stocked, imaged, added to collections, and published to a Storefront API-readable sales channel. The frontend revalidates Shopify product data every 60 seconds, so catalog updates should appear without code changes.

Read the files in `docs/` before launch.
