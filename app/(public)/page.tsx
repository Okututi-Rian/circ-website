import { prisma } from "@/lib/prisma"
import { getPublicCached } from "@/lib/redis-cache"
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
  const communities = await getPublicCached("home:communities", () => prisma.community.findMany())

  // Fetch upcoming events (next 3)
  const upcomingEvents = await getPublicCached("home:upcoming-events", () => prisma.event.findMany({
    where: {
      published: true,
      date: { gte: new Date() },
    },
    orderBy: { date: "asc" },
    take: 3,
  }))

  // Fetch executive team members
  const execRoles = [
    "CHAIRPERSON",
    "VICE_CHAIRPERSON",
    "SECRETARY",
    "TREASURER",
    "EVENT_ORGANIZER"
  ]
  const execs = await getPublicCached("home:executives", () => prisma.teamMember.findMany({
    where: {
      role: { in: execRoles as any },
    },
    orderBy: { displayOrder: "asc" },
  }))

  return (
    <div className="flex flex-col">
      <Suspense><UnauthorizedToast /></Suspense>
      {/* Section A: Hero (stats are embedded in TerminalHero metrics bar) */}
      <TerminalHero />

      <section
        className="relative overflow-hidden bg-surface py-16 md:py-24"
        aria-labelledby="circ-about-heading"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-sky via-primary to-accent-orange opacity-70"
        />
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <p className="inline-flex rounded-full border border-primary/10 bg-surface-2 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Who we are
            </p>
            <h1 id="circ-about-heading" className="mt-5 font-display text-4xl font-bold leading-tight text-primary md:text-5xl">
              About <span className="text-accent-orange">Us</span>
            </h1>
            <p className="mt-5 max-w-sm font-body text-lg leading-relaxed text-muted">
              Computing, technology and research at MNUC.
            </p>
            <div className="mt-7 h-1 w-16 rounded-full bg-accent-orange" />
            <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-main">
              A place for students to learn together, grow practical skills, and turn curiosity into meaningful work.
            </p>
          </div>

          <div className="space-y-5">
            <article className="rounded-3xl border border-border bg-surface-2 p-6 shadow-card md:p-8">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">
                Our community
              </p>
              <h2 className="mb-4 font-display text-2xl font-bold text-primary">
                Learn, build, and explore together
              </h2>
              <p className="font-body text-base leading-8 text-main">
                The Computing Innovation &amp; Research Club (CIRC) brings students together at <a className="font-medium text-primary underline decoration-accent-sky decoration-2 underline-offset-4 hover:text-accent-orange" href="https://mnu.ac.ke/" target="_blank" rel="noreferrer">Mama Ngina University College (MNUC)</a>, a constituent college of <a className="font-medium text-primary underline decoration-accent-sky decoration-2 underline-offset-4 hover:text-accent-orange" href="https://www.ku.ac.ke/ku-history-profile/" target="_blank" rel="noreferrer">Kenyatta University</a>. Through student communities, workshops, events and projects, members build practical computing skills and explore technology and research.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-white p-6 shadow-card md:p-8">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-sky">
                What we explore
              </p>
              <h2 className="mb-4 font-display text-2xl font-bold text-primary">
                Computing across disciplines
              </h2>
              <p className="font-body text-base leading-8 text-main">
                CIRC activities cover web and software development, programming, artificial intelligence and machine learning, data science, cybersecurity, Web3 and the Internet of Things. Students in relevant programmes at the <a className="font-medium text-primary underline decoration-accent-sky decoration-2 underline-offset-4 hover:text-accent-orange" href="https://spas.mnu.ac.ke/" target="_blank" rel="noreferrer">School of Pure and Applied Sciences (SPAS)</a>—including Computer Science, Information Technology, Mathematics and Computer Science, and Statistics and Programming—can explore the club alongside the wider MNUC student community.
              </p>
            </article>
          </div>
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
