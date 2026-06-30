import { Reveal } from "@/components/ui/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-ink pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="editorial-eyebrow text-accent">{eyebrow}</span>
          <h1 className="mt-4 text-balance font-display text-4xl font-light text-white sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-xl text-balance text-base text-white/70">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
