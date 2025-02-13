"use client";

import { ChangeEvent, useState } from "react";
import { globalSearch } from "../actions";
import { GlobalSearchQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SearchInput() {
  const { lang } = useParams<{ lang: string }>();
  const [searchResults, setSearchResults] = useState<GlobalSearchQueryResult>(
    []
  );

  return (
    <label className="relative">
      <span>Search: </span>
      <input
        className="border"
        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
          const currentValue = e.target.value;
          setSearchResults(
            currentValue
              ? (await globalSearch({ queryString: currentValue, lang })).data
              : []
          );
        }}
      />
      {searchResults.length > 0 && (
        <div className="absolute top-[100%] left-0 shadow-md p-3 grid gap-3 bg-white">
          {searchResults.map((result) => (
            <Link
              key={result.type + result.slug}
              href={`/${lang}/${result.slug}`}
            >
              {result.type.toUpperCase()} - {result.name || result.title}
            </Link>
          ))}
        </div>
      )}
    </label>
  );
}
