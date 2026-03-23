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

export async function POST(req: NextRequest) {
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const body = await req.json()
    const validatedData = gallerySchema.parse(body)

    const image = await prisma.galleryImage.create({
      data: validatedData,
    })

    revalidatePath("/gallery")

    return successResponse(image, 201)
  } catch (error: any) {
    return errorResponse(error.message, error.name === "ZodError" ? 400 : 500)
  }
}
