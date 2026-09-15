import type { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://circ.mnu.ac.ke"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/communities", "/events", "/gallery", "/join", "/team", "/privacy", "/terms", "/cookies"]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}