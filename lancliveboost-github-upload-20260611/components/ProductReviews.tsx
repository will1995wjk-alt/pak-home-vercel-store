import { summarizeReviews } from "@/lib/reviews";
import type { ProductReview } from "@/lib/db/schema";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ProductReviews({
  productHandle,
  productId,
  reviews
}: {
  productHandle: string;
  productId?: string | null;
  reviews: ProductReview[];
}) {
  const summary = summarizeReviews(reviews);

  return (
    <section className="section-pad" id="reviews">
      <h2 className="text-3xl font-black">Customer Reviews</h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid content-start gap-6">
          <div className="card grid gap-3 p-6">
            {summary.count > 0 ? (
              <>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-black leading-none">{summary.average.toFixed(1)}</span>
                  <div className="grid gap-1">
                    <StarRating value={summary.average} size={18} />
                    <span className="text-sm text-muted">Based on {summary.count} review{summary.count > 1 ? "s" : ""}</span>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const value = summary.distribution[star as 1 | 2 | 3 | 4 | 5];
                    const pct = summary.count ? Math.round((value / summary.count) * 100) : 0;
                    return (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="w-10 text-muted">{star} star</span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                          <span className="block h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                        </span>
                        <span className="w-8 text-right text-muted">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="grid gap-2 py-2">
                <StarRating value={0} size={20} />
                <p className="font-bold">No reviews yet</p>
                <p className="text-sm text-muted">Be the first to review this product.</p>
              </div>
            )}
          </div>

          <ReviewForm productHandle={productHandle} productId={productId} />
        </div>

        <div className="grid content-start gap-4">
          {reviews.length === 0 ? (
            <p className="text-muted">There are no reviews for this product yet.</p>
          ) : (
            reviews.map((review) => (
              <article key={review.id} className="card grid gap-2 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-black text-white">
                      {review.authorName.slice(0, 1).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-black leading-tight">{review.authorName}</p>
                      <StarRating value={review.rating} size={14} />
                    </div>
                  </div>
                  <time className="text-xs text-muted">{formatDate(review.createdAt)}</time>
                </div>
                {review.title ? <h3 className="font-black">{review.title}</h3> : null}
                <p className="text-pretty leading-relaxed text-ink">{review.body}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
