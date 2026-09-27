import { prisma } from "@/lib/prisma"
import { Hero } from "@/components/public/hero/hero"
import { CommunitiesSection } from "@/components/public/communities/communities-section"
import { WhyJoin } from "@/components/public/home/why-join"
import { HowToJoin } from "@/components/public/home/how-to-join"
import { EventsStrip } from "@/components/public/events/events-strip"
import { LeadershipTeaser } from "@/components/public/team/leadership-teaser"
import { JoinCTA } from "@/components/public/home/join-cta"
import { Suspense } from "react"
import { UnauthorizedToast } from "@/components/public/unauthorized-toast"

export default async function HomePage() {
  // Fetch communities
  const communities = await prisma.community.findMany()

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
      {/* Section A: Hero (stats are embedded in the hero's metrics bar) */}
      <Hero />

      {/* Section B: Communities */}
      <CommunitiesSection communities={communities} />

      {/* Section C: Events */}
      <EventsStrip events={upcomingEvents} />

      {/* Section C2: Why Join */}
      <WhyJoin />

      {/* Section D: Leadership */}
      <LeadershipTeaser members={execs} />

      {/* Section D2: How to Join */}
      <HowToJoin />

      {/* Section E: Join CTA */}
      <JoinCTA />
    </div>
  )
}