"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 leading-relaxed">
            We use cookies to improve your experience and analyze site traffic.
            By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
            <a href="/faq" className="text-sky underline hover:text-pink">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors rounded-full border border-gray-200"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm bg-sky text-white rounded-full hover:bg-sky-light transition-colors font-medium"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
