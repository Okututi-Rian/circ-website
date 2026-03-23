import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

export function formatRole(role: string): string {
  const map: Record<string, string> = {
    CHAIRPERSON: "Chairperson",
    VICE_CHAIRPERSON: "Vice Chairperson",
    SECRETARY: "Secretary",
    TREASURER: "Treasurer",
    EVENT_ORGANIZER: "Event Organizer",
    COMMUNITY_LEAD: "Community Lead",
    COMMUNITY_CO_LEADER: "Community Co-Leader",
  }
  return map[role] ?? role
}
