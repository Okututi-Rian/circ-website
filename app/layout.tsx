import type { Metadata } from "next"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@/components/analytics"
import "./globals.css"
import "@fontsource/jetbrains-mono/400.css"
import "@fontsource/jetbrains-mono/700.css"

export const metadata: Metadata = {
  title: "CIRC — Computing Innovation & Research Club",
  description: "Empowering students with practical computing, innovation, and research skills at Mama Ngina University College.",
  applicationName: "CIRC",
  keywords: ["CIRC", "Computing Innovation and Research Club", "Mama Ngina University College", "student technology club"],
  authors: [{ name: "Computing Innovation & Research Club" }],
  creator: "Computing Innovation & Research Club",
  publisher: "Computing Innovation & Research Club",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "CIRC — Computing Innovation & Research Club",
    title: "CIRC — Computing Innovation & Research Club",
    description: "Empowering students with practical computing, innovation, and research skills at Mama Ngina University College.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CIRC — Computing Innovation & Research Club",
    description: "Empowering students with practical computing, innovation, and research skills at Mama Ngina University College.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" data-scroll-behavior="smooth">
        <head>
          <link
            href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-body antialiased">
          {children}
        </body>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </html>
    </ClerkProvider>
  )
}
