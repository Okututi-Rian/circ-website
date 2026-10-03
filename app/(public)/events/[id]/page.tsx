import { prisma } from "@/lib/prisma"
import { getPublicCached } from "@/lib/redis-cache"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, MapPin, Tag, ExternalLink } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"
import { createPageMetadata, plainTextDescription, SITE_URL } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await getPublicCached(`event:metadata:${id}`, () => prisma.event.findFirst({
    where: { id, published: true },
    select: { title: true, description: true, coverImage: true, type: true },
  }), null)
  if (!event) return { title: "Event Not Found", robots: { index: false, follow: false } }

  return createPageMetadata({
    title: event.title,
    description: plainTextDescription(event.description),
    path: `/events/${encodeURIComponent(id)}`,
    image: event.coverImage,
    keywords: ["CIRC event", `${event.type} event`, "technology event Kenya", "Mama Ngina University College event"],
  })
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const event = await getPublicCached(`event:detail:${id}`, () => prisma.event.findFirst({
    where: { id, published: true },
    include: {
      gallery: true,
      community: {
        select: { name: true, slug: true }
      }
    },
  }), null)

  if (!event) {
    notFound()
  }

  const relatedEvents = await getPublicCached(`event:related:${event.type}:${event.id}`, () => prisma.event.findMany({
    where: {
      type: event.type,
      id: { not: event.id },
      published: true,
    },
    take: 3,
    orderBy: { date: "asc" },
  }), [])

  const eventUrl = `${SITE_URL}/events/${encodeURIComponent(id)}`
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: plainTextDescription(event.description),
    startDate: new Date(event.date).toISOString(),
    eventStatus: event.date < new Date() ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: `${event.venue}, Mama Ngina University College`,
    },
    image: new URL(event.coverImage, SITE_URL).toString(),
    organizer: {
      "@type": "Organization",
      name: "Computing Innovation & Research Club (CIRC)",
      url: SITE_URL,
    },
    url: eventUrl,
    ...(event.regLink && event.date >= new Date() ? { offers: { "@type": "Offer", url: event.regLink, availability: "https://schema.org/InStock" } } : {}),
  }

  return (
    <div className="flex flex-col bg-surface-2 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <PageHero
        badge={event.type}
        title={event.title}
        subtitle={
          new Date(event.date).toLocaleDateString("en-KE", {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
          }) + " · " + event.venue
        }
        size="md"
      />

      {/* Main Content Area */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Event Details */}
            <div className="lg:col-span-8 space-y-10 bg-white rounded-3xl p-8 sm:p-12 border border-primary/10 shadow-[0_8px_30px_rgba(15,36,96,0.04)]">
              <div className="flex flex-wrap items-center gap-6 lg:gap-10 pb-8 border-b border-primary/10">
                <div className="flex items-center gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-primary/10 flex items-center justify-center text-accent-orange flex-shrink-0">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="font-mono text-muted text-[10px] uppercase tracking-widest font-semibold mb-0.5">Date</p>
                    <p className="font-display font-bold text-primary">{format(new Date(event.date), "MMMM do, yyyy")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin size={22} className="text-accent-orange" />
                  </div>
                  <div>
                    <p className="font-mono text-muted text-[10px] uppercase tracking-widest font-semibold mb-0.5">Venue</p>
                    <p className="font-display font-bold text-primary">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Tag size={22} className="text-accent-orange" />
                  </div>
                  <div>
                    <p className="font-mono text-muted text-[10px] uppercase tracking-widest font-semibold mb-0.5">Category</p>
                    <p className="font-display font-bold text-primary">{event.type}</p>
                  </div>
                </div>
              </div>

              <div
                className="prose prose-sm max-w-none font-body text-main leading-relaxed [&>p]:mb-4 [&>h2]:font-display [&>h2]:text-primary [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />

              {event.gallery.length > 0 && (
                <div className="space-y-6 pt-10 border-t border-primary/10">
                  <h2 className="font-display text-primary text-2xl font-bold">Event Photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.map((img) => (
                      <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-primary/10 shadow-sm">
                        <Image 
                          src={img.url} 
                          alt={img.caption || event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar Actions */}
            <div className="lg:col-span-4">
              <div className="p-8 bg-white border border-primary/10 rounded-3xl sticky top-24 shadow-[0_8px_30px_rgba(15,36,96,0.04)]">
                <p className="font-mono text-accent-orange text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">
                  Registration
                </p>
                <h3 className="font-display text-primary text-2xl font-bold mb-4">Event RSVP</h3>
                <p className="font-body text-muted text-sm leading-relaxed mb-6">
                  Reserve your spot to participate in this CIRC session and gain practical experience.
                </p>
                
                {event.regLink ? (
                  <a
                    href={event.regLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-orange px-6 py-3.5 font-body text-sm font-semibold text-white shadow-[0_10px_25px_rgba(249,115,22,0.22)] transition-all hover:bg-orange-600 hover:-translate-y-0.5 active:scale-95"
                  >
                    Register / RSVP
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <div className="bg-surface-2 rounded-2xl p-4 text-center border border-primary/10">
                    <p className="font-body text-muted text-sm">Free entry for all MNUC students. Walk-ins welcome.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Events */}
      {relatedEvents.length > 0 && (
        <section className="bg-surface-2 py-20 border-t border-primary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="font-mono text-accent-orange text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">
              Explore More
            </p>
            <h2 className="font-display text-primary text-3xl font-bold mb-10">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/events/${related.id}`}
                  className="group bg-white rounded-3xl border border-primary/10 overflow-hidden shadow-[0_8px_30px_rgba(15,36,96,0.04)] hover:shadow-[0_20px_45px_rgba(15,36,96,0.1)] hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col"
                >
                  <div className="relative h-44 -mx-6 -mt-6 mb-5 overflow-hidden">
                    <Image src={related.coverImage} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px" className="object-cover group-hover:scale-105 transition-transform duration-500" alt={related.title} />
                  </div>
                  <p className="font-mono text-accent-orange text-[10px] font-bold uppercase tracking-wider mb-2">
                    {format(new Date(related.date), "MMM d, yyyy")}
                  </p>
                  <h4 className="font-display font-bold text-primary group-hover:text-accent-orange transition-colors line-clamp-2 text-lg">
                    {related.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
