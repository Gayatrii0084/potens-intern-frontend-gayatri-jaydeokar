// ── Mock anomaly data ────────────────────────────────────────────────────────
// Flagged by the automated monitoring system. Ordered HIGH → LOW.
const ANOMALIES = [
  {
    id: 1,
    severity: "HIGH",
    title: "Processing Delay — Document Verification Queue",
    explanation: "Average processing time has risen to 4.8 min, exceeding the 2 min SLA threshold.",
    detectedAt: "08:14 AM",
  },
  {
    id: 2,
    severity: "HIGH",
    title: "Rejection Rate Spike — Nashik Zone Applications",
    explanation: "Rejection rate jumped from 6% to 31% in the last 45 minutes; no rule change recorded.",
    detectedAt: "08:27 AM",
  },
  {
    id: 3,
    severity: "MEDIUM",
    title: "Queue Backlog — Central Approval Desk",
    explanation: "182 cases waiting; inflow exceeds processing capacity by 40% for 3 consecutive hours.",
    detectedAt: "07:55 AM",
  },
  {
    id: 4,
    severity: "MEDIUM",
    title: "Regional SLA Breach — Pune District",
    explanation: "14 cases breached the 24-hour resolution SLA; escalation protocol not yet triggered.",
    detectedAt: "07:30 AM",
  },
  {
    id: 5,
    severity: "LOW",
    title: "Login Failures — Field Officer Portal",
    explanation: "11 failed login attempts across 4 officer accounts since 07:00 AM. No lockout yet.",
    detectedAt: "07:02 AM",
  },
]

// ── Severity config ──────────────────────────────────────────────────────────
// Uses both colour AND typographic weight + shape so severity is distinguishable
// even in low-colour or printed views.
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
function AnomalyPanel() {
  const highCount = ANOMALIES.filter((a) => a.severity === "HIGH").length

  return (
    <section className="border border-gray-300 bg-white flex flex-col">

      {/* Panel header */}
      <div className="border-b border-gray-300 px-5 py-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-bold text-slate-900 text-base leading-tight">
            System Anomalies
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Flagged by automated monitoring
          </p>
        </div>
        {/* High-severity count — immediately visible without scanning the list */}
        {highCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-red-800 bg-red-100 border border-red-300">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600" />
            {highCount} High
          </span>
        )}
      </div>

      {/* Anomaly list */}
      <ul className="divide-y divide-gray-100 flex-1">
        {ANOMALIES.map((anomaly) => {
          const cfg = SEVERITY_CONFIG[anomaly.severity]
          return (
            <li key={anomaly.id} className="flex gap-3 px-5 py-3.5">

              {/* Left accent bar — provides a quick severity scan path */}
              <div className={`shrink-0 w-1 self-stretch rounded-full ${cfg.bar}`} aria-hidden="true" />

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {anomaly.title}
                  </p>
                  {/* Severity badge */}
                  <span
                    className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] tracking-wide uppercase rounded-sm ${cfg.badge}`}
                  >
                    {anomaly.severity}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-snug">
                  {anomaly.explanation}
                </p>
                <p className="mt-1.5 text-[10px] font-medium text-slate-400 tracking-wide uppercase">
                  Detected {anomaly.detectedAt}
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