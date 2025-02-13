"use client";

import { useParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function LocaleSwitcher({ locales }: { locales: string[] }) {
  const { lang } = useParams<{ lang: string }>();
  const router = useRouter();
  return (
    <select
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        router.replace("/" + e.target.selectedOptions[0].value);
      }}
      value={lang}
    >
      {locales?.map((local) => (
        <option key={local} value={local}>
          {local}
        </option>
      ))}
    </select>
  );
}
