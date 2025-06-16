"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, ArrowRight } from "lucide-react"
import { setNavigationState } from "@/lib/scroll-utils"

export default function AboutPage() {
  const animatedElementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)

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

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Set navigation state when returning to home
  const handleBackToHome = () => {
    setNavigationState("about")
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 fade-in-element">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <Link
          href="/#about"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          onClick={handleBackToHome}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to About Section
        </Link>
      </div>

      {/* Hero Section */}
      <section className="about-section py-12 md:py-20 vertical-gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-on-scroll">
                About <span className="text-white">Renderra</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6 animate-on-scroll stagger-delay-1">
                Our mission is to transform architectural concepts into compelling visual narratives that communicate
                the essence of design. We believe in the power of visualization to inspire, inform, and influence.
              </p>
            </div>
            <div className="about-image animate-on-scroll stagger-delay-3">
              <div className="aspect-[4/3] relative flex items-center justify-center">
                <Image src="/images/logo-render.png" alt="Renderra 3D Logo" fill className="object-contain scale-110" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 vertical-gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-on-scroll">
            Our <span className="text-white">Approach</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass rounded-lg p-8 transition-all duration-300 hover:translate-y-[-5px] animate-on-scroll">
              <h3 className="text-xl font-bold mb-4">Understanding</h3>
              <p className="text-gray-300">
                We begin by deeply understanding your project's vision, goals, and unique challenges. This foundation
                allows us to create visualizations that truly represent your design intent.
              </p>
            </div>

            <div className="glass rounded-lg p-8 transition-all duration-300 hover:translate-y-[-5px] animate-on-scroll stagger-delay-1">
              <h3 className="text-xl font-bold mb-4">Craftsmanship</h3>
              <p className="text-gray-300">
                Our team combines technical expertise with artistic sensibility to craft images that are not just
                accurate representations but emotionally resonant visual experiences.
              </p>
            </div>

            <div className="glass rounded-lg p-8 transition-all duration-300 hover:translate-y-[-5px] animate-on-scroll stagger-delay-2">
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-300">
                We continuously explore new technologies and techniques to push the boundaries of what's possible in
                architectural visualization, from real-time rendering to immersive VR experiences.
              </p>
            </div>
          </div>

          {/* Contact Us button below Our Approach */}
          <div className="mt-12 text-center">
            <Link href="/#contact" onClick={handleBackToHome}>
              <Button size="lg" className="animate-on-scroll">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 vertical-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto glass-dark rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
              Get in <span className="text-white">Touch</span>
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
