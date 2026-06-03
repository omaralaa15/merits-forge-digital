import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/merits-logo.png";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="MERITS" className="h-16 w-auto bg-white/95 rounded-lg p-2" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            شريك إنتاج وتنفيذ متكامل: خامات، ماكينات، طباعة، ليزر وروتر، تصميم، توريد وتركيب.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Linkedin].map((I, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 hover:bg-white/10"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="الخدمات"
          links={[
            { label: "الخدمات التنفيذية", to: "/services" },
            { label: "المنظومة", to: "/system" },
            { label: "المشروعات", to: "/projects" },
            { label: "المتجر", to: "/store" },
          ]}
        />
        <FooterCol
          title="الشركة"
          links={[
            { label: "من نحن", to: "/about" },
            { label: "تواصل معنا", to: "/contact" },
          ]}
        />

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-white">تواصل معنا</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-primary-light" /> القاهرة، جمهورية مصر
              العربية
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary-light" /> +20 100 000 0000
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary-light" /> sales@mertes.com
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-gradient-cta px-4 text-sm font-bold text-accent-foreground shadow-accent"
          >
            اطلب عرض سعر
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 md:flex-row lg:px-6">
          <div>© {new Date().getFullYear()} ميرتس MERTES. جميع الحقوق محفوظة.</div>
          <div className="flex gap-4">
            <Link to="/policies" className="hover:text-white">
              السياسات
            </Link>
            <Link to="/policies" className="hover:text-white">
              الخصوصية
            </Link>
            <Link to="/policies" className="hover:text-white">
              الشروط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-extrabold text-white">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:text-primary-light">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
