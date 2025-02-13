"use server";

import { draftMode } from "next/headers";
import { sanityFetch } from "@/sanity/lib/live";
import { globalSearchQuery } from "@/sanity/lib/queries";

export async function disableDraftMode() {
  "use server";
  await Promise.allSettled([
    (await draftMode()).disable(),
    // Simulate a delay to show the loading state
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
}

export async function globalSearch(params: {
  queryString: string;
  lang: string;
}) {
  "use server";

  return await sanityFetch({
    query: globalSearchQuery,
    params: { queryString: params.queryString, lang: params.lang },
  });
}
