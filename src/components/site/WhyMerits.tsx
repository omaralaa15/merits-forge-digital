import { Award, Sparkles, Clock, Cpu, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "الخبرة",
    desc: "أكثر من 12 عاماً في مجال الإنتاج الإعلاني — نخبة من المتخصصين في كل مراحل التنفيذ.",
  },
  {
    icon: Sparkles,
    title: "الجودة",
    desc: "نستخدم أحدث ماكينات الطباعة والليزر والروتر لنضمن لك أفضل النتائج في كل مشروع.",
  },
  {
    icon: Clock,
    title: "السرعة",
    desc: "دورة إنتاج محسّنة من التصميم للتركيب — نوعدك بالتسليم في الوقت المحدد.",
  },
  {
    icon: Cpu,
    title: "المعدات المتطورة",
    desc: "ماكينات طباعة UV وسوليفنت، فايبر ليزر، روتر CNC — تكنولوجيا صناعية ألمانية ويابانية.",
  },
  {
    icon: Headphones,
    title: "الدعم الفني",
    desc: "فريق دعم فني متفرغ للاستشارات، الصيانة، ومتابعة المشاريع حتى التسليم النهائي.",
  },
];

export function WhyMerits() {
  return (
    <section id="why-merits" className="bg-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary-dark">
            لماذا ميرتس
          </div>
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            خمسة أسباب <span className="text-primary-dark">تختارنا</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            خبرة، جودة، سرعة، معدات متطورة، ودعم فني — كل ما تحتاجه في مكان واحد.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            const isLarge = i === 0 || i === 4;
            return (
              <div
                key={r.title}
                className={
                  "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card transition hover:-translate-y-1 hover:shadow-glow " +
                  (isLarge ? "lg:col-span-2" : "")
                }
              >
                <div className="mb-3 sm:mb-4 grid h-11 sm:h-12 w-11 sm:w-12 place-items-center rounded-xl bg-gradient-primary text-white shadow-md">
                  <Icon className="h-5 sm:h-6 w-5 sm:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-extrabold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 rounded-2xl border border-border bg-navy p-6 text-white sm:p-8 md:p-12">
          <div className="grid gap-4 sm:gap-6 grid-cols-3">
            {[
              { k: "+12", v: "سنة خبرة" },
              { k: "+850", v: "مشروع منفذ" },
              { k: "+85", v: "متخصص" },
            ].map((s) => (
              <div key={s.v} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-primary-light">{s.k}</div>
                <div className="text-xs sm:text-sm text-white/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
