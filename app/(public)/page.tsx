import { prisma } from "@/lib/prisma"
import { TerminalHero } from "@/components/public/hero/terminal-hero"
import { CommunitiesSection } from "@/components/public/communities/communities-section"
import { EventsStrip } from "@/components/public/events/events-strip"
import { LeadershipTeaser } from "@/components/public/team/leadership-teaser"
import { JoinCTA } from "@/components/public/home/join-cta"
import { Suspense } from "react"
import { UnauthorizedToast } from "@/components/public/unauthorized-toast"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Computing & Technology at Mama Ngina University College",
  description: "Join CIRC, the Computing Innovation & Research Club at Mama Ngina University College, a constituent college of Kenyatta University. Explore technology communities, events, and student projects in Kenya.",
  path: "/",
  keywords: ["MNUC", "SPAS", "School of Pure and Applied Sciences", "software development", "AI and machine learning", "data science", "cybersecurity", "Web3", "Internet of Things", "student technology club Kenya"],
})

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
      {/* Section A: Hero (stats are embedded in TerminalHero metrics bar) */}
      <TerminalHero />

      <section className="bg-surface py-12 md:py-16" aria-labelledby="circ-about-heading">
        <div className="mx-auto max-w-5xl px-6">
          <h1 id="circ-about-heading" className="section-heading text-3xl md:text-4xl">Computing, technology and research at MNUC</h1>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-main">
            The Computing Innovation &amp; Research Club (CIRC) brings students together at <a className="text-primary underline" href="https://mnu.ac.ke/" target="_blank" rel="noreferrer">Mama Ngina University College (MNUC)</a>, a constituent college of <a className="text-primary underline" href="https://www.ku.ac.ke/ku-history-profile/" target="_blank" rel="noreferrer">Kenyatta University</a>. Through student communities, workshops, events and projects, members build practical computing skills and explore technology and research.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-main">
            CIRC activities cover web and software development, programming, artificial intelligence and machine learning, data science, cybersecurity, Web3 and the Internet of Things. Students in relevant programmes at the <a className="text-primary underline" href="https://spas.mnu.ac.ke/" target="_blank" rel="noreferrer">School of Pure and Applied Sciences (SPAS)</a>—including Computer Science, Information Technology, Mathematics and Computer Science, and Statistics and Programming—can explore the club alongside the wider MNUC student community.
          </p>
        </div>
      </section>

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
