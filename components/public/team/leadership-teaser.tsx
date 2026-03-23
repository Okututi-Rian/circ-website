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
          {teaserMembers.map((member) => {
            const isChair = member.role === "CHAIRPERSON"
            return (
              <div key={member.id} className="group flex-shrink-0 w-max min-w-[140px] max-w-[140px] bg-surface rounded-2xl border border-border p-4 flex flex-col items-center text-center hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(30,58,138,0.12)] transition-all duration-300 relative overflow-hidden">
                {/* Circular photo */}
                <div className="relative mb-3">
                  {/* Outer glow ring */}
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
                      width: isChair ? "100px" : "80px",
                      height: isChair ? "100px" : "80px",
                    }}
                  >
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes={isChair ? "100px" : "80px"}
                        className="object-cover object-top"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #0F2460, #1E3A8A)" }}
                      >
                        <span className="font-display text-white font-bold"
                          style={{ fontSize: isChair ? "32px" : "24px" }}>
                          {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Member details below the circle */}
                <div className="flex flex-col items-center gap-1 w-full">
                  <p className="font-display text-primary text-sm font-bold truncate w-full">{member.name}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase"
                    style={{ color: isChair ? "#F97316" : "rgba(56,189,248,0.8)" }}>
                    {formatRole(member.role)}
                  </p>
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

        <div className="text-center mt-10">
          <Link href="/team" className="font-body text-accent-orange text-sm font-medium hover:underline">
            Meet Our Full Team →
          </Link>
        </div>
      </div>
    </section>
  )
}
