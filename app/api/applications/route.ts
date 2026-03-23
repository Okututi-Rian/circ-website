import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const applications = await prisma.application.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { submittedAt: "desc" },
    })

    return NextResponse.json({ success: true, data: applications })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  // No auth — public endpoint
  try {
    const body = await req.json()
    const application = await prisma.application.create({ data: body })
    return NextResponse.json({ success: true, data: application }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
  }
}
