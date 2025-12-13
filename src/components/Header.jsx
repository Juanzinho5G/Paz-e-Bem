function Header() {
  const handleShare = () => {
    try {
      const text = `Confira o app Paz e Bem: ${window.location.href}`;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    } catch (e) {
      console.error(e);
      // fallback simples
      alert("Não foi possível abrir o compartilhamento.");
    }
  };

  return (
    <header className="bg-[#33C6C5] text-white h-16 px-4 shadow-md relative z-10 flex items-center justify-between mb-1">
      <div className="flex flex-col items-start gap-0.5">
        <div className="text-base font-semibold">Paz e Bem</div>
        <div className="text-xs opacity-90 flex items-center gap-2">
          <span>📍 Matriz de Cerro Corá</span>
        </div>
      </div>
      <button
        onClick={handleShare}
        aria-label="Compartilhar"
        className="bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>
    </header>
  );
}

export default Header;
