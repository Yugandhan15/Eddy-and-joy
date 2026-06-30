import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card-luxury group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
          {service.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-ink">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="font-semibold text-ink">{service.price}</span>
          <span className="flex items-center gap-1.5 text-muted">
            <Clock size={14} /> {service.duration}
          </span>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/booking?service=${encodeURIComponent(service.name)}`}
            className="btn-pill btn-primary flex-1 text-sm"
          >
            Book Now
          </Link>
          <Link
            href={`/services/${service.slug}`}
            aria-label={`Read more about ${service.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
