import { ArrowLeft, ShieldCheck, Zap, Factory, ShoppingBag, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-factory.jpg";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="مصنع ميرتس للإنتاج الإعلاني"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy via-navy/80 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:px-6 lg:py-28">
        <div className="text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary-light backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            منظومة إنتاج إعلاني متكاملة
          </div>

          <h1 className="text-balance text-3xl font-black leading-[1.15] tracking-tight sm:text-4xl md:text-6xl">
            ميرتس
            <span className="block bg-gradient-to-l from-primary via-primary-light to-white bg-clip-text text-transparent">
              مورد + مصنع + مصمم + منفذ
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            خامات جملة وقطاعي، ماكينات طباعة وليزر وروتر، تصميم احترافي، وتوريد وتركيب تحت سقف واحد.
            الدقة والسرعة والتكنولوجيا في كل خطوة.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            <Link
              to="/contact"
              className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-lg bg-gradient-cta px-5 sm:px-6 text-sm sm:text-base font-bold text-accent-foreground shadow-accent transition hover:scale-[1.02]"
            >
              اطلب عرض سعر
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              to="/store"
              className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 sm:px-6 text-sm sm:text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              تسوق الآن
            </Link>
            <Link
              to="/projects"
              className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 sm:px-6 text-sm sm:text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              شاهد أعمالنا
            </Link>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6 text-white/80">
            {[
              { k: "+12", v: "سنة خبرة" },
              { k: "+850", v: "مشروع منفذ" },
              { k: "24/7", v: "دعم متواصل" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-xl sm:text-2xl font-extrabold text-primary-light">{s.k}</div>
                <div className="text-[11px] sm:text-xs">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
          <div className="relative grid gap-4">
            {[
              { icon: Factory, t: "مصنع متكامل", d: "ماكينات طباعة وليزر وروتر بأحدث التقنيات" },
              { icon: Zap, t: "سرعة في التنفيذ", d: "دورة إنتاج محسّنة من التصميم للتركيب" },
              { icon: ShieldCheck, t: "ضمان وثقة", d: "سياسات واضحة للدفع والاستبدال والاسترجاع" },
            ].map((c) => (
              <div
                key={c.t}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <c.icon className="h-6 w-6" />
                </div>
                <div className="text-white">
                  <div className="text-base font-bold">{c.t}</div>
                  <div className="text-sm text-white/70">{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
