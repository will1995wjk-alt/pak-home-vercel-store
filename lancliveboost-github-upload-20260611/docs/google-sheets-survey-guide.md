# Google Sheets Survey Setup Guide

This project can save Customer Survey submissions from `/survey` into Google Sheets through the Google Sheets API.

## Sheet Columns

The API writes this fixed header row:

1. Submitted At
2. Full Name
3. Phone Number
4. WhatsApp Number
5. City
6. Profession
7. Monthly Household Budget
8. Interested Product Categories
9. Products Interested In
10. Preferred Payment Method
11. Purchase Timeline
12. Notes
13. Consent
14. Source Page
15. User Agent
16. Follow-up Status
17. Sales Notes

## Option A: Recommended Manual Setup

1. Create a Google Sheet manually.
2. Create a tab named `Customer Survey`.
3. Copy the Google Sheet ID from the URL.
4. Create a Google Cloud service account.
5. Copy the service account email.
6. Share the Google Sheet with the service account email.
7. Set the service account permission to `Editor`.
8. Add the Google credentials to Vercel Environment Variables.
9. Redeploy the Vercel project.

Required Vercel Environment Variables:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=Customer Survey
```

Notes:

- `GOOGLE_PRIVATE_KEY` must be copied completely.
- If the private key contains line breaks, Vercel can store them as `\n`.
- After adding or changing environment variables, redeploy the project.
- The Google Sheet must be shared with the service account email as `Editor`.
- Do not commit real Google credentials to GitHub.

If `GOOGLE_SHEET_TAB_NAME` is empty, the site uses `Customer Survey`.

If the tab does not exist, the API tries to create it automatically. If Google blocks tab creation, manually create a `Customer Survey` tab and submit the form again.

## Option B: Advanced Automatic Sheet Creation

Google Drive API can create a new Google Sheet automatically when `GOOGLE_SHEET_ID` is missing. This project does not require that flow yet. For the current site, manual setup is simpler and more stable.

## Test Flow

1. Open `https://pakfamilypro.com/survey`.
2. Fill in the required fields.
3. Select at least one product category.
4. Confirm WhatsApp consent.
5. Click `Submit Survey`.
6. Confirm that a new row appears in the Google Sheet.

If the form shows an error, check Vercel Environment Variables and confirm the Sheet was shared with the service account email.
