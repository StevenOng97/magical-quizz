import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const isProtectedRoute = createRouteMatcher(["/user(.*)", "/quizz(.*)"]);
