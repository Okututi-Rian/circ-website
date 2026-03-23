import { prisma } from "@/lib/prisma"
import { TerminalHero } from "@/components/public/hero/terminal-hero"
import { CommunitiesSection } from "@/components/public/communities/communities-section"
import { EventsStrip } from "@/components/public/events/events-strip"
import { LeadershipTeaser } from "@/components/public/team/leadership-teaser"
import { JoinCTA } from "@/components/public/home/join-cta"
import { Suspense } from "react"
import { UnauthorizedToast } from "@/components/public/unauthorized-toast"

export default async function HomePage() {
  // Fetch communities
  const communities = await prisma.community.findMany({
    take: 6,
  })

  // Fetch upcoming events (next 3)
  const upcomingEvents = await prisma.event.findMany({
    where: {
      published: true,
      date: { gte: new Date() },
    },
    orderBy: { date: "asc" },
    take: 3,
  })

  // Fetch executive team members
  const execRoles = [
    "CHAIRPERSON",
    "VICE_CHAIRPERSON",
    "SECRETARY",
    "TREASURER",
    "EVENT_ORGANIZER"
  ]
  const execs = await prisma.teamMember.findMany({
    where: {
      role: { in: execRoles as any },
    },
    orderBy: { displayOrder: "asc" },
  })

  return (
    <div className="flex flex-col">
      <Suspense><UnauthorizedToast /></Suspense>
      {/* Section A: Hero (stats are embedded in TerminalHero metrics bar) */}
      <TerminalHero />

      {/* Section B: Communities */}
      <CommunitiesSection communities={communities} />

      {/* Section C: Events */}
      <EventsStrip events={upcomingEvents} />

      {/* Section D: Leadership */}
      <LeadershipTeaser members={execs} />

      {/* Section E: Join CTA */}
      <JoinCTA />
    </div>
  )
}
