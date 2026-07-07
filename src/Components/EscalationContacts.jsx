const STRINGS = {
  en: {
    disclaimer: "Internal support pathways for immediate approval and system exceptions.",
    available: "Available",
    onCall: "On Call",
  },
  mr: {
    disclaimer: "त्वरित मंजुरी आणि प्रणाली अपवादांसाठी अंतर्गत सहाय्य मार्ग.",
    available: "उपलब्ध",
    onCall: "कॉलवर",
  },
}

function EscalationContacts({ lang = "en", title, contacts = [] }) {
  const t = STRINGS[lang] ?? STRINGS.en

  return (
    <section className="cockpit-card min-w-0">
      <div className="cockpit-card-header py-3">
        <h3 className="text-sm font-bold text-cockpit-primary tracking-wider uppercase">
          {title}
        </h3>
        <p className="mt-1 text-xs font-medium text-cockpit-secondary">
          {t.disclaimer}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border-t border-gray-200">
        {contacts.map((contact, idx) => {
          const isAvailable = contact.statusType === "available"
          return (
            <div key={idx} className="bg-white px-4 py-3 flex flex-col gap-2 min-w-0">
              <p className="text-sm font-bold text-cockpit-primary leading-tight">
                {contact.role}
              </p>
              <p className="text-xs text-cockpit-secondary leading-snug">
                {contact.desc}
              </p>
              <div className="mt-auto pt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold text-cockpit-primary bg-stone-100 px-2 py-1 border border-gray-200">
                  {contact.ext}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  isAvailable
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-green-500" : "bg-blue-500"}`} />
                  {isAvailable ? t.available : t.onCall}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default EscalationContacts
