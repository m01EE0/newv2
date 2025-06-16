"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Hero carousel videos - updated order with new second video
  const videos = [
    {
      src: "/videos/hero-2.mp4", // New video now in first position
      alt: "Renderra architectural visualization 1",
    },
    {
      src: "/videos/hero-1.mp4", // Original first video now in second position
      alt: "Renderra architectural visualization 2",
    },
    {
      src: "/videos/hero-3.mp4", // Third video stays the same
      alt: "Renderra architectural visualization 3",
    },
  ]

  // Start the automatic 5-second interval
  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 5000) // 5 seconds as requested
  }

  // Play current video
  const playCurrentVideo = () => {
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo) {
      currentVideo.currentTime = 0
      currentVideo.play().catch((error) => {
        console.log("Video play prevented:", error)
      })
    }
  }

  // Instant transition function - no delays or transitions
  const nextSlide = () => {
    // Pause current video immediately
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo) {
      currentVideo.pause()
    }

    // Switch to next video instantly
    const nextIndex = (currentIndex + 1) % videos.length
    setCurrentIndex(nextIndex)

    // Play next video immediately
    const nextVideo = videoRefs.current[nextIndex]
    if (nextVideo) {
      nextVideo.currentTime = 0
      nextVideo.play().catch((error) => {
        console.log("Next video play prevented:", error)
      })
    }
  }

  const goToSlide = (index: number) => {
    if (index === currentIndex) return

    // Clear the automatic interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Pause current video immediately
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo) {
      currentVideo.pause()
    }

    // Switch to selected video instantly
    setCurrentIndex(index)

    // Play selected video immediately
    const selectedVideo = videoRefs.current[index]
    if (selectedVideo) {
      selectedVideo.currentTime = 0
      selectedVideo.play().catch((error) => {
        console.log("Selected video play prevented:", error)
      })
    }

    // Restart the automatic interval
    startInterval()
  }

  // Initialize carousel when component mounts
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsReady(true)
      playCurrentVideo()
      startInterval()
    }, 1000) // Give videos time to load

    return () => {
      clearTimeout(initTimer)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Play video when currentIndex changes
  useEffect(() => {
    if (isReady) {
      playCurrentVideo()
    }
  }, [currentIndex, isReady])

  return (
    <div className="absolute inset-0 z-0">
      {videos.map((video, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0",
            // No transitions - instant show/hide
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <video
            ref={(el) => {
              videoRefs.current[index] = el
            }}
            src={video.src}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            onError={(e) => {
              console.error(`Error loading video ${index}:`, e)
            }}
          />

          {/* Show loading only if not ready and is current video */}
          {!isReady && index === currentIndex && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      ))}

      {/* Enhanced indicator dots with 5-second progress */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 z-30 flex flex-col space-y-4">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative transition-all duration-300 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={`Go to video ${index + 1}`}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-white w-2 h-8 shadow-lg shadow-white/30" : "bg-white/40 hover:bg-white/70",
              )}
            />

            {/* 5-second progress indicator */}
            {index === currentIndex && isReady && (
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="w-full h-8 bg-white/10 rounded-full">
                  <div
                    className="h-full bg-gradient-to-t from-white/40 to-white/80 rounded-full origin-bottom"
                    style={{
                      animation: "progress-fill 5s linear infinite",
                      transformOrigin: "bottom",
                    }}
                  />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
