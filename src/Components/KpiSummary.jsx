const STRINGS = {
  en: {
    pendingActions: "Pending Actions",
    highPriority: "High Priority Cases",
    activeAnomalies: "Active Anomalies",
    avgResolution: "Avg. Resolution Time",
    avgResolutionValue: "24 min",
    avgResolutionNote: "Prototype metric",
  },
  mr: {
    pendingActions: "प्रलंबित कृती",
    highPriority: "तातडीची प्रकरणे",
    activeAnomalies: "सक्रिय समस्या",
    avgResolution: "सरासरी निराकरण वेळ",
    avgResolutionValue: "२४ मिनिट",
    avgResolutionNote: "प्रोटोटाइप मेट्रिक",
  },
}

function KpiSummary({ lang = "en", items = [], anomalies = [] }) {
  const t = STRINGS[lang] ?? STRINGS.en

  const pendingCount = items.filter((i) => i.status === "pending").length
  const highPriorityCount = items.filter((i) => i.priority === "HIGH").length
  const anomalyCount = anomalies.length

  const cards = [
    { label: t.pendingActions, value: pendingCount, accent: "border-l-slate-700" },
    { label: t.highPriority, value: highPriorityCount, accent: "border-l-red-600" },
    { label: t.activeAnomalies, value: anomalyCount, accent: "border-l-amber-500" },
    { label: t.avgResolution, value: t.avgResolutionValue, sub: t.avgResolutionNote, accent: "border-l-green-700" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`cockpit-card border-l-4 ${card.accent} px-4 py-3`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-cockpit-secondary">
            {card.label}
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-cockpit-primary leading-none">
            {card.value}
          </p>
          {card.sub && (
            <p className="mt-1 text-[10px] font-medium text-slate-400 uppercase tracking-wide">
              {card.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default KpiSummary
