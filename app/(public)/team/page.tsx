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
  NETWORKING_CYBERSECURITY: "networking-cybersecurity",
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
                <div key={member.id} className="group bg-surface rounded-2xl border border-border p-6 flex flex-col items-center text-center hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(30,58,138,0.12)] transition-all duration-300 relative overflow-hidden">

                  {/* Chairperson only — orange accent badge */}
                  {isChair && (
                    <div className="absolute top-3 right-3 bg-accent-orange text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider z-10">
                      CHAIR
                    </div>
                  )}

                  {/* Circular photo — the key element */}
                  <div className="relative mb-5">
                    {/* Outer glow ring — animates on hover */}
                    <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: isChair
                          ? "linear-gradient(135deg, #F97316, #1E3A8A)"
                          : "linear-gradient(135deg, #1E3A8A, #38BDF8)"
                      }}
                    />

                    {/* Photo circle */}
                    <div
                      className="relative rounded-full overflow-hidden border-4 border-surface flex-shrink-0"
                      style={{
                        width: isChair ? "120px" : "96px",
                        height: isChair ? "120px" : "96px",
                      }}
                    >
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          sizes="120px"
                          className="object-cover object-top"
                        />
                      ) : (
                        /* Fallback: initials on gradient background */
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #0F2460, #1E3A8A)" }}
                        >
                          <span className="font-display text-white font-bold"
                            style={{ fontSize: isChair ? "36px" : "28px" }}>
                            {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Member details below the circle */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <h3 className="font-display text-primary text-base font-bold leading-tight">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: isChair ? "#F97316" : "rgba(56,189,248,0.8)" }}>
                      {formatRole(member.role)}
                    </p>
                    {member.bio && (
                      <p className="font-body text-muted text-xs leading-relaxed line-clamp-2 mt-2 max-w-[180px]">
                        {member.bio}
                      </p>
                    )}

                    {/* Social links — conditional, only shown if values exist */}
                    {(member.linkedin || member.github || member.twitter) && (
                      <div className="flex items-center justify-center gap-2 mt-3">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-surface-2 transition-colors border border-border"
                            aria-label="LinkedIn">
                            <Linkedin size={12} />
                          </a>
                        )}
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer"
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-surface-2 transition-colors border border-border"
                            aria-label="GitHub">
                            <Github size={12} />
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-surface-2 transition-colors border border-border"
                            aria-label="Twitter / X">
                            <Twitter size={12} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom accent line — slides in on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{
                      background: isChair
                        ? "#F97316"
                        : "linear-gradient(90deg, #1E3A8A, #38BDF8)"
                    }}
                  />
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
                  className="group rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group-hover:border-[rgba(56,189,248,0.3)] border border-[rgba(56,189,248,0.1)]"
                  style={{ background: "#0A1628" }}
                >
                  {/* Circular photo */}
                  <div className="relative mb-5">
                    {/* Outer glow ring */}
                    <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, #1E3A8A, #38BDF8)" }}
                    />
                    {/* Photo circle */}
                    <div
                      className="relative rounded-full overflow-hidden border-4 border-[#0A1628] flex-shrink-0"
                      style={{ width: "96px", height: "96px" }}
                    >
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          sizes="96px"
                          className="object-cover object-top"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #0F2460, #1E3A8A)" }}
                        >
                          <span className="font-display text-white font-bold" style={{ fontSize: "28px" }}>
                            {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Member details below the circle */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <h3 className="font-display text-white text-base font-bold leading-tight">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[rgba(56,189,248,0.8)]">
                      {formatRole(member.role)}
                    </p>
                    
                    {member.community && (
                      <span
                        className="inline-block font-mono text-[9px] font-bold px-2.5 py-1 rounded-full mt-1"
                        style={{
                          background: COMMUNITY_COLORS[communitySlug]?.bg ?? "#F0F4FF",
                          color: COMMUNITY_COLORS[communitySlug]?.text ?? "#1E3A8A",
                        }}
                      >
                        {member.community === "NETWORKING_CYBERSECURITY" ? "Networking and Cybersecurity" : member.community.replace(/_/g, " ")}
                      </span>
                    )}

                    {member.bio && (
                      <p className="font-body text-white/50 text-xs leading-relaxed line-clamp-2 mt-2 max-w-[180px]">
                        {member.bio}
                      </p>
                    )}

                    {/* Social links */}
                    {(member.linkedin || member.github || member.twitter) && (
                      <div className="flex items-center justify-center gap-2 mt-3">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors border border-[rgba(56,189,248,0.1)] text-[rgba(56,189,248,0.5)] hover:text-[rgba(56,189,248,0.9)] bg-[rgba(56,189,248,0.07)]"
                            aria-label="LinkedIn">
                            <Linkedin size={12} />
                          </a>
                        )}
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer"
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors border border-[rgba(56,189,248,0.1)] text-[rgba(56,189,248,0.5)] hover:text-[rgba(56,189,248,0.9)] bg-[rgba(56,189,248,0.07)]"
                            aria-label="GitHub">
                            <Github size={12} />
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors border border-[rgba(56,189,248,0.1)] text-[rgba(56,189,248,0.5)] hover:text-[rgba(56,189,248,0.9)] bg-[rgba(56,189,248,0.07)]"
                            aria-label="Twitter / X">
                            <Twitter size={12} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: "linear-gradient(90deg, #1E3A8A, #38BDF8)" }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
