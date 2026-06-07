import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log(
    "MIDDLEWARE:",
    request.nextUrl.pathname
  );

  const token =
    request.cookies.get("accessToken");

  // ROUTES KTÓRE CHRONIMY
  const protectedRoutes = [
    "/dashboard",
    "/modules",
    "/settings",
    "/progress"
  ];

  // CURRENT PATH
  const path = request.nextUrl.pathname;

  // CZY TO PROTECTED ROUTE?
  const isProtected =
    protectedRoutes.some(route =>
      path.startsWith(route)
    );

  // BRAK TOKENA
  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // USER ZALOGOWANY
  // blokada wejścia na login/register
  if (
    token &&
    (
      path === "/login" ||
      path === "/register"
    )
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

// ROUTES DLA MIDDLEWARE
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/modules/:path*",
    "/settings/:path*",
    "/progress/:path*",
    "/login",
    "/register"
  ]
};