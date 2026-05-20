import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { adminListAll, updateQuoteStatus } from "@/lib/admin.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — City Landscape Supplies Depot" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [data, setData] = useState<any>(null);
  const [tab, setTab] = useState<"quotes" | "subscribers" | "messages" | "promos">("quotes");
  const load = useServerFn(adminListAll);
  const updateStatus = useServerFn(updateQuoteStatus);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    load().then(setData).catch((e: any) => toast.error(e?.message ?? "Forbidden — admin role required"));
  }, [session, load]);

  if (!ready) return null;

  if (!session) {
    return (
      <div className="grid min-h-screen place-items-center bg-muted/40 px-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) toast.error(error.message);
          }}
          className="w-full max-w-sm space-y-3 rounded-2xl border border-border bg-card p-6 shadow"
        >
          <h1 className="text-2xl font-bold">Admin sign in</h1>
          <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <button className="w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground">Sign in</button>
          <p className="text-xs text-muted-foreground">Sign up first via the auth API, then we'll grant your user the admin role.</p>
          <Link to="/" className="block text-center text-xs text-muted-foreground hover:underline">← Back to site</Link>
        </form>
      </div>
    );
  }

  if (!data) return <p className="p-8 text-center text-muted-foreground">Loading admin data…</p>;

  const tabs = [
    { id: "quotes" as const, label: `Quotes (${data.quotes.length})` },
    { id: "subscribers" as const, label: `Subscribers (${data.subscribers.length})` },
    { id: "messages" as const, label: `Messages (${data.messages.length})` },
    { id: "promos" as const, label: `Promo Claims (${data.promos.length})` },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">View site</Link>
            <button onClick={() => supabase.auth.signOut()} className="text-sm font-medium text-primary hover:underline">Sign out</button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`rounded-md px-4 py-2 text-sm font-medium ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-card">
          {tab === "quotes" && (
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Date</th><th className="p-3">Customer</th><th className="p-3">Type</th><th className="p-3">Items</th><th className="p-3">Subtotal</th><th className="p-3">Status</th></tr></thead>
              <tbody>
                {data.quotes.map((q: any) => (
                  <tr key={q.id} className="border-t border-border align-top">
                    <td className="p-3 text-xs">{new Date(q.created_at).toLocaleString()}</td>
                    <td className="p-3"><p className="font-semibold">{q.customer_name}</p><p className="text-xs text-muted-foreground">{q.customer_email}<br/>{q.customer_phone}</p></td>
                    <td className="p-3 capitalize">{q.fulfillment_type}<p className="text-xs text-muted-foreground">{q.delivery_address || q.pickup_time}</p></td>
                    <td className="p-3 text-xs">{(q.items || []).map((i: any) => `${i.name} × ${i.yards}yd`).join(", ")}</td>
                    <td className="p-3 font-semibold">${Number(q.subtotal).toFixed(2)}</td>
                    <td className="p-3"><select defaultValue={q.status} onChange={async (e) => { try { await updateStatus({ data: { id: q.id, status: e.target.value } }); toast.success("Updated"); } catch (err: any) { toast.error(err?.message); } }} className="rounded border border-input bg-background px-2 py-1 text-xs"><option value="new">new</option><option value="contacted">contacted</option><option value="confirmed">confirmed</option><option value="completed">completed</option><option value="cancelled">cancelled</option></select></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "subscribers" && (
            <table className="w-full text-sm"><thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Date</th><th className="p-3">Email</th><th className="p-3">Name</th><th className="p-3">Source</th></tr></thead><tbody>{data.subscribers.map((s: any) => (<tr key={s.id} className="border-t border-border"><td className="p-3 text-xs">{new Date(s.created_at).toLocaleString()}</td><td className="p-3">{s.email}</td><td className="p-3">{s.name}</td><td className="p-3 text-xs">{s.source}</td></tr>))}</tbody></table>
          )}
          {tab === "messages" && (
            <table className="w-full text-sm"><thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Date</th><th className="p-3">From</th><th className="p-3">Message</th><th className="p-3">Source</th></tr></thead><tbody>{data.messages.map((m: any) => (<tr key={m.id} className="border-t border-border align-top"><td className="p-3 text-xs">{new Date(m.created_at).toLocaleString()}</td><td className="p-3"><p className="font-semibold">{m.name}</p><p className="text-xs text-muted-foreground">{m.email}<br/>{m.phone}</p></td><td className="max-w-md p-3 text-xs">{m.message}</td><td className="p-3 text-xs">{m.source}</td></tr>))}</tbody></table>
          )}
          {tab === "promos" && (
            <table className="w-full text-sm"><thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Date</th><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Type</th></tr></thead><tbody>{data.promos.map((p: any) => (<tr key={p.id} className="border-t border-border"><td className="p-3 text-xs">{new Date(p.created_at).toLocaleString()}</td><td className="p-3">{p.customer_name}</td><td className="p-3">{p.email}</td><td className="p-3">{p.phone}</td><td className="p-3 text-xs">{p.promo_type}</td></tr>))}</tbody></table>
          )}
        </div>
      </div>
    </div>
  );
}