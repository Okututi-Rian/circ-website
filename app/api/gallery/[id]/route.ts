import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api"
import { requireAdmin } from "@/lib/auth"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const { id } = await params
    const body = await req.json()
    const image = await prisma.galleryImage.update({
      where: { id },
      data: { caption: body.caption ?? null, eventId: body.eventId || null },
    })
    revalidatePath("/gallery")
    return NextResponse.json({ success: true, data: image })
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const { id } = await params
    await prisma.galleryImage.delete({ where: { id } })
    revalidatePath("/gallery")
    return NextResponse.json({ success: true, message: "Gallery image deleted successfully" })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 })
  }
}
