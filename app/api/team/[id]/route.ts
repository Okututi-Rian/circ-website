import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const member = await prisma.teamMember.findUnique({ where: { id } })
    if (!member) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    return NextResponse.json({ success: true, data: member })
  } catch {
    return NextResponse.json({ success: false, error: "Failed" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { error } = await requireAdmin()
    if (error) return error
    const body = await req.json()

    // community field: if empty string convert to null
    if (body.community === "") body.community = null
    if (body.community === "NONE") body.community = null

    const member = await prisma.teamMember.update({
      where: { id },
      data: body,
    })

    revalidatePath("/team")
    revalidatePath("/")
    revalidatePath("/admin/team")

    return NextResponse.json({ success: true, data: member })
  } catch (err: any) {
    console.error("PATCH team error:", err)
    if (err.message === "Unauthorized" || err.message === "Forbidden") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: "Failed to update member" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { error } = await requireAdmin()
    if (error) return error

    await prisma.teamMember.delete({ where: { id } })

    revalidatePath("/team")
    revalidatePath("/")
    revalidatePath("/admin/team")

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("DELETE team error:", err)
    if (err.message === "Unauthorized" || err.message === "Forbidden") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 })
  }
}
