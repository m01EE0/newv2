"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Layers, PenTool, Eye, Mail } from "lucide-react"
import { projects } from "@/lib/data"
import ProjectCarousel from "@/components/project-carousel"
import HeroCarousel from "@/components/hero-carousel"
import { scrollToSection, getAndClearNavigationState } from "@/lib/scroll-utils"

export default function Home() {
  const animatedElementsRef = useRef<HTMLElement[]>([])
  const isReturningFromOtherPage = useRef(false)

  useEffect(() => {
    // Check if we're returning from another page
    const navigationState = getAndClearNavigationState()
    isReturningFromOtherPage.current = !!navigationState

    // If returning from another page, immediately show all elements in their final state
    if (isReturningFromOtherPage.current) {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        el.classList.add("visible")
      })

      document.querySelectorAll(".fade-in").forEach((el) => {
        const element = el as HTMLElement
        element.style.opacity = "1"
      })

      // Scroll to the appropriate section if needed
      if (navigationState) {
        setTimeout(() => {
          scrollToSection(navigationState)
        }, 100)
      }
    } else {
      // Normal animation behavior for first visit
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible")
            }
          })
        },
        { threshold: 0.1 },
      )

      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => {
        observer.observe(el)
        animatedElementsRef.current.push(el as HTMLElement)
      })

      // Check if there's a hash in the URL and scroll to that section
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1)
        setTimeout(() => {
          scrollToSection(sectionId)
        }, 100)
      }

      return () => {
        elements.forEach((el) => observer.unobserve(el))
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Full height with video carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroCarousel />
        <div className="absolute left-8 bottom-0 z-20">
          <p
            className={`text-xs tracking-widest uppercase opacity-70 transform -rotate-90 origin-bottom-left translate-y-[-1rem] animate-on-scroll ${isReturningFromOtherPage.current ? "visible" : ""}`}
            style={{ transformOrigin: "left bottom" }}
          >
            Architectural Visualization
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 vertical-gradient-section fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 animate-on-scroll tracking-tight">
              Crafting Visual <span className="text-white">Experiences</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-6 animate-on-scroll stagger-delay-1 max-w-3xl mx-auto">
              We are a boutique architectural visualization studio dedicated to transforming architectural concepts into
              compelling visual narratives. Our team combines technical expertise with artistic vision to create
              stunning visualizations that communicate the essence of your design.
            </p>
            <Link href="/about">
              <Button variant="outline" size="lg" className="animate-on-scroll stagger-delay-3 group">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 vertical-gradient-section fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-on-scroll">
              Our <span className="text-white">Services</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto animate-on-scroll stagger-delay-1">
              We offer a comprehensive range of visualization services to meet the diverse needs of architects,
              developers, and designers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px] animate-on-scroll">
              <div className="bg-white/10 p-3 rounded-full w-fit mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">3D Exterior Rendering</h3>
              <p className="text-gray-300">
                Photorealistic exterior visualizations that showcase your building in its environment with perfect
                lighting and atmosphere.
              </p>
            </div>

            <div className="glass rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px] animate-on-scroll stagger-delay-1">
              <div className="bg-white/10 p-3 rounded-full w-fit mb-4">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">3D Interior Rendering</h3>
              <p className="text-gray-300">
                Immersive interior visualizations that communicate spatial qualities, materials, and lighting with
                stunning realism.
              </p>
            </div>

            <div className="glass rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px] animate-on-scroll stagger-delay-2">
              <div className="bg-white/10 p-3 rounded-full w-fit mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Virtual Reality</h3>
              <p className="text-gray-300">
                Interactive VR experiences that allow clients to explore and interact with your designs before they're
                built.
              </p>
            </div>

            <div className="glass rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px] animate-on-scroll stagger-delay-3">
              <div className="bg-white/10 p-3 rounded-full w-fit mb-4">
                <PenTool className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Animation & Film</h3>
              <p className="text-gray-300">
                Cinematic architectural animations that tell the story of your project through carefully crafted
                sequences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 vertical-gradient-section fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-on-scroll">
              Featured <span className="text-white">Projects</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto animate-on-scroll stagger-delay-1">
              Explore our portfolio of architectural visualizations spanning residential, commercial, and cultural
              projects.
            </p>
          </div>

          <ProjectCarousel projects={projects} />

          <div className="text-center mt-12 animate-on-scroll">
            <Link href="/projects">
              <Button size="lg" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 vertical-gradient-section fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto glass-dark rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
              Let's <span className="text-white">Connect</span>
            </h2>
            <p className="text-gray-300 mb-8 animate-on-scroll stagger-delay-1">
              Ready to bring your architectural vision to life? Contact us to discuss your project and discover how our
              visualization services can help you communicate your design.
            </p>

            <a
              href="mailto:contact@renderra.agency"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors animate-on-scroll stagger-delay-2 group"
            >
              <Mail className="mr-3 h-5 w-5" />
              contact@renderra.agency
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
