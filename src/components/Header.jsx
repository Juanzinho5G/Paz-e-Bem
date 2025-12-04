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
    <header className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-6 rounded-b-3xl shadow-md -mb-3 relative z-10">
      <div className="relative">
        <div className="absolute right-4 top-4">
          <button
            onClick={handleShare}
            aria-label="Compartilhar"
            className="bg-white/20 hover:bg-white/30 text-white rounded-full w-9 h-9 flex items-center justify-center"
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
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="text-base font-semibold">Matriz de Cerro Corá</div>
          <div className="text-sm opacity-90 flex items-center gap-2">
            <span>📍 Bem-vindo</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
