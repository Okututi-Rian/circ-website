import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"
import { SITE_URL } from "@/lib/seo"
import { FALLBACK_COMMUNITIES } from "@/lib/public-fallbacks"

const siteUrl = SITE_URL

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [communities, events] = await Promise.all([
    prisma.community.findMany({ select: { slug: true } }).catch((error) => {
      console.error("Sitemap community query failed; using known public communities.", error)
      return FALLBACK_COMMUNITIES.map(({ slug }) => ({ slug }))
    }),
    prisma.event.findMany({
      where: { published: true },
      select: { id: true },
    }).catch((error) => {
      console.error("Sitemap event query failed; publishing static routes only.", error)
      return []
    }),
  ])

  const staticRoutes = [
    "",
    "/communities",
    "/events",
    "/gallery",
    "/join",
    "/team",
    "/privacy",
    "/terms",
    "/cookies",
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...communities.map(({ slug }) => ({
      url: `${siteUrl}/communities/${encodeURIComponent(slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...events.map(({ id }) => ({
      url: `${siteUrl}/events/${encodeURIComponent(id)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
