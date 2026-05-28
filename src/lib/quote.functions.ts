import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const quoteSchema = z.object({
  customer_name: z.string().trim().min(1).max(120),
  customer_email: z.string().trim().email().max(255),
  customer_phone: z.string().trim().min(5).max(40),
  fulfillment_type: z.enum(["pickup", "delivery"]),
  delivery_address: z.string().trim().max(500).optional().nullable(),
  pickup_time: z.string().trim().max(120).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        yards: z.number().positive().max(1000),
      }),
    )
    .min(1)
    .max(50),
});

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    // Fetch authoritative prices server-side; never trust client-supplied prices.
    const productIds = Array.from(new Set(data.items.map((i) => i.product_id)));
    const { data: products, error: prodErr } = await supabaseAdmin
      .from("products")
      .select("id, name, price_per_yard, is_active")
      .in("id", productIds);
    if (prodErr) throw new Error(prodErr.message);
    const productMap = new Map(
      (products ?? [])
        .filter((p) => p.is_active)
        .map((p) => [p.id, p]),
    );
    if (productMap.size !== productIds.length) {
      throw new Error("One or more products are invalid or inactive");
    }
    const pricedItems = data.items.map((i) => {
      const p = productMap.get(i.product_id)!;
      return {
        product_id: i.product_id,
        name: p.name,
        price_per_yard: Number(p.price_per_yard),
        yards: i.yards,
      };
    });
    const subtotal = pricedItems.reduce(
      (s, i) => s + i.price_per_yard * i.yards,
      0,
    );
    const { data: row, error } = await supabaseAdmin
      .from("quote_requests")
      .insert({
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        fulfillment_type: data.fulfillment_type,
        delivery_address: data.delivery_address ?? null,
        pickup_time: data.pickup_time ?? null,
        notes: data.notes ?? null,
        items: pricedItems,
        subtotal,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    // Best-effort email notification (no-op if email infra not yet configured)
    try {
      const baseUrl = process.env.VITE_PUBLIC_URL ?? "";
      if (baseUrl) {
        await fetch(`${baseUrl}/lovable/email/transactional/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateName: "quote-confirmation",
            recipientEmail: data.customer_email,
            idempotencyKey: `quote-${row!.id}`,
            templateData: { name: data.customer_name, subtotal },
          }),
        }).catch(() => {});
      }
    } catch {}
    return { ok: true, id: row!.id };
  });