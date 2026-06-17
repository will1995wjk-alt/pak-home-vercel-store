import type { ProductReview } from "@/lib/db/schema";

export type ReviewSummary = {
  count: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

export function summarizeReviews(reviews: ProductReview[]): ReviewSummary {
  const distribution: ReviewSummary["distribution"] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const review of reviews) {
    const key = Math.min(5, Math.max(1, review.rating)) as 1 | 2 | 3 | 4 | 5;
    distribution[key] += 1;
  }
  const count = reviews.length;
  const average = count === 0 ? 0 : reviews.reduce((sum, review) => sum + review.rating, 0) / count;
  return { count, average, distribution };
}
