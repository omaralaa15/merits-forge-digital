import { useState, FormEvent } from "react";
import { Phone, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function QuoteCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    request_type: "خامات (جملة)",
    project_details: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("quote_requests").insert({
      name: form.name,
      phone: form.phone,
      email: form.email,
      request_type: form.request_type,
      project_details: form.project_details,
    });
    setLoading(false);
    if (!error) {
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        request_type: "خامات (جملة)",
        project_details: "",
      });
    }
  };

  return (
    <section id="quote" className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr,1fr] lg:gap-10 lg:px-6">
        <div>
          <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold backdrop-blur">
            خطوة واحدة تفصلك عن مشروعك القادم
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            اطلب عرض سعرك المخصص
            <span className="block text-primary-light">خلال 24 ساعة</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/75 sm:text-base">
            اخبرنا بما تحتاج — خامة، ماكينة، طباعة، تصميم أو تركيب — وفريقنا يرجع لك بعرض احترافي.
          </p>

          <div className="mt-6 sm:mt-8 space-y-3">
            {[
              { i: Phone, t: "اتصال مباشر", v: "+20 100 000 0000" },
              { i: MessageCircle, t: "واتساب", v: "تواصل فوري مع المبيعات" },
              { i: Mail, t: "بريد إلكتروني", v: "sales@mertes.com" },
            ].map((c) => (
              <div
                key={c.t}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-cta">
                  <c.i className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-white/60">{c.t}</div>
                  <div className="font-bold">{c.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <CheckCircle2 className="h-16 w-16 text-primary-light" />
            <h3 className="mt-4 text-xl font-black">تم إرسال الطلب بنجاح!</h3>
            <p className="mt-2 text-white/70">فريقنا سيراجع طلبك ويتواصل معك خلال 24 ساعة.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-gradient-cta px-6 text-sm font-bold text-accent-foreground"
            >
              إرسال طلب آخر
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6 md:p-8"
          >
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <Field
                label="الاسم بالكامل"
                placeholder="مثال: محمد أحمد"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Field
                label="رقم الهاتف"
                placeholder="+20…"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Field
                label="البريد الإلكتروني"
                placeholder="you@email.com"
                type="email"
                className="md:col-span-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-white/90">
                  نوع الطلب
                </label>
                <select
                  value={form.request_type}
                  onChange={(e) => setForm({ ...form, request_type: e.target.value })}
                  className="h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none focus:border-primary-light"
                >
                  {[
                    "خامات (جملة)",
                    "خامات (قطاعي)",
                    "ماكينات طباعة",
                    "ليزر وروتر",
                    "خدمات طباعة",
                    "تصميم",
                    "توريد وتركيب",
                  ].map((o) => (
                    <option key={o} className="text-foreground">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-white/90">
                  تفاصيل المشروع
                </label>
                <textarea
                  rows={4}
                  placeholder="اكتب مواصفات الطلب، الكميات، المقاسات…"
                  value={form.project_details}
                  onChange={(e) => setForm({ ...form, project_details: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/10 p-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-primary-light"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 sm:mt-5 inline-flex h-11 sm:h-12 w-full items-center justify-center rounded-lg bg-gradient-cta text-sm sm:text-base font-bold text-accent-foreground shadow-accent transition hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "جارٍ الإرسال…" : "إرسال طلب عرض السعر"}
            </button>
            <p className="mt-3 text-center text-xs text-white/60">سيتم الرد خلال 24 ساعة عمل.</p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-semibold text-white/90">{label}</label>
      <input
        {...props}
        className="h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-primary-light"
      />
    </div>
  );
}
