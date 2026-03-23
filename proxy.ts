// HOW TO GRANT ADMIN ACCESS TO A NEW PERSON:
// 1. Go to clerk.com/dashboard -> your CIRC app
// 2. Click Organizations in the left sidebar
// 3. Open "CIRC Admin" organization
// 4. Click Members -> Invite member
// 5. Enter their email address, set role to "Member" or "Admin"
// 6. They receive an email invite, accept it, sign in
// 7. They now have full access to /admin
//
// HOW TO REVOKE ACCESS:
// 1. Same path -> Members -> find the person -> Remove from organization
// 2. Their next request to /admin will be blocked immediately

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId, orgSlug } = await auth()

    // Not signed in at all
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url)
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Signed in but not a member of the CIRC Admin org
    const adminOrgSlug = process.env.ADMIN_ORG_SLUG ?? "circ-admin-1774191169338462679"
    if (orgSlug !== adminOrgSlug) {
      return NextResponse.redirect(new URL("/?error=unauthorized", req.url))
    }
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}