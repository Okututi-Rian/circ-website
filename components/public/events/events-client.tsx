"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { format, isAfter, isSameDay } from "date-fns"
import { EventCard } from "./event-card"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  coverImage: string
  type: string
}

interface EventsClientProps {
  events: Event[]
}

export function EventsClient({ events }: EventsClientProps) {
  const [activeTab, setActiveTab] = useState<string>("ALL")
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null)

  const now = new Date()
  const upcomingEvents = events.filter(e => isAfter(new Date(e.date), now) || isSameDay(new Date(e.date), now))
  const featuredEvent = upcomingEvents[0]

  useEffect(() => {
    if (!featuredEvent) return

    const timer = setInterval(() => {
      const distance = new Date(featuredEvent.date).getTime() - new Date().getTime()
      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft(null)
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [featuredEvent])

  const filteredEvents = events.filter(e => {
    if (activeTab === "ALL") return true
    return e.type === activeTab
  })

  const types = ["ALL", "HACKATHON", "WORKSHOP", "TALK", "MENTORSHIP", "RESEARCH"]

  return (
    <div className="flex flex-col">
      {/* Featured upcoming event banner */}
      {featuredEvent && (
        <section className="relative h-96 overflow-hidden">
          <Image 
            src={featuredEvent.coverImage} 
            alt={featuredEvent.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center text-white">
            <span className={cn("badge-type-hackathon mb-4 inline-block bg-accent-orange text-white border-none", `badge-type-${featuredEvent.type.toLowerCase()}`)}>
              Featured: {featuredEvent.type}
            </span>
            <h1 className="font-display text-white text-4xl md:text-5xl font-bold mb-3">
              {featuredEvent.title}
            </h1>
            <div className="font-body text-white/80 text-sm flex items-center gap-4 mb-6">
              <span>{format(new Date(featuredEvent.date), "MMMM dd, yyyy")}</span>
              <span>•</span>
              <span>MNU Main Hall</span>
            </div>

            {timeLeft && (
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { label: "Days", val: timeLeft.d },
                  { label: "Hours", val: timeLeft.h },
                  { label: "Mins", val: timeLeft.m },
                  { label: "Secs", val: timeLeft.s },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <div className="font-mono text-white text-3xl md:text-4xl font-bold tabular-nums bg-white/10 rounded-lg px-4 py-3 min-w-[72px] text-center">
                      {String(unit.val).padStart(2, "0")}
                    </div>
                    <span className="font-body text-white/60 text-[10px] mt-2 uppercase tracking-wider">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            <a href={featuredEvent.id} className="btn-primary-lg">
              Register Now
            </a>
          </div>
        </section>
      )}

      {/* Filter controls */}
      <div className="bg-surface border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-3 overflow-x-auto no-scrollbar">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={cn(
                "font-body text-sm px-5 py-2 rounded-full border border-border transition-all duration-150 whitespace-nowrap",
                activeTab === type 
                  ? "bg-primary text-white border-primary" 
                  : "text-muted hover:border-primary hover:text-primary"
              )}
            >
              {type === "ALL" ? "All Events" : type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-2 rounded-2xl border border-dashed border-border">
            <p className="font-body text-muted italic">No events found matching this filter.</p>
          </div>
        )}
      </section>
    </div>
  )
}
