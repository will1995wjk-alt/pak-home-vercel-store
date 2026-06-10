"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container grid min-h-[55vh] place-items-center py-12 text-center">
      <div>
        <h1 className="text-4xl font-black">Something went wrong</h1>
        <p className="mt-3 text-muted">Please check the Shopify connection or try again.</p>
        <button className="button button-primary mt-6" type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </div>
  );
}
