import Image from "next/image"
import Link from "next/link"
import { formatRole } from "@/lib/utils"

interface Member {
  id: string
  name: string
  role: string
  photo: string | null
}

interface LeadershipTeaserProps {
  members: Member[]
}

export function LeadershipTeaser({ members }: LeadershipTeaserProps) {
  // Show only top 5 members for the teaser
  const teaserMembers = members.slice(0, 5);

  return (
    <section className="py-20 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-heading">The People Behind CIRC</h2>
          <p className="section-subheading">
            Executive committee and community leads driving the club forward.
          </p>
        </div>

        <div className="flex gap-5 justify-center flex-wrap mt-12">
          {teaserMembers.map((member) => (
            <div key={member.id} className="group flex-shrink-0 w-44 bg-surface rounded-2xl border border-border overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,58,138,0.1)] transition-all duration-300">
              {/* Photo */}
              <div className="relative h-40 bg-gradient-to-br from-primary to-[#0F2460] overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="176px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-white text-3xl font-bold opacity-25">
                      {member.name.split(" ").map((n: string) => n[0]).join("").slice(0,2)}
                    </span>
                  </div>
                )}
                {/* Bottom gradient on photo */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Accent bar */}
              <div className="h-0.5"
                style={{ background: member.role === "CHAIRPERSON" ? "#F97316" : "linear-gradient(90deg,#1E3A8A,#38BDF8)" }} />

              {/* Info */}
              <div className="p-3">
                <p className="font-display text-primary text-sm font-bold truncate">{member.name}</p>
                <p className="font-body text-muted text-[10px] uppercase tracking-wider mt-0.5">{formatRole(member.role)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/team" className="font-body text-accent-orange text-sm font-medium hover:underline">
            Meet Our Full Team →
          </Link>
        </div>
      </div>
    </section>
  )
}
