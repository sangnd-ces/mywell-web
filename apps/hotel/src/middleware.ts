import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@mywell/i18n";

const intl = createIntlMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});

const PUBLIC = /^\/(vi|en)\/login(\/.*)?$/;

export default function middleware(req: NextRequest) {
  const res = intl(req);
  const { pathname } = req.nextUrl;
  if (PUBLIC.test(pathname) || pathname.startsWith("/api/")) return res;

  const session = req.cookies.get("__mywell_session");
  if (!session) {
    const localeMatch = pathname.match(/^\/(vi|en)/);
    const locale = localeMatch ? localeMatch[1] : defaultLocale;
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
