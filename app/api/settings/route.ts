import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({ where: { id: "singleton" } })
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: "singleton" }
      })
    }
    return NextResponse.json({ success: true, data: settings })
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const body = await req.json()
    const settings = await prisma.settings.upsert({
      where: { id: "singleton" },
      update: body,
      create: { id: "singleton", ...body },
    })
    revalidatePath("/")
    revalidatePath("/communities")
    revalidatePath("/events")
    revalidatePath("/team")
    revalidatePath("/gallery")
    return NextResponse.json({ success: true, data: settings })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 })
  }
}
