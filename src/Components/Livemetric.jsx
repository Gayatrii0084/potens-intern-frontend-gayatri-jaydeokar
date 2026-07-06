import { useState, useEffect } from "react"

// ── Deadline: 11:00 AM today ─────────────────────────────────────────────────
function getDeadlineMs() {
  const d = new Date()
  d.setHours(11, 0, 0, 0)
  return d.getTime()
}

/** Returns whole seconds remaining until the deadline, floored at 0. */
function getRemainingSeconds() {
  return Math.max(0, Math.floor((getDeadlineMs() - Date.now()) / 1000))
}

/** Zero-pad a number to 2 digits. */
function pad(n) {
  return String(n).padStart(2, "0")
}

// ── UI strings — English and Marathi ────────────────────────────────────────
const STRINGS = {
  en: {
    heading:  "NEXT REVIEW DEADLINE",
    live:     "LIVE",
    hr:       "HR",
    min:      "MIN",
    sec:      "SEC",
    support:  "Time left to review today's pending cases",
    footer:   "Review before 11:00 AM",
    urgency: {
      plenty:  "Plenty of time remaining",
      closing: "Review window closing soon",
      urgent:  "Review required soon",
    },
  },
  mr: {
    heading:  "पुढील आढावा मुदत",
    live:     "थेट",
    hr:       "तास",
    min:      "मिनिट",
    sec:      "सेकंद",
    support:  "आजच्या प्रलंबित प्रकरणांचा आढावा घेण्यासाठी उरलेला वेळ",
    footer:   "सकाळी ११:०० पूर्वी आढावा घ्या",
    urgency: {
      plenty:  "पुरेसा वेळ शिल्लक आहे",
      closing: "आढावा वेळ लवकरच संपेल",
      urgent:  "लवकरच आढावा आवश्यक",
    },
  },
}

// ── Urgency thresholds ────────────────────────────────────────────────────────
function getUrgencyKey(seconds) {
  if (seconds > 3600) return "plenty"   // > 1 hour
  if (seconds > 900)  return "closing"  // 15 min – 1 hour
  return "urgent"                       // < 15 min
}

const URGENCY_COLOR = {
  plenty:  "text-green-400",
  closing: "text-amber-400",
  urgent:  "text-red-400",
}

// ── Component ─────────────────────────────────────────────────────────────────
/**
 * LiveMetric — deadline countdown to the 11:00 AM review window.
 *
 * Props:
 *   lang: "en" | "mr"  — driven by the Header language toggle via App.
 */
function LiveMetric({ lang = "en" }) {
  const [remaining, setRemaining] = useState(getRemainingSeconds)

  useEffect(() => {
    // Tick every second — calculates from wall-clock time so it stays accurate
    // even if the tab is backgrounded and the interval skips a beat.
    const id = setInterval(() => {
      setRemaining(getRemainingSeconds())
    }, 1000)

    // Cleanup: remove interval when the component unmounts — no leaks.
    return () => clearInterval(id)
  }, []) // runs once on mount, cleans up on unmount

  const hours      = Math.floor(remaining / 3600)
  const minutes    = Math.floor((remaining % 3600) / 60)
  const seconds    = remaining % 60
  const urgencyKey = getUrgencyKey(remaining)

  // Fall back to English if an unknown lang is passed
  const t = STRINGS[lang] ?? STRINGS.en

  return (
    <section className="border border-gray-300 bg-slate-900 text-white p-4 min-h-[192px] flex flex-col justify-between">

      {/* ── Row 1: heading + live badge ── */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {t.heading}
        </p>

        {/* Pulsing live dot — uses Tailwind's built-in animate-ping, no extra library */}
        <span className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
            {t.live}
          </span>
        </span>
      </div>

      {/* ── Row 2: HH : MM : SS countdown ── */}
      <div className="mt-4 flex items-start gap-1">

        {/* Hours */}
        <div className="flex flex-col items-center min-w-[2.5rem]">
          <span className="text-4xl font-bold tabular-nums leading-none text-white">
            {pad(hours)}
          </span>
          <span className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {t.hr}
          </span>
        </div>

        {/* Separator */}
        <span className="text-3xl font-bold text-slate-600 leading-none mt-0.5 mx-0.5" aria-hidden="true">
          :
        </span>

        {/* Minutes */}
        <div className="flex flex-col items-center min-w-[2.5rem]">
          <span className="text-4xl font-bold tabular-nums leading-none text-white">
            {pad(minutes)}
          </span>
          <span className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {t.min}
          </span>
        </div>

        {/* Separator */}
        <span className="text-3xl font-bold text-slate-600 leading-none mt-0.5 mx-0.5" aria-hidden="true">
          :
        </span>

        {/* Seconds */}
        <div className="flex flex-col items-center min-w-[2.5rem]">
          <span className="text-4xl font-bold tabular-nums leading-none text-white">
            {pad(seconds)}
          </span>
          <span className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {t.sec}
          </span>
        </div>

      </div>

      {/* ── Row 3: urgency message ── */}
      <p className={`mt-3 text-xs font-semibold ${URGENCY_COLOR[urgencyKey]}`}>
        {t.urgency[urgencyKey]}
      </p>

      {/* ── Row 4: supporting line ── */}
      <p className="mt-1 text-xs text-slate-400 leading-snug">
        {t.support}
      </p>

      {/* ── Row 5: footer deadline anchor ── */}
      <p className="mt-3 pt-3 border-t border-slate-700 text-xs font-semibold text-slate-300">
        {t.footer}
      </p>

    </section>
  )
}

export default LiveMetric