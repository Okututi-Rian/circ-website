import Link from "next/link"

export default function MemberNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="font-display text-primary text-3xl font-bold mb-3">Member Not Found</h2>
      <p className="font-body text-muted text-sm mb-6">This member may have been deleted.</p>
      <Link href="/admin/team" className="btn-primary text-sm">Back to Team</Link>
    </div>
  )
}
