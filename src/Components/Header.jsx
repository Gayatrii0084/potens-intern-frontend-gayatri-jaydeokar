const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
]

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

function formatTodayDate(date, lang) {
  return date.toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function Header({ lang = "en", onLanguageChange, onSignOut }) {
  const todayLabel = formatTodayDate(new Date(), lang)
  const t = STRINGS[lang] ?? STRINGS.en

  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="cockpit-container py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-snug">
            {t.title}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="text-left sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{t.today}</p>
            <p className="mt-0.5 text-sm font-semibold text-slate-700">{todayLabel}</p>
          </div>

          <div className="hidden sm:block h-8 w-px bg-gray-200" aria-hidden="true" />

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
                  "px-3.5 py-2 text-sm font-semibold leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-700",
                  lang === code
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-stone-50 hover:text-slate-900",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

          {onSignOut && (
            <button
              type="button"
              onClick={onSignOut}
              className="cockpit-btn border-gray-300 text-slate-700 bg-white hover:bg-stone-50 focus-visible:ring-slate-700 w-full sm:w-auto"
            >
              {t.signOut}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
