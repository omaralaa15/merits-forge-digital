import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
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

const categoryLabels: Record<string, string> = {
  services: "الخدمات التنفيذية",
  products: "المنتجات",
  projects: "المشاريع",
  articles: "المقالات",
};

const categoryOrder = ["services", "products", "projects", "articles"];

const tabs = [
  { id: "all", label: "الكل" },
  { id: "services", label: "الخدمات" },
  { id: "products", label: "المنتجات" },
  { id: "projects", label: "المشاريع" },
  { id: "articles", label: "المقالات" },
];

const categoryToTable: Record<string, string> = {
  services: "services",
  products: "products",
  projects: "projects",
  articles: "articles",
};

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

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open && searchData.length === 0) {
      fetchSearchData().then(setSearchData);
    }
  }, [open, searchData.length]);

  useEffect(() => {
    if (!open) setActiveTab("all");
  }, [open]);

  const runSearch = useCallback(
    (item: SearchItem) => {
      setOpen(false);
      navigate({ to: item.to });
    },
    [navigate],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const cat of categoryOrder) {
      const items = searchData.filter(
        (i) => i.category === cat && (activeTab === "all" || i.category === activeTab),
      );
      if (items.length) map.set(cat, items);
    }
    return map;
  }, [searchData, activeTab]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        aria-label="بحث"
      >
        <Search className="h-4 w-4" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="ابحث عن خدمات، منتجات، مشاريع، مقالات…" />
        <div className="flex gap-1 border-b border-border px-3 py-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
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
        <CommandList>
          <CommandEmpty>لا توجد نتائج</CommandEmpty>
          {Array.from(grouped.entries()).map(([cat, items]) => (
            <CommandGroup key={cat} heading={categoryLabels[cat] || cat}>
              {items.map((item) => {
                const Icon = iconMap[item.icon_name];
                return (
                  <CommandItem
                    key={item.id}
                    value={`${item.title} ${item.desc}`}
                    onSelect={() => runSearch(item)}
                    className="flex items-center gap-3"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-primary text-white">
                      {Icon && <Icon className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold">{item.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{item.desc}</div>
                    </div>
                    <span className="shrink-0 rounded-md border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {categoryLabels[item.category]}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
