import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { TeamForm } from "@/components/admin/forms/team-form"

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const member = await prisma.teamMember.findUnique({
    where: { id },
  })

  if (!member) notFound()

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-primary text-2xl font-bold">Edit Team Member</h1>
        <p className="font-body text-muted text-sm mt-1">Update member details below.</p>
      </div>
      <TeamForm member={member} />
    </div>
  )
}
