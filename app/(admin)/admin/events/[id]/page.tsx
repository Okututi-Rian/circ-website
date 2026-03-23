import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { EventForm } from "@/components/admin/forms/event-form"

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await prisma.event.findUnique({
    where: { id },
  })

  if (!event) notFound()

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-primary text-2xl font-bold">Edit Event</h1>
        <p className="font-body text-muted text-sm mt-1">Update the event details below.</p>
      </div>
      <EventForm event={event} />
    </div>
  )
}
