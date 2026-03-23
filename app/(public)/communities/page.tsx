import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { Globe2, BarChart2, Brain, Link2, Code2, Wifi } from "lucide-react"
import { formatRole } from "@/lib/utils"
import { PageHero } from "@/components/public/page-hero"

const iconMap: Record<string, any> = {
  WEB_DEV: Globe2,
  DATA_SCIENCE: BarChart2,
  AI_ML: Brain,
  WEB3_BLOCKCHAIN: Link2,
  PROGRAMMING: Code2,
  IOT: Wifi,
}

const TECH_TAGS = [
  {
    name: "Python",
    color: "#3776AB",
    bgColor: "rgba(55,118,171,0.12)",
    borderColor: "rgba(55,118,171,0.3)",
    delay: "0s", duration: "7s", top: "12%", left: "8%",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#3776AB">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.178 3.403 5.96 3.403 5.96h2.031v-2.867s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.13V3.23S18.28 0 11.914 0zm-3.2 1.867c.577 0 1.043.466 1.043 1.044 0 .577-.466 1.043-1.043 1.043A1.043 1.043 0 0 1 7.67 2.91c0-.578.466-1.044 1.043-1.044z"/>
        <path d="M12.086 24c6.096 0 5.716-2.656 5.716-2.656l-.007-2.752h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.178-3.403-5.96-3.403-5.96h-2.031v2.867s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.13V20.77S5.72 24 12.086 24zm3.2-1.867a1.043 1.043 0 0 1-1.043-1.044c0-.577.466-1.043 1.043-1.043.578 0 1.044.466 1.044 1.043 0 .578-.466 1.044-1.044 1.044z" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "React",
    color: "#61DAFB",
    bgColor: "rgba(97,218,251,0.1)",
    borderColor: "rgba(97,218,251,0.25)",
    delay: "1s", duration: "9s", top: "8%", left: "35%",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#61DAFB">
        <circle cx="12" cy="12" r="2.139"/>
        <path d="M12 4.929c5.184 0 9.389 3.154 9.389 7.071 0 3.918-4.205 7.071-9.389 7.071S2.611 15.918 2.611 12c0-3.917 4.205-7.071 9.389-7.071zm0-1.5C6.477 3.429 1.111 7.26 1.111 12s5.366 8.571 10.889 8.571S22.889 16.74 22.889 12 17.523 3.429 12 3.429z" opacity="0.5"/>
        <path d="M7.432 6.535c2.592-4.487 6.574-6.944 8.917-5.49 2.344 1.455 2.037 6.29-.555 10.777-2.592 4.486-6.574 6.943-8.917 5.489-2.344-1.454-2.037-6.29.555-10.776zm-.75-.433C3.75 11.028 3.7 16.252 6.393 17.862c2.694 1.61 7.347-.946 10.279-5.828 2.932-4.883 2.882-10.107.188-11.717C14.166-1.293 9.513 1.263 6.682 6.102z" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: "TensorFlow",
    color: "#FF6F00",
    bgColor: "rgba(255,111,0,0.1)",
    borderColor: "rgba(255,111,0,0.25)",
    delay: "0.5s", duration: "8s", top: "20%", right: "10%",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF6F00">
        <path d="M0 0v24l6-3.462V6.923L0 0zm6 6.923v13.615L12 24V10.385L6 6.923zm6 3.462V24l6-3.462V10.385L12 10.385zm6 0v10.153L24 24V0l-6 10.385z" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Solidity",
    color: "#818CF8",
    bgColor: "rgba(129,140,248,0.1)",
    borderColor: "rgba(129,140,248,0.25)",
    delay: "2s", duration: "10s", top: "65%", left: "6%",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#818CF8">
        <path d="M14.19.087l-4.5 8h9l-4.5-8zM9.69 8.087l-4.5 8h9l-4.5-8zM5.19 16.087l-4.5 8h9l-4.5-8zM14.31 8.087l4.5 8h-9l4.5-8zM18.81 16.087l4.5 8h-9l4.5-8z" opacity="0.9"/>
      </svg>
    ),
  },
  {
    name: "Arduino",
    color: "#00979D",
    bgColor: "rgba(0,151,157,0.1)",
    borderColor: "rgba(0,151,157,0.25)",
    delay: "1.5s", duration: "11s", top: "75%", right: "12%",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#00979D">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 15.5H7a3.5 3.5 0 0 1 0-7h3.5v1.5H7a2 2 0 0 0 0 4h3.5V15.5zm2 0V14h3.5a2 2 0 0 0 0-4H13.5V8.5H17a3.5 3.5 0 0 1 0 7h-3.5zm-2-3.25v-1.5h3v1.5h-3z"/>
      </svg>
    ),
  },
  {
    name: "Node.js",
    color: "#339933",
    bgColor: "rgba(51,153,51,0.1)",
    borderColor: "rgba(51,153,51,0.25)",
    delay: "3s", duration: "8.5s", top: "40%", left: "3%",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#339933">
        <path d="M11.998 24a2.248 2.248 0 0 1-1.123-.302l-3.567-2.11c-.533-.298-.273-.404-.097-.465.71-.247.854-.303 1.61-.733.08-.044.183-.027.265.02l2.74 1.627a.356.356 0 0 0 .33 0l10.672-6.159a.345.345 0 0 0 .165-.298V8.42a.35.35 0 0 0-.167-.3L12.164 1.963a.345.345 0 0 0-.33 0L1.164 8.12a.35.35 0 0 0-.166.3v12.317c0 .122.063.237.166.298l2.927 1.69c1.588.794 2.56-.141 2.56-1.078V9.426a.316.316 0 0 1 .315-.315h1.37c.172 0 .314.141.314.315v11.221c0 2.108-1.148 3.318-3.148 3.318-.614 0-1.097 0-2.45-.666L.834 21.357A2.265 2.265 0 0 1 .001 19.44V7.12a2.27 2.27 0 0 1 1.133-1.97L10.874.302a2.34 2.34 0 0 1 2.25 0l9.74 5.848A2.27 2.27 0 0 1 24 8.12V20.44a2.265 2.265 0 0 1-1.133 1.96l-9.741 5.596a2.248 2.248 0 0 1-1.128.004z" opacity="0.9"/>
      </svg>
    ),
  },
  {
    name: "Rust",
    color: "#CE412B",
    bgColor: "rgba(206,65,43,0.1)",
    borderColor: "rgba(206,65,43,0.25)",
    delay: "0.8s", duration: "9.5s", top: "50%", right: "5%",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#CE412B">
        <path d="M23.83 11.67l-1.03-.64a12.18 12.18 0 0 0-.1-1.33l.89-.8a.37.37 0 0 0-.1-.6l-1.12-.44a12.2 12.2 0 0 0-.4-1.28l.72-.95a.37.37 0 0 0-.2-.57l-1.18-.2a12.2 12.2 0 0 0-.68-1.18l.52-1.07a.37.37 0 0 0-.3-.52l-1.2.04a12.18 12.18 0 0 0-.94-1.04l.29-1.16a.37.37 0 0 0-.4-.44l-1.16.27a12.17 12.17 0 0 0-1.15-.85l.04-1.2a.37.37 0 0 0-.52-.3L15.5 1.4A12.18 12.18 0 0 0 14.29.72L14.09-.48a.37.37 0 0 0-.57-.2l-.95.72A12.2 12.2 0 0 0 11.29.64L10.85-.48a.37.37 0 0 0-.6-.1l-.8.89A12.18 12.18 0 0 0 9.12.21L8.48-.82a.37.37 0 0 0-.6.1L7.44.4A12 12 0 0 0 12 0a12 12 0 1 0 11.83 11.67z" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "SQL",
    color: "#F29111",
    bgColor: "rgba(242,145,17,0.1)",
    borderColor: "rgba(242,145,17,0.25)",
    delay: "2.5s", duration: "7.5s", top: "30%", left: "20%",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#F29111">
        <path d="M12 1C5.925 1 1 3.925 1 7.5S5.925 14 12 14s11-2.925 11-6.5S18.075 1 12 1zm0 11.5c-5.238 0-9.5-2.243-9.5-5S6.762 2.5 12 2.5s9.5 2.243 9.5 5-4.262 5-9.5 5z" opacity="0.9"/>
        <path d="M2.5 10.5v3C2.5 17.075 6.925 20 12 20s9.5-2.925 9.5-6.5v-3c0 3.575-4.262 6.5-9.5 6.5s-9.5-2.925-9.5-6.5z" opacity="0.7"/>
        <path d="M2.5 16.5v3C2.5 23.075 6.925 26 12 26s9.5-2.925 9.5-6.5v-3c0 3.575-4.262 6.5-9.5 6.5s-9.5-2.925-9.5-6.5z" opacity="0.4"/>
      </svg>
    ),
  },
]

export default async function CommunitiesPage() {
  const communities = await prisma.community.findMany({
    include: {
      lead: true,
    },
  })

  return (
    <div className="flex flex-col">
      <PageHero
        badge="6 ACTIVE COMMUNITIES"
        title="Our Communities"
        subtitle="Six disciplines. One shared mission. Find your people and build something meaningful."
        size="lg"
      />

      {/* Communities list */}
      <section className="bg-surface py-20">
        <div className="max-w-5xl mx-auto px-6">
        <div className="space-y-6">
          {communities.map((community) => {
            const typeMap: Record<string, string> = {
              "web-development": "WEB_DEV",
              "data-science-and-modelling": "DATA_SCIENCE",
              "ai-and-machine-learning": "AI_ML",
              "web3-and-blockchain": "WEB3_BLOCKCHAIN",
              "programming-community": "PROGRAMMING",
              "internet-of-things": "IOT",
            }
            const type = typeMap[community.slug] || "PROGRAMMING"
            const Icon = iconMap[type] || Code2

            return (
              <div 
                key={community.id}
                className="bg-surface rounded-2xl border border-border p-8 flex flex-col md:flex-row gap-8 hover:shadow-card-hover transition-all duration-300"
              >
                {/* Left section */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon size={28} />
                    </div>
                    <h2 className="font-display text-primary text-2xl font-bold">
                      {community.name}
                    </h2>
                  </div>
                  <p className="font-body text-muted text-base leading-relaxed mb-6">
                    {community.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {community.focusTags.map((tag) => (
                      <span key={tag} className="tag-sky">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right section */}
                <div className="md:w-64 flex flex-col justify-between">
                  {community.lead ? (
                    <div className="flex items-center gap-3 bg-surface-2 rounded-xl p-3 mb-4">
                      {community.lead.photo ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                          <Image 
                            src={community.lead.photo} 
                            alt={community.lead.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                          {community.lead.name[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-body text-main text-sm font-medium leading-none">
                          {community.lead.name}
                        </p>
                        <span className="font-body text-muted text-[10px] uppercase tracking-wider">
                          {formatRole(community.lead.role)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-surface-2 rounded-xl p-3 mb-4 opacity-50">
                      <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-muted font-display font-bold">
                        ?
                      </div>
                      <p className="font-body text-muted text-sm italic">Lead to be announced</p>
                    </div>
                  )}
                  
                  <Link 
                    href={`/communities/${community.slug}`}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Explore Community
                  </Link>
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
