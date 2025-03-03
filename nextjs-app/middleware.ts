import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const PUBLIC_FILE = /\.(.*)$/;
  const defaultLocale = (
    process.env.NEXT_PUBLIC_DEFAULT_LOCALE ||
    req.cookies.get("NEXT_LOCALE")?.value ||
    "en"
  ).toLowerCase();
  const locales = (process.env.NEXT_PUBLIC_LOCALES || defaultLocale)
    .toLowerCase()
    .split(",");
  const currentLocale = req.nextUrl.pathname.split("/")[1].toLocaleLowerCase();

  console.log(req);

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (!currentLocale || !locales.includes(currentLocale)) {
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${req.nextUrl.pathname.replace(
          "/" + currentLocale,
          ""
        )}${req.nextUrl.search}`,
        req.url
      )
    );
  }
}
