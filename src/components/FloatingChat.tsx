"use client";

import { useState } from "react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat options */}
      {isOpen && (
        <div className="mb-3 space-y-2 animate-fade-up">
          <a
            href="https://wa.me/8210XXXXXXXX?text=Hi!%20I'm%20interested%20in%20a%20Pohang%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-white rounded-full shadow-lg px-5 py-3 hover:shadow-xl transition-shadow"
          >
            <span className="text-xl">💬</span>
            <span className="text-sm font-medium text-dark">WhatsApp</span>
          </a>
          <a
            href="https://open.kakao.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-white rounded-full shadow-lg px-5 py-3 hover:shadow-xl transition-shadow"
          >
            <span className="text-xl">💛</span>
            <span className="text-sm font-medium text-dark">KakaoTalk</span>
          </a>
          <a
            href="mailto:hello@pohangsudal.com"
            className="flex items-center space-x-3 bg-white rounded-full shadow-lg px-5 py-3 hover:shadow-xl transition-shadow"
          >
            <span className="text-xl">✉️</span>
            <span className="text-sm font-medium text-dark">Email</span>
          </a>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-sky to-pink text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl"
        aria-label="Chat with us"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
