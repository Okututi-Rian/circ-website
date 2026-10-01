"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

const GA_MEASUREMENT_ID = "G-G0PTNXCJ2Y"
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

type GoogleTag = ((...args: unknown[]) => void) & { loaded?: boolean }
type ClarityTag = ((...args: unknown[]) => void) & { q?: unknown[][] }

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GoogleTag
    clarity?: ClarityTag
  }
}

const PRIVATE_PATHS = [
  "/admin",
  "/admin-entry",
  "/sign-in",
  "/sign-up",
  "/sign-up-success",
  "/access-denied",
]

function isPrivatePath(pathname: string) {
  return PRIVATE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

function loadGoogleAnalytics() {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || []
    const gtag: GoogleTag = (...args) => { window.dataLayer?.push(args) }
    window.gtag = gtag
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
    gtag("js", new Date())
    gtag("config", GA_MEASUREMENT_ID, { send_page_view: false })
  }
  window.gtag("consent", "update", { analytics_storage: "granted" })
  if (!document.getElementById("circ-google-analytics")) {
    const script = document.createElement("script")
    script.id = "circ-google-analytics"
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)
  }
}

function loadClarity() {
  if (!CLARITY_PROJECT_ID) return
  if (!window.clarity) {
    const clarity: ClarityTag = (...args) => {
      clarity.q = clarity.q || []
      clarity.q.push(args)
    }
    window.clarity = clarity
  }
  window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" })
  if (!document.getElementById("circ-microsoft-clarity")) {
    const script = document.createElement("script")
    script.id = "circ-microsoft-clarity"
    script.async = true
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
    document.head.appendChild(script)
  }
}

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (isPrivatePath(pathname)) {
      const trackersLoaded = Boolean(
        document.getElementById("circ-google-analytics") ||
        document.getElementById("circ-microsoft-clarity"),
      )
      if (!trackersLoaded) return

      window.gtag?.("consent", "update", { analytics_storage: "denied" })
      window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" })
      window.clarity?.("consent", false)
      window.location.reload()
      return
    }

    loadGoogleAnalytics()
    loadClarity()
    window.gtag?.("event", "page_view", {
      page_location: new URL(pathname, window.location.origin).href,
      page_title: document.title,
    })
  }, [pathname])

  return null
}
