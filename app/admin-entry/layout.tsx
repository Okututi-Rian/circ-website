import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Admin Entry",
  robots: { index: false, follow: false },
}

export default function AdminEntryLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
