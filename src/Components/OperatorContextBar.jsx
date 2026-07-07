const STRINGS = {
  en: {
    role: "Senior Area Operator",
    assigned: "Assigned area",
    shift: "Shift",
    shiftValue: "Morning Operations",
    viewing: "Currently viewing",
  },
  mr: {
    role: "वरिष्ठ परिसर ऑपरेटर",
    assigned: "नियुक्त परिसर",
    shift: "पाळी",
    shiftValue: "सकाळचे ऑपरेशन्स",
    viewing: "सध्या पाहत आहात",
  },
}

function OperatorContextBar({
  lang = "en",
  operatorName,
  assignedAreaLabel,
  viewingDeptLabel,
  viewingAreaLabel,
}) {
  const t = STRINGS[lang] ?? STRINGS.en

  return (
    <div className="cockpit-card px-4 py-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-base font-bold text-cockpit-primary leading-snug break-words">
          {operatorName}
        </p>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {t.role}
        </p>
      </div>

      <dl className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 text-sm">
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t.assigned}</dt>
          <dd className="mt-0.5 font-semibold text-cockpit-primary">{assignedAreaLabel}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t.shift}</dt>
          <dd className="mt-0.5 font-semibold text-cockpit-primary">{t.shiftValue}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t.viewing}</dt>
          <dd className="mt-0.5 font-semibold text-cockpit-secondary break-words">
            {viewingDeptLabel} · {viewingAreaLabel}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default OperatorContextBar
