import { ensureSheetWithHeaders, getGoogleSheetsClient, getGoogleSheetsConfig, quoteSheetName } from "./sheets";

export const PRODUCT_REVIEW_HEADERS = [
  "Submitted At",
  "Product Handle",
  "Product Title",
  "Product ID",
  "Rating",
  "Customer Name",
  "WhatsApp Number",
  "City",
  "Order Number",
  "Review Title",
  "Review Text",
  "Image URL",
  "Verified Purchase",
  "Status",
  "Admin Notes",
  "User Agent",
  "Source Page"
] as const;

export type ProductReviewInput = {
  productHandle: string;
  productTitle: string;
  productId: string;
  rating: number;
  customerName: string;
  whatsappNumber: string;
  city: string;
  orderNumber: string;
  reviewTitle: string;
  reviewText: string;
  imageUrl: string;
  sourcePage: string;
  userAgent: string;
};

export type ProductReview = {
  submittedAt: string;
  productHandle: string;
  productTitle: string;
  productId: string;
  rating: number;
  customerName: string;
  city: string;
  orderNumber: string;
  reviewTitle: string;
  reviewText: string;
  imageUrl: string;
  verifiedPurchase: boolean;
  status: "Approved";
};

export type ReviewSummary = {
  averageRating: number;
  reviewCount: number;
};

function getReviewsSheetName() {
  return process.env.GOOGLE_REVIEWS_SHEET_TAB_NAME?.trim() || "Product Reviews";
}

function toReviewRow(data: ProductReviewInput) {
  return [
    new Date().toISOString(),
    data.productHandle,
    data.productTitle,
    data.productId,
    String(data.rating),
    data.customerName,
    data.whatsappNumber,
    data.city,
    data.orderNumber,
    data.reviewTitle,
    data.reviewText,
    data.imageUrl,
    "No",
    "Pending",
    "",
    data.userAgent,
    data.sourcePage
  ];
}

function cell(row: string[], index: number) {
  return String(row[index] || "").trim();
}

function normalizeStatus(value: string) {
  return value.trim().toLowerCase();
}

function rowToApprovedReview(row: string[]): ProductReview | null {
  if (normalizeStatus(cell(row, 13)) !== "approved") return null;

  const rating = Number(cell(row, 4));
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) return null;

  return {
    submittedAt: cell(row, 0),
    productHandle: cell(row, 1),
    productTitle: cell(row, 2),
    productId: cell(row, 3),
    rating,
    customerName: cell(row, 5),
    city: cell(row, 7),
    orderNumber: cell(row, 8),
    reviewTitle: cell(row, 9),
    reviewText: cell(row, 10),
    imageUrl: cell(row, 11),
    verifiedPurchase: cell(row, 12).toLowerCase() === "yes",
    status: "Approved"
  };
}

export async function ensureProductReviewsSheet() {
  const { spreadsheetId } = getGoogleSheetsConfig();
  const sheets = getGoogleSheetsClient();
  const sheetName = getReviewsSheetName();

  await ensureSheetWithHeaders(sheets, spreadsheetId, sheetName, PRODUCT_REVIEW_HEADERS);

  return { sheets, spreadsheetId, sheetName };
}

export async function appendProductReview(data: ProductReviewInput) {
  const { sheets, spreadsheetId, sheetName } = await ensureProductReviewsSheet();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${quoteSheetName(sheetName)}!A:Q`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [toReviewRow(data)] }
  });
}

export async function getApprovedReviewsByProductHandle(productHandle: string) {
  const handle = productHandle.trim();
  if (!handle) return [];

  const { sheets, spreadsheetId, sheetName } = await ensureProductReviewsSheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${quoteSheetName(sheetName)}!A2:Q`
  });

  return (response.data.values || [])
    .map((row) => row.map((value) => String(value)))
    .map(rowToApprovedReview)
    .filter((review): review is ProductReview => Boolean(review))
    .filter((review) => review.productHandle === handle)
    .sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt));
}

export async function getReviewSummary(productHandle: string): Promise<ReviewSummary> {
  const reviews = await getApprovedReviewsByProductHandle(productHandle);
  if (reviews.length === 0) {
    return { averageRating: 0, reviewCount: 0 };
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    averageRating: Math.round((total / reviews.length) * 10) / 10,
    reviewCount: reviews.length
  };
}
