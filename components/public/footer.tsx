import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Github, Twitter, Instagram, Linkedin } from "lucide-react"

export async function Footer() {
  const settings = await prisma.settings.findUnique({
    where: { id: "singleton" },
  })

  const communities = await prisma.community.findMany({
    select: { name: true, slug: true },
    take: 6,
  })

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Communities", href: "/communities" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
    { name: "Join", href: "/join" },
  ]

  return (
    <footer
      className="w-full"
      style={{ background: "#020818", borderTop: "1px solid rgba(56,189,248,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="CIRC Logo"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="font-display text-white text-xl font-bold">CIRC</span>
          </div>
          <p className="font-body italic text-[#38BDF8] text-sm mt-3 leading-relaxed">
            &ldquo;Inspiring Innovation, Driving Progress and Creating a Brighter Future.&rdquo;
          </p>
          <p className="font-body text-white/30 text-xs mt-2 leading-relaxed">
            {settings?.aboutText || "Computing Innovation and Research Club — Mama Ngina University College."}
          </p>
        </div>

        {/* Column 2 — Navigation */}
        <div>
          <p className="font-mono text-[#38BDF8] text-[9px] tracking-widest uppercase mb-4">
            NAVIGATION
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-white/40 text-sm hover:text-white/80 transition-colors block mb-2"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Column 3 — Communities */}
        <div>
          <p className="font-mono text-[#38BDF8] text-[9px] tracking-widest uppercase mb-4">
            OUR HUBS
          </p>
          {communities.map((c) => (
            <Link
              key={c.slug}
              href={`/communities/${c.slug}`}
              className="font-body text-white/40 text-sm hover:text-white/80 transition-colors block mb-2"
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Column 4 — Connect */}
        <div>
          <p className="font-mono text-[#38BDF8] text-[9px] tracking-widest uppercase mb-4">
            GET IN TOUCH
          </p>
          <p className="font-body text-white/40 text-sm mb-4">
            {settings?.contactEmail || "circ@mnu.ac.ke"}
          </p>
          <div className="flex items-center gap-3 mt-3">
            {[
              { href: settings?.github || "#", Icon: Github, label: "GitHub" },
              { href: settings?.twitter || "#", Icon: Twitter, label: "Twitter" },
              { href: settings?.instagram || "#", Icon: Instagram, label: "Instagram" },
              { href: settings?.linkedin || "#", Icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
                style={{
                  background: "rgba(56,189,248,0.05)",
                  border: "1px solid rgba(56,189,248,0.1)",
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 mt-0 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(56,189,248,0.06)", paddingTop: "1.5rem" }}
      >
        <span className="font-mono text-[9px] tracking-widest text-white/20">
          © {new Date().getFullYear()} CIRC — MAMA NGINA UNIVERSITY COLLEGE
        </span>
        <span className="font-mono text-[9px] tracking-widest text-white/20">
          AY 2025/26 // ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  )
}
