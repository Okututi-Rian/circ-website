import { prisma } from "@/lib/prisma"
import { EventsClient } from "@/components/public/events/events-client"
import { PageHero } from "@/components/public/page-hero"

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "asc" },
  })

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#020818" }}>
      <PageHero
        badge="EVENTS & ACTIVITIES"
        title="What's Happening"
        subtitle="Hackathons, workshops, talks, and mentorship sessions — built for people who build things."
        size="md"
      />
      <div className="bg-white flex-1 pb-20 lg:pb-32">
        <EventsClient events={events} />
      </div>
    </div>
  )
}
