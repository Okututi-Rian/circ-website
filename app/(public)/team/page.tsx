import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { formatRole } from "@/lib/utils"
import { COMMUNITY_COLORS } from "@/components/public/communities/community-icons"
import { PageHero } from "@/components/public/page-hero"

export const dynamic = "force-dynamic"

const enumToSlug: Record<string, string> = {
  WEB_DEV: "web-development",
  DATA_SCIENCE: "data-science",
  AI_ML: "ai-ml",
  WEB3_BLOCKCHAIN: "web3-blockchain",
  PROGRAMMING: "programming",
  IOT: "iot",
}

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    where: { role: { notIn: ["COMMUNITY_LEAD", "COMMUNITY_CO_LEADER"] as any } },
    orderBy: { displayOrder: "asc" },
  })
  const execs = members

  const leads = await prisma.teamMember.findMany({
    where: { role: { in: ["COMMUNITY_LEAD", "COMMUNITY_CO_LEADER"] as any } },
    orderBy: { displayOrder: "asc" },
  })

  return (
    <div className="flex flex-col">
      <PageHero
        badge="CIRC LEADERSHIP 2025/26"
        title="The People Behind CIRC"
        subtitle="Executive committee and community leads driving innovation, research, and community forward."
        size="md"
      />

      {/* Executive Committee section */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="font-mono text-accent-sky text-[10px] tracking-widest uppercase mb-2">EXECUTIVE COMMITTEE</p>
            <h2 className="font-display text-primary text-3xl font-bold">Club Officers</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {execs.map((member) => {
              const isChair = member.role === "CHAIRPERSON"
              return (
                <div key={member.id} className="group relative bg-surface rounded-2xl border border-border overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,58,138,0.14)] transition-all duration-300">
                  
                  {/* CHAIR badge */}
                  {isChair && (
                    <div className="absolute top-3 right-3 z-20 bg-accent-orange text-white font-body text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
                      CHAIR
                    </div>
                  )}

                  {/* Photo area */}
                  <div className={`relative ${isChair ? 'h-52' : 'h-44'} overflow-hidden bg-gradient-to-br from-primary to-[#0F2460]`}>
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-white font-bold text-5xl opacity-30">
                          {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Accent bar */}
                  <div
                    className="h-0.5 w-full"
                    style={{
                      background: isChair
                        ? "#F97316"
                        : "linear-gradient(90deg, #1E3A8A, #38BDF8)"
                    }}
                  />

                  {/* Card body */}
                  <div className="p-5">
                    <h3 className="font-display text-primary text-lg font-bold mb-0.5">{member.name}</h3>
                    <p className="font-body text-muted text-xs font-medium uppercase tracking-wider mb-3">
                      {formatRole(member.role)}
                    </p>
                    {member.bio && (
                      <p className="font-body text-main text-sm leading-relaxed line-clamp-2 mb-4 opacity-80">
                        {member.bio}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-muted hover:text-primary hover:bg-blue-50 transition-colors duration-150"
                          aria-label="LinkedIn">
                          <Linkedin size={13} />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-muted hover:text-primary transition-colors duration-150"
                          aria-label="GitHub">
                          <Github size={13} />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-muted hover:text-primary transition-colors duration-150"
                          aria-label="Twitter / X">
                          <Twitter size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Community Leads Section */}
      <section className="py-20" style={{ background: "#020818" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="font-mono text-[#38BDF8] text-[10px] tracking-widest uppercase mb-2">COMMUNITY LEADS</p>
            <h2 className="font-display text-white text-3xl font-bold">Domain Specialists</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.filter(m => m.name && m.name.trim() !== "").map((member) => {
              const communitySlug = member.community ? enumToSlug[member.community] : "programming"
              return (
                <div
                  key={member.id}
                  className="lead-card group relative rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "#0A1628",
                    border: "1px solid rgba(56,189,248,0.1)",
                  }}
                >
                  {/* Photo area */}
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary to-[#0F2460]">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-white font-bold text-4xl opacity-30">
                          {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Accent bar */}
                  <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #1E3A8A, #38BDF8)" }} />

                  {/* Card body */}
                  <div className="p-5">
                    <h3 className="font-display text-white text-lg font-bold mb-0.5">{member.name}</h3>
                    <p className="font-mono text-[rgba(56,189,248,0.6)] text-[9px] tracking-wider uppercase mb-2">
                      {formatRole(member.role)}
                    </p>

                    {member.community && (
                      <span
                        className="inline-block font-body text-[10px] font-semibold px-2.5 py-1 rounded-full mb-3"
                        style={{
                          background: COMMUNITY_COLORS[communitySlug]?.bg || "rgba(30,58,138,0.05)",
                          color: COMMUNITY_COLORS[communitySlug]?.text || "#1E3A8A"
                        }}
                      >
                        {member.community.replace(/_/g, " ")}
                      </span>
                    )}

                    {member.bio && (
                      <p className="font-body text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
                        {member.bio}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 transition-colors duration-150"
                          style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.1)" }}
                          aria-label="LinkedIn">
                          <Linkedin size={13} />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 transition-colors duration-150"
                          style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.1)" }}
                          aria-label="GitHub">
                          <Github size={13} />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 transition-colors duration-150"
                          style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.1)" }}
                          aria-label="Twitter / X">
                          <Twitter size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
