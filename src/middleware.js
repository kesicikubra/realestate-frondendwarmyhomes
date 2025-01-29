import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

function getLocale(request) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = match(languages, locales, i18n.defaultLocale);

  return locale;
}

import { auth } from "@/auth"; // Assuming auth is a middleware function

export async function middleware(request) {
  // 3. Check if there is any supported locale in the pathname
  // console.log("request",request)
  const { nextUrl,cookies } = request;
  const pathname=nextUrl?.pathname
  const NEXT_LOCALE = cookies?.get('NEXT_LOCALE')?.value;
  
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname?.startsWith(`/${locale}`) || pathname === `/${locale}`
  );

  // 4. Locale handling based on auth outcome (optional)
  // - Adapt this section if your use case requires locale logic even after auth failure

  // 5. Continue with original middleware logic (redirect if no locale)
  if (!pathnameHasLocale) {
   const locale = NEXT_LOCALE === undefined ? getLocale(request) : NEXT_LOCALE;

    nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(nextUrl);
  }

  // 1. Execute auth middleware for authentication/authorization logic
  const authResponse = await auth(request);

  // 2. Handle potential redirect or error from auth middleware
  if (authResponse) {
    return authResponse; // Return if auth middleware redirects or throws an error
  }

  // 6. Return request or modified response (if applicable)
  return request; // Return unmodified request if no further processing is needed
}

// Isterse tum uygulamaya acilan mekanizmalar bazi yerler icin devre disi birakilabilir
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "tr","no","de","fr"],
};
