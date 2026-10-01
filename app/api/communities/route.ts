import { prisma } from "@/lib/prisma"
import { getPublicCached } from "@/lib/redis-cache"
import { successResponse, errorResponse } from "@/lib/api"

export async function GET() {
  try {
    const communities = await getPublicCached("api:communities:with-leads-count", () => prisma.community.findMany({
      include: {
        lead: true,
        _count: {
          select: { events: true }
        }
      }
    }))
    return successResponse(communities)
  } catch (error: any) {
    return errorResponse(error.message, 500)
  }
}
