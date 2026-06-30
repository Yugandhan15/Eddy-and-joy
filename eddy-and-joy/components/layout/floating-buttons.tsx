"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <motion.a
        href={SITE.phoneHref}
        aria-label="Call Eddy and Joy now"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center justify-center rounded-full bg-ink text-white shadow-[var(--shadow-soft)]"
        style={{ width: 52, height: 52 }}
      >
        <Phone size={20} />
      </motion.a>

      <motion.a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.6)]"
        style={{ width: 60, height: 60 }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
        <MessageCircle size={26} className="relative" />
      </motion.a>
    </div>
  );
}
