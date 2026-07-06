import { useState } from "react"
import Header from "./Components/Header"
import ActionPanel from "./Components/ActionPanel"
import AnomalyPanel from "./Components/Anomalypanel"
import LiveMetric from "./Components/Livemetric"

function App() {
  // Language state lives here so it can be passed to any component that needs it.
  // Header fires onLanguageChange; all panels read the lang prop.
  const [lang, setLang] = useState("en")

  return (
    <div className="min-h-screen bg-stone-50">
      <Header lang={lang} onLanguageChange={setLang} />

      {/* Dashboard container — centered, max-width capped for desktop readability */}
      <main className="mx-auto max-w-screen-xl px-6 py-6">

        {/*
          Two-column grid:
            left  — ActionPanel spans 2 of 3 columns (main work area)
            right — LiveMetric + AnomalyPanel stacked in the remaining column
          On tablet/mobile (<lg) the columns stack vertically.
        */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Left: main action panel */}
          <div className="lg:col-span-2">
            <ActionPanel lang={lang} />
          </div>

          {/* Right: live metric on top, anomaly list below */}
          <div className="flex flex-col gap-5">
            <LiveMetric lang={lang} />
            <AnomalyPanel lang={lang} />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App