import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, MapPin, Tag, ExternalLink } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      gallery: true,
      community: {
        select: { name: true, slug: true }
      }
    },
  })

  if (!event) {
    notFound()
  }

  const relatedEvents = await prisma.event.findMany({
    where: {
      type: event.type,
      id: { not: event.id },
      published: true,
    },
    take: 3,
    orderBy: { date: "asc" },
  })

  return (
    <div className="flex flex-col bg-surface">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Event Details */}
            <div className="lg:col-span-8 space-y-12">
              <div className="flex flex-wrap items-center gap-8 lg:gap-12 pb-8 border-b border-border">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center text-accent-orange group-hover:bg-accent-orange group-hover:text-white transition-all">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="font-body text-muted text-[10px] uppercase tracking-widest mb-1 font-bold">Date & Time</p>
                    <p className="font-display font-medium text-primary">{format(new Date(event.date), "MMMM do, yyyy")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center text-accent-sky group-hover:bg-accent-sky group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-body text-muted text-[10px] uppercase tracking-widest mb-1 font-bold">Venue</p>
                    <p className="font-display font-medium text-primary">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Tag size={24} />
                  </div>
                  <div>
                    <p className="font-body text-muted text-[10px] uppercase tracking-widest mb-1 font-bold">Type</p>
                    <p className="font-display font-medium text-primary">{event.type}</p>
                  </div>
                </div>
              </div>

              <div
                className="prose prose-sm max-w-none font-body text-main leading-relaxed [&>p]:mb-4 [&>h2]:font-display [&>h2]:text-primary [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />

              {event.gallery.length > 0 && (
                <div className="space-y-8 pt-12 border-t border-border">
                  <h2 className="section-heading text-2xl">Event Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.map((img) => (
                      <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-border">
                        <Image 
                          src={img.url} 
                          alt={img.caption || event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar Actions */}
            <div className="lg:col-span-4 lg:pl-8">
              <div className="p-8 bg-surface border border-border rounded-2xl sticky top-24 shadow-card">
                <h3 className="font-display text-primary text-lg font-bold mb-6">Take Action</h3>
                
                {event.regLink && (
                  <a
                    href={event.regLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-lg inline-flex items-center gap-2"
                  >
                    Register / RSVP
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Events */}
      {relatedEvents.length > 0 && (
        <section className="bg-surface-2 py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="section-heading text-2xl mb-12">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/events/${related.id}`}
                  className="card group overflow-hidden hover:border-primary-main/20"
                >
                  <div className="relative h-44 -mx-6 -mt-6 mb-6">
                    <Image src={related.coverImage} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px" className="object-cover" alt={related.title} />
                  </div>
                  <p className="font-body text-accent-orange text-[10px] font-bold uppercase tracking-wider mb-2">
                    {format(new Date(related.date), "MMM d, yyyy")}
                  </p>
                  <h4 className="font-display font-bold text-primary group-hover:text-primary-main transition-colors line-clamp-1">
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
