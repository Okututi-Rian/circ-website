import type { Metadata } from "next"
import { Suspense } from "react"
import { Analytics } from "@/components/analytics"
import { SITE_URL } from "@/lib/seo"
import "./globals.css"
import "@fontsource/jetbrains-mono/400.css"
import "@fontsource/jetbrains-mono/700.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CIRC MNUC | Computing Innovation and Research Club – Mutomo, Gatundu South",
    template: "%s",
  },
  description: "CIRC MNUC is the Computing Innovation and Research Club at Mama Ngina University College, along Kenyatta Road in Mutomo, Gatundu South, Kiambu County, Kenya.",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Computing Innovation & Research Club (CIRC)",
    title: "CIRC MNUC | Computing Innovation and Research Club",
    description: "CIRC MNUC is the Computing Innovation and Research Club at Mama Ngina University College, along Kenyatta Road in Mutomo, Gatundu South, Kiambu County, Kenya.",
    url: "/",
    images: [{ url: "/android-chrome-512x512.png", alt: "CIRC at Mama Ngina University College" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIRC MNUC | Computing Innovation and Research Club",
    description: "Student technology communities, events, and research at Mama Ngina University College, Kenya.",
    images: ["/android-chrome-512x512.png"],
  },
  alternates: { canonical: "/" },
  applicationName: "CIRC",
  keywords: [
    "Computing Innovation and Research Club",
    "CIRC Kenya",
    "Mama Ngina University College",
    "MNUC technology club",
    "Kenyatta University constituent college",
    "School of Pure and Applied Sciences SPAS",
    "computer science and information technology Kenya",
    "software development, AI, data science, cybersecurity",
  ],
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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Computing Innovation & Research Club (CIRC)",
              alternateName: ["CIRC MNUC", "CIRC", "Computer Science Club", "MNUC Computer Science Club"],
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              email: "circ@mnu.ac.ke",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Along Kenyatta Road, Mutomo",
                addressLocality: "Gatundu South",
                addressRegion: "Kiambu County",
                postalCode: "01030",
                addressCountry: "KE",
              },
              description: "A student computing, technology, innovation, and research club at Mama Ngina University College in Kenya.",
              parentOrganization: {
                "@type": "CollegeOrUniversity",
                name: "Mama Ngina University College",
                url: "https://mnu.ac.ke/",
              },
              knowsAbout: ["Computing", "Software development", "Artificial intelligence", "Data science", "Cybersecurity", "Internet of Things", "Technology research"],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Computing Innovation & Research Club (CIRC)",
              url: SITE_URL,
              inLanguage: "en-KE",
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
