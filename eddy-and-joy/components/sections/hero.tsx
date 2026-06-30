"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { SITE } from "@/lib/site-config";

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

interface HeroProps {
  eyebrow?: string;
  headingLine1?: string;
  headingAccent?: string;
  headingLine2?: string;
  subheading?: string;
  imageUrl?: string;
}

export function Hero({
  eyebrow = "Premium Hair Salon & Beauty Studio",
  headingLine1 = "Quiet luxury,",
  headingAccent = "tailored",
  headingLine2 = "to you.",
  subheading = "From precision cuts to restorative facials, Eddy and Joy brings considered craft and calm spaces together — every visit, every detail.",
  imageUrl = "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2400&auto=format&fit=crop",
}: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
        role="img"
        aria-label="Interior of Eddy and Joy salon with soft natural light"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="editorial-eyebrow text-accent"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-5 max-w-3xl text-balance font-display text-5xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          {headingLine1}
          <br />
          <span className="italic text-accent">{headingAccent}</span> {headingLine2}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 max-w-lg text-balance text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {subheading}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link href="/booking" className="btn-pill btn-primary">
            Book Appointment
          </Link>
          <Link href="/services" className="btn-pill btn-ghost-light">
            View Services
          </Link>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-white/15 pt-8"
        >
          <div className="flex items-center gap-2">
            <div className="flex text-accent" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-white/85">
              {SITE.stats.rating} rated by clients
            </span>
          </div>
          <Stat value={`${SITE.stats.yearsExperience}+`} label="Years Experience" />
          <Stat value={`${(SITE.stats.happyClients / 1000).toFixed(1)}k+`} label="Happy Clients" />
          <Stat
            value={`${(SITE.stats.projectsCompleted / 1000).toFixed(1)}k+`}
            label="Services Completed"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 sm:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl text-white">{value}</p>
      <p className="text-xs text-white/65">{label}</p>
    </div>
  );
}
