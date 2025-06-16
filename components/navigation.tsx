"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }

      // Hide navbar when scrolling - use a smaller threshold for inner pages
      const isInnerPage = window.location.pathname !== "/"
      const threshold = isInnerPage ? 50 : window.innerHeight * 0.8
      const currentScroll = window.scrollY

      if (currentScroll > threshold) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  // Check if overlay is open
  const isOverlayOpen = typeof document !== "undefined" && document.body.classList.contains("overlay-open")

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        "bg-transparent py-5",
        "border-0",
        hidden || isOverlayOpen ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {/* Your actual logo */}
            <Image src="/images/logo.png" alt="Renderra Logo" width={220} height={50} className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-white hover:text-accent transition-colors">
              About
            </Link>
            <Link href="#portfolio" className="text-white hover:text-accent transition-colors">
              Portfolio
            </Link>
            <Link href="#contact" className="text-white hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
