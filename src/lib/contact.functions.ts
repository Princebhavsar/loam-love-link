import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");
const normPhone = (s: string) => s.replace(/\D+/g, "");

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().email().max(255),
        phone: z.string().trim().max(40).optional().nullable(),
        message: z.string().trim().min(1).max(2000),
        source: z.string().trim().max(60).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      message: data.message,
      source: data.source ?? "contact_form",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        email: z.string().trim().email().max(255),
        name: z.string().trim().max(120).optional().nullable(),
        source: z.string().trim().max(60).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("newsletter_subscribers").insert({
      email: data.email,
      name: data.name ?? null,
      source: data.source ?? "footer",
    });
    // Ignore duplicate-style errors silently
    if (error && !/duplicate/i.test(error.message)) {
      throw new Error(error.message);
    }
    return { ok: true };
  });

export const claimPromo = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        customer_name: z.string().trim().min(1).max(120),
        email: z.string().trim().email().max(255),
        phone: z.string().trim().min(5).max(40),
        promo_type: z.enum(["welcome_10"]).default("welcome_10"),
        invoice_number: z.string().trim().max(60).optional().nullable(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const email_norm = norm(data.email);
    const phone_norm = normPhone(data.phone);
    const name_norm = norm(data.customer_name);
    const { error } = await supabaseAdmin.from("promo_claims").insert({
      customer_name: data.customer_name,
      email: data.email,
      phone: data.phone,
      promo_type: data.promo_type,
      invoice_number: data.invoice_number ?? null,
      name_norm,
      email_norm,
      phone_norm,
    });
    if (error) {
      if (/duplicate/i.test(error.message)) {
        return { ok: false, reason: "already_claimed" as const };
      }
      throw new Error(error.message);
    }
    return { ok: true as const };
  });