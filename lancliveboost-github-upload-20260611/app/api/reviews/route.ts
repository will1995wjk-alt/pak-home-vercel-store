import { NextResponse } from "next/server";
import { appendProductReview, getApprovedReviewsByProductHandle, getReviewSummary } from "@/lib/google/reviews";

type ReviewRequestBody = {
  productHandle?: string;
  productTitle?: string;
  productId?: string;
  rating?: number | string;
  customerName?: string;
  whatsappNumber?: string;
  city?: string;
  orderNumber?: string;
  reviewTitle?: string;
  reviewText?: string;
  imageUrl?: string;
  sourcePage?: string;
};

const friendlyError = "Something went wrong. Please try again or contact us on WhatsApp.";

function logSafeReviewError(action: "get" | "post", error: unknown) {
  const maybeError = error as { code?: unknown; message?: unknown; name?: unknown; response?: { status?: unknown } };
  const message = typeof maybeError.message === "string" ? maybeError.message.slice(0, 240) : "Unknown error";

  console.error("[product-reviews] request_failed", {
    action,
    code: maybeError.code || maybeError.response?.status || "unknown",
    name: typeof maybeError.name === "string" ? maybeError.name : "Error",
    message
  });
}

function cleanText(value: unknown, maxLength = 200) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function cleanRating(value: unknown) {
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return 0;
  return rating;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productHandle = cleanText(searchParams.get("productHandle"), 160);

  if (!productHandle) {
    return NextResponse.json({ success: false, message: "Product handle is required.", reviews: [] }, { status: 400 });
  }

  try {
    const [reviews, summary] = await Promise.all([
      getApprovedReviewsByProductHandle(productHandle),
      getReviewSummary(productHandle)
    ]);

    return NextResponse.json({
      success: true,
      reviews,
      averageRating: summary.averageRating,
      reviewCount: summary.reviewCount
    });
  } catch (error) {
    logSafeReviewError("get", error);

    return NextResponse.json({
      success: false,
      message: friendlyError,
      reviews: [],
      averageRating: 0,
      reviewCount: 0
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReviewRequestBody;
    const productHandle = cleanText(body.productHandle, 160);
    const productTitle = cleanText(body.productTitle, 240);
    const productId = cleanText(body.productId, 240);
    const rating = cleanRating(body.rating);
    const customerName = cleanText(body.customerName, 80);
    const whatsappNumber = cleanText(body.whatsappNumber, 40);
    const city = cleanText(body.city, 80);
    const orderNumber = cleanText(body.orderNumber, 80);
    const reviewTitle = cleanText(body.reviewTitle, 120);
    const reviewText = cleanText(body.reviewText, 1000);
    const imageUrl = cleanText(body.imageUrl, 500);
    const sourcePage = cleanText(body.sourcePage, 240) || `/products/${productHandle}`;

    if (!productHandle || !productTitle || !rating || !customerName || !whatsappNumber || reviewText.length < 10) {
      return NextResponse.json({ success: false, message: friendlyError }, { status: 400 });
    }

    await appendProductReview({
      productHandle,
      productTitle,
      productId,
      rating,
      customerName,
      whatsappNumber,
      city,
      orderNumber,
      reviewTitle,
      reviewText,
      imageUrl,
      sourcePage,
      userAgent: request.headers.get("user-agent") || ""
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully"
    });
  } catch (error) {
    logSafeReviewError("post", error);

    return NextResponse.json({ success: false, message: friendlyError }, { status: 500 });
  }
}
