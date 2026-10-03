import { prisma } from "@/lib/prisma"
import { getPublicCached } from "@/lib/redis-cache"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react"
import { formatRole } from "@/lib/utils"
import { PageHero } from "@/components/public/page-hero"
import { createPageMetadata, plainTextDescription, SITE_URL } from "@/lib/seo"
import { FALLBACK_COMMUNITIES } from "@/lib/public-fallbacks"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const community = await getPublicCached(`community:metadata:${slug}`, () => prisma.community.findUnique({
    where: { slug },
    select: { name: true, description: true, focusTags: true },
  }), FALLBACK_COMMUNITIES.find((item) => item.slug === slug) ?? null)
  if (!community) return { title: "Community Not Found", robots: { index: false, follow: false } }

  return createPageMetadata({
    title: `${community.name} Community`,
    description: plainTextDescription(`${community.description} Join this CIRC technology community at Mama Ngina University College.`),
    path: `/communities/${encodeURIComponent(slug)}`,
    keywords: [...community.focusTags, `${community.name} community`, "MNUC technology community", "SPAS computing"],
  })
}

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  const community = await getPublicCached(`community:detail:${slug}`, () => prisma.community.findUnique({
    where: { slug },
    include: {
      lead: true,
      events: {
        where: { published: true },
        take: 3,
        orderBy: { date: "desc" },
      },
    },
  }), FALLBACK_COMMUNITIES.find((item) => item.slug === slug) ?? null)

  if (!community) {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${community.name} Community | CIRC`,
    description: plainTextDescription(community.description),
    url: `${SITE_URL}/communities/${encodeURIComponent(slug)}`,
    about: {
      "@type": "Organization",
      name: `${community.name} Community`,
      description: plainTextDescription(community.description),
      parentOrganization: {
        "@type": "Organization",
        name: "Computing Innovation & Research Club (CIRC)",
        url: SITE_URL,
      },
      knowsAbout: community.focusTags,
    },
  }

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <PageHero
        badge={"COMMUNITY — " + community.name.toUpperCase()}
        title={community.name}
        subtitle={community.description}
        size="md"
      />

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            
            {/* Left: Description & Activities */}
            <div className="lg:col-span-2 space-y-16">
              <div className="space-y-6">
                <h2 className="section-heading text-3xl">About the Community</h2>
                <p className="font-body text-main text-lg leading-relaxed">
                  {community.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {community.focusTags.map((tag) => (
                    <span key={tag} className="tag-sky">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {community.activities && community.activities.length > 0 && (
                <div className="space-y-8">
                  <h2 className="section-heading text-3xl">What we do</h2>
                  <div className="space-y-6">
                    {community.activities.map((activity, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="relative flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-accent-orange ring-4 ring-orange-100/50 group-hover:scale-125 transition-transform" />
                          <div className="w-0.5 h-full bg-border absolute top-3" />
                        </div>
                        <p className="font-body text-main font-medium pb-4">
                          {activity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-12">
              {/* Lead Card */}
              <div className="sticky top-24">
                <h3 className="font-body text-accent-orange text-[10px] font-bold uppercase tracking-[.2em] mb-4">
                  Community Lead
                </h3>
                {community.lead ? (
                  <div className="bg-surface rounded-2xl border border-border overflow-hidden">
                    <div className="flex items-stretch gap-0">
                      {/* Lead photo — left side, fixed width */}
                      <div className="relative w-28 flex-shrink-0 bg-gradient-to-br from-primary to-[#0F2460]">
                        {community.lead.photo ? (
                          <Image
                            src={community.lead.photo}
                            alt={community.lead.name}
                            fill
                            sizes="112px"
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-display text-white text-2xl font-bold opacity-30">
                              {community.lead.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-orange" />
                      </div>

                      {/* Lead info — right side */}
                      <div className="flex-1 p-5">
                        <p className="font-body text-muted text-[10px] uppercase tracking-widest mb-2">Community Lead</p>
                        <h4 className="font-display text-primary text-xl font-bold mb-0.5">{community.lead.name}</h4>
                        <p className="font-body text-muted text-xs uppercase tracking-wider mb-3">{formatRole(community.lead.role)}</p>
                        {community.lead.bio && (
                          <p className="font-body text-main text-sm leading-relaxed line-clamp-2 mb-3">{community.lead.bio}</p>
                        )}
                        <div className="flex items-center gap-2">
                          {community.lead.linkedin && (
                            <a href={community.lead.linkedin} target="_blank" rel="noopener noreferrer"
                              className="w-7 h-7 rounded-lg bg-surface-2 flex items-center justify-center text-muted hover:text-primary transition-colors">
                              <Linkedin size={12} />
                            </a>
                          )}
                          {community.lead.github && (
                            <a href={community.lead.github} target="_blank" rel="noopener noreferrer"
                              className="w-7 h-7 rounded-lg bg-surface-2 flex items-center justify-center text-muted hover:text-primary transition-colors">
                              <Github size={12} />
                            </a>
                          )}
                          {community.lead.twitter && (
                            <a href={community.lead.twitter} target="_blank" rel="noopener noreferrer"
                              className="w-7 h-7 rounded-lg bg-surface-2 flex items-center justify-center text-muted hover:text-primary transition-colors">
                              <Twitter size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-2 rounded-2xl p-8 border border-border text-center">
                    <p className="font-body text-muted text-sm italic">Community lead to be announced.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-dark py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="font-display text-white text-4xl font-bold mb-8">
            Want to Join the <span className="text-accent-sky">{community.name}</span> Hub?
          </h2>
          <Link href="/join" className="btn-primary-lg inline-flex">
            Apply for Membership
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
