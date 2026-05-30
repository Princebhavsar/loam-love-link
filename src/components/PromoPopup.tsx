import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useRouterState } from "@tanstack/react-router";
import { claimPromo } from "@/lib/contact.functions";
import { X, Sparkles } from "lucide-react";
import { toast } from "sonner";

const KEY = "clsd_promo_seen_v1";

export function PromoPopup() {
  const claim = useServerFn(claimPromo);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname.startsWith("/blog/") || pathname === "/admin" || pathname === "/auth") return;
    if (localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(t);
  }, [pathname]);

  function close() {
    setOpen(false);
    try { localStorage.setItem(KEY, "1"); } catch {}
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
          <button onClick={close} className="absolute right-3 top-3 text-white/80 hover:text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Welcome offer
          </div>
          <h2 className="mt-2 text-3xl font-bold">Get 10% off your first order</h2>
          <p className="mt-2 text-sm opacity-90">Save on mulch, rock, soil & more. We'll send your promo code by email.</p>
        </div>
        {done ? (
          <div className="p-6 text-center">
            <p className="text-lg font-semibold">🎉 Your 10% off is locked in!</p>
            <p className="mt-2 text-sm text-muted-foreground">Use code <span className="font-mono font-bold text-primary">WELCOME10</span> on your next quote.</p>
            <button onClick={close} className="mt-4 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Done</button>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                const res = await claim({ data: { ...form, promo_type: "welcome_10" } });
                if (!res.ok) toast.info("Looks like you already claimed this offer.");
                else toast.success("Promo claimed!");
                setDone(true);
              } catch (err: any) {
                toast.error(err?.message ?? "Could not claim");
              } finally {
                setLoading(false);
              }
            }}
            className="space-y-3 p-6"
          >
            <input required placeholder="Your name" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button disabled={loading} className="w-full rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60">
              {loading ? "…" : "Claim 10% Off"}
            </button>
            <button type="button" onClick={close} className="block w-full text-center text-xs text-muted-foreground hover:underline">No thanks</button>
          </form>
        )}
      </div>
    </div>
  );
}