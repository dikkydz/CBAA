"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const msg = encodeURIComponent(
    "Halo Cimol Bojot AA! Saya ingin memesan. Bisa bantu saya?"
  );

  return (
    <a
      href={`https://wa.me/6281234567890?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat WhatsApp"
    >
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl wa-pulse transition-all group-hover:scale-110 group-hover:rounded-xl"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle className="w-6 h-6 text-white fill-white" />
        {/* Tooltip */}
        <div
          className="absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ backgroundColor: "#1a0808", color: "#ffffff" }}
        >
          Chat WhatsApp
        </div>
      </div>
    </a>
  );
}