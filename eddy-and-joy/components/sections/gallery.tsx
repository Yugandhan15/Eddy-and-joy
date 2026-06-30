"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_FILTERS, type GalleryItem } from "@/lib/data/gallery";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

const sizeClass: Record<GalleryItem["size"], string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  square: "",
};

export function Gallery({ showHeading = true }: { showHeading?: boolean }) {
  const [active, setActive] = useState<(typeof GALLERY_FILTERS)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => GALLERY_ITEMS.filter((g) => active === "All" || g.category === active),
    [active]
  );

  const openLightbox = (id: string) => {
    const idx = filtered.findIndex((g) => g.id === id);
    setLightboxIndex(idx);
  };

  const close = () => setLightboxIndex(null);
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));

  return (
    <section id="gallery" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {showHeading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="editorial-eyebrow">Our Work</span>
            <h2 className="mt-4 text-balance font-display text-4xl font-light text-ink sm:text-5xl">
              A look inside the studio
            </h2>
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2.5">
          {GALLERY_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === filter
                  ? "bg-ink text-white"
                  : "bg-white text-ink-soft hover:bg-accent-tint"
              )}
              aria-pressed={active === filter}
            >
              {filter}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              onClick={() => openLightbox(item.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                sizeClass[item.size]
              )}
              aria-label={`View image: ${item.alt}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                <ZoomIn className="text-white" size={26} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button
              onClick={close}
              aria-label="Close preview"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={24} />
            </button>
            <motion.div
              key={filtered[lightboxIndex].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-[70vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].image}
                alt={filtered[lightboxIndex].alt}
                fill
                sizes="90vw"
                className="rounded-2xl object-contain"
              />
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
