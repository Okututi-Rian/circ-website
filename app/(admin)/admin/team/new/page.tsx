import { TeamForm } from "@/components/admin/forms/team-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/team" 
          className="flex items-center gap-2 text-xs font-bold text-muted-main hover:text-primary-main transition-colors uppercase tracking-widest w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to team
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-primary-dark tracking-tight">Add Team Member</h1>
          <p className="text-sm text-muted-main mt-1">Register a new leader or community lead for CIRC.</p>
        </div>
      </div>

      <TeamForm />
    </div>
  )
}
