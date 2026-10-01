import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"
import { SITE_URL } from "@/lib/seo"

const siteUrl = SITE_URL

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [communities, events] = await Promise.all([
    prisma.community.findMany({ select: { slug: true } }),
    prisma.event.findMany({
      where: { published: true },
      select: { id: true },
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
