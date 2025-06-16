"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          "group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500",
          className,
        )}
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {project.shortDescription}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group"
          >
            View Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl glass-dark">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="text-gray-300">
              {project.location} • {project.year}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image src={project.mainImage || project.thumbnail} alt={project.title} fill className="object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-2">About this project</h4>
                <p className="text-gray-300 mb-4">{project.description}</p>

                {project.features && (
                  <>
                    <h4 className="text-lg font-semibold mb-2">Features</h4>
                    <ul className="list-disc list-inside text-gray-300 mb-4">
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Project Details</h4>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-gray-400">Client:</dt>
                  <dd>{project.client}</dd>

                  <dt className="text-gray-400">Location:</dt>
                  <dd>{project.location}</dd>

                  <dt className="text-gray-400">Year:</dt>
                  <dd>{project.year}</dd>

                  <dt className="text-gray-400">Type:</dt>
                  <dd>{project.type}</dd>

                  {project.architect && (
                    <>
                      <dt className="text-gray-400">Architect:</dt>
                      <dd>{project.architect}</dd>
                    </>
                  )}
                </dl>
              </div>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4">Gallery</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
