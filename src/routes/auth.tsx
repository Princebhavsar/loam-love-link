import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — City Landscape Supplies Depot" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "reset">("signin");
  const ALLOWED_EMAIL = "mailbox.orbitarc@gmail.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate({ to: "/admin" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (email.trim().toLowerCase() !== ALLOWED_EMAIL) {
        throw new Error("This email is not authorized to access the admin.");
      }
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset email sent. Check your inbox.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-muted/40 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 rounded-2xl border border-border bg-card p-6 shadow">
        <h1 className="text-2xl font-bold">{mode === "reset" ? "Reset password" : "Admin sign in"}</h1>
        <p className="text-xs text-muted-foreground">
          {mode === "reset"
            ? "Enter the admin email and we'll send a secure reset link."
            : "Restricted to authorized administrators only."}
        </p>
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        {mode !== "reset" && <input required type="password" placeholder="Password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />}
        <button disabled={loading} className="w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground disabled:opacity-60">
          {loading ? "Please wait…" : mode === "reset" ? "Send reset link" : "Sign in"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "reset" ? "signin" : "reset")}
          className="w-full text-center text-xs text-muted-foreground hover:underline"
        >
          {mode === "reset" ? "Back to sign in" : "Forgot password?"}
        </button>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:underline">← Back to site</Link>
      </form>
    </div>
  );
}