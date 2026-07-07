import { useState, useEffect } from "react"
import { DEPARTMENTS } from "../mockData"

function getDeadlineMs() {
  const d = new Date()
  d.setHours(11, 0, 0, 0)
  // Use the next upcoming 11:00 AM review deadline (today or tomorrow).
  if (Date.now() >= d.getTime()) {
    d.setDate(d.getDate() + 1)
  }
  return d.getTime()
}

function getRemainingSeconds() {
  return Math.max(0, Math.floor((getDeadlineMs() - Date.now()) / 1000))
}

function pad(n) {
  return String(n).padStart(2, "0")
}

const STRINGS = {
  en: {
    live: "LIVE",
    hr: "HR",
    min: "MIN",
    sec: "SEC",
    support: "Time left to review today's pending cases",
    footer: "Review before 11:00 AM",
    urgency: {
      plenty: "Plenty of time remaining",
      closing: "Review window closing soon",
      urgent: "Review required soon",
    },
  },
  mr: {
    live: "थेट",
    hr: "तास",
    min: "मिनिट",
    sec: "सेकंद",
    support: "आजच्या प्रलंबित प्रकरणांचा आढावा घेण्यासाठी उरलेला वेळ",
    footer: "सकाळी ११:०० पूर्वी आढावा घ्या",
    urgency: {
      plenty: "पुरेसा वेळ शिल्लक आहे",
      closing: "आढावा वेळ लवकरच संपेल",
      urgent: "लवकरच आढावा आवश्यक",
    },
  },
}

function getUrgencyKey(seconds) {
  if (seconds > 3600) return "plenty"
  if (seconds > 900) return "closing"
  return "urgent"
}

const URGENCY_COLOR = {
  plenty: "text-green-400",
  closing: "text-amber-400",
  urgent: "text-red-400",
}

function LiveMetric({ lang = "en", activeDepartment = "medical" }) {
  const [remaining, setRemaining] = useState(() => getRemainingSeconds())

  useEffect(() => {
    const tick = () => setRemaining(getRemainingSeconds())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const hours = Math.floor(remaining / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60
  const urgencyKey = getUrgencyKey(remaining)

  const t = STRINGS[lang] ?? STRINGS.en
  const activeDept = DEPARTMENTS.find((d) => d.id === activeDepartment) || DEPARTMENTS[0]
  const headingText = lang === "mr" ? activeDept.countdown.headingMr : activeDept.countdown.headingEn

  return (
    <section className="box-border border border-gray-300 bg-slate-900 text-white px-4 py-3 flex flex-col gap-3 w-full max-w-full min-w-0">

      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 leading-snug">
          {headingText}
        </p>
        <span className="flex items-center gap-1 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
            {t.live}
          </span>
        </span>
      </div>

      <div className="flex items-start gap-0.5">
        {[
          { val: pad(hours), label: t.hr },
          { val: pad(minutes), label: t.min },
          { val: pad(seconds), label: t.sec },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-start gap-0.5">
            {i > 0 && <span className="text-xl font-bold text-slate-600 leading-none mt-0.5 px-0.5" aria-hidden="true">:</span>}
            <div className="flex flex-col items-center min-w-[2rem]">
              <span className="text-2xl sm:text-3xl font-bold tabular-nums leading-none text-white">
                {unit.val}
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700 pt-2">
        <p className={`text-xs font-bold ${URGENCY_COLOR[urgencyKey]}`}>
          {t.urgency[urgencyKey]}
        </p>
        <p className="mt-0.5 text-xs text-slate-400 leading-snug">{t.support}</p>
        <p className="mt-1.5 text-xs font-semibold text-slate-300">{t.footer}</p>
      </div>

    </section>
  )
}

export default LiveMetric
