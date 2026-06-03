import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { iconMap } from "@/lib/icons";
import type { Service } from "@/lib/types";

export function BusinessUnits() {
  const [units, setUnits] = useState<Service[]>([]);

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setUnits(data);
      });
  }, []);
  return (
    <section id="business-units" className="relative overflow-hidden bg-navy pt-20 lg:pt-28">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary-light backdrop-blur">
            خدمات تنفيذية
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            وحدات أعمال <span className="text-primary-light">ميرتس</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/60">
            8 قطاعات رئيسية متكاملة — من التصميم والطباعة إلى التركيب النهائي
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((u) => {
            const Icon = iconMap[u.icon_name];
            return (
              <div
                key={u.id}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-primary/30 hover:bg-white/10"
              >
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-xl bg-gradient-primary text-white shadow-md shadow-primary/20">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="text-lg font-extrabold text-white">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{u.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-cta px-6 text-sm font-bold text-accent-foreground shadow-accent transition hover:scale-[1.02]"
          >
            اطلب عرض سعر للخدمات <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="relative mt-16 sm:mt-20 lg:mt-24">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          className="block w-full h-10 sm:h-12 lg:h-16"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 0 480 60 720 40C960 20 1200 60 1440 40V80H0V40Z"
            className="fill-soft"
          />
        </svg>
      </div>
    </section>
  );
}
