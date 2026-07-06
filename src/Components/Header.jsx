import { useState } from "react"

// Supported UI languages. Add entries here as translations are built out.
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
]

/**
 * Formats a Date object for the operations dashboard context.
 * Example: "Sunday, 6 July 2026"
 */
function formatTodayDate(date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Header — compact enterprise operations bar.
 *
 * Props:
 *   onLanguageChange(code: string) — optional callback fired when the
 *   user switches language. Connect from App.jsx when the translation
 *   system is ready. The toggle works stand-alone without it.
 */
function Header({ onLanguageChange }) {
  const [activeLang, setActiveLang] = useState("en")
  const todayLabel = formatTodayDate(new Date())

  function handleLangSwitch(code) {
    setActiveLang(code)
    if (onLanguageChange) onLanguageChange(code)
  }

  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 py-4 flex items-center justify-between gap-6">

        {/* ── Left: product identity ── */}
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-snug">
            Operations Cockpit
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 font-normal">
            Morning Operations Overview
          </p>
        </div>

        {/* ── Right: date + language toggle ── */}
        <div className="flex items-center gap-5 shrink-0">

          {/* Current date — hidden on small screens to avoid overflow */}
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Today
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-700">
              {todayLabel}
            </p>
          </div>

          {/* Vertical rule */}
          <div className="hidden sm:block h-8 w-px bg-gray-200" aria-hidden="true" />

          {/* Language toggle — segmented button pair */}
          <div
            role="group"
            aria-label="Select language"
            className="flex items-stretch border border-gray-300 divide-x divide-gray-300 overflow-hidden"
          >
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => handleLangSwitch(code)}
                aria-pressed={activeLang === code}
                className={[
                  "px-3.5 py-1.5 text-sm font-semibold leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-700",
                  activeLang === code
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-stone-50 hover:text-slate-900",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
