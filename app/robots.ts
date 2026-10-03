import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

const siteUrl = SITE_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/admin-entry/", "/sign-in/", "/sign-up/", "/access-denied", "/trpc/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
