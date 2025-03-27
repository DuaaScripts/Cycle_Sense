"use client"

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function BackButton({ onClick, speak }) {
  const handleClick = () => {
    speak("Returning to dashboard")
    onClick("dashboard")
  }

  return (
    <Button
      variant="outline"
      className="mb-8 flex items-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-md"
      onClick={handleClick}
      aria-label="Return to dashboard"
    >
      <Home className="h-4 w-4" />
      <span>Back to Dashboard</span>
    </Button>
  )
}

