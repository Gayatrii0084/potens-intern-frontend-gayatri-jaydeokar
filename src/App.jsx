import { useState } from "react"
import Header from "./Components/Header"
import ActionPanel from "./Components/ActionPanel"
import AnomalyPanel from "./Components/Anomalypanel"
import LiveMetric from "./Components/Livemetric"

// ── Escalation contacts translations dictionary ──────────────────────────────
const ESCALATION_STRINGS = {
  en: {
    sectionTitle: "Escalation Contacts",
    disclaimer: "Internal support pathways for immediate approval and system exceptions.",
    status: {
      available: "Available",
      onCall: "On Call",
    },
    contacts: [
      {
        role: "Operations Lead",
        desc: "For urgent approvals",
        ext: "Ext. 201",
        statusType: "available",
      },
      {
        role: "IT Support",
        desc: "System and access issues",
        ext: "Ext. 114",
        statusType: "available",
      },
      {
        role: "Compliance Desk",
        desc: "Policy exceptions",
        ext: "Ext. 305",
        statusType: "onCall",
      },
    ]
  },
  mr: {
    sectionTitle: "तातडीच्या मदतीसाठी संपर्क",
    disclaimer: "त्वरित मंजुरी आणि प्रणाली अपवादांसाठी अंतर्गत सहाय्य मार्ग.",
    status: {
      available: "उपलब्ध",
      onCall: "कॉलवर",
    },
    contacts: [
      {
        role: "कामकाज प्रमुख (Operations Lead)",
        desc: "तातडीच्या मंजुरीसाठी",
        ext: "विस्तारित क्र. २०१",
        statusType: "available",
      },
      {
        role: "आयटी सपोर्ट (IT Support)",
        desc: "सिस्टम आणि ॲक्सेस समस्या",
        ext: "विस्तारित क्र. ११४",
        statusType: "available",
      },
      {
        role: "नियमन आणि पालन (Compliance Desk)",
        desc: "धोरण अपवाद",
        ext: "विस्तारित क्र. ३०५",
        statusType: "onCall",
      },
    ]
  }
}

function App() {
  // Language state lives here so it can be passed to any component that needs it.
  // Header fires onLanguageChange; all panels read the lang prop.
  const [lang, setLang] = useState("en")
  const e = ESCALATION_STRINGS[lang] ?? ESCALATION_STRINGS.en

  return (
    <div className="min-h-screen bg-stone-50">
      <Header lang={lang} onLanguageChange={setLang} />

      {/* Dashboard container — centered, max-width capped for desktop readability */}
      {/* consistent 20px (px-5 py-5) page padding and 24px (gap-6) vertical spacing */}
      <main className="mx-auto max-w-screen-xl px-5 py-5 flex flex-col gap-6">

        {/*
          Two-column grid:
            left  — ActionPanel (exactly 68% width on desktop)
            right — LiveMetric + AnomalyPanel + EscalationContacts stacked in sidebar (32% width)
          On tablet/mobile (<lg) the columns stack naturally.
          Uses 24px (gap-6) spacing between major panels.
        */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[68%_minmax(0,1fr)]">

          {/* Left: main action panel */}
          <div>
            <ActionPanel lang={lang} />
          </div>

          {/* Right: live metric, anomaly list, and escalation contacts stacked in sidebar */}
          <div className="flex flex-col gap-6">
            <LiveMetric lang={lang} />
            <AnomalyPanel lang={lang} />

            {/* Escalation Contacts Panel */}
            <section className="border border-gray-300 bg-white">
              {/* Header & Subtitle (16px / p-4 internal card padding) */}
              <div className="border-b border-gray-300 p-4">
                <h3 className="font-bold text-[#1B2A41] text-xs tracking-wider uppercase">
                  {e.sectionTitle}
                </h3>
                <p className="mt-0.5 text-[10px] leading-snug text-[#5C6470]">
                  {e.disclaimer}
                </p>
              </div>

              {/* Contacts Row stacked vertically */}
              <div className="divide-y divide-[#D9D6CE]">
                {e.contacts.map((contact, idx) => {
                  const isAvailable = contact.statusType === "available";
                  return (
                    <div key={idx} className="p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#1B2A41] truncate">
                          {contact.role}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#5C6470] truncate">
                          {contact.desc}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono font-medium text-[#1B2A41] bg-stone-100 px-1.5 py-0.5 border border-gray-200 rounded-sm">
                          {contact.ext}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-sm ${
                          isAvailable 
                            ? "bg-green-50 text-green-700 border border-green-200" 
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${isAvailable ? "bg-green-500" : "bg-blue-500"}`} />
                          {isAvailable ? e.status.available : e.status.onCall}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  )
}

export default App