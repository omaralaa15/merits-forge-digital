import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { iconMap } from "@/lib/icons";

interface SearchItem {
  id: string;
  title: string;
  desc: string;
  category: "services" | "products" | "projects" | "articles";
  to: string;
  icon_name: string;
}

async function fetchSearchData(): Promise<SearchItem[]> {
  const results: SearchItem[] = [];

  const { data: services } = await supabase.from("services").select("*").order("sort_order");
  if (services) {
    for (const s of services) {
      results.push({
        id: `svc-${s.id}`,
        title: s.title,
        desc: s.description,
        category: "services",
        to: "/system",
        icon_name: s.icon_name,
      });
    }
  }

  const { data: products } = await supabase.from("products").select("*").order("sort_order");
  if (products) {
    for (const p of products) {
      results.push({
        id: `prd-${p.id}`,
        title: p.title,
        desc: p.description,
        category: "products",
        to: "/store",
        icon_name: p.icon_name,
      });
    }
  }

  const { data: projects } = await supabase.from("projects").select("*").order("sort_order");
  if (projects) {
    for (const p of projects) {
      results.push({
        id: `prj-${p.id}`,
        title: p.title,
        desc: p.client_location,
        category: "projects",
        to: "/projects",
        icon_name: "Grid3X3",
      });
    }
  }

  const { data: articles } = await supabase.from("articles").select("*").order("sort_order");
  if (articles) {
    for (const a of articles) {
      results.push({
        id: `art-${a.id}`,
        title: a.title,
        desc: a.description,
        category: "articles",
        to: a.link_to || "/policies",
        icon_name: "Newspaper",
      });
    }
  }

  return results;
}

const tabs = [
  { id: "all", label: "الكل" },
  { id: "services", label: "الخدمات" },
  { id: "products", label: "المنتجات" },
  { id: "projects", label: "المشاريع" },
  { id: "articles", label: "المقالات" },
];

const categoryLabels: Record<string, string> = {
  services: "الخدمات التنفيذية",
  products: "المنتجات",
  projects: "المشاريع",
  articles: "المقالات",
};

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchData().then(setSearchData);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchData.filter((item) => {
      if (activeTab !== "all" && item.category !== activeTab) return false;
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    });
  }, [query, activeTab, searchData]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      setQuery("");
      navigate({ to: item.to });
    },
    [navigate],
  );

  return (
    <section className="relative bg-gradient-to-b from-navy to-background py-10 lg:py-14">
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <div className="rounded-2xl border border-border bg-card shadow-xl">
          <div className="relative flex items-center gap-2 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن خدمات، منتجات، مشاريع، مقالات…"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="بحث"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-border"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <SlidersHorizontal className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
          </div>

          <div className="flex gap-1 border-b border-border px-3 py-2 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  activeTab === tab.id
                    ? tab.id === "services"
                      ? "bg-primary text-primary-foreground"
                      : tab.id === "products"
                        ? "bg-accent text-accent-foreground"
                        : tab.id === "projects"
                          ? "bg-navy text-white"
                          : "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <Search className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  {query ? "لا توجد نتائج مطابقة للبحث" : "ابدأ الكتابة للبحث في جميع أقسام ميرتس"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((item) => {
                  const Icon = iconMap[item.icon_name];
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-right transition hover:bg-secondary"
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white ${
                          item.category === "services"
                            ? "bg-gradient-primary"
                            : item.category === "products"
                              ? "bg-accent"
                              : item.category === "projects"
                                ? "bg-navy"
                                : "bg-foreground"
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold">{item.title}</div>
                        <div className="truncate text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                      <span className="shrink-0 rounded-md border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {categoryLabels[item.category]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          اضغط{" "}
          <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px]">
            Ctrl+K
          </kbd>{" "}
          للبحث السريع من أي صفحة
        </p>
      </div>
    </section>
  );
}
