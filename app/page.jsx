"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import VoiceRecognition from "@/components/voice-recognition"
import Dashboard from "@/components/dashboard"
import CycleTracker from "@/components/cycle-tracker"
import Reminders from "@/components/reminders"
import MedicineReader from "@/components/medicine-reader"
import BinLocator from "@/components/bin-locator"
import HealthTips from "@/components/health-tips"
import DoctorConnect from "@/components/doctor-connect"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [lastCommand, setLastCommand] = useState("")
  const speechSynthesisRef = useRef(null)
  const isInitialMount = useRef(true)

  // Function to speak text aloud
  const speak = (text) => {
    if (isSpeaking) return

    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    speechSynthesis.speak(utterance)
    speechSynthesisRef.current = utterance
  }

  // Handle navigation with browser history
  const navigateTo = (section) => {
    if (section !== activeSection) {
      // Push new state to history
      window.history.pushState({ section }, "", `#${section}`)
      setActiveSection(section)
    }
  }

  // Handle voice commands
  const handleVoiceCommand = (command) => {
    setLastCommand(command)
    const lowerCommand = command.toLowerCase()

    if (lowerCommand.includes("dashboard") || lowerCommand.includes("home")) {
      navigateTo("dashboard")
      speak("Opening dashboard")
    } else if (lowerCommand.includes("cycle") || lowerCommand.includes("tracker")) {
      navigateTo("cycleTracker")
      speak("Opening cycle tracker")
    } else if (lowerCommand.includes("reminder")) {
      navigateTo("reminders")
      speak("Opening reminders")
    } else if (lowerCommand.includes("medicine") || lowerCommand.includes("label")) {
      navigateTo("medicineReader")
      speak("Opening medicine label reader")
    } else if (lowerCommand.includes("bin") || lowerCommand.includes("locate")) {
      navigateTo("binLocator")
      speak("Opening bin locator")
    } else if (lowerCommand.includes("health") || lowerCommand.includes("tips")) {
      navigateTo("healthTips")
      speak("Opening health tips")
    } else if (lowerCommand.includes("doctor") || lowerCommand.includes("connect")) {
      navigateTo("doctorConnect")
      speak("Opening doctor connection")
    } else if (lowerCommand.includes("help")) {
      speak(
        "Available commands: dashboard, cycle tracker, reminders, medicine reader, bin locator, health tips, and doctor connect",
      )
    } else {
      speak("Sorry, I didn't understand that command. Say help for available commands.")
    }
  }

  // Set up browser history handling
  useEffect(() => {
    // Check if there's a hash in the URL on initial load
    if (window.location.hash) {
      const section = window.location.hash.substring(1)
      const validSections = [
        "dashboard",
        "cycleTracker",
        "reminders",
        "medicineReader",
        "binLocator",
        "healthTips",
        "doctorConnect",
      ]

      if (validSections.includes(section)) {
        setActiveSection(section)
      }
    } else {
      // Set initial history state
      window.history.replaceState({ section: "dashboard" }, "", "#dashboard")
    }

    // Handle browser back/forward buttons
    const handlePopState = (event) => {
      if (event.state && event.state.section) {
        setActiveSection(event.state.section)
        // Optionally announce the navigation
        if (event.state.section === "dashboard") {
          speak("Returned to dashboard")
        } else {
          speak(`Returned to ${event.state.section.replace(/([A-Z])/g, " $1").toLowerCase()}`)
        }
      } else {
        // If no state exists, default to dashboard
        setActiveSection("dashboard")
        window.history.replaceState({ section: "dashboard" }, "", "#dashboard")
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  // Update URL when activeSection changes (except on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // Update URL to reflect current section
    window.history.replaceState({ section: activeSection }, "", `#${activeSection}`)
  }, [activeSection])

  // Welcome message on first load
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")

    if (!hasVisitedBefore) {
      setTimeout(() => {
        speak(
          "Welcome to Cycle Sense, your health assistant. Say dashboard, cycle tracker, reminders, medicine reader, bin locator, health tips, or doctor connect to navigate.",
        )
        localStorage.setItem("hasVisitedBefore", "true")
      }, 1000)
    } else {
      setTimeout(() => {
        speak("Welcome back to Cycle Sense.")
      }, 1000)
    }

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesis.cancel()
      }
    }
  }, [])

  // Render the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onNavigate={navigateTo} speak={speak} />
      case "cycleTracker":
        return <CycleTracker onNavigate={navigateTo} speak={speak} />
      case "reminders":
        return <Reminders onNavigate={navigateTo} speak={speak} />
      case "medicineReader":
        return <MedicineReader onNavigate={navigateTo} speak={speak} />
      case "binLocator":
        return <BinLocator onNavigate={navigateTo} speak={speak} />
      case "healthTips":
        return <HealthTips onNavigate={navigateTo} speak={speak} />
      case "doctorConnect":
        return <DoctorConnect onNavigate={navigateTo} speak={speak} />
      default:
        return <Dashboard onNavigate={navigateTo} speak={speak} />
    }
  }

  return (
    <main className="min-h-screen crimson-bg text-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="sr-only">Health Assistant for Visually Impaired Women</h1>

        <Card className="cream-bg p-6 mb-8 shadow-xl rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-primary flex items-center">
                <span className="inline-block w-3 h-8 bg-primary mr-3 rounded-sm"></span>
                Cycle Sense
              </h2>
              <p className="text-card-foreground/80 mt-1">Voice-driven health management</p>
            </div>
            <VoiceRecognition onCommand={handleVoiceCommand} />
          </div>
          {lastCommand && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p>
                <span className="font-medium text-card-foreground">Last command:</span>{" "}
                <span className="text-card-foreground/80">{lastCommand}</span>
              </p>
            </div>
          )}
        </Card>

        <div className="my-8 cream-bg p-6 rounded-lg shadow-xl">{renderActiveSection()}</div>
      </div>
    </main>
  )
}

