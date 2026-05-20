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
        name: z.string().max(200),
        price_per_yard: z.number().nonnegative(),
        yards: z.number().positive().max(1000),
      }),
    )
    .min(1)
    .max(50),
});

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    const subtotal = data.items.reduce(
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
        items: data.items,
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