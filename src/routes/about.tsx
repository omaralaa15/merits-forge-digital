import { createFileRoute, Link } from "@tanstack/react-router";
import { Factory, Users, Award, TrendingUp, ArrowLeft } from "lucide-react";

const stats = [
  { icon: Factory, label: "مصنع متكامل", value: "12,000 m²" },
  { icon: Users, label: "فريق عمل", value: "+85 متخصص" },
  { icon: Award, label: "مشروع منفذ", value: "+850" },
  { icon: TrendingUp, label: "سنوات خبرة", value: "+12 سنة" },
];

const team = [
  { name: "أحمد السيد", role: "المدير التنفيذي" },
  { name: "محمد علي", role: "مدير الإنتاج" },
  { name: "سارة خالد", role: "مدير التصميم" },
  { name: "كريم حسن", role: "مدير المبيعات" },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — ميرتس MERTES" },
      {
        name: "description",
        content:
          "ميرتس: شريك إنتاج وتنفيذ متكامل — خامات، ماكينات، طباعة، ليزر وروتر، تصميم، توريد وتركيب.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-hero opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-6">
          <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold backdrop-blur">
            من نحن
          </div>
          <h1 className="text-4xl font-black md:text-6xl">
            ميرتس <span className="text-primary-light">MERTES</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
            شريك إنتاج وتنفيذ متكامل — خامات، ماكينات، طباعة، ليزر وروتر، تصميم، توريد وتركيب تحت
            سقف واحد.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black">قصتنا</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                انطلقت ميرتس منذ أكثر من 12 عاماً بهدف تقديم منظومة إنتاج إعلاني متكاملة تلبي كل
                احتياجات السوق من الخامة الخام إلى المنتج النهائي والتركيب الميداني.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                نمتلك مصنعاً بمساحة 12,000 متر مربع مزوداً بأحدث ماكينات الطباعة والليزر والروتر
                CNC، وفريقاً متكاملاً من المصممين والمهندسين والفنيين لتنفيذ المشاريع بأعلى معايير
                الجودة.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="rounded-xl border border-border bg-soft p-4">
                      <Icon className="h-6 w-6 text-primary-dark" />
                      <div className="mt-2 text-2xl font-black">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-soft p-6 md:p-8">
              <h3 className="text-xl font-extrabold">رؤيتنا</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                أن نكون الشامل الأول في مجال الإنتاج الإعلاني في مصر والشرق الأوسط، من خلال الجمع
                بين التكنولوجيا الحديثة، والخبرة المتراكمة، والالتزام بالمواعيد.
              </p>
              <h3 className="mt-8 text-xl font-extrabold">رسالتنا</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                توفير حلول إعلانية متكاملة بجودة استثنائية وأسعار تنافسية، مع ضمان التسليم في الوقت
                المحدد.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black">فريقنا</h2>
            <p className="mt-2 text-muted-foreground">نخبة من المتخصصين في كل المجالات.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-primary text-2xl font-black text-white">
                  {m.name.charAt(0)}
                </div>
                <h4 className="mt-4 font-extrabold">{m.name}</h4>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-bold text-background hover:bg-navy"
            >
              تواصل معنا <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
