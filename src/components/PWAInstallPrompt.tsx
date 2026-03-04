"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
    setDismissed(true);
  };

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-fade-up">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center space-x-3">
        <div className="flex-shrink-0 w-10 h-10 hero-gradient rounded-xl flex items-center justify-center text-white text-lg">
          🦦
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-dark text-sm font-medium">Install Pohang Sudal</p>
          <p className="text-gray-400 text-xs">Quick access on your home screen</p>
        </div>
        <div className="flex-shrink-0 flex items-center space-x-2">
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-400 text-xs hover:text-gray-600"
          >
            Later
          </button>
          <button
            onClick={handleInstall}
            className="bg-sky text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-sky/90 transition-colors"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
