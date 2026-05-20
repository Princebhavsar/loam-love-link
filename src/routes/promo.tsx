import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { claimPromo } from "@/lib/contact.functions";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/promo")({
  head: () => ({ meta: [
    { title: "Claim 10% Off — City Landscape Supplies Depot" },
    { name: "description", content: "New customers save 10% on their first landscape supply order in Edmonton." },
  ]}),
  component: PromoPage,
});

function PromoPage() {
  const claim = useServerFn(claimPromo);
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | "ok" | "dup">(null);
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary to-primary/70 py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider"><Sparkles className="h-3.5 w-3.5" /> Welcome offer</div>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">10% off your first order</h1>
          <p className="mt-3 text-lg opacity-90">For new customers — applies to all in-stock materials.</p>
        </div>
      </section>
      <section className="mx-auto max-w-md px-4 py-12">
        {done === "ok" && <div className="rounded-2xl bg-card p-8 text-center shadow"><h2 className="text-2xl font-bold">🎉 Claimed!</h2><p className="mt-2 text-muted-foreground">Use code <span className="font-mono font-bold text-primary">WELCOME10</span> on your next quote.</p></div>}
        {done === "dup" && <div className="rounded-2xl bg-card p-8 text-center shadow"><h2 className="text-2xl font-bold">Already claimed</h2><p className="mt-2 text-muted-foreground">Looks like this offer was already used.</p></div>}
        {!done && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try { const res = await claim({ data: { ...form, promo_type: "welcome_10" } }); setDone(res.ok ? "ok" : "dup"); }
              catch (err: any) { toast.error(err?.message ?? "Could not claim"); }
              finally { setLoading(false); }
            }}
            className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold">Claim your 10% off</h2>
            <input required placeholder="Full name" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input required placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button disabled={loading} className="w-full rounded-md bg-primary py-3 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60">{loading ? "…" : "Claim 10% Off"}</button>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}