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
    items: {
      1: {
        title: "Processing Delay — Document Verification Queue",
        explanation: "Average processing time has risen to 4.8 min, exceeding the 2 min SLA threshold.",
        detectedAt: "08:14 AM",
      },
      2: {
        title: "Rejection Rate Spike — Nashik Zone Applications",
        explanation: "Rejection rate jumped from 6% to 31% in the last 45 minutes; no rule change recorded.",
        detectedAt: "08:27 AM",
      },
      3: {
        title: "Queue Backlog — Central Approval Desk",
        explanation: "182 cases waiting; inflow exceeds processing capacity by 40% for 3 consecutive hours.",
        detectedAt: "07:55 AM",
      },
      4: {
        title: "Regional SLA Breach — Pune District",
        explanation: "14 cases breached the 24-hour resolution SLA; escalation protocol not yet triggered.",
        detectedAt: "07:30 AM",
      },
      5: {
        title: "Login Failures — Field Officer Portal",
        explanation: "11 failed login attempts across 4 officer accounts since 07:00 AM. No lockout yet.",
        detectedAt: "07:02 AM",
      },
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
    items: {
      1: {
        title: "प्रक्रियेत विलंब — कागदपत्र पडताळणी रांग",
        explanation: "सरासरी प्रक्रिया वेळ ४.८ मिनिटांपर्यंत वाढली आहे, जी २ मिनिटांच्या नियमापेक्षा जास्त आहे.",
        detectedAt: "सकाळी ०८:१४",
      },
      2: {
        title: "नाकारलेल्या अर्जांमध्ये वाढ — नाशिक विभाग",
        explanation: "गेल्या ४५ मिनिटांत नाकारण्याचे प्रमाण ६% वरून ३१% झाले आहे; कोणतीही नवीन नियमांची नोंद नाही.",
        detectedAt: "सकाळी ०८:२७",
      },
      3: {
        title: "कामांचा खोळंबा — मध्यवर्ती मंजुरी कक्ष",
        explanation: "१८२ प्रकरणे प्रलंबित आहेत; सलग ३ तास येणारे काम प्रक्रिया क्षमतेपेक्षा ४०% जास्त आहे.",
        detectedAt: "सकाळी ०७:५५",
      },
      4: {
        title: "प्रादेशिक वेळेचे उल्लंघन — पुणे जिल्हा",
        explanation: "१४ प्रकरणांमध्ये २४ तासांच्या अंतिम वेळेचे उल्लंघन झाले आहे; अद्याप पुढील कारवाई सुरू केलेली नाही.",
        detectedAt: "सकाळी ०७:३०",
      },
      5: {
        title: "लॉगिन अयशस्वी — फील्ड अधिकारी पोर्टल",
        explanation: "सकाळी ०७:०० वाजेपासून ४ अधिकारी खात्यांमध्ये ११ वेळा लॉगिन अयशस्वी झाले आहे.",
        detectedAt: "सकाळी ०७:०२",
      },
    },
  },
}

// Flagged by the automated monitoring system. Ordered HIGH → LOW.
const ANOMALIES = [
  { id: 1, severity: "HIGH" },
  { id: 2, severity: "HIGH" },
  { id: 3, severity: "MEDIUM" },
  { id: 4, severity: "MEDIUM" },
  { id: 5, severity: "LOW" },
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
function AnomalyPanel({ lang = "en" }) {
  const highCount = ANOMALIES.filter((a) => a.severity === "HIGH").length
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en

  return (
    <section className="border border-gray-300 bg-white flex flex-col">

      {/* Panel header */}
      <div className="border-b border-gray-300 p-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-bold text-slate-900 text-base leading-tight">
            {t.panelTitle}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
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
        {ANOMALIES.map((anomaly) => {
          const cfg = SEVERITY_CONFIG[anomaly.severity]
          const anomalyText = t.items[anomaly.id]
          return (
            <li key={anomaly.id} className="flex gap-3 px-4 py-3">

              {/* Left accent bar — provides a quick severity scan path */}
              <div className={`shrink-0 w-1 self-stretch rounded-full ${cfg.bar}`} aria-hidden="true" />

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {anomalyText.title}
                  </p>
                  {/* Severity badge */}
                  <span
                    className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] tracking-wide uppercase rounded-sm ${cfg.badge}`}
                  >
                    {t.severities[anomaly.severity]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-snug">
                  {anomalyText.explanation}
                </p>
                <p className="mt-1.5 text-[10px] font-medium text-slate-400 tracking-wide uppercase">
                  {t.detectedPrefix}{anomalyText.detectedAt}
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