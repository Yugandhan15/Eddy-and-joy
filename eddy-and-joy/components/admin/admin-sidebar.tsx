"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Scissors,
  Images,
  Settings,
  ExternalLink,
  Tag,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/services", label: "Services", icon: Scissors },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/content", label: "Site Content", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-line bg-card lg:h-[calc(100vh-72px)] lg:w-64 lg:border-r lg:sticky lg:top-[72px]">
      <div className="px-6 py-6">
        <Link href="/" className="font-display text-lg text-ink">
          Eddy <span className="italic text-accent">&amp;</span> Joy
        </Link>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-muted">
          Admin Dashboard
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-accent-tint text-accent-hover"
                  : "text-ink/70 hover:bg-accent-tint/60 hover:text-ink"
              )}
            >
              <Icon size={17} aria-hidden />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line px-6 py-5">
        <p className="text-xs text-muted">Signed in as</p>
        <p className="truncate text-sm font-medium text-ink">{adminName}</p>
        <Link
          href="/"
          className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent-hover hover:underline"
        >
          <ExternalLink size={13} aria-hidden /> View site
        </Link>
      </div>
    </aside>
  );
}
