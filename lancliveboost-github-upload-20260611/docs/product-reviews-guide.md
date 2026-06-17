# Product Reviews Guide

Product reviews are stored privately in the same Google Sheet used by Customer Survey. Customers only see the product review form and approved reviews on the website. The Google Sheet is never embedded or linked on the storefront.

## How It Works

1. A customer opens a product detail page.
2. The page shows approved reviews for that product handle.
3. The customer submits a review from the `Write a Review` form.
4. The API writes the review to the `Product Reviews` tab.
5. New reviews are saved with `Status=Pending`.
6. Pending and Rejected reviews are not shown on the website.
7. A review appears only after you change `Status` to `Approved` in Google Sheets.

## Google Sheet Tab

Default tab name:

```env
GOOGLE_REVIEWS_SHEET_TAB_NAME=Product Reviews
```

If this variable is empty, the site uses `Product Reviews`.

The API tries to create the tab automatically if it does not exist. If tab creation fails, manually create a tab named `Product Reviews`.

## Product Reviews Headers

The first row should contain:

1. Submitted At
2. Product Handle
3. Product Title
4. Product ID
5. Rating
6. Customer Name
7. WhatsApp Number
8. City
9. Order Number
10. Review Title
11. Review Text
12. Image URL
13. Verified Purchase
14. Status
15. Admin Notes
16. User Agent
17. Source Page

## Moderation

Use the `Status` column:

- `Pending`: submitted by customer, not visible on the website.
- `Approved`: visible on the matching product page.
- `Rejected`: not visible on the website.

Empty status values are not shown.

## Verified Purchase

New reviews are saved with:

```text
Verified Purchase=No
```

After checking an order manually, change this value to:

```text
Verified Purchase=Yes
```

Approved reviews with `Verified Purchase=Yes` show a Verified Purchase badge.

## Required Vercel Environment Variables

Existing Google Sheets variables:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=Customer Survey
```

New reviews variable:

```env
GOOGLE_REVIEWS_SHEET_TAB_NAME=Product Reviews
```

After adding or changing Vercel Environment Variables, redeploy Production.

## Testing

1. Open a product detail page.
2. Confirm the `Customer Reviews` section is visible.
3. Submit a review.
4. Confirm a new row appears in the `Product Reviews` tab.
5. Confirm the new row has `Status=Pending`.
6. Confirm the review does not appear on the product page while Pending.
7. Change `Status` to `Approved`.
8. Reload the product page after the cache refresh window.
9. Confirm the review appears and the average rating updates.

## Troubleshooting

If reviews do not show:

- Confirm `Status` is exactly `Approved`.
- Confirm `Product Handle` matches the Shopify product handle.
- Confirm the Google Sheet is shared with the service account email as `Editor`.
- Confirm `GOOGLE_PRIVATE_KEY` is correct and includes `\n` line breaks.
- Confirm `GOOGLE_SHEET_ID` is correct.
- Confirm `GOOGLE_REVIEWS_SHEET_TAB_NAME` matches the tab name.
- Confirm the Vercel project was redeployed after environment variable changes.
- Confirm Google Sheets API is enabled for the service account project.
