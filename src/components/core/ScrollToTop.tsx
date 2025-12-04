import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * A floating "scroll to top" button that appears when the user scrolls down.
 * Smoothly scrolls to the top of the page when clicked.
 */
export function ScrollToTop() {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 300px
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", toggleVisibility, { passive: true })

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-6 right-6 z-50 shadow-lg transition-all duration-300",
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
            )}
            aria-label="Scroll to top"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="m18 15-6-6-6 6" />
            </svg>
        </Button>
    )
}

export default ScrollToTop
