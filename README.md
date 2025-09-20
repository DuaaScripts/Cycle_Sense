Cycle Sense
Cycle Sense is a voice-controlled menstrual cycle tracking app designed for visually impaired women. Powered by AI, it predicts cycles, ovulation, and fertility windows, offering voice-activated symptom logging, personalized insights, community wellness tips, and secure local storage (with planned Supabase integration). The app ensures accessibility with voice-guided navigation, audio reminders, and WCAG-compliant design.
Features

Voice-Controlled Navigation: Web Speech API enables hands-free operation with speech recognition and text-to-speech.
Cycle Tracking: Log symptoms (e.g., cramps, mood) and review cycle history via audio feedback.
Medication Management: Simulated OCR for reading medicine labels aloud, with dosage reminders.
Bin Locator: Geolocation-based audio directions to accessible sanitary facilities.
Health Tips: Voice-searchable, audio-delivered health advice in simple language.
Doctor Connect: Accessible interface for finding and booking women’s health appointments.

Technology Stack
Frontend

Next.js: React framework for server-side rendering and routing.
React: Component-based UI with hooks (useState, useEffect, useRef).
JavaScript (ES6+): Modern syntax for dynamic functionality.
Tailwind CSS: Utility-first styling with responsive design.
shadcn/ui: Accessible component library built on Radix UI.
CSS Variables: Dynamic theming and WCAG-compliant contrast.

Accessibility

Web Speech API: SpeechSynthesis for audio feedback, SpeechRecognition for voice commands.
ARIA Attributes: Enhanced screen reader support.
Semantic HTML: Proper structure for accessibility.
Focus Management: Keyboard navigation and focus indicators.

APIs & Storage

LocalStorage: Persistent data storage.
Geolocation API: For bin locator.
MediaDevices/Canvas API: For simulated medicine label reading.
History API: Browser navigation and URL hash routing.

Development Practices

Component-Based Architecture: Modular, reusable components.
Performance: Lazy loading, memoization, event debouncing.
Testing: Responsive and accessibility testing for screen reader compatibility.

Security

Local data storage for privacy.
Input sanitization to prevent injection attacks.
Planned Supabase integration for secure cloud sync.

Future Roadmap

Short-Term: User accounts, offline mode, improved voice recognition.
Medium-Term: AI health predictions, healthcare provider integration, community features.
Long-Term: Multi-language support, wearable device integration, expanded disability accommodations.

Setup Instructions

Clone the repository: git clone <repo-url>
Install dependencies: npm install
Run locally: npm run dev
Access at http://localhost:3000

Usage

Use voice commands like "Open Cycle Tracker" or "Add Cycle" for navigation and logging.
Explore features via voice or touch, with audio feedback for all actions.
Review cycle data, health tips, or appointments through audio readback.

Notes

Designed for visually impaired users with high-contrast UI and large touch targets.
Prototype uses simulated OCR for medicine reading; production version will integrate full OCR.
Offline functionality planned for future releases.
