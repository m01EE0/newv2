"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/data"
import ProjectOverlay from "@/components/project-overlay"
import type { Project } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import { setNavigationState } from "@/lib/scroll-utils"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([])

  // Animate projects on load and scroll to top
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      setVisibleProjects(projects)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const openProjectOverlay = (project: Project) => {
    setSelectedProject(project)
    setShowOverlay(true)
  }

  const closeProjectOverlay = () => {
    setShowOverlay(false)
  }

  // Set navigation state when returning to home
  const handleBackToHome = () => {
    setNavigationState("portfolio")
  }

  return (
    <>
      <div className="min-h-screen bg-black pt-24 pb-20 fade-in-element">
        {/* Header */}
        <div className="container mx-auto px-4 mb-16">
          <Link
            href="/#portfolio"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            onClick={handleBackToHome}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="text-white">Projects</span>
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Explore our complete portfolio of architectural visualizations spanning residential, commercial, cultural,
            and mixed-use projects from around the world.
          </p>
        </div>

        {/* Project Grid - Updated to align all cards */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleProjects.map((project, index) => (
              <div
                key={project.id}
                className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg project-grid-item"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => openProjectOverlay(project)}
              >
                <Image
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-gray-300 text-sm">
                    {project.type} • {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Overlay */}
      {showOverlay && selectedProject && <ProjectOverlay project={selectedProject} onClose={closeProjectOverlay} />}
    </>
  )
}
