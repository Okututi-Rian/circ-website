import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware()

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin-entry/:path*",
    "/api/:path*",
    "/trpc/:path*",
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/access-denied",
    "/__clerk/:path*",
  ],
}
