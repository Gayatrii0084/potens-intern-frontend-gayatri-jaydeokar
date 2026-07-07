const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
]

// ── Translation dictionary for Header ────────────────────────────────────────
const STRINGS = {
  en: {
    title: "Operations Cockpit",
    subtitle: "Morning Operations Overview",
    today: "Today",
    signOut: "Sign out",
  },
  mr: {
    title: "ऑपरेशन्स कॉकपिट",
    subtitle: "सकाळच्या कामकाजाचा आढावा",
    today: "आज",
    signOut: "बाहेर पडा",
  },
}

/**
 * Formats a Date object for the operations dashboard context based on active language.
 * Example (EN): "Sunday, 6 July 2026"
 * Example (MR): "रविवार, ६ जुलै २०२६"
 */
function formatTodayDate(date, lang) {
  return date.toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
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
 *   lang: "en" | "mr" — current active language
 *   onLanguageChange(code: string) — callback fired when switching language.
 *   onSignOut() — callback fired when signing out.
 */
function Header({ lang = "en", onLanguageChange, onSignOut }) {
  const todayLabel = formatTodayDate(new Date(), lang)
  const t = STRINGS[lang] ?? STRINGS.en

  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="mx-auto w-[94%] max-w-[1600px] px-5 py-4 flex flex-wrap items-center justify-between gap-4 sm:gap-6">

        {/* ── Left: product identity ── */}
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-snug">
            {t.title}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* ── Right: date + language toggle ── */}
        <div className="flex items-center gap-5 shrink-0">

          {/* Current date — hidden on small screens to avoid overflow */}
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t.today}
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
                onClick={() => onLanguageChange && onLanguageChange(code)}
                aria-pressed={lang === code}
                className={[
                  "px-3.5 py-1.5 text-sm font-semibold leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-700",
                  lang === code
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-stone-50 hover:text-slate-900",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sign out */}
          {onSignOut && (
            <>
              <div className="hidden sm:block h-8 w-px bg-gray-200" aria-hidden="true" />
              <button
                type="button"
                onClick={onSignOut}
                className="px-4 py-2 text-sm font-semibold border border-gray-300 text-slate-700 bg-white hover:bg-stone-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-700"
              >
                {t.signOut}
              </button>
            </>
          )}

        </div>
      </div>
    </header>
  )
}

export default Header

