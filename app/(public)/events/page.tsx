import { prisma } from "@/lib/prisma"
import { EventsClient } from "@/components/public/events/events-client"
import { PageHero } from "@/components/public/page-hero"

export default async function EventsPage() {
  const now = new Date()

  const upcomingEvents = await prisma.event.findMany({
    where: { published: true, date: { gte: now } },
    orderBy: { date: "asc" },
  })

  const pastEvents = await prisma.event.findMany({
    where: { published: true, date: { lt: now } },
    orderBy: { date: "desc" },
  })

  const events = [...upcomingEvents, ...pastEvents]
  const featuredEvent = upcomingEvents[0] ?? null

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#020818" }}>
      <PageHero
        badge="EVENTS & ACTIVITIES"
        title="What's Happening"
        subtitle="Hackathons, workshops, talks, and mentorship sessions — built for people who build things."
        size="md"
      />
      <div className="bg-white flex-1 pb-20 lg:pb-32">
        <EventsClient events={events} featuredEvent={featuredEvent} />
      </div>
    </div>
  )
}
