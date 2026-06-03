import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Mail, Lock, Eye, EyeOff, UserPlus, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase
      .from("admins")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => {
        setIsFirst(count === 0);
        setChecking(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const { count } = await supabase.from("admins").select("*", { count: "exact", head: true });
    if (count === 0 && data.user) {
      const { error: insertError } = await supabase
        .from("admins")
        .insert({ email, user_id: data.user.id });
      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    navigate({ to: "/admin" });
  };

  if (checking) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="animate-pulse text-zinc-400">جاري التحقق...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">إنشاء حساب أدمن</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">لوحة تحكم ميرتس</p>
        </div>

        {isFirst && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 p-3 text-sm text-amber-700 dark:text-amber-400">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            <span>أنت المسجل الأول — سيتم منحك صلاحية الأدمن تلقائياً</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm"
        >
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 p-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 pr-10 pl-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type={showPassword ? "text" : "password"}
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 pr-10 pl-10 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              "جاري إنشاء الحساب..."
            ) : (
              <>
                <UserPlus className="h-4 w-4" /> إنشاء حساب
              </>
            )}
          </button>

          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            لديك حساب بالفعل؟{" "}
            <Link to="/admin/login" className="text-primary hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
