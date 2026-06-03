import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";
import install from "@/assets/install.jpg";
import printing from "@/assets/printing.jpg";
import laser from "@/assets/laser.jpg";
import router from "@/assets/router.jpg";

const fallbackImages = [install, printing, laser, router];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setProjects(data);
      });
  }, []);
  return (
    <section id="projects" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            مشاريع سابقة
          </div>
          <h2 className="text-3xl font-black md:text-5xl">أعمال تنطق بالجودة</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            مئات المشاريع المنفذة بدقة، من الفكرة إلى التركيب.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <Link
              key={p.id}
              to="/contact"
              className="group relative overflow-hidden rounded-2xl border border-border shadow-card active:scale-[0.98] transition"
            >
              <img
                src={p.image_url || fallbackImages[i % fallbackImages.length]}
                alt={p.title}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                <div className="text-[11px] sm:text-xs text-white/70 truncate">
                  {p.client_location}
                </div>
                <div className="text-sm sm:text-base font-bold leading-tight">{p.title}</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-navy/60 opacity-0 transition group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
                  اطلب عرض سعر <ArrowLeft className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
