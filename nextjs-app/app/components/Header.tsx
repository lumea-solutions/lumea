import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import SearchInput from "./SearchInput";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";

export default function Header({
  logo,
  locales,
}: {
  logo: any;
  locales: string[];
}) {
  const logoUrl = urlForImage(logo)?.url();

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex justify-between items-center backdrop-blur-lg p-3">
      <Link href="/">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="Logo Lumeo"
            width={150}
            height={200}
            className="h-auto"
          />
        )}
      </Link>
      <LocaleSwitcher locales={locales} />
    </header>
  );
}
