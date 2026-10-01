import { Navbar } from "@/components/public/navbar"
import { Footer } from "@/components/public/footer"
import Script from "next/script"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="public-site min-h-screen flex flex-col bg-white">
      <Script
        id="google-preferred-sources"
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="afterInteractive"
      />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
