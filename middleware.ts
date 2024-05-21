import { clerkMiddleware, ClerkMiddlewareAuth, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  // '/admin(.*)',
  '/account(.*)',
]);

const isAdminRoute = createRouteMatcher([
  // '/admin(.*)',
]);

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req: NextRequest) => {
  if (isProtectedRoute(req)) auth().protect(); // redirect unauthorized users to /login page

  if (isAdminRoute(req)) { // redirect non admin users to /404 page
    auth().protect(has => {
      return (
        has({ role: 'org:admin' })
      )
    });
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};