import { CreditCard, RefreshCcw, Undo2, ShieldCheck } from "lucide-react";

const policies = [
  {
    icon: CreditCard,
    title: "سياسة الدفع",
    points: [
      "دفع نقدي وبنكي وفيزا.",
      "دفعة مقدمة 50% لبدء الإنتاج.",
      "تسوية كاملة قبل التسليم/التركيب.",
    ],
  },
  {
    icon: RefreshCcw,
    title: "سياسة الاستبدال",
    points: [
      "استبدال خلال 7 أيام للمنتجات غير المخصصة.",
      "يجب أن تكون الخامة بحالتها الأصلية.",
      "غير منطبق على القطع المُصنّعة حسب الطلب.",
    ],
  },
  {
    icon: Undo2,
    title: "سياسة الاسترجاع",
    points: [
      "استرجاع كامل عند خطأ من ميرتس.",
      "خصم تكاليف التصنيع للطلبات الخاصة.",
      "مراجعة كل حالة بشفافية كاملة.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "ضمان الجودة",
    points: [
      "ضمان على الماكينات حسب الشركة المصنّعة.",
      "ضمان تركيب لمدة 6 شهور.",
      "صيانة دورية مدفوعة بعد الضمان.",
    ],
  },
];

export function Policies() {
  return (
    <section id="policies" className="bg-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary-dark">
            الشفافية أولاً
          </div>
          <h2 className="text-3xl font-black md:text-5xl">سياسات واضحة لثقة دائمة</h2>
          <p className="mt-3 text-muted-foreground">
            نضع كل بنود التعامل أمامك بدون تعقيد. اقرأ، اعرف، ثم اطلب بثقة.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {policies.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-extrabold">{p.title}</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
