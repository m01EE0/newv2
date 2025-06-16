"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectOverlayProps {
  project: Project
  onClose: () => void
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  // Fix scrolling issue and hide navbar by properly managing body overflow and scroll position
  useEffect(() => {
    // Save the current scroll position
    const scrollY = window.scrollY

    // Save the current overflow style
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    const originalTop = document.body.style.top
    const originalWidth = document.body.style.width

    // Hide navbar by adding a class to body
    document.body.classList.add("overlay-open")

    // Prevent scrolling on mount while preserving scroll position
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"

    // Restore scrolling and navbar on unmount
    return () => {
      // Remove navbar hiding class
      document.body.classList.remove("overlay-open")

      // Restore original styles
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.top = originalTop
      document.body.style.width = originalWidth

      // Restore scroll position
      window.scrollTo(0, scrollY)
    }
  }, [])

  const openFullscreen = (image: string) => {
    setFullscreenImage(image)
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  const handleClose = () => {
    onClose()
  }

  // Combine main image with gallery for display
  const allImages = [project.mainImage || project.thumbnail, ...(project.gallery || [])]

  return (
    <>
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">{project.title}</h2>
              <p className="text-gray-300">
                {project.location} • {project.year}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="hover:bg-white/10">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Image Gallery - 3 columns wide */}
            <div className="lg:col-span-3 space-y-6">
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
                  onClick={() => openFullscreen(image)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Project Details - 2 columns wide */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">About this project</h3>
                <p className="text-gray-300 mb-6">{project.description}</p>
              </div>

              {project.features && (
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Features</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-semibold mb-4">Project Details</h3>
                <dl className="grid grid-cols-2 gap-y-4 text-gray-300">
                  <dt className="font-medium">Client</dt>
                  <dd>{project.client}</dd>

                  <dt className="font-medium">Location</dt>
                  <dd>{project.location}</dd>

                  <dt className="font-medium">Year</dt>
                  <dd>{project.year}</dd>

                  <dt className="font-medium">Type</dt>
                  <dd>{project.type}</dd>

                  {project.architect && (
                    <>
                      <dt className="font-medium">Architect</dt>
                      <dd>{project.architect}</dd>
                    </>
                  )}
                </dl>
              </div>

              <Button className="w-full" onClick={handleClose}>
                Close Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image View */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center cursor-pointer"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full">
            <Image src={fullscreenImage || "/placeholder.svg"} alt="Fullscreen view" fill className="object-contain" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 hover:bg-white/10"
              onClick={closeFullscreen}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close fullscreen</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
