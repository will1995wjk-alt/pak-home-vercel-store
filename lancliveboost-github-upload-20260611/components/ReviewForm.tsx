"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitReview, type SubmitReviewState } from "@/app/actions/reviews";
import { StarIcon } from "./Icons";

const initialState: SubmitReviewState = { status: "idle" };

export default function ReviewForm({ productHandle, productId }: { productHandle: string; productId?: string | null }) {
  const [state, formAction, pending] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setRating(0);
    }
  }, [state]);

  const active = hover || rating;

  return (
    <form ref={formRef} action={formAction} className="card grid gap-4 p-5">
      <div>
        <h3 className="text-lg font-black">Write a review</h3>
        <p className="text-sm text-muted">Share your experience to help other shoppers.</p>
      </div>

      <input type="hidden" name="productHandle" value={productHandle} />
      <input type="hidden" name="productId" value={productId ?? ""} />
      <input type="hidden" name="rating" value={rating} />

      <div className="grid gap-2">
        <span className="text-sm font-black">Your rating</span>
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              className="p-0.5"
            >
              <StarIcon
                width={28}
                height={28}
                className={star <= active ? "text-brand" : "text-line"}
                fill="currentColor"
                stroke="none"
              />
            </button>
          ))}
        </div>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-black">Your name</span>
        <input className="field" name="authorName" type="text" placeholder="e.g. Ahmed K." required maxLength={80} />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-black">Title (optional)</span>
        <input className="field" name="title" type="text" placeholder="Great product!" maxLength={120} />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-black">Your review</span>
        <textarea
          className="field min-h-28 py-3"
          name="body"
          placeholder="What did you like about this product?"
          required
          maxLength={1500}
        />
      </label>

      {state.message ? (
        <p className={`text-sm font-bold ${state.status === "success" ? "text-brand-dark" : "text-accent"}`} role="status">
          {state.message}
        </p>
      ) : null}

      <button type="submit" className="button button-primary w-fit" disabled={pending}>
        {pending ? "Posting..." : "Post review"}
      </button>
    </form>
  );
}
