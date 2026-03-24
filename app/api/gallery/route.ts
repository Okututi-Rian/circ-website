import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api"
import { requireAdmin } from "@/lib/auth"
import { gallerySchema } from "@/lib/validators"
import { revalidatePath } from "next/cache"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const eventId = searchParams.get("eventId")

    const images = await prisma.galleryImage.findMany({
      where: eventId ? { eventId } : undefined,
      include: { event: { select: { id: true, title: true } } },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: images ?? [] })
  } catch (err) {
    return NextResponse.json({ success: true, data: [] })
  }
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const body = await req.json()
    const { url, caption, eventId } = body

    if (!url) {
      return NextResponse.json({ success: false, error: "Image URL required" }, { status: 400 })
    }

    const image = await prisma.galleryImage.create({
      data: { url, caption: caption || null, eventId: eventId || null },
    })

    revalidatePath("/gallery")
    return NextResponse.json({ success: true, data: image }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Failed to save image" }, { status: 500 })
  }
}
