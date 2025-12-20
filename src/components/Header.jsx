import { useEffect, useRef, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

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

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const actionsRef = useRef(null);

  useEffect(() => {
    const onBIP = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    const onInstalled = () => {
      setShowInstall(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    const checkNotify = async () => {
      const granted = typeof Notification !== "undefined" && Notification.permission === "granted";
      try {
        const isSub = await window.OneSignal?.User?.isSubscribed?.();
        setShowNotify(!isSub && !granted);
      } catch {
        setShowNotify(!granted);
      }
    };
    checkNotify();
    const onVis = () => checkNotify();
    window.addEventListener('focus', onVis);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener('focus', onVis);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  useEffect(() => {
    if (!actionsOpen) return;
    const onDown = (e) => {
      const root = actionsRef.current;
      if (!root) return;
      if (root.contains(e.target)) return;
      setActionsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [actionsOpen]);

  useEffect(() => {
    if (!showInstall && !showNotify) setActionsOpen(false);
  }, [showInstall, showNotify]);

  const handleInstall = async () => {
    try {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowInstall(false);
      }
      setDeferredPrompt(null);
    } catch (e) {
      console.error(e);
    }
  };
  const handleNotify = async () => {
    try {
      if (!window.OneSignal) return;
      await window.OneSignal.Notifications.requestPermission();
      await window.OneSignal.Notifications.subscribe();
      const isSub = await window.OneSignal?.User?.isSubscribed?.();
      const granted = typeof Notification !== "undefined" && Notification.permission === "granted";
      setShowNotify(!isSub && !granted);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="bg-[#33C6C5] text-white h-16 px-4 shadow-md relative z-10 flex items-center justify-between mb-1">
      <div className="flex flex-col items-start gap-0.5">
        <img
          src="/logo-header.png"
          alt="imagem logo"
          className="h-10 w-auto object-contain"
        />
      </div>
      <div className="flex items-center gap-2">
        {(showNotify || showInstall) && (
          <div className="relative" ref={actionsRef}>
            <button
              type="button"
              onClick={() => setActionsOpen((v) => !v)}
              aria-label="Ações"
              aria-expanded={actionsOpen}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <EllipsisVerticalIcon className="w-5 h-5 text-white" />
            </button>
            {actionsOpen && (
              <div className="absolute right-0 top-12 w-52 rounded-xl border border-white/30 bg-white shadow-lg overflow-hidden z-50">
                {showNotify && (
                  <button
                    type="button"
                    onClick={async () => {
                      await handleNotify();
                      setActionsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Ativar Notificações
                  </button>
                )}
                {showInstall && (
                  <button
                    type="button"
                    onClick={async () => {
                      await handleInstall();
                      setActionsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Instalar App
                  </button>
                )}
              </div>
            )}
          </div>
        )}
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
      </div>
    </header>
  );
}

export default Header;
