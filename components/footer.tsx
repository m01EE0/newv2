import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="text-center">
            <Link href="/" className="inline-block mb-4">
              {/* Your actual logo */}
              <Image src="/images/logo.png" alt="Renderra Logo" width={220} height={50} className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 mb-4">
              Creating stunning architectural visualizations that bring designs to life.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Renderra Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
