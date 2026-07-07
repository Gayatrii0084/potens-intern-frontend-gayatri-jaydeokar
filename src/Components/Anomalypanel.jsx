// ── Translations dictionary ──────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    panelTitle: "System Anomalies",
    panelSubtitle: "Flagged by automated monitoring",
    highBadgeSuffix: "High",
    detectedPrefix: "Detected ",
    severities: {
      HIGH: "HIGH",
      MEDIUM: "MEDIUM",
      LOW: "LOW",
    },
  },
  mr: {
    panelTitle: "सिस्टममधील समस्या",
    panelSubtitle: "स्वयंचलित प्रणालीद्वारे आढळलेल्या त्रुटी",
    highBadgeSuffix: "तातडीचे",
    detectedPrefix: "वेळ: ",
    severities: {
      HIGH: "तातडीचे",
      MEDIUM: "मध्यम",
      LOW: "कमी",
    },
  },
}

// ── Severity config ──────────────────────────────────────────────────────────
const SEVERITY_CONFIG = {
  HIGH: {
    badge: "bg-red-100 text-red-800 border border-red-300 font-bold",
    bar:   "bg-red-600",
    dot:   "bg-red-600",
  },
  MEDIUM: {
    badge: "bg-amber-100 text-amber-800 border border-amber-300 font-semibold",
    bar:   "bg-amber-500",
    dot:   "bg-amber-500",
  },
  LOW: {
    badge: "bg-slate-100 text-slate-600 border border-slate-300 font-medium",
    bar:   "bg-slate-400",
    dot:   "bg-slate-400",
  },
}

// ── Component ────────────────────────────────────────────────────────────────
function AnomalyPanel({ lang = "en", anomalies = [] }) {
  const highCount = anomalies.filter((a) => a.severity === "HIGH").length
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en

  return (
    <section className="border border-gray-300 bg-white flex flex-col">

      {/* Panel header */}
      <div className="border-b border-gray-300 p-5 flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-bold text-slate-900 text-base leading-tight">
            {t.panelTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {t.panelSubtitle}
          </p>
        </div>
        {/* High-severity count — immediately visible without scanning the list */}
        {highCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-red-800 bg-red-100 border border-red-300">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600" />
            {highCount} {t.highBadgeSuffix}
          </span>
        )}
      </div>

      {/* Anomaly list */}
      <ul className="divide-y divide-gray-100 flex-1">
        {anomalies.map((anomaly) => {
          const cfg = SEVERITY_CONFIG[anomaly.severity]
          const title = lang === "mr" ? anomaly.titleMr : anomaly.titleEn
          const explanation = lang === "mr" ? anomaly.explanationMr : anomaly.explanationEn
          const detectedAt = lang === "mr" ? anomaly.detectedAtMr : anomaly.detectedAtEn
          
          return (
            <li key={anomaly.id} className="flex gap-3 px-5 py-4">

              {/* Left accent bar — provides a quick severity scan path */}
              <div className={`shrink-0 w-1 self-stretch rounded-full ${cfg.bar}`} aria-hidden="true" />

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-base font-semibold text-slate-800 leading-snug">
                    {title}
                  </p>
                  {/* Severity badge */}
                  <span
                    className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[11px] tracking-wide uppercase rounded-sm ${cfg.badge}`}
                  >
                    {t.severities[anomaly.severity]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 leading-snug">
                  {explanation}
                </p>
                <p className="mt-1.5 text-xs font-medium text-slate-500 tracking-wide uppercase">
                  {t.detectedPrefix}{detectedAt}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

    </section>
  )
}

export default AnomalyPanel