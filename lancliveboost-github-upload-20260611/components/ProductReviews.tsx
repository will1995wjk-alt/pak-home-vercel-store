"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { ProductReview } from "@/lib/google/reviews";
import type { Product } from "@/lib/shopify/types";
import { ArrowIcon } from "./Icons";

type ReviewSummary = {
  averageRating: number;
  reviewCount: number;
};

type Props = {
  product: Pick<Product, "id" | "handle" | "title">;
  initialReviews: ProductReview[];
  initialSummary: ReviewSummary;
};

const successMessage = "Thank you! Your review has been submitted and will appear after approval.";
const failureMessage = "Something went wrong. Please try again or contact us on WhatsApp.";

function stars(rating: number) {
  const rounded = Math.round(rating);
  return "★★★★★".slice(0, rounded) + "☆☆☆☆☆".slice(0, Math.max(0, 5 - rounded));
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export default function ProductReviews({ product, initialReviews, initialSummary }: Props) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    rating: "5",
    customerName: "",
    whatsappNumber: "",
    city: "",
    orderNumber: "",
    reviewTitle: "",
    reviewText: "",
    consent: false
  });

  function updateField(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    const rating = Number(form.rating);
    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      !form.customerName.trim() ||
      !form.whatsappNumber.trim() ||
      form.reviewText.trim().length < 10 ||
      !form.consent
    ) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productHandle: product.handle,
          productTitle: product.title,
          productId: product.id,
          rating,
          customerName: form.customerName,
          whatsappNumber: form.whatsappNumber,
          city: form.city,
          orderNumber: form.orderNumber,
          reviewTitle: form.reviewTitle,
          reviewText: form.reviewText,
          sourcePage: `/products/${product.handle}`
        })
      });

      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) {
        throw new Error("Review submission failed.");
      }

      setStatus("success");
      setForm({
        rating: "5",
        customerName: "",
        whatsappNumber: "",
        city: "",
        orderNumber: "",
        reviewTitle: "",
        reviewText: "",
        consent: false
      });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section-pad border-t border-line">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid content-start gap-5">
          <div>
            <p className="eyebrow">Customer Reviews</p>
            <h2 className="mt-2 text-3xl font-black">Customer Reviews</h2>
            {initialSummary.reviewCount > 0 ? (
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold text-ink-soft">
                <span className="text-xl text-brand-dark" aria-label={`${initialSummary.averageRating} out of 5 stars`}>
                  {stars(initialSummary.averageRating)}
                </span>
                <span>{initialSummary.averageRating.toFixed(1)} / 5</span>
                <span>Based on {initialSummary.reviewCount} reviews</span>
              </div>
            ) : (
              <p className="mt-3 text-sm font-semibold text-muted">No reviews yet. Be the first to review this product.</p>
            )}
          </div>

          <div className="grid gap-4">
            {initialReviews.map((review) => (
              <article key={`${review.submittedAt}-${review.customerName}`} className="rounded-xl border border-line bg-white p-4 shadow-card">
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-brand-dark">
                  <span aria-label={`${review.rating} out of 5 stars`}>{stars(review.rating)}</span>
                  {review.verifiedPurchase ? (
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-black text-brand-dark">
                      Verified Purchase
                    </span>
                  ) : null}
                </div>
                {review.reviewTitle ? <h3 className="mt-3 text-lg font-black text-ink">{review.reviewTitle}</h3> : null}
                <p className="mt-2 text-sm leading-6 text-ink-soft">{review.reviewText}</p>
                <p className="mt-3 text-xs font-bold text-muted">
                  {review.customerName}
                  {review.city ? `, ${review.city}` : ""}
                  {review.submittedAt ? ` · ${formatDate(review.submittedAt)}` : ""}
                </p>
              </article>
            ))}
          </div>
        </div>

        <form className="grid gap-4 rounded-2xl border border-brand/20 bg-white p-5 shadow-lift md:p-6" onSubmit={submitReview}>
          <div>
            <h3 className="text-2xl font-black text-ink">Write a Review</h3>
            <p className="mt-1 text-sm font-semibold text-muted">Your review will appear after approval.</p>
          </div>

          <label className="grid gap-2 text-sm font-bold text-ink">
            Rating
            <select className="field" value={form.rating} onChange={(event) => updateField("rating", event.target.value)} required>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-ink">
              Customer Name
              <input
                className="field"
                value={form.customerName}
                onChange={(event) => updateField("customerName", event.target.value)}
                maxLength={80}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              WhatsApp Number
              <input
                className="field"
                value={form.whatsappNumber}
                onChange={(event) => updateField("whatsappNumber", event.target.value)}
                maxLength={40}
                type="tel"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-ink">
              City
              <input className="field" value={form.city} onChange={(event) => updateField("city", event.target.value)} maxLength={80} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Order Number
              <input
                className="field"
                value={form.orderNumber}
                onChange={(event) => updateField("orderNumber", event.target.value)}
                maxLength={80}
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-ink">
            Review Title
            <input
              className="field"
              value={form.reviewTitle}
              onChange={(event) => updateField("reviewTitle", event.target.value)}
              maxLength={120}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-ink">
            Review Text
            <textarea
              className="field min-h-32 resize-y"
              value={form.reviewText}
              onChange={(event) => updateField("reviewText", event.target.value)}
              maxLength={1000}
              required
            />
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-line bg-paper p-4 text-sm font-semibold leading-6 text-ink-soft">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-brand"
              required
            />
            I confirm this review is based on my real purchase or product experience.
          </label>

          {status === "success" ? (
            <div className="rounded-xl border border-brand/25 bg-brand/10 p-4 text-sm font-bold text-brand-dark">{successMessage}</div>
          ) : null}

          {status === "error" ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{failureMessage}</div>
          ) : null}

          <button className="button button-primary w-full sm:w-fit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
            <ArrowIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
