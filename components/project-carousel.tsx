"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/types"
import ProjectOverlay from "@/components/project-overlay"

interface ProjectCarouselProps {
  projects: Project[]
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Intersection Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (carouselRef.current) {
      observer.observe(carouselRef.current)
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current)
      }
    }
  }, [])

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      nextSlide()
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      prevSlide()
    }
  }

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const openProjectOverlay = (project: Project) => {
    setSelectedProject(project)
    setShowOverlay(true)
  }

  const closeProjectOverlay = () => {
    setShowOverlay(false)
    setSelectedProject(null)
  }

  // Get the previous, current, and next indices
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length
  const nextIndex = (currentIndex + 1) % projects.length

  return (
    <>
      <div
        className={cn(
          "relative h-[500px] md:h-[600px] w-full overflow-hidden my-12 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0 translate-y-10",
        )}
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Project */}
        <div
          className={cn(
            "absolute top-1/2 left-0 transform -translate-y-1/2 w-[70%] h-[70%] z-10 transition-all duration-500",
            "translate-x-[-30%] scale-75 opacity-50 blur-sm",
            isVisible && "animate-slide-in-left",
          )}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={projects[prevIndex].thumbnail || "/placeholder.svg"}
              alt={projects[prevIndex].title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Current Project */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[60%] h-[80%] z-20 transition-all duration-500",
            "scale-100 opacity-100 cursor-pointer",
            isVisible && "animate-slide-in-up",
          )}
          onClick={() => openProjectOverlay(projects[currentIndex])}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={projects[currentIndex].thumbnail || "/placeholder.svg"}
              alt={projects[currentIndex].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold mb-2">{projects[currentIndex].title}</h3>
              <p className="text-gray-300">{projects[currentIndex].shortDescription}</p>
            </div>
          </div>
        </div>

        {/* Next Project */}
        <div
          className={cn(
            "absolute top-1/2 right-0 transform -translate-y-1/2 w-[70%] h-[70%] z-10 transition-all duration-500",
            "translate-x-[30%] scale-75 opacity-50 blur-sm",
            isVisible && "animate-slide-in-right",
          )}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={projects[nextIndex].thumbnail || "/placeholder.svg"}
              alt={projects[nextIndex].title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Navigation Controls */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/20 backdrop-blur-sm border-0 hover:bg-black/40"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous project</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/20 backdrop-blur-sm border-0 hover:bg-black/40"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next project</span>
        </Button>

        {/* Project Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => {
                setIsTransitioning(true)
                setCurrentIndex(index)
                setTimeout(() => setIsTransitioning(false), 500)
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Project Overlay */}
      {showOverlay && selectedProject && <ProjectOverlay project={selectedProject} onClose={closeProjectOverlay} />}
    </>
  )
}
