import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { Sidebar } from "@/components/admin/sidebar"
import { Topbar } from "@/components/admin/topbar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId, orgSlug } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const adminOrgSlug = process.env.ADMIN_ORG_SLUG ?? "circ-admin-1774191169338462679"
  if (orgSlug !== adminOrgSlug) {
    redirect("/?error=unauthorized")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-2">
      {/* Sidebar — fixed width, full height */}
      <aside className="w-60 flex-shrink-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Main area — fills remaining space, scrolls independently */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
