"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { productReviews, type ProductReview } from "@/lib/db/schema";

export async function getReviews(productHandle: string): Promise<ProductReview[]> {
  try {
    return await db
      .select()
      .from(productReviews)
      .where(eq(productReviews.productHandle, productHandle))
      .orderBy(desc(productReviews.createdAt));
  } catch (error) {
    console.error("[v0] getReviews failed:", error);
    return [];
  }
}

export type SubmitReviewState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitReview(_prevState: SubmitReviewState, formData: FormData): Promise<SubmitReviewState> {
  const productHandle = String(formData.get("productHandle") || "").trim();
  const productId = String(formData.get("productId") || "").trim() || null;
  const authorName = String(formData.get("authorName") || "").trim();
  const rating = Number(formData.get("rating"));
  const title = String(formData.get("title") || "").trim() || null;
  const body = String(formData.get("body") || "").trim();

  if (!productHandle) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }
  if (!authorName || authorName.length < 2) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { status: "error", message: "Please select a star rating." };
  }
  if (!body || body.length < 4) {
    return { status: "error", message: "Please write a short review." };
  }

  try {
    await db.insert(productReviews).values({
      productHandle,
      productId,
      authorName: authorName.slice(0, 80),
      rating,
      title: title?.slice(0, 120) ?? null,
      body: body.slice(0, 1500)
    });
    revalidatePath(`/products/${productHandle}`);
    return { status: "success", message: "Thank you! Your review has been posted." };
  } catch (error) {
    console.error("[v0] submitReview failed:", error);
    return { status: "error", message: "Could not save your review. Please try again." };
  }
}
