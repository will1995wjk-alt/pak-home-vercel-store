"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className="hidden min-w-[220px] items-center gap-2 md:flex">
      <input className="field w-full" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" />
      <button className="button button-secondary" type="submit" aria-label="Search">
        Search
      </button>
    </form>
  );
}
