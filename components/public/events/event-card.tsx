import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { cn, stripHtml } from "@/lib/utils"

interface EventCardProps {
  id: string
  title: string
  description: string
  date: Date
  coverImage: string
  type: string
}

export function EventCard({ id, title, description, date, coverImage, type }: EventCardProps) {
  const typeKey = type.toLowerCase()
  const badgeClass = `badge-type-${typeKey}`

  return (
    <div className="card group flex-shrink-0 w-[300px] overflow-hidden p-0 h-full flex flex-col">
      {/* Cover image wrapper */}
      <div className="relative h-44 overflow-hidden" suppressHydrationWarning>
        <Image 
          src={coverImage} 
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block bg-accent-orange text-white font-body text-[10px] font-bold px-2 py-0.5 rounded">
            {format(date, "MMM dd")}
          </span>
          <span className={cn("uppercase text-[10px] font-bold px-2 py-0.5 rounded-full", badgeClass)}>
            {type}
          </span>
        </div>
        
        <h3 className="font-display text-primary text-base font-semibold mt-2 mb-1 line-clamp-2 min-h-[3rem]">
          {title}
        </h3>
        
        <p className="font-body text-muted text-sm line-clamp-2 mb-4">
          {stripHtml(description).slice(0, 120)}...
        </p>

        <Link 
          href={`/events/${id}`}
          className="font-body text-accent-orange text-sm font-medium flex items-center gap-1 mt-auto"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}
