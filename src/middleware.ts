import { authMiddleware } from "@clerk/nextjs";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
  // Allow signed out users to access specific routes:
  publicRoutes: [
    "/",
    "/explore",
    "/roadmap",
    "/roadmap/(.*)",
    "/test-roadmap",
    "/api/health",
    "/api/v1/(.*)",
    "/api/og/(.*)",
    "/api/webhook/(.*)",
    "/api/test-db",
    "/api/setup-db",
  ],
  ignoredRoutes: [
    "/api/health",
    "/api/v1/(.*)",
    "/api/og/(.*)",
    "/api/webhook/(.*)",
    "/api/test-db",
    "/api/setup-db",
  ],
  debug: false,
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
