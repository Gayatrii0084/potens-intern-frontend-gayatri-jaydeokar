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
    items: {
      1: {
        title: "Vendor Invoice — Krishnarao Suppliers Pvt. Ltd.",
        context: "₹2.4L invoice pending for 6 days; payment due date is today as per contract.",
      },
      2: {
        title: "Field Officer Deployment — Nashik District Block C",
        context: "3 officers remain unassigned for this week's rural survey cycle starting 10:00 AM.",
      },
      3: {
        title: "Daily Operations Report — 6 July 2026",
        context: "Report compiled and awaiting supervisor sign-off; submission deadline is 11:00 AM.",
      },
      4: {
        title: "Equipment Maintenance Clearance — Warehouse B Forklift",
        context: "Scheduled service overdue by 12 days; safety inspection mandatory before next use.",
      },
      5: {
        title: "Budget Reallocation Request — Q3 Training Fund",
        context: "Department head has requested ₹80K transfer from travel budget to digital tools.",
      },
    },
  },
  mr: {
    panelTitle: "आज करावयाची कामे",
    panelSubtitle: "सकाळच्या वेळेत निर्णय घेणे आवश्यक असणाऱ्या ५ महत्त्वाच्या बाबी",
    pendingCountSuffix: "प्रलंबित",
    shortcutHint: "कीबोर्ड: J/K निवडण्यासाठी | A मंजुरीसाठी | H थांबवण्यासाठी",
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
    items: {
      1: {
        title: "विक्रेता पेमेंट — कृष्णराव सप्लायर्स प्रा. लि.",
        context: "₹२.४ लाखांचे बिल ६ दिवसांपासून प्रलंबित; कराराप्रमाणे आज पेमेंटची अंतिम तारीख आहे.",
      },
      2: {
        title: "फील्ड अधिकारी नियुक्ती — नाशिक जिल्हा ब्लॉक सी",
        context: "या आठवड्याच्या ग्रामीण सर्वेक्षणासाठी ३ अधिकाऱ्यांची नियुक्ती बाकी आहे; काम सकाळी १०:०० वाजता सुरू होईल.",
      },
      3: {
        title: "दैनिक कामकाज अहवाल — ६ जुलै २०२६",
        context: "अहवाल तयार आहे आणि पर्यवेक्षकांच्या मंजुरीची प्रतीक्षा आहे; सादर करण्याची अंतिम वेळ सकाळी ११:०० वाजेपर्यंत आहे.",
      },
      4: {
        title: "उपकरण देखभाल मंजुरी — वेअरहाऊस बी फोर्कलिफ्ट",
        context: "नियोजित सर्व्हिसिंग १२ दिवस थकीत आहे; पुढील वापरापूर्वी सुरक्षा तपासणी करणे अनिवार्य आहे.",
      },
      5: {
        title: "बजेट निधी वर्ग करण्याची विनंती — तिसऱ्या तिमाहीचे प्रशिक्षण",
        context: "विभाग प्रमुखांनी प्रवास बजेटमधून नवीन साधनांसाठी ₹८०,००० वर्ग करण्याची विनंती केली आहे.",
      },
    },
  },
}

const INITIAL_ITEMS = [
  { id: 1, priority: "HIGH" },
  { id: 2, priority: "HIGH" },
  { id: 3, priority: "MEDIUM" },
  { id: 4, priority: "MEDIUM" },
  { id: 5, priority: "LOW" },
]

// ── Component ────────────────────────────────────────────────────────────────
function ActionPanel({ lang = "en" }) {
  const [items, setItems] = useState(
    INITIAL_ITEMS.map((item) => ({ ...item, status: "pending" }))
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  function setStatus(id, newStatus) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
  }

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
      } else if (key === "a") {
        event.preventDefault()
        const selectedItem = items[selectedIndex]
        if (selectedItem && selectedItem.status === "pending") {
          setStatus(selectedItem.id, "approved")
        }
      } else if (key === "h") {
        event.preventDefault()
        const selectedItem = items[selectedIndex]
        if (selectedItem && selectedItem.status === "pending") {
          setStatus(selectedItem.id, "hold")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [items, selectedIndex])

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
            {t.shortcutHint}
          </span>
        </div>
      </div>

      {/* ── Column headings ── */}
      {/* 200px action column ensures enough room for Marathi button texts without wrapping */}
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
          const itemText = t.items[item.id]

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
                  {itemText.title}
                </p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">
                  {itemText.context}
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

              {/* Action buttons */}
              <div className="flex items-center lg:justify-end gap-2">
                <button
                  type="button"
                  disabled={isActioned}
                  onClick={(e) => {
                    e.stopPropagation()
                    setStatus(item.id, "approved")
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
                    setStatus(item.id, "hold")
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
              </div>
            </li>
          )
        })}
      </ul>

    </section>
  )
}

export default ActionPanel
