import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { MessageCircle, X, Send } from "lucide-react";
import { toast } from "sonner";
import { SITE } from "@/lib/site-config";

const FAQS = [
  {
    q: "How is your material priced?",
    a: "All bulk materials are priced per cubic yard. The team will confirm exact totals (incl. delivery fee) on your quote.",
  },
  {
    q: "Do you deliver?",
    a: "Yes — we deliver across Edmonton and surrounding areas. Add items to a quote and choose 'Delivery' at checkout.",
  },
  {
    q: "Can I pick up myself?",
    a: `Absolutely. Drive up to our yard at ${SITE.address} during opening hours and we'll load you up.`,
  },
  {
    q: "How do I estimate how much I need?",
    a: "Length × Width × Depth (in feet), divided by 27 = cubic yards. Or message us your dimensions — we'll calculate it for you.",
  },
  {
    q: "Do you offer discounts?",
    a: "New customers get 10% off their first order — see the welcome popup, or claim it on /promo.",
  },
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"faq" | "contact">("faq");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const contact = useServerFn(submitContact);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition hover:scale-105"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-40 flex h-[520px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <div className="bg-gradient-to-br from-primary to-primary/80 p-4 text-primary-foreground">
            <p className="text-sm font-bold">Yard Assistant</p>
            <p className="text-xs opacity-90">Ask a quick question or message our team.</p>
            <div className="mt-3 flex gap-1 rounded-md bg-white/15 p-1 text-xs">
              {(["faq", "contact"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded px-2 py-1 font-medium capitalize ${mode === m ? "bg-white text-primary" : "text-white/90"}`}
                >
                  {m === "faq" ? "FAQ" : "Message us"}
                </button>
              ))}
            </div>
          </div>
          {mode === "faq" ? (
            <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
              {FAQS.map((f, i) => (
                <div key={i} className="rounded-lg border border-border">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left font-medium"
                  >
                    {f.q}
                    <span className="text-muted-foreground">{expanded === i ? "−" : "+"}</span>
                  </button>
                  {expanded === i && <p className="px-3 pb-3 text-sm text-muted-foreground">{f.a}</p>}
                </div>
              ))}
            </div>
          ) : (
            <form
              className="flex-1 space-y-2 overflow-y-auto p-3"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  await contact({ data: { ...form, source: "chatbot" } });
                  toast.success("Message sent — we'll be in touch!");
                  setForm({ name: "", email: "", phone: "", message: "" });
                  setMode("faq");
                } catch (err: any) {
                  toast.error(err?.message ?? "Could not send");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <textarea required placeholder="How can we help?" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2 text-sm font-bold text-primary-foreground disabled:opacity-60">
                <Send className="h-4 w-4" /> {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}