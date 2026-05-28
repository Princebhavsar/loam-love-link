import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useCart } from "@/components/cart/CartContext";
import { submitQuote } from "@/lib/quote.functions";
import { productImage } from "@/lib/product-images";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function QuoteSheet() {
  const cart = useCart();
  const submit = useServerFn(submitQuote);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    fulfillment_type: "delivery" as "delivery" | "pickup",
    delivery_address: "",
    pickup_time: "",
    notes: "",
  });

  if (!cart.open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => cart.setOpen(false)}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-bold">Your Quote Request</h2>
          <button onClick={() => cart.setOpen(false)} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </header>

        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary text-2xl">✓</div>
            <h3 className="mt-4 text-xl font-bold">Quote sent!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our team will follow up shortly by phone or email with pricing and delivery details.
            </p>
            <button
              onClick={() => { setDone(false); cart.setOpen(false); }}
              className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.items.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  Add products from the shop to request a quote.
                </p>
              ) : (
                <ul className="space-y-3">
                  {cart.items.map((it) => (
                    <li key={it.product_id} className="flex gap-3 rounded-lg border border-border p-3">
                      <img src={productImage(it.image_path, it.slug)} alt={it.name} className="h-16 w-16 rounded object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{it.name}</p>
                        <p className="text-xs text-muted-foreground">${it.price_per_yard.toFixed(2)} / yard</p>
                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-xs text-muted-foreground">Yards</label>
                          <input
                            type="number"
                            min={0.5}
                            step={0.5}
                            value={it.yards}
                            onChange={(e) => cart.setYards(it.product_id, Number(e.target.value))}
                            className="w-20 rounded border border-input bg-background px-2 py-1 text-sm"
                          />
                          <button
                            onClick={() => cart.remove(it.product_id)}
                            className="ml-auto text-muted-foreground hover:text-destructive"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right text-sm font-semibold">
                        ${(it.price_per_yard * it.yards).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {cart.items.length > 0 && (
                <form
                  className="mt-6 space-y-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmitting(true);
                    try {
                      await submit({
                        data: {
                          ...form,
                          delivery_address: form.fulfillment_type === "delivery" ? form.delivery_address : null,
                          pickup_time: form.fulfillment_type === "pickup" ? form.pickup_time : null,
                          items: cart.items.map((i) => ({
                            product_id: i.product_id,
                            name: i.name,
                            price_per_yard: i.price_per_yard,
                            yards: i.yards,
                          })),
                        },
                      });
                      toast.success("Quote request submitted");
                      cart.clear();
                      setDone(true);
                    } catch (err: any) {
                      toast.error(err?.message ?? "Submission failed");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  <h3 className="text-base font-bold">Your details</h3>
                  <input required placeholder="Full name" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input required type="email" placeholder="Email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input required placeholder="Phone" value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <div className="flex gap-2">
                    {(["delivery", "pickup"] as const).map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setForm({ ...form, fulfillment_type: t })}
                        className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium capitalize ${form.fulfillment_type === t ? "border-primary bg-primary/10 text-primary" : "border-input"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {form.fulfillment_type === "delivery" ? (
                    <input placeholder="Delivery address" value={form.delivery_address} onChange={(e) => setForm({ ...form, delivery_address: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  ) : (
                    <input placeholder="Preferred pickup time" value={form.pickup_time} onChange={(e) => setForm({ ...form, pickup_time: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  )}
                  <textarea placeholder="Notes (optional)" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <button disabled={submitting} className="w-full rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60">
                    {submitting ? "Submitting…" : "Submit Quote Request"}
                  </button>
                </form>
              )}
            </div>
            {cart.items.length > 0 && (
              <footer className="border-t border-border bg-muted/40 px-5 py-3 text-sm">
                <div className="flex justify-between"><span>Estimated subtotal</span><span className="font-bold">${cart.subtotal.toFixed(2)}</span></div>
                <p className="mt-1 text-xs text-muted-foreground">Final pricing & delivery fee confirmed by our team.</p>
              </footer>
            )}
          </>
        )}
      </aside>
    </div>
  );
}