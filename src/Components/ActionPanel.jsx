import { useState, useEffect } from "react"

const PRIORITY_STYLE = {
  HIGH:   "bg-red-700 text-white",
  MEDIUM: "bg-amber-500 text-white",
  LOW:    "bg-slate-400 text-white",
}

const STATUS_STYLE = {
  pending:  "text-slate-500 bg-stone-50 border border-gray-200",
  approved: "text-green-700 bg-green-50 border border-green-300",
  hold:     "text-amber-700 bg-amber-50 border border-amber-300",
}

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

function ActionPanel({ lang = "en", items = [], onSetStatus, isEditable = true }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    function handleKeyDown(event) {
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
    <section className="cockpit-card min-w-0 w-full max-w-full">

      <div className="cockpit-card-header py-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="min-w-0">
          <h2 className="cockpit-section-title">{t.panelTitle}</h2>
          <p className="cockpit-section-subtitle text-xs">{t.panelSubtitle}</p>
        </div>
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider tabular-nums">
            {pendingCount} / {items.length} {t.pendingCountSuffix}
          </span>
          <span className="text-[10px] font-medium text-slate-500 bg-stone-100 px-2 py-1 border border-gray-200 text-center max-w-xs">
            {isEditable ? t.shortcutHint : t.shortcutHintReadOnly}
          </span>
        </div>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-hidden">
        <div
          className="action-item-header hidden min-[900px]:grid px-4 sm:px-5 py-2 border-b border-gray-200 bg-stone-50"
          aria-hidden="true"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{t.cols.priority}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{t.cols.item}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center">{t.cols.status}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 text-right">{t.cols.actions}</span>
        </div>

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
                  "action-item-row grid px-4 sm:px-5 py-3 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-900",
                  item.status === "approved" ? "bg-green-50/40" : "",
                  item.status === "hold"     ? "bg-amber-50/40" : "",
                  selectedIndex === idx
                    ? "relative ring-2 ring-inset ring-slate-900 bg-stone-50/50 z-10"
                    : "hover:bg-stone-50/30",
                ].join(" ")}
              >
                <div className="action-cell-priority flex items-center min-[900px]:justify-center">
                  <span
                    className={`inline-flex items-center justify-center w-11 h-6 shrink-0 text-[10px] font-bold tracking-wide ${priStyle}`}
                  >
                    {t.priorities[item.priority]}
                  </span>
                </div>

                <div className="action-cell-item min-w-0">
                  <p
                    className={`text-sm font-semibold leading-snug break-words line-clamp-2 ${
                      isActioned ? "text-slate-400" : "text-slate-800"
                    }`}
                  >
                    {itemTitle}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600 leading-snug break-words line-clamp-2">
                    {itemContext}
                  </p>
                </div>

                <div className="action-cell-status flex items-center min-[900px]:justify-center">
                  <span className={`inline-flex items-center shrink-0 px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${statusStyle}`}>
                    {t.statuses[item.status]}
                  </span>
                </div>

                <div className="action-cell-actions flex items-center gap-1.5 min-[900px]:justify-end flex-wrap max-[899px]:pt-1">
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
                          "cockpit-btn h-8 min-w-0 flex-1 min-[900px]:flex-none min-[900px]:min-w-[4.5rem] focus-visible:ring-green-700",
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
                          "cockpit-btn h-8 min-w-0 flex-1 min-[900px]:flex-none min-[900px]:min-w-[4.5rem] focus-visible:ring-amber-500",
                          isActioned
                            ? "border-gray-200 text-gray-300 bg-white cursor-not-allowed"
                            : "border-amber-500 text-amber-700 bg-white hover:bg-amber-500 hover:text-white",
                        ].join(" ")}
                      >
                        {t.buttons.hold}
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-slate-500 bg-stone-100 border border-gray-200 px-2.5 py-2 uppercase tracking-wide w-full min-[900px]:w-auto text-center">
                      {lang === "mr" ? "फक्त पहा" : "View Only"}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>

    </section>
  )
}

export default ActionPanel
