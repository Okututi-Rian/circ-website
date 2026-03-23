import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { CommunityForm } from "@/components/admin/communities/community-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function AdminEditCommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const community = await prisma.community.findUnique({
    where: { slug },
  })

  if (!community) {
    notFound()
  }

  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/communities" 
          className="flex items-center gap-2 text-xs font-bold text-muted-main hover:text-primary-main transition-colors uppercase tracking-widest w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to communities
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-primary-dark tracking-tight">Configure Community</h1>
          <p className="text-sm text-muted-main mt-1">Customizing the <span className="text-primary-main">{community.name}</span> experience.</p>
        </div>
      </div>

      <CommunityForm community={community} teamMembers={teamMembers} />
    </div>
  )
}
