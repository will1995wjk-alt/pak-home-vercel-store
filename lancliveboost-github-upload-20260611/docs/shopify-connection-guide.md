# Shopify Connection Guide

This guide explains how to connect the Vercel / Next.js storefront to Shopify Headless so Shopify becomes the source of truth for products, collections, cart, checkout, orders, payments, and shipping.

The current storefront primary mode is Shopify Headless Storefront API. Temporary Shopify product-page links are retained only as a fallback when the Storefront API or checkout is unavailable.

## 1. Create a Storefront API token

1. Open Shopify Admin.
2. Go to Settings > Apps and sales channels > Develop apps.
3. Create or open a custom app.
4. Configure Storefront API access.
5. Enable Storefront API permissions for products, collections, and cart/checkout.
6. Install the app.
7. Copy the Storefront access token.

Do not commit this token to GitHub.

## 2. Prepare Shopify products

Each product that should appear on the website must be:

- Set to Active.
- Published to the sales channel that is available to the Storefront API.
- Given a title, handle, price, inventory, and at least one product image.
- Given at least one available variant.
- Added to the correct Collection.
- Given SEO title and SEO description when possible.

If a product does not appear on the frontend, first check whether it is Active, in stock, published to the correct sales channel, and available through Storefront API.

## 3. Prepare Shopify collections

Create collections in Shopify Admin for the storefront categories, such as kitchen appliances, cleaning, personal care, daily use products, and storage.

Each collection should have:

- A clear title.
- A handle.
- Products assigned to it.
- A collection image when possible.

The frontend `/collections` page reads Shopify collections. The `/collections/[handle]` page reads products from the matching Shopify collection handle.

## 4. Add Vercel environment variables

In Vercel, open the project and go to Settings > Environment Variables.

Add these Production values:

```env
SHOPIFY_STORE_DOMAIN=hjbcjw-h3.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-api-token
NEXT_PUBLIC_SITE_URL=https://pakfamilypro.com
NEXT_PUBLIC_SITE_NAME=Pak Family Pro
NEXT_PUBLIC_WHATSAPP_NUMBER=923199815828
NEXT_PUBLIC_SUPPORT_EMAIL=will1995wjk@gmial.com
NEXT_PUBLIC_SUPPORT_PHONE=92 3199815828
```

Important:

- `SHOPIFY_STORE_DOMAIN` must not include `https://`.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` must stay private and must not be committed to GitHub.
- Public values start with `NEXT_PUBLIC_` because they are safe for browser use.
- After changing environment variables, redeploy the Vercel project. Vercel only applies new environment variables to new deployments.
- Do not rely on `NEXT_PUBLIC_SHOPIFY_STORE_URL` for live catalog data. It is only a temporary product-page fallback.

## 5. Test product sync

1. Add or edit a product in Shopify Admin.
2. Confirm the product is Active, in stock, has a price and image, and is published to the Storefront API sales channel.
3. Add it to a collection.
4. Wait about 60 seconds.
5. Open the frontend homepage, `/collections`, the matching collection page, and the product page.

The storefront uses short revalidation instead of permanent static caching. Homepage, collection, product, and search data use a 60 second revalidation window, so Shopify product changes should appear after roughly one minute without editing frontend code.

## 6. Test search

1. Open `/search`.
2. Search for a Shopify product title or tag.
3. Confirm matching Shopify products appear.

If Shopify is not connected or the API fails, the page falls back to demo products instead of crashing.

## 7. Test Add to Cart

1. Open a real Shopify product page.
2. Select a variant if the product has variants.
3. Click Add to Cart.
4. Open `/cart`.
5. Confirm the item appears with the correct product, variant, price, and quantity.

Add to Cart uses the Shopify Product Variant ID, not the Product ID.

If Shopify is not connected, the button shows: `Shopify checkout is not connected yet.`
If Shopify checkout cannot be reached, the user sees: `Shopify checkout is temporarily unavailable. Please order on WhatsApp.`

## 8. Test Shopify Checkout

1. Add a real Shopify product to cart.
2. Open `/cart`.
3. Change quantity or remove an item to confirm cart updates work.
4. Click Checkout on Shopify.
5. Confirm the browser opens the `checkoutUrl` returned by the Shopify Storefront API.

The frontend must not manually build the checkout URL.

## 9. Confirm orders in Shopify Admin

1. Complete a test checkout.
2. Open Shopify Admin > Orders.
3. Confirm the order appears with customer, product, payment, shipping, and fulfillment information.

Payments, delivery methods, Cash on Delivery, and shipping rates are configured in Shopify Admin, not in the frontend code.

## 10. If products do not display

Check these items in order:

1. `SHOPIFY_STORE_DOMAIN` is only `hjbcjw-h3.myshopify.com`, without `https://`.
2. `SHOPIFY_STOREFRONT_ACCESS_TOKEN` is present in Vercel Production variables.
3. The product is Active.
4. The product has a price, inventory, image, and available variant.
5. The product is assigned to a Collection.
6. The product and collection are published to the sales channel exposed to Storefront API.
7. The collection handle matches the URL you are testing.
8. Vercel has redeployed after environment variable changes.
