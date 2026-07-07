import { PUNE_AREAS } from "../mockData"

const STRINGS = {
  en: {
    title: "Area Operations Summary",
    subtitle: "Pending workload by Pune operational zone",
    cols: {
      area: "Area",
      pending: "Pending",
      high: "High Priority",
      operator: "Operator",
      status: "Status",
    },
    statusOwn: "Your area",
    statusMonitor: "Monitoring",
    unassigned: "—",
  },
  mr: {
    title: "परिसर ऑपरेशन्स सारांश",
    subtitle: "पुणे परिसरानुसार प्रलंबित काम",
    cols: {
      area: "परिसर",
      pending: "प्रलंबित",
      high: "तातडीचे",
      operator: "ऑपरेटर",
      status: "स्थिती",
    },
    statusOwn: "तुमचा परिसर",
    statusMonitor: "निरीक्षण",
    unassigned: "—",
  },
}

function AreaOperationsSummary({
  lang = "en",
  activeDepartment,
  userDepartment,
  userArea,
  operatorName,
  departmentItems,
}) {
  const t = STRINGS[lang] ?? STRINGS.en

  const rows = PUNE_AREAS.map((area) => {
    const items = departmentItems[activeDepartment]?.[area.id] ?? []
    const pending = items.filter((i) => i.status === "pending").length
    const highPriority = items.filter((i) => i.priority === "HIGH").length
    const isOwnArea = activeDepartment === userDepartment && area.id === userArea

    return {
      id: area.id,
      areaLabel: lang === "mr" ? area.nameMr : area.nameEn,
      pending,
      highPriority,
      operator: isOwnArea ? operatorName : t.unassigned,
      status: isOwnArea ? t.statusOwn : t.statusMonitor,
      isOwnArea,
    }
  })

  return (
    <section className="cockpit-card min-w-0">
      <div className="cockpit-card-header py-3">
        <h3 className="cockpit-section-title text-sm uppercase tracking-wider">
          {t.title}
        </h3>
        <p className="cockpit-section-subtitle text-xs">
          {t.subtitle}
        </p>
      </div>

      <div className="cockpit-table-scroll px-0">
        <table className="cockpit-area-table">
          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[12%]" />
            <col className="w-[14%]" />
            <col className="w-[22%]" />
            <col className="w-[22%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-200 bg-stone-50 text-left">
              <th className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">{t.cols.area}</th>
              <th className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">{t.cols.pending}</th>
              <th className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">{t.cols.high}</th>
              <th className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">{t.cols.operator}</th>
              <th className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">{t.cols.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className={row.isOwnArea ? "bg-green-50/40" : ""}>
                <td className="px-3 py-1.5 font-semibold text-cockpit-primary text-xs leading-snug break-words align-middle">
                  {row.areaLabel}
                </td>
                <td className="px-2 py-1.5 text-center tabular-nums font-medium text-xs align-middle">{row.pending}</td>
                <td className="px-2 py-1.5 text-center tabular-nums font-medium text-red-700 text-xs align-middle">{row.highPriority}</td>
                <td className="px-2 py-1.5 text-cockpit-secondary text-xs leading-snug break-words align-middle">{row.operator}</td>
                <td className="px-3 py-1.5 align-middle">
                  <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 border leading-tight ${
                    row.isOwnArea
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-stone-100 text-slate-600 border-gray-200"
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AreaOperationsSummary
