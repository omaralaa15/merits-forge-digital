import { createFileRoute, Link, Outlet, useLocation, redirect } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  FolderKanban,
  MessageSquareQuote,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const sidebarItems = [
  { to: "/admin", icon: LayoutDashboard, label: "لوحة التحكم" },
  { to: "/admin/services", icon: ClipboardList, label: "الخدمات" },
  { to: "/admin/products", icon: Package, label: "المنتجات" },
  { to: "/admin/projects", icon: FolderKanban, label: "المشاريع" },
  { to: "/admin/quotes", icon: MessageSquareQuote, label: "طلبات السعر" },
];

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/admin/login" || location.pathname === "/admin/register") return;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/admin/login" });
    const { data: admin } = await supabase
      .from("admins")
      .select("id")
      .eq("email", session.user.email!)
      .single();
    if (!admin) throw redirect({ to: "/admin/login" });
  },
});

function AdminLayout() {
  const { signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isAuthPage =
    location.pathname === "/admin/login" || location.pathname === "/admin/register";

  useEffect(() => setMounted(true), []);

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  if (isAuthPage) {
    return <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">{mounted && <Outlet />}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950" dir="rtl">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex flex-col bg-white shadow-xl dark:bg-zinc-900 transition-all duration-300 md:static md:z-auto md:shadow-none md:border-l md:border-zinc-200 dark:md:border-zinc-800 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-64"}`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
          {!collapsed && (
            <Link
              to="/admin"
              className="flex items-center gap-2 font-bold text-lg text-zinc-800 dark:text-white"
            >
              <Building2 className="h-6 w-6 text-primary" />
              <span>لوحة الإدارة</span>
            </Link>
          )}
          {collapsed && (
            <Link to="/admin" className="mx-auto">
              <Building2 className="h-6 w-6 text-primary" />
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.to)
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
          >
            {collapsed ? (
              <ChevronLeft className="h-5 w-5 mx-auto" />
            ) : (
              <>
                <ChevronRight className="h-5 w-5" />
                <span>طي القائمة</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              signOut();
              window.location.href = "/";
            }}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-16 items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <Link
            to="/"
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            العودة للموقع
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{mounted && <Outlet />}</main>
      </div>
    </div>
  );
}
