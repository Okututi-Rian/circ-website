import Link from "next/link"
import { COMMUNITY_ICONS, COMMUNITY_COLORS } from "./community-icons"

interface Community {
  id: string
  name: string
  slug: string
  description: string
  focusTags: string[]
}

interface CommunitiesSectionProps {
  communities: Community[]
}

export function CommunitiesSection({ communities }: CommunitiesSectionProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-accent-sky text-xs tracking-widest uppercase mb-3">
            — our communities —
          </p>
          <h2 className="section-heading text-4xl lg:text-5xl">
            Six Communities.<br />One Mission.
          </h2>
          <p className="section-subheading mt-4 max-w-xl mx-auto">
            Find your discipline. Build with purpose. Connect with people who think like you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {communities.map((community) => {
            const colors = COMMUNITY_COLORS[community.slug] ?? COMMUNITY_COLORS["programming"]
            const Icon = COMMUNITY_ICONS[community.slug]

            return (
              <Link
                key={community.id}
                href={"/communities/" + community.slug}
                className="group relative bg-surface border border-border rounded-2xl p-6 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden cursor-pointer block"
              >
                {/* Hover accent line — left border that slides up */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom rounded-l-2xl"
                  style={{ background: colors.icon }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: colors.bg }}
                >
                  {Icon && (
                    <Icon
                      className="w-6 h-6"
                      style={{ color: colors.icon } as React.CSSProperties}
                    />
                  )}
                </div>

                {/* Name */}
                <h3 className="font-display text-primary text-lg font-bold mb-2 group-hover:text-accent-orange transition-colors duration-200">
                  {community.name}
                </h3>

                {/* Description */}
                <p className="font-body text-muted text-sm leading-relaxed line-clamp-2 mb-4">
                  {community.description}
                </p>

                {/* Focus tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {community.focusTags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="font-body text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {tag}
                    </span>
                  ))}
                  {community.focusTags.length > 3 && (
                    <span className="font-body text-[11px] text-muted px-2.5 py-1">
                      +{community.focusTags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-1 font-body text-sm font-medium transition-all duration-200 group-hover:gap-2"
                  style={{ color: colors.icon }}>
                  Explore
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
