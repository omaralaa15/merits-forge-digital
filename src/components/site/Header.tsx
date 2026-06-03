import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, UserCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/merits-logo.png";
import { SearchBar } from "./SearchBar";
import { useAuth } from "@/lib/auth";

const navItems = [
  { label: "الرئيسية", to: "/" },
  { label: "الخدمات", to: "/services" },
  { label: "المنظومة", to: "/system" },
  { label: "المشروعات", to: "/projects" },
  { label: "المتجر", to: "/store" },
  { label: "من نحن", to: "/about" },
  { label: "تواصل معنا", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center px-4 lg:px-6">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="MERITS" className="h-10 w-auto sm:h-12 lg:h-14" />
        </Link>

        <nav className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary-dark bg-secondary" }}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary-dark"
            >
              {n.label}
            </Link>
          ))}
          <div className="mr-3 flex items-center gap-2">
            <SearchBar />
            <Link
              to={isAdmin ? "/admin" : "/admin/login"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              title={user ? "لوحة التحكم" : "تسجيل الدخول"}
            >
              <UserCircle className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-gradient-cta px-3.5 text-sm font-bold text-accent-foreground shadow-accent transition hover:opacity-95"
            >
              اطلب عرض سعر
            </Link>
          </div>
        </nav>

        <div className="mr-auto flex items-center gap-1 lg:hidden">
          <SearchBar />
          <button
            className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-md border border-border active:bg-secondary transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="border-t border-border bg-background lg:hidden animate-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-1 px-4 py-3">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary active:bg-border transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to={isAdmin ? "/admin" : "/admin/login"}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-foreground/80 hover:bg-secondary transition-colors"
            >
              <UserCircle className="h-4 w-4" /> {user ? "لوحة التحكم" : "تسجيل الدخول"}
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-12 items-center justify-center rounded-md bg-gradient-cta text-sm font-bold text-accent-foreground active:opacity-90"
            >
              <Phone className="ml-2 h-4 w-4" /> اطلب عرض سعر
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
