import { NextRequest } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api"
import { requireAdmin } from "@/lib/auth"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { error } = await requireAdmin()
    if (error) return error
    const body = await req.json()

    const updated = await prisma.galleryImage.update({
      where: { id },
      data: {
        caption: body.caption ?? undefined,
        eventId: body.eventId !== undefined ? (body.eventId || null) : undefined,
      },
    })

    revalidatePath("/gallery")
    return successResponse(updated)
  } catch (error: any) {
    return errorResponse(error.message, 500)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { error } = await requireAdmin()
    if (error) return error
    await prisma.galleryImage.delete({ where: { id } })
    revalidatePath("/gallery")
    return successResponse({ message: "Gallery image deleted successfully" })
  } catch (error: any) {
    return errorResponse(error.message, 500)
  }
}
