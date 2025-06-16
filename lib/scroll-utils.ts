/**
 * Scrolls to a specific section on the page
 * @param sectionId The ID of the section to scroll to
 */
export function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId)

  if (section) {
    // Get the section's position relative to the viewport
    const sectionRect = section.getBoundingClientRect()

    // Calculate the position to scroll to (centered in viewport)
    const scrollPosition = window.scrollY + sectionRect.top - (window.innerHeight - sectionRect.height) / 2

    // Scroll to the calculated position
    window.scrollTo({
      top: scrollPosition,
      behavior: "auto", // Use 'auto' for instant scrolling
    })
  }
}

/**
 * Sets a flag in sessionStorage to indicate we're navigating between pages
 * @param navigatingTo The destination page/section
 */
export function setNavigationState(navigatingTo: string): void {
  sessionStorage.setItem("navigationState", navigatingTo)
}

/**
 * Gets the current navigation state and clears it
 * @returns The current navigation state or null if not set
 */
export function getAndClearNavigationState(): string | null {
  const state = sessionStorage.getItem("navigationState")
  sessionStorage.removeItem("navigationState")
  return state
}
