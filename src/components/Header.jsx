function Header() {
  return (
    <header className="h-16 bg-[#33C6C5] text-white flex items-center justify-center px-4">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <div className="text-center font-semibold">Matriz de Cerro Corá</div>
      </div>
    </header>
  )
}

export default Header
