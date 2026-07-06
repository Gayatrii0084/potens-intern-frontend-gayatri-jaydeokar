function Header() {
  return (
    <header className="h-16 border-b border-gray-300 bg-white px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-900">
        Operations Dashboard
      </h1>

      <div className="flex items-center gap-4 text-sm">
        <span>English</span>
        <span className="text-gray-400">|</span>
        <span>मराठी</span>
      </div>
    </header>
  )
}

export default Header
