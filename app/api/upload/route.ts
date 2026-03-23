import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { uploadToImageKit } from "@/lib/imagekit"

export async function POST(req: NextRequest) {
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Clean filename — remove spaces, special chars
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    
    const url = await uploadToImageKit(buffer, cleanName, "/circ")

    return NextResponse.json({ success: true, url })
  } catch (err) {
    console.error("Upload error:", err)
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 })
  }
}
