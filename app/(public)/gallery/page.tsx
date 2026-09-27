import { prisma } from "@/lib/prisma"
import { GalleryClient } from "@/components/public/gallery/gallery-client"
import { PageHero } from "@/components/public/page-hero"

export default async function GalleryPage() {
  let images: any[] = []
  let eventList: any[] = []

  try {
    images = await prisma.galleryImage.findMany({
      include: {
        event: {
          select: { id: true, title: true }
        }
      },
      orderBy: { createdAt: "desc" },
    })
    eventList = await prisma.event.findMany({
      where: { published: true },
      select: { id: true, title: true },
    })
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
    <div className="flex flex-col min-h-screen">
      <PageHero
        badge="CIRC IN ACTION"
        title="Gallery"
        subtitle="Moments from our events, workshops, hackathons, and community activities."
        size="sm"
      />

      {images.length === 0 ? (
        <div className="py-32 text-center bg-surface">
          <div className="font-body text-xs font-semibold tracking-wide uppercase text-muted mb-3">
            No Images Found
          </div>
          <p className="font-body text-sm text-muted">
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