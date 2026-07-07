import { useState } from "react"
import Header from "./Components/Header"
import LoginPage from "./Components/LoginPage"
import ActionPanel from "./Components/ActionPanel"
import AnomalyPanel from "./Components/Anomalypanel"
import LiveMetric from "./Components/Livemetric"
import { DEPARTMENTS, PUNE_AREAS } from "./mockData"

function App() {
  const [lang, setLang] = useState("en")
  const [operatorName, setOperatorName] = useState(null)
  const [userDepartment, setUserDepartment] = useState(null)
  const [userArea, setUserArea] = useState(null)
  const [activeDepartment, setActiveDepartment] = useState("medical")
  const [activeArea, setActiveArea] = useState("shivajinagar-deccan")

  // Lift action items state to App.jsx to preserve status across department/area switches
  const [departmentItems, setDepartmentItems] = useState(() => {
    const initial = {}
    DEPARTMENTS.forEach((dept) => {
      initial[dept.id] = {}
      PUNE_AREAS.forEach((area) => {
        initial[dept.id][area.id] = dept.areas[area.id].items.map((item) => ({ ...item, status: "pending" }))
      })
    })
    return initial
  })

  const activeDeptData = DEPARTMENTS.find((d) => d.id === activeDepartment)
  const activeAreaData = activeDeptData.areas[activeArea]
  const currentItems = departmentItems[activeDepartment][activeArea]
  const isEditable = activeDepartment === userDepartment && activeArea === userArea

  const handleSetStatus = (itemId, newStatus) => {
    setDepartmentItems((prev) => ({
      ...prev,
      [activeDepartment]: {
        ...prev[activeDepartment],
        [activeArea]: prev[activeDepartment][activeArea].map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        ),
      },
    }))
  }

  const handleLogin = ({ operatorName: name, departmentId, areaId }) => {
    setOperatorName(name)
    setUserDepartment(departmentId)
    setUserArea(areaId)
    setActiveDepartment(departmentId)
    setActiveArea(areaId)
  }

  const handleSignOut = () => {
    setOperatorName(null)
    setUserDepartment(null)
    setUserArea(null)
  }

  if (!userDepartment) {
    return (
      <LoginPage
        lang={lang}
        onLanguageChange={setLang}
        onLogin={handleLogin}
      />
    )
  }

  const userDeptData = DEPARTMENTS.find((d) => d.id === userDepartment)
  const userAreaData = PUNE_AREAS.find((a) => a.id === userArea)

  const contactsSectionTitle = lang === "mr" ? "तातडीच्या मदतीसाठी संपर्क" : "Escalation Contacts"
  const contactsDisclaimer = lang === "mr"
    ? "त्वरित मंजुरी आणि प्रणाली अपवादांसाठी अंतर्गत सहाय्य मार्ग."
    : "Internal support pathways for immediate approval and system exceptions."

  const readOnlyMessage = lang === "mr"
    ? "फक्त पहा — हा परिसर त्याच्या नियुक्त ऑपरेशन्स टीमकडून व्यवस्थापित केला जातो."
    : "View only — this area is managed by its assigned operations team."

  const statusLabels = {
    en: { available: "Available", onCall: "On Call" },
    mr: { available: "उपलब्ध", onCall: "कॉलवर" },
  }[lang]

  const mappedContacts = activeDeptData.contacts.map((c) => ({
    role: lang === "mr" ? c.roleMr : c.roleEn,
    desc: lang === "mr" ? c.descMr : c.descEn,
    ext: lang === "mr" ? c.ext.replace("Ext.", "विस्तारित क्र.") : c.ext,
    statusType: c.statusType,
  }))

  return (
    <div className="bg-transparent pb-10">
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onSignOut={handleSignOut}
        operatorName={operatorName}
        departmentLabel={lang === "mr" ? userDeptData.titleMr : userDeptData.titleEn}
        areaLabel={lang === "mr" ? userAreaData.nameMr : userAreaData.nameEn}
      />

      <main className="mx-auto w-[94%] max-w-[1600px] px-5 py-8 flex flex-col gap-6">

        {/* ── Department Selector ── */}
        <nav aria-label="Department switcher" className="border border-gray-300 bg-white p-2 rounded-sm shadow-sm flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 border-r border-gray-200 hidden md:inline">
              {lang === "mr" ? "विभाग" : "DEPARTMENTS"}
            </span>
            <div className="flex flex-wrap gap-1">
              {DEPARTMENTS.map((dept) => {
                const isSelected = activeDepartment === dept.id
                const isOwn = dept.id === userDepartment
                const deptLabel = lang === "mr" ? dept.nameMr : dept.nameEn
                const badgeText = isOwn
                  ? (lang === "mr" ? "माझा विभाग" : "My Dept")
                  : (lang === "mr" ? "फक्त पहा" : "View Only")

                return (
                  <button
                    key={dept.id}
                    onClick={() => setActiveDepartment(dept.id)}
                    className={`px-3.5 py-1.5 text-xs font-bold transition-all border rounded-sm flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-700 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-600 border-gray-300 hover:bg-stone-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{deptLabel}</span>
                    <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-sm tracking-wider ${
                      isSelected
                        ? (isOwn ? "bg-green-700 text-green-100" : "bg-slate-800 text-slate-300")
                        : (isOwn ? "bg-green-50 text-green-700 border border-green-200" : "bg-stone-100 text-slate-500 border border-gray-200")
                    }`}>
                      {badgeText}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Area Selector ── */}
          <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 border-r border-gray-200 hidden md:inline">
              {lang === "mr" ? "परिसर" : "AREAS"}
            </span>
            <div className="flex flex-wrap gap-1">
              {PUNE_AREAS.map((area) => {
                const isSelected = activeArea === area.id
                const isOwn = area.id === userArea
                const areaLabel = lang === "mr" ? area.nameMr : area.nameEn
                const badgeText = isOwn
                  ? (lang === "mr" ? "माझा परिसर" : "My Area")
                  : (lang === "mr" ? "फक्त पहा" : "View Only")

                return (
                  <button
                    key={area.id}
                    onClick={() => setActiveArea(area.id)}
                    className={`px-3 py-1.5 text-xs font-bold transition-all border rounded-sm flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-700 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-600 border-gray-300 hover:bg-stone-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{areaLabel}</span>
                    <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-sm tracking-wider ${
                      isSelected
                        ? (isOwn ? "bg-green-700 text-green-100" : "bg-slate-800 text-slate-300")
                        : (isOwn ? "bg-green-50 text-green-700 border border-green-200" : "bg-stone-100 text-slate-500 border border-gray-200")
                    }`}>
                      {badgeText}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {!isEditable && (
            <div className="text-xs font-medium text-slate-500 bg-stone-50 border border-gray-200 px-3 py-1.5 rounded-sm max-w-lg leading-snug">
              {readOnlyMessage}
            </div>
          )}
        </nav>

        {/* ── Department Title area ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-300 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#1B2A41] flex items-center gap-2 flex-wrap">
              {lang === "mr" ? activeDeptData.titleMr : activeDeptData.titleEn}
              <span className="text-sm font-semibold text-[#5C6470]">
                · {lang === "mr"
                  ? PUNE_AREAS.find((a) => a.id === activeArea).nameMr
                  : PUNE_AREAS.find((a) => a.id === activeArea).nameEn}
              </span>
              {isEditable ? (
                <span className="text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {lang === "mr" ? "संपादकीय प्रवेश" : "Editable"}
                </span>
              ) : (
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-300 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {lang === "mr" ? "फक्त पहा" : "View Only"}
                </span>
              )}
            </h2>
            <p className="mt-1 text-sm text-[#5C6470]">
              {lang === "mr" ? activeDeptData.subtitleMr : activeDeptData.subtitleEn}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[70%_minmax(0,1fr)]">

          <div className="flex flex-col gap-6">
            <ActionPanel
              lang={lang}
              items={currentItems}
              onSetStatus={handleSetStatus}
              isEditable={isEditable}
            />

            <section className="border border-gray-300 bg-white">
              <div className="border-b border-gray-300 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="font-bold text-[#1B2A41] text-sm tracking-wider uppercase">
                  {contactsSectionTitle}
                </h3>
                <p className="text-xs font-medium text-[#5C6470]">
                  {contactsDisclaimer}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D9D6CE]">
                {mappedContacts.map((contact, idx) => {
                  const isAvailable = contact.statusType === "available"
                  return (
                    <div key={idx} className="p-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-base font-bold text-[#1B2A41] truncate leading-tight">
                          {contact.role}
                        </p>
                        <p className="mt-1 text-sm text-[#5C6470] truncate">
                          {contact.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs font-mono font-medium text-[#1B2A41] bg-stone-100 px-2 py-0.5 border border-gray-200 rounded-sm">
                          {contact.ext}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-sm ${
                          isAvailable
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-green-500" : "bg-blue-500"}`} />
                          {isAvailable ? statusLabels.available : statusLabels.onCall}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6">
            <LiveMetric lang={lang} activeDepartment={activeDepartment} />
            <AnomalyPanel lang={lang} anomalies={activeAreaData.anomalies} />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
