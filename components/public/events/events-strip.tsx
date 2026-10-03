import { FeaturedEventCard } from "./featured-event-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  coverImage: string
  type: string
}

interface EventsStripProps {
  events: Event[]
}

export function EventsStrip({ events }: EventsStripProps) {
  return (
    <section className="overflow-hidden bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-orange">
              <span className="h-px w-7 bg-accent-orange" /> Keep an eye out
            </p>
            <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-primary sm:text-5xl md:text-6xl">Upcoming Events</h2>
            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-muted md:text-lg">Workshops, talks, research sessions, and chances to build together.</p>
          </div>
          <Link
            href="/events"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-primary/15 bg-surface-2 px-5 py-3 font-body text-sm font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary hover:text-white"
          >
            View all events <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scrollbar-hide md:gap-6">
            {events.map((event) => (
              <div key={event.id} className="snap-start h-full">
                <FeaturedEventCard {...event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full rounded-[1.35rem] border border-dashed border-primary/20 bg-surface-2 py-16 text-center font-body text-muted">
            Currently preparing more excitement. Stay tuned!
          </div>
        )}
      </div>
    </section>
  )
}
