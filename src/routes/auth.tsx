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
  const [mode, setMode] = useState<"signin" | "signup">("signup");
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
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then sign in.");
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
        <h1 className="text-2xl font-bold">{mode === "signup" ? "Create account" : "Sign in"}</h1>
        <p className="text-xs text-muted-foreground">
          {mode === "signup"
            ? "Sign up with mailbox.orbitarc@gmail.com to be auto-granted admin access."
            : "Welcome back."}
        </p>
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input required type="password" placeholder="Password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <button disabled={loading} className="w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground disabled:opacity-60">
          {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
        <button type="button" onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="w-full text-center text-xs text-muted-foreground hover:underline">
          {mode === "signup" ? "Already have an account? Sign in" : "Need an account? Sign up"}
        </button>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:underline">← Back to site</Link>
      </form>
    </div>
  );
}