import { clerkMiddleware, ClerkMiddlewareAuth, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/account(.*)',
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req: NextRequest) => {
  if (isProtectedRoute(req)) auth().protect({ unauthorizedUrl: "http://localhost:3000/login", unauthenticatedUrl: "http://localhost:3000/login" }); // redirect unauthorized users to /login page
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};