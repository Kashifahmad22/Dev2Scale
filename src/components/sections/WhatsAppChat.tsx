"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Calendar, Check, Phone, Video } from "lucide-react";
import { type ChatMessage } from "@/config/site";
import { EASE_CLEAN, getMotionProps } from "@/lib/animations";
import { cn } from "@/lib/utils";

// The container staggers the bubbles; each child fades/slides in. Reveal is
// scroll-triggered (once) so messages animate exactly when the phone comes into
// view — with a fast, capped stagger — and render fully visible immediately
// under reduced motion.
const messagesContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const bubbleVariant: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: EASE_CLEAN },
  },
};

/**
 * Mock WhatsApp conversation inside a dark phone frame (built from CSS — no
 * images). Lead messages sit left (incoming, dark slate); the assistant's sit
 * right (outgoing, green), including a booking-link CTA bubble. Bubbles reveal
 * in sequence when the phone scrolls into view; the component is keyed by demo
 * id upstream so the sequence replays each time a tab is selected.
 */
export function WhatsAppChat({ messages }: { messages: ChatMessage[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="overflow-hidden rounded-[2rem] border border-[#243038] bg-[#0b141a] shadow-[0_30px_70px_-30px_rgba(13,18,40,0.45)]">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-[#1f2c33] px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-white">
            D2
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              Dev2Scale Assistant
            </p>
            <p className="text-[11px] text-emerald-400">online</p>
          </div>
          <Video size={17} className="text-white/40" />
          <Phone size={16} className="text-white/40" />
        </div>

        {/* Messages */}
        <motion.div
          {...getMotionProps(reduce, messagesContainer)}
          className="space-y-2 bg-[#0b141a] px-3.5 py-4"
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={bubbleVariant}
              className={cn(
                "flex",
                msg.from === "bot" ? "justify-end" : "justify-start",
              )}
            >
              <Bubble message={msg} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/** Single message bubble — incoming, outgoing, or a booking-link CTA. */
function Bubble({ message }: { message: ChatMessage }) {
  const isBot = message.from === "bot";

  if (message.isCta) {
    return (
      <span className="inline-flex max-w-[80%] items-center gap-2 rounded-lg rounded-tr-sm bg-[#005c4b] px-3.5 py-2.5 text-sm font-medium text-white">
        <Calendar size={15} className="text-emerald-200" />
        {message.text} →
      </span>
    );
  }

  return (
    <span
      className={cn(
        "max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed",
        isBot
          ? "rounded-tr-sm bg-[#005c4b] text-white"
          : "rounded-tl-sm bg-[#202c33] text-white/90",
      )}
    >
      {message.text}
      {isBot && (
        <Check
          size={13}
          className="ml-1 inline-block translate-y-px text-emerald-300/80"
        />
      )}
    </span>
  );
}