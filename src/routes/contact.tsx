import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SITE } from "@/lib/site-config";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact & Request a Quote — City Landscape Supplies Depot" },
    { name: "description", content: "Call, email or send us a message to request a landscape supply quote in Edmonton." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  const contact = useServerFn(submitContact);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <SiteLayout>
      <section className="border-b border-border bg-muted/40 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h1 className="mt-2 text-4xl font-bold">Request a quote or ask a question</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Tell us about your project and our team will respond — usually within the same business day.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          <a href={`tel:${SITE.phone}`} className="flex items-start gap-3 rounded-lg border border-border bg-card p-5 hover:border-primary"><Phone className="mt-1 h-5 w-5 text-primary" /><div><p className="text-xs uppercase text-muted-foreground">Call</p><p className="font-semibold">{SITE.phone}</p></div></a>
          <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 rounded-lg border border-border bg-card p-5 hover:border-primary"><Mail className="mt-1 h-5 w-5 text-primary" /><div><p className="text-xs uppercase text-muted-foreground">Email</p><p className="font-semibold break-all">{SITE.email}</p></div></a>
          <a href={SITE.mapUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-lg border border-border bg-card p-5 hover:border-primary"><MapPin className="mt-1 h-5 w-5 text-primary" /><div><p className="text-xs uppercase text-muted-foreground">Visit the yard</p><p className="font-semibold">{SITE.address}</p></div></a>
          <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5"><Clock className="mt-1 h-5 w-5 text-primary" /><div><p className="text-xs uppercase text-muted-foreground">Hours</p>{SITE.hours.map(h => <p key={h.day} className="text-sm">{h.day}: {h.time}</p>)}</div></div>
        </div>
        <div className="md:col-span-3">
          {done ? (
            <div className="rounded-2xl bg-primary/5 p-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-2xl text-primary-foreground">✓</div>
              <h2 className="mt-4 text-2xl font-bold">Message received!</h2>
              <p className="mt-2 text-muted-foreground">Thanks {form.name || "for reaching out"}. Our team will follow up shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  await contact({ data: { ...form, source: "contact_page" } });
                  toast.success("Message sent");
                  setDone(true);
                } catch (err: any) { toast.error(err?.message ?? "Could not send"); }
                finally { setLoading(false); }
              }}
              className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
                <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
              </div>
              <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
              <textarea required rows={6} placeholder="Tell us about your project…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
              <button disabled={loading} className="w-full rounded-md bg-primary py-3 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60">{loading ? "Sending…" : "Request a Quote"}</button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}