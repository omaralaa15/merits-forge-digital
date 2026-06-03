import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, GripVertical, X, Check, Loader2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
  created_at: string;
}

export const Route = createFileRoute("/admin/services")({
  component: ServicesPage,
});

function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon_name: "" });

  async function load() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    setServices(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditing(null);
    setForm({ title: "", description: "", icon_name: "Wrench" });
    setShowForm(true);
  }

  function openEdit(svc: Service) {
    setEditing(svc);
    setForm({ title: svc.title, description: svc.description, icon_name: svc.icon_name });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase
        .from("services")
        .update({ title: form.title, description: form.description, icon_name: form.icon_name })
        .eq("id", editing.id);
    } else {
      const { count } = await supabase.from("services").select("*", { count: "exact", head: true });
      await supabase.from("services").insert({
        title: form.title,
        description: form.description,
        icon_name: form.icon_name,
        sort_order: (count ?? 0) + 1,
      });
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
    await supabase.from("services").delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">إدارة الخدمات</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">إضافة وتعديل وحذف الخدمات</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> إضافة خدمة
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {editing ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  العنوان
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  الوصف
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  الأيقونة
                </label>
                <input
                  value={form.icon_name}
                  onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Wrench"
                />
                <p className="text-xs text-zinc-400 mt-1">
                  اسم أيقونة من Lucide (مثل: Wrench, Factory, Lightbulb)
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {editing ? "تحديث" : "إضافة"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-zinc-400">جاري التحميل...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">لا توجد خدمات بعد</div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-10">
                    #
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">
                    الأيقونة
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">
                    العنوان
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                    الوصف
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-24">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {services.map((svc, i) => (
                  <tr
                    key={svc.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-zinc-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-3">
                      <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                        {svc.icon_name}
                      </code>
                    </td>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                      {svc.title}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden md:table-cell max-w-xs truncate">
                      {svc.description}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-start">
                        <button
                          onClick={() => openEdit(svc)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(svc.id)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
