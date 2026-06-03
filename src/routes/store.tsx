import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Package, Ruler, Lightbulb, Layers } from "lucide-react";
import materials from "@/assets/materials.jpg";
import printing from "@/assets/printing.jpg";
import laser from "@/assets/laser.jpg";

const categories = [
  {
    icon: Layers,
    title: "خامات دعائية",
    desc: "أكريليك، فينيل، PVC، فوم بورد، ألومنيوم مركّب — بالجملة والقطاعي.",
    img: materials,
  },
  {
    icon: Ruler,
    title: "ألواح أكريليك و LED",
    desc: "مقاسات وألوان متعددة من ألواح الأكريليك المحلي والمستورد وأنظمة الإضاءة LED.",
    img: laser,
  },
  {
    icon: Package,
    title: "مواد طباعة وتشطيب",
    desc: "أحبار، رولات طباعة، لاصقات، أفلام حماية، ومواد تشطيب احترافية.",
    img: printing,
  },
  {
    icon: Lightbulb,
    title: "إكسسوارات لافتات",
    desc: "قواعد، بروفايلات ألومنيوم، مسامير، زوايا تثبيت، وموصلات كهربائية.",
    img: materials,
  },
];

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "المتجر — ميرتس MERTES" },
      {
        name: "description",
        content:
          "متجر ميرتس لبيع الخامات والمواد الدعائية وألواح الأكريليك والـ LED بالجملة والتجزئة.",
      },
    ],
  }),
  component: StorePage,
});

function StorePage() {
  return (
    <section className="bg-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            متجر ميرتس
          </div>
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            خامات ومواد <span className="text-primary-dark">دعائية</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            كل ما تحتاجه لمشروعك الدعائي من خامات ومواد — جملة وتجزئة بأفضل الأسعار.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  <div className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-dark">
                    تسوق الآن{" "}
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-navy p-8 text-center text-white md:p-12">
          <h3 className="text-2xl font-black md:text-3xl">طلب خامات بالجملة</h3>
          <p className="mx-auto mt-2 max-w-lg text-white/70">
            للشركات والمصانع — احصل على عروض أسعار خاصة للكميات الكبيرة مع خصومات حجم وتوصيل مجاني.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-cta px-6 text-sm font-bold text-accent-foreground shadow-accent"
          >
            تواصل مع المبيعات <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
