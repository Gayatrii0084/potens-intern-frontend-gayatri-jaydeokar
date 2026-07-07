import { useState } from "react"

const TRANSLATIONS = {
  en: {
    panelTitle: "System Anomalies",
    panelSubtitle: "Flagged by automated monitoring",
    highBadgeSuffix: "High",
    detectedPrefix: "Detected ",
    filters: { all: "All", HIGH: "High", MEDIUM: "Medium", LOW: "Low" },
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
    filters: { all: "सर्व", HIGH: "तातडीचे", MEDIUM: "मध्यम", LOW: "कमी" },
    severities: {
      HIGH: "तातडीचे",
      MEDIUM: "मध्यम",
      LOW: "कमी",
    },
  },
}

const SEVERITY_CONFIG = {
  HIGH: {
    badge: "bg-red-100 text-red-800 border border-red-300 font-bold",
    bar:   "bg-red-600",
  },
  MEDIUM: {
    badge: "bg-amber-100 text-amber-800 border border-amber-300 font-semibold",
    bar:   "bg-amber-500",
  },
  LOW: {
    badge: "bg-slate-100 text-slate-600 border border-slate-300 font-medium",
    bar:   "bg-slate-400",
  },
}

const FILTER_KEYS = ["all", "HIGH", "MEDIUM", "LOW"]

function AnomalyPanel({ lang = "en", anomalies = [] }) {
  const [severityFilter, setSeverityFilter] = useState("all")
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en

  const filtered = severityFilter === "all"
    ? anomalies
    : anomalies.filter((a) => a.severity === severityFilter)

  const highCount = anomalies.filter((a) => a.severity === "HIGH").length
  const isLongList = filtered.length > 5

  return (
    <section className="cockpit-card flex flex-col min-w-0">

      <div className="cockpit-card-header py-3 flex flex-col gap-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="min-w-0">
            <h2 className="cockpit-section-title text-sm uppercase tracking-wider">
              {t.panelTitle}
            </h2>
            <p className="cockpit-section-subtitle text-xs">
              {t.panelSubtitle}
            </p>
          </div>
          {highCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-red-800 bg-red-100 border border-red-300 shrink-0 self-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600" />
              {highCount} {t.highBadgeSuffix}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by severity">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSeverityFilter(key)}
              aria-pressed={severityFilter === key}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide border ${
                severityFilter === key
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-gray-300 hover:bg-stone-50"
              }`}
            >
              {t.filters[key]}
            </button>
          ))}
        </div>
      </div>

      <ul className={`divide-y divide-gray-100 ${isLongList ? "max-h-80 overflow-y-auto" : ""}`}>
        {filtered.map((anomaly) => {
          const cfg = SEVERITY_CONFIG[anomaly.severity]
          const title = lang === "mr" ? anomaly.titleMr : anomaly.titleEn
          const explanation = lang === "mr" ? anomaly.explanationMr : anomaly.explanationEn
          const detectedAt = lang === "mr" ? anomaly.detectedAtMr : anomaly.detectedAtEn

          return (
            <li key={anomaly.id} className="flex gap-2.5 px-4 py-3">

              <div className={`shrink-0 w-1 self-stretch ${cfg.bar}`} aria-hidden="true" />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800 leading-snug break-words pr-1">
                    {title}
                  </p>
                  <span
                    className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] tracking-wide uppercase ${cfg.badge}`}
                  >
                    {t.severities[anomaly.severity]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-snug line-clamp-2">
                  {explanation}
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-500 tracking-wide uppercase">
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
