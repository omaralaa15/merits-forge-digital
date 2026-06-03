import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Tag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { iconMap } from "@/lib/icons";
import type { Product } from "@/lib/types";
import materials from "@/assets/materials.jpg";
import printing from "@/assets/printing.jpg";
import laser from "@/assets/laser.jpg";

const fallbackImages = [materials, laser, printing, materials];

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setProducts(data);
      });
  }, []);
  return (
    <section id="featured-products" className="relative bg-soft pt-8 pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border-2 border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent shadow-sm">
              <ShoppingCart className="h-3.5 w-3.5" />
              منتجات معروضة للبيع
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              خامات ومواد <span className="text-accent">دعائية</span>
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              الأكثر طلباً من متجر ميرتس — بأفضل الأسعار وجودة مضمونة.
            </p>
          </div>
          <Link
            to="/store"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-bold text-accent-foreground shadow-accent transition hover:opacity-90 active:scale-[0.98]"
          >
            المتجر كاملاً <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => {
            const Icon = iconMap[p.icon_name];
            return (
              <Link
                key={p.id}
                to="/store"
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lg active:scale-[0.99]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image_url || fallbackImages[i % fallbackImages.length]}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent" />
                  {p.tag && (
                    <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground shadow-md">
                      {p.tag}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-xl bg-accent text-white shadow-md">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  {p.price_label && (
                    <div className="absolute bottom-3 left-3 rounded-md bg-white/20 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                      <Tag className="ml-1 inline h-3 w-3" />
                      {p.price_label}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base font-extrabold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-bold text-accent">
                    <ShoppingCart className="h-4 w-4" /> أضف إلى السلة
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
