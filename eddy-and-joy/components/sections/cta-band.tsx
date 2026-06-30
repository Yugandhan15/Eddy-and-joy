import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand() {
  return (
    <section className="bg-ink py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-light text-white sm:text-5xl">
            Your next appointment is two minutes away
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-white/70">
            Pick a service, choose a time that works for you, and we&apos;ll take care of the
            rest.
          </p>
          <Link href="/booking" className="btn-pill btn-primary mt-9 inline-flex">
            Book Appointment <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
