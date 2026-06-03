import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ClipboardList,
  Package,
  FolderKanban,
  MessageSquareQuote,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

interface Stats {
  services: number;
  products: number;
  projects: number;
  quotes: number;
  quotesToday: number;
}

function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    products: 0,
    projects: 0,
    quotes: 0,
    quotesToday: 0,
  });
  const [recentQuotes, setRecentQuotes] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [services, products, projects, quotes] = await Promise.all([
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("quote_requests").select("*", { count: "exact", head: true }),
        supabase
          .from("quote_requests")
          .select("*")
          .gte("created_at", today.toISOString())
          .order("created_at", { ascending: false }),
      ]);

      setStats({
        services: services.count ?? 0,
        products: products.count ?? 0,
        projects: projects.count ?? 0,
        quotes: quotes.count ?? 0,
        quotesToday: quotes.data?.length ?? 0,
      });

      const { data: recent } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentQuotes(recent ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    {
      label: "الخدمات",
      value: stats.services,
      icon: ClipboardList,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-950",
    },
    {
      label: "المنتجات",
      value: stats.products,
      icon: Package,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950",
    },
    {
      label: "المشاريع",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-purple-600 bg-purple-100 dark:bg-purple-950",
    },
    {
      label: "طلبات السعر",
      value: stats.quotes,
      icon: MessageSquareQuote,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-950",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">لوحة التحكم</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">نظرة عامة على محتوى الموقع</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-lg ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
              {loading ? "..." : card.value}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Today's Quotes + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-zinc-900 dark:text-white">طلبات اليوم</h2>
          </div>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">
            {loading ? "..." : stats.quotesToday}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">طلب عرض سعر اليوم</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-zinc-900 dark:text-white">آخر الطلبات</h2>
          </div>
          {loading ? (
            <p className="text-sm text-zinc-400">جاري التحميل...</p>
          ) : recentQuotes.length === 0 ? (
            <p className="text-sm text-zinc-400">لا توجد طلبات بعد</p>
          ) : (
            <div className="space-y-2">
              {recentQuotes.map((q: Record<string, unknown>) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                      {q.name || q.company || "غير محدد"}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">{q.email}</p>
                  </div>
                  <span className="text-xs text-zinc-400 shrink-0 mr-2">
                    {new Date(q.created_at).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
