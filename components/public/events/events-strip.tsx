import { EventCard } from "./event-card"
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
    <section className="py-20 bg-surface-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <h2 className="section-heading">Upcoming Events</h2>
          <Link 
            href="/events" 
            className="font-body text-accent-orange text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All Events 
            <ArrowRight size={14} />
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {events.map((event) => (
              <div key={event.id} className="snap-start h-full">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-16 text-muted font-body italic border border-border bg-surface border-dashed rounded-xl">
            Currently preparing more excitement. Stay tuned!
          </div>
        )}
      </div>
    </section>
  )
}
