import { prisma } from "@/lib/prisma"
import { ApplicationForm } from "@/components/public/join/application-form"
import { PageHero } from "@/components/public/page-hero"

export const dynamic = 'force-dynamic'

export default async function JoinPage() {
  const communities = await prisma.community.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: { name: "asc" },
  })

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#020818" }}>
      <PageHero
        badge="MEMBERSHIP APPLICATION"
        title={
          <>
            Become a <span className="text-[#F97316]">CIRC</span> Member
          </>
        }
        subtitle="Join a community of innovators, researchers, and builders. Applications are reviewed on a rolling basis."
        size="md"
      >
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {["Workshops", "Hackathons", "Mentorship", "Industry Connections", "Real Projects", "Community"].map((b) => (
            <span
              key={b}
              className="font-body text-[11px] px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(56,189,248,0.07)",
                border: "1px solid rgba(56,189,248,0.15)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-surface">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <ApplicationForm communities={communities} />
        </div>
      </section>
    </div>
  )
}
