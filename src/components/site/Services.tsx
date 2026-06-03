import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import materials from "@/assets/materials.jpg";
import printing from "@/assets/printing.jpg";
import laser from "@/assets/laser.jpg";
import router from "@/assets/router.jpg";
import design from "@/assets/design.jpg";
import install from "@/assets/install.jpg";

const services = [
  {
    id: "materials",
    title: "الخامات",
    desc: "أكريليك، فينيل، PVC، فوم بورد وأكثر — بأسعار جملة وقطاعي.",
    img: materials,
    tag: "جملة وقطاعي",
  },
  {
    id: "machines",
    title: "ماكينات الطباعة",
    desc: "ماكينات طباعة متطورة لكل المقاسات والخامات.",
    img: printing,
    tag: "Premium",
  },
  {
    id: "printing",
    title: "الطباعة",
    desc: "طباعة UV وسوليفنت ولاتيكس بدقة وألوان نابضة.",
    img: printing,
    tag: "دقة عالية",
  },
  {
    id: "laser",
    title: "الليزر والروتر",
    desc: "قص وتفريز دقيق بماكينات ليزر و CNC احترافية.",
    img: laser,
    tag: "CNC",
  },
  {
    id: "design",
    title: "التصميم الاحترافي",
    desc: "هوية بصرية، تصميم لافتات، ومحتوى إعلاني متكامل.",
    img: design,
    tag: "Creative",
  },
  {
    id: "install",
    title: "التوريد والتركيب",
    desc: "فريق ميداني محترف للتوريد والتركيب في الموقع.",
    img: install,
    tag: "Field Team",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary-dark">
              خدمات تنفيذية
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              منظومة واحدة. <span className="text-primary-dark">ست خدمات متكاملة.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              من الخامة الخام إلى التركيب النهائي — ميرتس تغطي كل مرحلة في دورة الإنتاج الإعلاني.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-bold text-background hover:bg-navy"
          >
            تواصل معنا <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.id}
              to="/contact"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading={i < 2 ? "eager" : "lazy"}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground">
                  {s.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-extrabold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-dark">
                  استكشف{" "}
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-5 overflow-hidden rounded-2xl border border-border bg-gradient-hero text-white md:grid-cols-[1.2fr,1fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur">
              خدمة تنفيذية
            </div>
            <h3 className="text-2xl font-black sm:text-3xl md:text-4xl">
              روتر CNC احترافي للقص والتفريز
            </h3>
            <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
              ماكينات روتر بدقة فائقة لكل أنواع الخامات: خشب، أكريليك، MDF، ألومنيوم مركّب.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-gradient-cta px-5 text-sm font-bold text-accent-foreground shadow-accent"
            >
              اطلب عرض سعر <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-48 sm:min-h-64">
            <img
              src={router}
              alt="ماكينة روتر"
              loading="lazy"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
