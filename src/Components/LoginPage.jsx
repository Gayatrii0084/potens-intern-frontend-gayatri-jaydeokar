import { useState } from "react"
import { DEPARTMENTS, PUNE_AREAS } from "../mockData"
import { DEPARTMENT_ACCESS_CODES } from "../accessCodes"

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
]

const STRINGS = {
  en: {
    title: "Operations Cockpit",
    subtitle: "Department Access",
    instruction: "Enter your details to access the Pune operations cockpit",
    operatorNameLabel: "Operator Name",
    departmentLabel: "Department",
    areaLabel: "Assigned Pune Area",
    accessCodeLabel: "Access Code",
    show: "Show",
    hide: "Hide",
    continue: "Continue to Cockpit",
    selectArea: "Select your assigned area",
    errors: {
      noOperatorName: "Please enter your operator name.",
      operatorNameShort: "Operator name must be at least 2 characters.",
      noDepartment: "Please select your department.",
      noArea: "Please select your assigned Pune area.",
      noCode: "Please enter the department access code.",
      mismatch: "The access code does not match the selected department. Please check and try again.",
    },
  },
  mr: {
    title: "ऑपरेशन्स कॉकपिट",
    subtitle: "विभाग प्रवेश",
    instruction: "पुणे ऑपरेशन्स कॉकपिटमध्ये प्रवेश करण्यासाठी तुमची माहिती भरा",
    operatorNameLabel: "ऑपरेटरचे नाव",
    departmentLabel: "विभाग",
    areaLabel: "नियुक्त पुणे परिसर",
    accessCodeLabel: "प्रवेश कोड",
    show: "दाखवा",
    hide: "लपवा",
    continue: "कॉकपिटमध्ये जा",
    selectArea: "तुमचा नियुक्त परिसर निवडा",
    errors: {
      noOperatorName: "कृपया ऑपरेटरचे नाव टाका.",
      operatorNameShort: "ऑपरेटरचे नाव किमान २ अक्षरे असावे.",
      noDepartment: "कृपया तुमचा विभाग निवडा.",
      noArea: "कृपया नियुक्त पुणे परिसर निवडा.",
      noCode: "कृपया विभागाचा प्रवेश कोड टाका.",
      mismatch: "प्रवेश कोड निवडलेल्या विभागाशी जुळत नाही. कृपया पुन्हा तपासा.",
    },
  },
}

function isValidOperatorName(name) {
  return name.trim().length >= 2
}

function LoginPage({ lang = "en", onLanguageChange, onLogin }) {
  const [operatorName, setOperatorName] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [operatorNameError, setOperatorNameError] = useState("")
  const [departmentError, setDepartmentError] = useState("")
  const [areaError, setAreaError] = useState("")
  const [codeError, setCodeError] = useState("")
  const [mismatchError, setMismatchError] = useState("")

  const t = STRINGS[lang] ?? STRINGS.en

  const handleSubmit = (e) => {
    e.preventDefault()
    setOperatorNameError("")
    setDepartmentError("")
    setAreaError("")
    setCodeError("")
    setMismatchError("")

    let hasError = false

    if (!operatorName.trim()) {
      setOperatorNameError(t.errors.noOperatorName)
      hasError = true
    } else if (!isValidOperatorName(operatorName)) {
      setOperatorNameError(t.errors.operatorNameShort)
      hasError = true
    }

    if (!selectedDepartment) {
      setDepartmentError(t.errors.noDepartment)
      hasError = true
    }

    if (!selectedArea) {
      setAreaError(t.errors.noArea)
      hasError = true
    }

    if (!accessCode.trim()) {
      setCodeError(t.errors.noCode)
      hasError = true
    }

    if (hasError) return

    const expectedCode = DEPARTMENT_ACCESS_CODES[selectedDepartment]
    if (accessCode.trim() !== expectedCode) {
      setMismatchError(t.errors.mismatch)
      return
    }

    onLogin({
      operatorName: operatorName.trim(),
      departmentId: selectedDepartment,
      areaId: selectedArea,
    })
  }

  const inputStyle = {
    height: "52px",
    color: "#1B2A41",
    border: "1px solid #D9D6CE",
    backgroundColor: "#FFFFFF",
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ backgroundColor: "#F2F1EC" }}>
      <div className="w-full max-w-md mb-4 flex justify-end">
        <div
          role="group"
          aria-label="Select language"
          className="flex items-stretch border overflow-hidden"
          style={{ borderColor: "#D9D6CE" }}
        >
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => onLanguageChange && onLanguageChange(code)}
              aria-pressed={lang === code}
              className="px-4 py-2.5 text-sm font-semibold leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
              style={
                lang === code
                  ? { backgroundColor: "#1E3A5F", color: "#FFFFFF" }
                  : { backgroundColor: "#FFFFFF", color: "#5C6470" }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="w-full max-w-md rounded-sm p-8"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #D9D6CE" }}
      >
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#1B2A41" }}>
          {t.title}
        </h1>
        <h2 className="mt-1 text-lg font-semibold" style={{ color: "#1E3A5F" }}>
          {t.subtitle}
        </h2>
        <p className="mt-3 text-base leading-relaxed" style={{ color: "#5C6470" }}>
          {t.instruction}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>
          {/* Operator Name */}
          <div>
            <label htmlFor="operator-name" className="block text-base font-semibold mb-2" style={{ color: "#1B2A41" }}>
              {t.operatorNameLabel}
            </label>
            <input
              id="operator-name"
              type="text"
              value={operatorName}
              onChange={(e) => {
                setOperatorName(e.target.value)
                setOperatorNameError("")
              }}
              autoComplete="name"
              className="w-full px-4 rounded-sm text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
              style={inputStyle}
            />
            {operatorNameError && (
              <p className="mt-2 text-sm font-medium" style={{ color: "#B91C1C" }} role="alert">
                {operatorNameError}
              </p>
            )}
          </div>

          {/* Department selector */}
          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: "#1B2A41" }}>
              {t.departmentLabel}
            </label>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label={t.departmentLabel}>
              {DEPARTMENTS.map((dept) => {
                const isSelected = selectedDepartment === dept.id
                const deptLabel = lang === "mr" ? dept.titleMr : dept.titleEn
                return (
                  <button
                    key={dept.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setSelectedDepartment(dept.id)
                      setDepartmentError("")
                      setMismatchError("")
                    }}
                    className="w-full text-left px-4 rounded-sm text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
                    style={{
                      minHeight: "48px",
                      color: "#1B2A41",
                      backgroundColor: isSelected ? "#F2F1EC" : "#FFFFFF",
                      border: isSelected ? "2px solid #1E3A5F" : "1px solid #D9D6CE",
                    }}
                  >
                    {deptLabel}
                  </button>
                )
              })}
            </div>
            {departmentError && (
              <p className="mt-2 text-sm font-medium" style={{ color: "#B91C1C" }} role="alert">
                {departmentError}
              </p>
            )}
          </div>

          {/* Assigned Pune Area */}
          <div>
            <label htmlFor="assigned-area" className="block text-base font-semibold mb-2" style={{ color: "#1B2A41" }}>
              {t.areaLabel}
            </label>
            <select
              id="assigned-area"
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value)
                setAreaError("")
              }}
              className="w-full px-4 rounded-sm text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 appearance-none"
              style={inputStyle}
            >
              <option value="">{t.selectArea}</option>
              {PUNE_AREAS.map((area) => (
                <option key={area.id} value={area.id}>
                  {lang === "mr" ? area.nameMr : area.nameEn}
                </option>
              ))}
            </select>
            {areaError && (
              <p className="mt-2 text-sm font-medium" style={{ color: "#B91C1C" }} role="alert">
                {areaError}
              </p>
            )}
          </div>

          {/* Access code input */}
          <div>
            <label htmlFor="access-code" className="block text-base font-semibold mb-2" style={{ color: "#1B2A41" }}>
              {t.accessCodeLabel}
            </label>
            <div className="relative">
              <input
                id="access-code"
                type={showCode ? "text" : "password"}
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value)
                  setCodeError("")
                  setMismatchError("")
                }}
                autoComplete="off"
                className="w-full px-4 pr-24 rounded-sm text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowCode((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 text-sm font-semibold rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
                style={{ color: "#1E3A5F", minHeight: "40px" }}
                aria-label={showCode ? t.hide : t.show}
              >
                {showCode ? t.hide : t.show}
              </button>
            </div>
            {codeError && (
              <p className="mt-2 text-sm font-medium" style={{ color: "#B91C1C" }} role="alert">
                {codeError}
              </p>
            )}
            {mismatchError && (
              <p className="mt-2 text-sm font-medium" style={{ color: "#B91C1C" }} role="alert">
                {mismatchError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-sm text-base font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              height: "52px",
              backgroundColor: "#1E3A5F",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#16293F" }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1E3A5F" }}
          >
            {t.continue}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
