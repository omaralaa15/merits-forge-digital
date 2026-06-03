import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { supabase } from "@/lib/supabase";
import {
  MessageSquareQuote,
  Mail,
  Phone,
  CalendarDays,
  Eye,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service_type: string;
  message: string;
  status: string;
  created_at: string;
}

const statusConfig: Record<
  string,
  { label: string; color: string; icon: ComponentType<{ className?: string }> }
> = {
  new: {
    label: "جديد",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    icon: AlertCircle,
  },
  read: {
    label: "تمت المشاهدة",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    icon: Eye,
  },
  replied: {
    label: "تم الرد",
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    icon: CheckCircle,
  },
  closed: {
    label: "مغلق",
    color: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
    icon: Clock,
  },
};

const statuses = ["new", "read", "replied", "closed"];

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] || statusConfig.new;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

export const Route = createFileRoute("/admin/quotes")({
  component: QuotesPage,
});

function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Quote | null>(null);

  async function load() {
    const { data } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setQuotes(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from("quote_requests").update({ status }).eq("id", id);
    load();
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  const newCount = quotes.filter((q) => q.status === "new").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">طلبات عرض السعر</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            إدارة ومتابعة طلبات العملاء
            {newCount > 0 && (
              <span className="mr-2 rounded-full bg-red-100 dark:bg-red-950 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
                {newCount} جديد
              </span>
            )}
          </p>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquareQuote className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    تفاصيل الطلب
                  </h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="col-span-2 flex items-center gap-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                  <StatusBadge status={selected.status} />
                  <span className="text-zinc-400 text-xs flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(selected.created_at).toLocaleString("ar-EG")}
                  </span>
                </div>

                {selected.name && (
                  <div className="col-span-2">
                    <p className="text-xs text-zinc-400 mb-1">الاسم</p>
                    <p className="font-medium text-zinc-900 dark:text-white">{selected.name}</p>
                  </div>
                )}
                {selected.email && (
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> البريد
                    </p>
                    <p className="text-zinc-900 dark:text-white" dir="ltr">
                      {selected.email}
                    </p>
                  </div>
                )}
                {selected.phone && (
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" /> الهاتف
                    </p>
                    <p className="text-zinc-900 dark:text-white" dir="ltr">
                      {selected.phone}
                    </p>
                  </div>
                )}
                {selected.company && (
                  <div className="col-span-2">
                    <p className="text-xs text-zinc-400 mb-1">الشركة</p>
                    <p className="text-zinc-900 dark:text-white">{selected.company}</p>
                  </div>
                )}
                {selected.service_type && (
                  <div className="col-span-2">
                    <p className="text-xs text-zinc-400 mb-1">نوع الخدمة</p>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {selected.service_type}
                    </span>
                  </div>
                )}
                {selected.message && (
                  <div className="col-span-2">
                    <p className="text-xs text-zinc-400 mb-1">الرسالة</p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selected.status === s
                        ? "bg-primary text-primary-foreground"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {statusConfig[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-zinc-400">جاري التحميل...</div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">لا توجد طلبات بعد</div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">
                    العميل
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                    نوع الخدمة
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-28 hidden sm:table-cell">
                    التاريخ
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-24">
                    الحالة
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-20">
                    عرض
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {quotes.map((q) => (
                  <tr
                    key={q.id}
                    className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors ${q.status === "new" ? "bg-primary/5" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          {q.name || "غير محدد"}
                        </p>
                        <p className="text-xs text-zinc-400 truncate max-w-[150px]">{q.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden md:table-cell">
                      {q.service_type || "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 text-xs hidden sm:table-cell">
                      {new Date(q.created_at).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={q.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(q)}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
