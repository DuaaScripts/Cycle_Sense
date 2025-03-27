"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Plus } from "lucide-react"
import BackButton from "./back-button"

export default function CycleTracker({ speak, onNavigate }) {
  const [cycles, setCycles] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [flow, setFlow] = useState("medium")
  const [symptoms, setSymptoms] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    // Load saved cycles from localStorage
    const savedCycles = localStorage.getItem("menstrualCycles")
    if (savedCycles) {
      setCycles(JSON.parse(savedCycles))
    }

    // Set current date
    const today = new Date()
    setCurrentDate(today.toISOString().split("T")[0])

    // Announce the component
    speak("Cycle tracker loaded. You can log your period, track symptoms, and view your history.")
  }, [speak])

  const saveCycles = (updatedCycles) => {
    localStorage.setItem("menstrualCycles", JSON.stringify(updatedCycles))
    setCycles(updatedCycles)
  }

  const handleAddCycle = () => {
    setShowForm(true)
    speak("Form opened. You can now log your cycle information.")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newCycle = {
      id: Date.now(),
      date: currentDate,
      flow,
      symptoms,
      notes,
    }

    const updatedCycles = [...cycles, newCycle]
    saveCycles(updatedCycles)

    // Reset form
    setFlow("medium")
    setSymptoms("")
    setNotes("")
    setShowForm(false)

    speak("Your cycle information has been saved successfully.")
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleVoiceCommand = (command) => {
    // This would be expanded in a real implementation
    if (command.toLowerCase().includes("add cycle")) {
      handleAddCycle()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-primary flex items-center">
        <span className="inline-block w-2 h-6 bg-primary mr-3 rounded-sm"></span>
        Cycle Tracker
      </h2>
      <p className="mb-8 text-card-foreground/80">
        Track your menstrual cycle and symptoms. Say "add cycle" to log a new entry.
      </p>

      <BackButton onClick={() => onNavigate("dashboard")} speak={speak} />

      <Button
        onClick={handleAddCycle}
        className="mb-8 bg-primary text-white hover:bg-primary/90 shadow-md"
        aria-label="Add new cycle entry"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Cycle Entry
      </Button>

      {showForm && (
        <Card className="p-6 mb-8 border border-muted shadow-lg bg-muted/30">
          <h3 className="text-xl font-bold mb-6 text-primary">Log Cycle Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <Label htmlFor="date" className="text-card-foreground mb-2 block">
                  Date
                </Label>
                <div className="flex items-center bg-white rounded-md border border-muted p-2">
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  <Input
                    id="date"
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    required
                    className="w-full bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-card-foreground"
                  />
                </div>
              </div>

              <div>
                <Label className="text-card-foreground mb-2 block">Flow Intensity</Label>
                <RadioGroup value={flow} onValueChange={setFlow} className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-muted">
                    <RadioGroupItem value="light" id="flow-light" />
                    <Label htmlFor="flow-light" className="text-card-foreground">
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-muted">
                    <RadioGroupItem value="medium" id="flow-medium" />
                    <Label htmlFor="flow-medium" className="text-card-foreground">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-muted">
                    <RadioGroupItem value="heavy" id="flow-heavy" />
                    <Label htmlFor="flow-heavy" className="text-card-foreground">
                      Heavy
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="symptoms" className="text-card-foreground mb-2 block">
                  Symptoms
                </Label>
                <Input
                  id="symptoms"
                  placeholder="Cramps, headache, etc."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full bg-white border border-muted text-card-foreground"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-card-foreground mb-2 block">
                  Notes
                </Label>
                <Input
                  id="notes"
                  placeholder="Any additional notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-muted text-card-foreground"
                />
              </div>

              <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 sm:justify-start pt-2">
                <Button type="submit" className="bg-primary text-white hover:bg-primary/90 shadow-md">
                  Save Entry
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    speak("Form closed.")
                  }}
                  className="bg-white text-primary hover:bg-muted"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      <h3 className="text-xl font-bold mb-6 text-primary">Cycle History</h3>
      {cycles.length > 0 ? (
        <div className="space-y-4">
          {cycles.map((cycle) => (
            <Card key={cycle.id} className="p-5 border border-muted hover:border-primary/30 transition-all shadow-md">
              <div className="flex flex-col">
                <h4 className="font-bold text-primary mb-2">{formatDate(cycle.date)}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-card-foreground/80">
                  <p>
                    <span className="font-medium text-card-foreground">Flow:</span> {cycle.flow}
                  </p>
                  {cycle.symptoms && (
                    <p>
                      <span className="font-medium text-card-foreground">Symptoms:</span> {cycle.symptoms}
                    </p>
                  )}
                  {cycle.notes && (
                    <p>
                      <span className="font-medium text-card-foreground">Notes:</span> {cycle.notes}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-card-foreground/80 p-4 bg-muted/30 rounded-md border border-muted">
          No cycle data recorded yet. Add your first entry to start tracking.
        </p>
      )}
    </div>
  )
}

