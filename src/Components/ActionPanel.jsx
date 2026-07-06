import { useState } from "react"

// ── Priority display config ──────────────────────────────────────────────────
const PRIORITY_CONFIG = {
  HIGH:   { label: "HIGH", className: "bg-red-700   text-white" },
  MEDIUM: { label: "MED",  className: "bg-amber-500 text-white" },
  LOW:    { label: "LOW",  className: "bg-slate-400 text-white" },
}

// ── Status display config ────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:  null,   // no badge shown when pending
  approved: { label: "Approved", className: "text-green-700 bg-green-50 border border-green-300" },
  hold:     { label: "On Hold",  className: "text-amber-700 bg-amber-50 border border-amber-300" },
}

// ── Mock data — 5 realistic morning action items ─────────────────────────────
const INITIAL_ITEMS = [
  {
    id: 1,
    priority: "HIGH",
    title: "Vendor Invoice — Krishnarao Suppliers Pvt. Ltd.",
    context: "₹2.4L invoice pending for 6 days; payment due date is today as per contract.",
  },
  {
    id: 2,
    priority: "HIGH",
    title: "Field Officer Deployment — Nashik District Block C",
    context: "3 officers remain unassigned for this week's rural survey cycle starting 10:00 AM.",
  },
  {
    id: 3,
    priority: "MEDIUM",
    title: "Daily Operations Report — 6 July 2026",
    context: "Report compiled and awaiting supervisor sign-off; submission deadline is 11:00 AM.",
  },
  {
    id: 4,
    priority: "MEDIUM",
    title: "Equipment Maintenance Clearance — Warehouse B Forklift",
    context: "Scheduled service overdue by 12 days; safety inspection mandatory before next use.",
  },
  {
    id: 5,
    priority: "LOW",
    title: "Budget Reallocation Request — Q3 Training Fund",
    context: "Department head has requested ₹80K transfer from travel budget to digital tools.",
  },
]

// ── Component ────────────────────────────────────────────────────────────────
function ActionPanel() {
  const [items, setItems] = useState(
    INITIAL_ITEMS.map((item) => ({ ...item, status: "pending" }))
  )

  function setStatus(id, newStatus) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
  }

  const pendingCount = items.filter((i) => i.status === "pending").length

  return (
    <section className="border border-gray-300 bg-white">

      {/* ── Panel header ── */}
      <div className="border-b border-gray-300 px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900 text-base leading-tight">
            Today's Action Items
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Top 5 items requiring your decision this morning
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider tabular-nums">
          {pendingCount} / {items.length} pending
        </span>
      </div>

      {/* ── Column headings ── */}
      <div className="hidden lg:grid grid-cols-[56px_1fr_108px_176px] gap-x-4 px-5 py-2 border-b border-gray-200 bg-stone-50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Priority</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Item</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</span>
      </div>

      {/* ── Item rows ── */}
      <ul className="divide-y divide-gray-200">
        {items.map((item) => {
          const isActioned = item.status !== "pending"
          const priCfg    = PRIORITY_CONFIG[item.priority]
          const statusCfg = STATUS_CONFIG[item.status]

          return (
            <li
              key={item.id}
              className={[
                "grid grid-cols-1 lg:grid-cols-[56px_1fr_108px_176px] gap-x-4 gap-y-3 px-5 py-4 items-center transition-colors",
                item.status === "approved" ? "bg-green-50/50" : "",
                item.status === "hold"     ? "bg-amber-50/50" : "",
              ].join(" ")}
            >
              {/* Priority badge */}
              <div className="flex lg:block">
                <span
                  className={`inline-flex items-center justify-center w-11 h-6 text-[10px] font-bold tracking-wide rounded-sm ${priCfg.className}`}
                >
                  {priCfg.label}
                </span>
              </div>

              {/* Title + context */}
              <div>
                <p
                  className={`text-sm font-semibold leading-snug ${
                    isActioned ? "text-slate-400" : "text-slate-800"
                  }`}
                >
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-slate-500 leading-snug">
                  {item.context}
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex lg:justify-center">
                {statusCfg ? (
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-sm ${statusCfg.className}`}
                  >
                    {statusCfg.label}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">Pending</span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center lg:justify-end gap-2">
                <button
                  type="button"
                  disabled={isActioned}
                  onClick={() => setStatus(item.id, "approved")}
                  className={[
                    "px-3.5 py-1.5 text-xs font-semibold border leading-none transition-colors",
                    isActioned
                      ? "border-gray-200 text-gray-300 bg-white cursor-not-allowed"
                      : "border-green-700 text-green-700 bg-white hover:bg-green-700 hover:text-white",
                  ].join(" ")}
                >
                  Approve
                </button>
                <button
                  type="button"
                  disabled={isActioned}
                  onClick={() => setStatus(item.id, "hold")}
                  className={[
                    "px-3.5 py-1.5 text-xs font-semibold border leading-none transition-colors",
                    isActioned
                      ? "border-gray-200 text-gray-300 bg-white cursor-not-allowed"
                      : "border-amber-500 text-amber-700 bg-white hover:bg-amber-500 hover:text-white",
                  ].join(" ")}
                >
                  Hold
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