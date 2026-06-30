import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const TESTIMONIALS = [
  {
    name: "Ananya R.",
    service: "Signature Facial",
    quote:
      "The space feels like a pause button on the day. My esthetician explained every step and my skin has never looked better.",
  },
  {
    name: "Karthik S.",
    service: "Signature Haircut",
    quote:
      "First salon where the consultation actually matched the result. Clean lines, no rush, exactly what I asked for.",
  },
  {
    name: "Meera P.",
    service: "Gel Nail Polish",
    quote:
      "Booking online took two minutes and the confirmation messages kept me in the loop the whole time. Small details done right.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="editorial-eyebrow">Client Stories</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-light text-ink sm:text-5xl">
            Loved by our regulars
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="card-luxury flex h-full flex-col p-8">
                <div className="flex text-accent" aria-hidden>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.service}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
