import { prisma } from "@/lib/prisma"
import { getPublicCached } from "@/lib/redis-cache"
import { GalleryClient } from "@/components/public/gallery/gallery-client"
import { PageHero } from "@/components/public/page-hero"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "CIRC Projects and Event Gallery",
  description: "Photos and highlights from CIRC computing projects, student workshops, research activities, and events at Mama Ngina University College.",
  path: "/gallery",
  keywords: ["student technology projects Kenya", "computing project gallery", "university hackathon photos", "CIRC workshops", "MNUC student projects"],
})

export default async function GalleryPage() {
  let images: any[] = []
  let eventList: any[] = []

  try {
    images = await getPublicCached("gallery:images-with-events", () => prisma.galleryImage.findMany({
      include: {
        event: {
          select: { id: true, title: true }
        }
      },
      orderBy: { createdAt: "desc" },
    }))
    eventList = await getPublicCached("gallery:published-events", () => prisma.event.findMany({
      where: { published: true },
      select: { id: true, title: true },
    }))
  } catch (err) {
    console.error("Gallery DB error:", err)
  }

  const eventNames = Array.from(
    new Set(
      images
        .map((img) => img.event?.title)
        .filter((title): title is string => !!title)
    )
  ).sort()

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#020818" }}>
      <PageHero
        badge="CIRC IN ACTION"
        title="Gallery"
        subtitle="Moments from our events, workshops, hackathons, and community activities."
        size="sm"
      />

      {images.length === 0 ? (
        <div className="py-32 text-center" style={{ background: "#020818" }}>
          <div
            className="font-mono text-[10px] tracking-widest mb-4"
            style={{ color: "rgba(56,189,248,0.2)" }}
          >
            NO IMAGES FOUND
          </div>
          <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            No photos yet. Check back after our next event.
          </p>
        </div>
      ) : (
        <GalleryClient
          images={images}
          eventNames={eventNames}
        />
      )}
    </div>
  )
}
