import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/chai/supabase-auth";

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const supabase = await createClient();

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no session and the user is trying to access a protected route
  if (!session && !request.nextUrl.pathname.startsWith("/login")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If there is a session and the user is on the login page, redirect to /sites
  if (session && request.nextUrl.pathname.startsWith("/login")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/sites";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply this middleware to these routes
    "/sites/:path*",
    "/login",
  ],
};
