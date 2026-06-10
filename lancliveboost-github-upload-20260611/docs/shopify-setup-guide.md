# Shopify Setup Guide

## Create Shopify store

1. Create or log in to your Shopify store.
2. You can use the default `myshopify.com` admin domain for backend management.
3. Add business settings, store currency, tax settings, and notification email.

## Create Storefront API token

1. Open Shopify Admin.
2. Go to Settings > Apps and sales channels.
3. Open Develop apps.
4. Create a custom app for the storefront.
5. Enable Storefront API access.
6. Grant permissions for products, collections, and cart/checkout.
7. Copy the Storefront access token.
8. Add it to `.env.local` and Vercel as `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

## Import product CSV

1. Open Products.
2. Click Import.
3. Upload `products/shopify-products.csv`.
4. Review imported products.
5. Replace placeholder image URLs with real product photos before launch.

## Create collections

Create collections with these titles and handles:

1. Kitchen Appliances: `kitchen-appliances`
2. Home Cleaning: `home-cleaning`
3. Personal Care: `personal-care`
4. Daily Use Products: `daily-use-products`
5. Storage & Organization: `storage-organization`

You can add products manually or use tags.

## Payments

Use Settings > Payments to add:

1. Cash on Delivery
2. Manual Bank Transfer
3. JazzCash manual payment instructions
4. Easypaisa manual payment instructions

## Shipping

Use Settings > Shipping and delivery:

1. Create a Pakistan shipping zone.
2. Add flat city or nationwide rates.
3. Add free shipping thresholds if needed.
4. Test checkout with Pakistan addresses.

## Orders

After checkout, orders appear in Shopify Admin > Orders. Confirm COD orders by phone or WhatsApp before dispatch.
