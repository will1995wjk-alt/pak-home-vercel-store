# Content Editing Guide

This is a code-based headless storefront. Product and collection data is edited in Shopify. Marketing copy and policy copy is edited in project files.

## Homepage copy

Edit:

1. `data/homepage.ts`
2. `components/HeroBanner.tsx`
3. `components/Footer.tsx`

## Policy pages

Edit:

1. `data/policies.ts`
2. `data/faq.ts`

These files control About, Contact, Delivery Policy, Return & Warranty Policy, Privacy Policy, Terms, and FAQ.

## Support details

Use environment variables:

1. `NEXT_PUBLIC_WHATSAPP_NUMBER`
2. `NEXT_PUBLIC_SUPPORT_PHONE`
3. `NEXT_PUBLIC_SUPPORT_EMAIL`
4. `NEXT_PUBLIC_FACEBOOK_URL`
5. `NEXT_PUBLIC_INSTAGRAM_URL`
6. `NEXT_PUBLIC_TIKTOK_URL`

Update these in `.env.local` for local development and in Vercel Project Settings for production.

## Categories

Edit `data/homepage.ts` if you want different default category tiles. Shopify collection handles must match the links used in the file.
