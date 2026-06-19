"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SearchIcon } from "./Icons";

type Props = {
  className?: string;
};

export default function SearchBar({ className = "" }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className={`relative w-full ${className}`}>
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      <input
        className="h-12 w-full rounded-[10px] border border-line bg-white py-0 pl-12 pr-4 text-[15px] leading-[48px] text-ink outline-none transition placeholder:text-muted focus:border-brand focus:shadow-[0_0_0_3px_rgba(20,87,217,0.14)]"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
        aria-label="Search products"
      />
    </form>
  );
}
