import { useState } from "react"
import { DEPARTMENTS } from "../mockData"
import { DEPARTMENT_ACCESS_CODES } from "../accessCodes"

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
]

const STRINGS = {
  en: {
    title: "Operations Cockpit",
    subtitle: "Department Access",
    instruction: "Select your department and enter its access code",
    departmentLabel: "Department",
    accessCodeLabel: "Access Code",
    show: "Show",
    hide: "Hide",
    continue: "Continue to Cockpit",
    errors: {
      noDepartment: "Please select your department.",
      noCode: "Please enter the department access code.",
      mismatch: "The access code does not match the selected department. Please check and try again.",
    },
  },
  mr: {
    title: "ऑपरेशन्स कॉकपिट",
    subtitle: "विभाग प्रवेश",
    instruction: "तुमचा विभाग निवडा आणि त्याचा प्रवेश कोड टाका",
    departmentLabel: "विभाग",
    accessCodeLabel: "प्रवेश कोड",
    show: "दाखवा",
    hide: "लपवा",
    continue: "कॉकपिटमध्ये जा",
    errors: {
      noDepartment: "कृपया तुमचा विभाग निवडा.",
      noCode: "कृपया विभागाचा प्रवेश कोड टाका.",
      mismatch: "प्रवेश कोड निवडलेल्या विभागाशी जुळत नाही. कृपया पुन्हा तपासा.",
    },
  },
}

function LoginPage({ lang = "en", onLanguageChange, onLogin }) {
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [departmentError, setDepartmentError] = useState("")
  const [codeError, setCodeError] = useState("")
  const [mismatchError, setMismatchError] = useState("")

  const t = STRINGS[lang] ?? STRINGS.en

  const handleSubmit = (e) => {
    e.preventDefault()
    setDepartmentError("")
    setCodeError("")
    setMismatchError("")

    let hasError = false

    if (!selectedDepartment) {
      setDepartmentError(t.errors.noDepartment)
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

    onLogin(selectedDepartment)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ backgroundColor: "#F2F1EC" }}>
      {/* Language toggle — top right on larger screens, above card on small */}
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

      {/* Login card */}
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

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6" noValidate>
          {/* Department selector */}
          <div>
            <label className="block text-base font-semibold mb-3" style={{ color: "#1B2A41" }}>
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
                      minHeight: "52px",
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
                style={{
                  height: "52px",
                  color: "#1B2A41",
                  border: "1px solid #D9D6CE",
                  backgroundColor: "#FFFFFF",
                }}
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

          {/* Submit */}
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
