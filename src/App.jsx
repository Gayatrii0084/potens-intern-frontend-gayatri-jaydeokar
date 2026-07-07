import { useState } from "react"
import Header from "./Components/Header"
import LoginPage from "./Components/LoginPage"
import OperatorContextBar from "./Components/OperatorContextBar"
import KpiSummary from "./Components/KpiSummary"
import ActionPanel from "./Components/ActionPanel"
import EscalationContacts from "./Components/EscalationContacts"
import AnomalyPanel from "./Components/Anomalypanel"
import LiveMetric from "./Components/Livemetric"
import AreaOperationsSummary from "./Components/AreaOperationsSummary"
import { DEPARTMENTS, PUNE_AREAS } from "./mockData"

function App() {
  const [lang, setLang] = useState("en")
  const [operatorName, setOperatorName] = useState(null)
  const [userDepartment, setUserDepartment] = useState(null)
  const [userArea, setUserArea] = useState(null)
  const [activeDepartment, setActiveDepartment] = useState("medical")
  const [activeArea, setActiveArea] = useState("shivajinagar-deccan")

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

  const userAreaData = PUNE_AREAS.find((a) => a.id === userArea)
  const activeAreaMeta = PUNE_AREAS.find((a) => a.id === activeArea)

  const contactsSectionTitle = lang === "mr" ? "तातडीच्या मदतीसाठी संपर्क" : "Escalation Contacts"

  const readOnlyMessage = lang === "mr"
    ? "फक्त पहा — हा परिसर त्याच्या नियुक्त ऑपरेशन्स टीमकडून व्यवस्थापित केला जातो."
    : "View only — this area is managed by its assigned operations team."

  const mappedContacts = activeDeptData.contacts.map((c) => ({
    role: lang === "mr" ? c.roleMr : c.roleEn,
    desc: lang === "mr" ? c.descMr : c.descEn,
    ext: lang === "mr" ? c.ext.replace("Ext.", "विस्तारित क्र.") : c.ext,
    statusType: c.statusType,
  }))

  const selectorBtnBase = "px-3 py-2 text-xs font-bold border flex items-center gap-1.5 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-700"

  return (
    <div className="cockpit-shell pb-6 sm:pb-8">
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onSignOut={handleSignOut}
      />

      <main className="cockpit-main">

        <OperatorContextBar
          lang={lang}
          operatorName={operatorName}
          assignedAreaLabel={lang === "mr" ? userAreaData.nameMr : userAreaData.nameEn}
          viewingDeptLabel={lang === "mr" ? activeDeptData.titleMr : activeDeptData.titleEn}
          viewingAreaLabel={lang === "mr" ? activeAreaMeta.nameMr : activeAreaMeta.nameEn}
        />

        <nav aria-label="Department and area switcher" className="cockpit-nav-strip">
          <div className="flex flex-wrap items-start gap-2 sm:gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 sm:px-2 sm:border-r sm:border-gray-200 shrink-0 pt-1.5">
              {lang === "mr" ? "विभाग" : "DEPARTMENTS"}
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
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
                    className={`${selectorBtnBase} ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-gray-300 hover:bg-stone-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{deptLabel}</span>
                    <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.5 tracking-wider ${
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

          <div className="flex flex-wrap items-start gap-2 sm:gap-3 border-t border-gray-200 pt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 sm:px-2 sm:border-r sm:border-gray-200 shrink-0 pt-1.5">
              {lang === "mr" ? "परिसर" : "AREAS"}
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
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
                    className={`${selectorBtnBase} ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-gray-300 hover:bg-stone-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{areaLabel}</span>
                    <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.5 tracking-wider ${
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
            <div className="text-xs font-medium text-slate-600 bg-stone-50 border border-gray-200 px-3 py-2 leading-snug">
              {readOnlyMessage}
            </div>
          )}
        </nav>

        <div className="border-b border-gray-300 pb-3">
          <h2 className="cockpit-page-title flex flex-wrap items-center gap-x-2 gap-y-1 text-lg sm:text-xl">
            <span>{lang === "mr" ? activeDeptData.titleMr : activeDeptData.titleEn}</span>
            <span className="text-sm font-semibold text-cockpit-secondary">
              · {lang === "mr" ? activeAreaMeta.nameMr : activeAreaMeta.nameEn}
            </span>
            {isEditable ? (
              <span className="text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 uppercase tracking-wider">
                {lang === "mr" ? "संपादकीय प्रवेश" : "Editable"}
              </span>
            ) : (
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-300 px-2 py-0.5 uppercase tracking-wider">
                {lang === "mr" ? "फक्त पहा" : "View Only"}
              </span>
            )}
          </h2>
          <p className="mt-1 text-sm text-cockpit-secondary">
            {lang === "mr" ? activeDeptData.subtitleMr : activeDeptData.subtitleEn}
          </p>
        </div>

        <KpiSummary
          lang={lang}
          items={currentItems}
          anomalies={activeAreaData.anomalies}
        />

        <LiveMetric lang={lang} activeDepartment={activeDepartment} />

        <div className="cockpit-dashboard-grid">
          <div className="cockpit-dashboard-col cockpit-dashboard-col-left">
            <div className="cockpit-dashboard-cell-action">
              <ActionPanel
                lang={lang}
                items={currentItems}
                onSetStatus={handleSetStatus}
                isEditable={isEditable}
              />
            </div>
            <div className="cockpit-dashboard-cell-escalation">
              <EscalationContacts
                lang={lang}
                title={contactsSectionTitle}
                contacts={mappedContacts}
              />
            </div>
          </div>

          <div className="cockpit-dashboard-col cockpit-dashboard-col-right">
            <div className="cockpit-dashboard-cell-anomaly">
              <AnomalyPanel lang={lang} anomalies={activeAreaData.anomalies} />
            </div>
            <div className="cockpit-dashboard-cell-area">
              <AreaOperationsSummary
                lang={lang}
                activeDepartment={activeDepartment}
                userDepartment={userDepartment}
                userArea={userArea}
                operatorName={operatorName}
                departmentItems={departmentItems}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
