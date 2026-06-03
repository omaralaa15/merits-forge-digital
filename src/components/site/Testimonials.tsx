import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد عبدالله",
    role: "صاحب سلسلة مطاعم",
    text: "ميرتس نفذت لنا لافتات جميع الفروع بجودة عالية والتزام تام بالمواعيد. فريق محترف من التصميم للتركيب.",
    rating: 5,
  },
  {
    name: "مريم السيد",
    role: "مدير تسويق — شركة عقارات",
    text: "نعمل مع ميرتس من سنتين في طباعة UV وتصميم الهوية البصرية. التزامهم بالتفاصيل ممتاز.",
    rating: 5,
  },
  {
    name: "خالد عمر",
    role: "صاحب مصنع أثاث",
    text: "ماكينة الليزر والروتر عندهم غيرت شكل إنتاجنا. قص دقيق وسرعة تسليم. أنصح بالتعامل.",
    rating: 5,
  },
  {
    name: "نورة فيصل",
    role: "مسؤول مشتريات — وكالة إعلانات",
    text: "متجر الخامات عندهم متكامل — نوفر وقت وجهد في التوريد. أسعار الجملة مناسبة جداً.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            آراء العملاء
          </div>
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            تجارب <span className="text-primary-dark">نجاح</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            مئات العملاء يثقون في ميرتس — لأن الجودة تتحدث عن نفسها.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <Quote className="absolute left-4 top-4 h-8 w-8 text-primary/10" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? "text-amber-400" : "text-muted"}`}
                    fill={i < t.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-extrabold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
