import { useState, useEffect } from "react"

// ── Priority styling config ──────────────────────────────────────────────────
const PRIORITY_STYLE = {
  HIGH:   "bg-red-700   text-white",
  MEDIUM: "bg-amber-500 text-white",
  LOW:    "bg-slate-400 text-white",
}

// ── Status styling config ────────────────────────────────────────────────────
const STATUS_STYLE = {
  pending:  "text-slate-400 bg-transparent",
  approved: "text-green-700 bg-green-50 border border-green-300",
  hold:     "text-amber-700 bg-amber-50 border border-amber-300",
}

// ── Translations dictionary ──────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    panelTitle: "Today's Action Items",
    panelSubtitle: "Top 5 items requiring your decision this morning",
    pendingCountSuffix: "pending",
    shortcutHint: "Keyboard: J/K to select | A to approve | H to hold",
    shortcutHintReadOnly: "Keyboard: J/K to select | Actions disabled",
    cols: {
      priority: "Priority",
      item: "Item",
      status: "Status",
      actions: "Actions",
    },
    priorities: {
      HIGH: "HIGH",
      MEDIUM: "MED",
      LOW: "LOW",
    },
    statuses: {
      pending: "Pending",
      approved: "Approved",
      hold: "On Hold",
    },
    buttons: {
      approve: "Approve",
      hold: "Hold",
    },
  },
  mr: {
    panelTitle: "आज करावयाची कामे",
    panelSubtitle: "सकाळच्या वेळेत निर्णय घेणे आवश्यक असणाऱ्या ५ महत्त्वाच्या बाबी",
    pendingCountSuffix: "प्रलंबित",
    shortcutHint: "कीबोर्ड: J/K निवडण्यासाठी | A मंजुरीसाठी | H थांबवण्यासाठी",
    shortcutHintReadOnly: "कीबोर्ड: J/K निवडण्यासाठी | कृती अक्षम आहेत",
    cols: {
      priority: "प्राधान्य",
      item: "काम",
      status: "स्थिती",
      actions: "कृती",
    },
    priorities: {
      HIGH: "तातडीचे",
      MEDIUM: "मध्यम",
      LOW: "कमी",
    },
    statuses: {
      pending: "प्रलंबित",
      approved: "मंजूर",
      hold: "थांबवले",
    },
    buttons: {
      approve: "मंजूर करा",
      hold: "थांबवा",
    },
  },
}

// ── Component ────────────────────────────────────────────────────────────────
function ActionPanel({ lang = "en", items = [], onSetStatus, isEditable = true }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Keyboard shortcut listener
  useEffect(() => {
    function handleKeyDown(event) {
      // Guard: do not trigger if focus is on inputs, textareas, or editable elements
      const target = event.target
      const isInput = 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.isContentEditable

      if (isInput) return

      const key = event.key.toLowerCase()

      if (key === "j") {
        event.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % items.length)
      } else if (key === "k") {
        event.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length)
      } else if (key === "a" && isEditable) {
        event.preventDefault()
        const selectedItem = items[selectedIndex]
        if (selectedItem && selectedItem.status === "pending") {
          onSetStatus && onSetStatus(selectedItem.id, "approved")
        }
      } else if (key === "h" && isEditable) {
        event.preventDefault()
        const selectedItem = items[selectedIndex]
        if (selectedItem && selectedItem.status === "pending") {
          onSetStatus && onSetStatus(selectedItem.id, "hold")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [items, selectedIndex, isEditable, onSetStatus])

  const pendingCount = items.filter((i) => i.status === "pending").length
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en

  return (
    <section className="border border-gray-300 bg-white">

      {/* ── Panel header ── */}
      <div className="border-b border-gray-300 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900 text-base leading-tight">
            {t.panelTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {t.panelSubtitle}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider tabular-nums">
            {pendingCount} / {items.length} {t.pendingCountSuffix}
          </span>
          <span className="text-[11px] font-medium text-slate-500 bg-stone-100 px-2 py-0.5 border border-gray-200 rounded-sm">
            {isEditable ? t.shortcutHint : t.shortcutHintReadOnly}
          </span>
        </div>
      </div>

      {/* ── Column headings ── */}
      <div className="hidden md:grid grid-cols-[56px_1fr_108px_200px] gap-x-4 px-5 py-2 border-b border-gray-200 bg-stone-50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{t.cols.priority}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{t.cols.item}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center">{t.cols.status}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 text-right">{t.cols.actions}</span>
      </div>

      {/* ── Item rows ── */}
      <ul className="divide-y divide-gray-200">
        {items.map((item, idx) => {
          const isActioned = item.status !== "pending"
          const priStyle = PRIORITY_STYLE[item.priority]
          const statusStyle = STATUS_STYLE[item.status]
          const itemTitle = lang === "mr" ? item.titleMr : item.titleEn
          const itemContext = lang === "mr" ? item.contextMr : item.contextEn

          return (
            <li
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              tabIndex={0}
              role="button"
              aria-selected={selectedIndex === idx}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedIndex(idx)
                }
              }}
              className={[
                "grid grid-cols-1 md:grid-cols-[56px_1fr_108px_200px] gap-x-4 gap-y-3 px-5 py-4 items-center transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-900",
                item.status === "approved" ? "bg-green-50/50" : "",
                item.status === "hold"     ? "bg-amber-50/50" : "",
                selectedIndex === idx
                  ? "relative ring-2 ring-inset ring-slate-900 bg-stone-50/40 z-10"
                  : "hover:bg-stone-50/20",
              ].join(" ")}
            >
              {/* Priority badge */}
              <div className="flex md:block">
                <span
                  className={`inline-flex items-center justify-center w-11 h-6 text-[10px] font-bold tracking-wide rounded-sm ${priStyle}`}
                >
                  {t.priorities[item.priority]}
                </span>
              </div>

              {/* Title + context */}
              <div>
                <p
                  className={`text-base font-semibold leading-snug ${
                    isActioned ? "text-slate-400" : "text-slate-800"
                  }`}
                >
                  {itemTitle}
                </p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">
                  {itemContext}
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex lg:justify-center">
                <span
                  className={`inline-flex items-center px-2 py-1 text-sm font-semibold rounded-sm ${statusStyle}`}
                >
                  {t.statuses[item.status]}
                </span>
              </div>

              {/* Actions or view-only placeholder */}
              <div className="flex items-center lg:justify-end gap-2">
                {isEditable ? (
                  <>
                    <button
                      type="button"
                      disabled={isActioned}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSetStatus && onSetStatus(item.id, "approved")
                      }}
                      className={[
                        "px-3.5 py-1.5 text-xs font-semibold border leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-700",
                        isActioned
                          ? "border-gray-200 text-gray-300 bg-white cursor-not-allowed"
                          : "border-green-700 text-green-700 bg-white hover:bg-green-700 hover:text-white",
                      ].join(" ")}
                    >
                      {t.buttons.approve}
                    </button>
                    <button
                      type="button"
                      disabled={isActioned}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSetStatus && onSetStatus(item.id, "hold")
                      }}
                      className={[
                        "px-3.5 py-1.5 text-xs font-semibold border leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-amber-500",
                        isActioned
                          ? "border-gray-200 text-gray-300 bg-white cursor-not-allowed"
                          : "border-amber-500 text-amber-700 bg-white hover:bg-amber-500 hover:text-white",
                      ].join(" ")}
                    >
                      {t.buttons.hold}
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-bold text-slate-500 bg-stone-100 border border-gray-200 px-3 py-1.5 rounded-sm uppercase tracking-wide">
                    {lang === "mr" ? "फक्त पहा" : "View Only"}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>

    </section>
  )
}

export default ActionPanel
