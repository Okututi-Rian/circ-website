import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api"

export async function GET() {
  try {
    const communities = await prisma.community.findMany({
      include: {
        lead: true,
        _count: {
          select: { events: true }
        }
      }
    })
    return successResponse(communities)
  } catch (error: any) {
    return errorResponse(error.message, 500)
  }
}
