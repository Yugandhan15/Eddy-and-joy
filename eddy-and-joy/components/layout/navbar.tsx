"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, User, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/lib/auth/actions";

interface SessionInfo {
  name: string;
  isAdmin: boolean;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const supabase = createClient();

    async function loadSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSession(null);
        setLoaded(true);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      setSession({
        name: profile?.full_name || user.email?.split("@")[0] || "Account",
        isAdmin: profile?.role === "admin",
      });
      setLoaded(true);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-500",
        scrolled || open ? "glass-nav" : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className={cn(
            "font-display text-xl tracking-tight transition-colors",
            scrolled || open ? "text-ink" : "text-white"
          )}
        >
          Eddy <span className="italic text-accent">&amp;</span> Joy
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  scrolled ? "text-ink" : "text-white/90"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {loaded && session ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent",
                  scrolled ? "text-ink" : "text-white/90"
                )}
              >
                <User size={16} aria-hidden />
                {session.name}
                <ChevronDown size={14} aria-hidden />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-line bg-card p-1.5 shadow-xl"
                  >
                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-accent-tint"
                    >
                      <User size={15} aria-hidden /> My Account
                    </Link>
                    {session.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-accent-tint"
                      >
                        <LayoutDashboard size={15} aria-hidden /> Admin Dashboard
                      </Link>
                    )}
                    <form action={logout}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={15} aria-hidden /> Sign Out
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/account"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent",
                scrolled ? "text-ink" : "text-white/90"
              )}
            >
              <User size={16} aria-hidden />
              Sign In
            </Link>
          )}
          <a href={SITE.phoneHref} className="btn-pill btn-secondary text-sm">
            <Phone size={15} aria-hidden />
            Call Now
          </a>
          <Link href="/booking" className="btn-pill btn-primary text-sm">
            Book a Service
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            scrolled || open ? "text-ink" : "text-white"
          )}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden glass-nav lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-6 pt-2 sm:px-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-accent-tint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {session ? (
                <>
                  <li>
                    <Link
                      href="/account"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-accent-tint"
                    >
                      <User size={18} aria-hidden /> {session.name}
                    </Link>
                  </li>
                  {session.isAdmin && (
                    <li>
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-accent-tint"
                      >
                        <LayoutDashboard size={18} aria-hidden /> Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <form action={logout}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-base font-medium text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={18} aria-hidden /> Sign Out
                      </button>
                    </form>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-accent-tint"
                  >
                    <User size={18} aria-hidden /> Sign In / Sign Up
                  </Link>
                </li>
              )}

              <li className="mt-2 flex flex-col gap-3">
                <a href={SITE.phoneHref} className="btn-pill btn-secondary w-full">
                  <Phone size={16} aria-hidden /> Call Now
                </a>
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="btn-pill btn-primary w-full"
                >
                  Book a Service
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
