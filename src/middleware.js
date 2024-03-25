import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  //Role Base Authorization.
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (req.auth?.role != "gasadmin") {
      return NextResponse.redirect(new URL("/notauth", req.url));
    }
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*),"],
};
