# Shopify Products and Collections Guide

This storefront reads live catalog data from Shopify through the Storefront API. Product data should
be managed in Shopify, not hardcoded in Next.js.

## Required Vercel Environment Variables

Add these variables in Vercel Project Settings > Environment Variables:

| Variable | Purpose |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | Shopify store domain, for example `your-store.myshopify.com`. |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token from Shopify. |
| `NEXT_PUBLIC_SITE_NAME` | Public site name shown in the UI and metadata. |
| `NEXT_PUBLIC_SITE_URL` | Production Vercel or custom domain URL. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number used by product and survey CTAs. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Optional support email. |
| `NEXT_PUBLIC_SUPPORT_PHONE` | Optional support phone number. |

Never commit Shopify tokens or private values to GitHub. After changing environment variables,
redeploy the Vercel project.

## Product CSV Workflow

Use `scripts/prepare-shopify-csv.mjs` to convert a raw product list into a Shopify import CSV.

```bash
node scripts/prepare-shopify-csv.mjs ./raw-products.csv ./shopify-products-ready.csv
```

Supported local input formats:

- CSV with columns such as `Title`, `Price`, `Inventory`, `Image`, `Type`, `Tags`
- JSON array of product objects
- TXT with one product per line: `Title | Price | Inventory | Image URL`

The generated CSV uses these columns:

- `Handle`
- `Title`
- `Body (HTML)`
- `Vendor`
- `Product Category`
- `Type`
- `Tags`
- `Published`
- `Option1 Name`
- `Option1 Value`
- `Variant SKU`
- `Variant Inventory Qty`
- `Variant Price`
- `Variant Compare At Price`
- `Variant Requires Shipping`
- `Variant Taxable`
- `Image Src`
- `SEO Title`
- `SEO Description`
- `Status`

Default values:

- Vendor: `Pak Home Essentials`
- Published: `TRUE`
- Status: `active`
- Variant Requires Shipping: `TRUE`
- Variant Taxable: `FALSE`
- Option1 Name: `Title`
- Option1 Value: `Default Title`

Descriptions are written in English for Pakistan shoppers and include practical use, quality checks,
Cash on Delivery, and daily home use positioning.

## Collection Rules

Create automated Shopify collections with these tag rules:

| Collection | Automated rule |
| --- | --- |
| Kitchen Appliances | Product tag is equal to `kitchen-appliances` |
| Home Cleaning | Product tag is equal to `home-cleaning` |
| Personal Care | Product tag is equal to `personal-care` |
| Daily Use Products | Product tag is equal to `daily-use` |
| Storage & Organization | Product tag is equal to `storage` |
| Hot Deals | Product tag is equal to `hot-deals` or `deal` |
| New Arrivals | Product tag is equal to `new-arrivals` |

Recommended collection handles:

- `kitchen-appliances`
- `home-cleaning`
- `personal-care`
- `daily-use-products`
- `storage-organization`
- `hot-deals`
- `new-arrivals`

The storefront already uses category handles for fallback pages. Matching Shopify collection handles
keeps the live Shopify pages aligned with the existing UI.

## Shopify Upload Steps

1. In Shopify Admin, go to Products.
2. Select Import.
3. Upload the generated CSV.
4. Preview the import and confirm field mapping.
5. Import products.
6. Create or confirm automated collections using the tag rules above.
7. Confirm the products are published to the Storefront / Online Store sales channel.
8. Redeploy Vercel after adding `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
9. Test `/`, `/collections`, `/collections/kitchen-appliances`, `/products/<handle>`, and `/search`.

If products do not appear, verify Storefront API permissions, product publication, collection handles,
and Vercel environment variables.
