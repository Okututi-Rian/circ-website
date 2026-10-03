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
    }), [])
    eventList = await getPublicCached("gallery:published-events", () => prisma.event.findMany({
      where: { published: true },
      select: { id: true, title: true },
    }), [])
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
    <div className="flex flex-col min-h-screen bg-surface-2">
      <PageHero
        badge="CIRC IN ACTION"
        title="Event & Project Gallery"
        subtitle="Moments from our events, workshops, hackathons, and community activities."
        size="sm"
        image="/hero/hero-bg-5.jpg"
        imageAlt="CIRC gallery photo"
      />

      {images.length === 0 ? (
        <div className="max-w-2xl mx-auto my-20 px-6">
          <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-primary/20 shadow-sm">
            <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-accent-orange mb-3">
              GALLERY ARCHIVE
            </p>
            <h3 className="font-display text-primary text-xl font-bold mb-2">No Photos Published Yet</h3>
            <p className="font-body text-muted text-sm max-w-sm mx-auto">
              Check back soon for photos from our upcoming workshops and community sessions.
            </p>
          </div>
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
