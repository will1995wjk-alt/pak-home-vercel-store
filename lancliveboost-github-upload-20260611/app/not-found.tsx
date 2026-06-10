import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container grid min-h-[55vh] place-items-center py-12 text-center">
      <div>
        <h1 className="text-4xl font-black">Page not found</h1>
        <p className="mt-3 text-muted">The page may have moved or the product is not available.</p>
        <Link className="button button-primary mt-6" href="/collections">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
