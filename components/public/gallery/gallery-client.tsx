"use client"

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { Lightbox } from "./lightbox"
import { cn } from "@/lib/utils"

interface GalleryImage {
  id: string
  url: string
  caption: string | null
  event?: { title: string } | null
}

interface GalleryClientProps {
  images: GalleryImage[]
  eventNames: string[]
}

export function GalleryClient({ images, eventNames }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState("All Photos")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages = images.filter((img) => {
    if (activeFilter === "All Photos") return true
    return img.event?.title === activeFilter
  })

  return (
    <div className="flex flex-col">
      {/* Filter bar */}
      <div className="bg-surface border-b border-border py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 overflow-x-auto no-scrollbar">
          {["All Photos", ...eventNames].map((name) => (
            <button
              key={name}
              onClick={() => setActiveFilter(name)}
              className={cn(
                "font-body text-sm px-5 py-2 rounded-full border border-border transition-all duration-150 whitespace-nowrap",
                activeFilter === name 
                  ? "bg-primary text-white border-primary" 
                  : "text-muted hover:border-primary hover:text-primary"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filteredImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img, index) => (
              <div 
                key={img.id}
                className="relative group overflow-hidden rounded-xl break-inside-avoid cursor-pointer bg-surface-2"
                onClick={() => setLightboxIndex(index)}
              >
                <Image 
                  src={img.url} 
                  alt={img.caption || "Gallery Image"}
                  width={600}
                  height={800}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 rounded-xl">
                  {img.caption && (
                    <p className="font-body text-white text-sm font-medium leading-snug">{img.caption}</p>
                  )}
                  {img.event?.title && (
                    <span className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(56,189,248,0.8)" }}>
                      {img.event.title}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-2 rounded-2xl border border-dashed border-border">
            <p className="font-body text-muted italic">No images found for this category.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox 
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)}
        />
      )}
    </div>
  )
}
