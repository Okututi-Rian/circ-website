import { ReactNode } from "react"

interface PageHeroProps {
  badge: string
  title: string | ReactNode
  subtitle?: string
  size?: "lg" | "md" | "sm"
  children?: ReactNode
}

export function PageHero({ badge, title, subtitle, size = "md", children }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0F2460 0%, #1E3A8A 100%)",
        paddingTop: size === "lg" ? "7rem" : size === "sm" ? "4.5rem" : "6rem",
        paddingBottom: size === "lg" ? "5rem" : size === "sm" ? "3rem" : "4rem",
      }}
    >
      {/* Subtle background texture, no motion */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-6"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: "20px",
            padding: "5px 14px",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green flex-shrink-0" />
          <span className="font-body text-white/80 text-xs font-medium tracking-wide">{badge}</span>
        </div>

        {/* Title */}
        <h1
          className="font-display text-white font-bold leading-tight"
          style={{
            fontSize:
              size === "lg"
                ? "clamp(2.2rem,5vw,3.5rem)"
                : size === "sm"
                ? "clamp(1.6rem,3vw,2.2rem)"
                : "clamp(1.9rem,4vw,2.8rem)",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="font-body leading-relaxed mt-4 text-white/70"
            style={{
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "1rem auto 0",
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Children slot */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}