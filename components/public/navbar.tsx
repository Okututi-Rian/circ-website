'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useAuth, useClerk } from "@clerk/nextjs"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Communities", href: "/communities" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Join", href: "/join" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200"
      style={scrolled ? { boxShadow: "0 2px 12px rgba(30,58,138,0.08)" } : { boxShadow: "none" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between max-w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="CIRC Logo"
              fill
              className="object-contain rounded-lg"
              sizes="32px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-primary text-lg font-bold leading-none">CIRC</span>
            <span className="font-body text-muted text-[10px] leading-none mt-0.5 hidden sm:block">
              Mama Ngina University College
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm transition-colors duration-200"
              style={
                isActive(link.href)
                  ? { color: "#1E3A8A", borderBottom: "2px solid #F97316", paddingBottom: "2px" }
                  : { color: "#6B7280" }
              }
              onMouseEnter={(e) => {
                if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.color = "#1E3A8A"
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.color = "#6B7280"
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isSignedIn && (
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="hidden md:block font-body text-xs text-muted hover:text-red-600 transition-colors mr-2"
            >
              Sign out
            </button>
          )}
          <Link
            href="/join"
            className="hidden md:inline-flex btn-primary text-xs px-4 py-2"
          >
            Apply Now
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-primary p-1 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden bg-white border-b border-border"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 50,
            boxShadow: "0 8px 32px rgba(30,58,138,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-6 py-4 font-body text-sm border-b border-border transition-colors"
              style={{
                color: isActive(link.href) ? "#1E3A8A" : "#374151",
                background: isActive(link.href) ? "#F0F4FF" : "transparent",
                fontWeight: isActive(link.href) ? 600 : 400,
              }}
            >
              {link.name}
            </Link>
          ))}
          <div className="p-4">
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}