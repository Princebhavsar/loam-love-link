import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, slug, name, category, price_per_yard, short_description, image_path")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return { products: data ?? [] };
});

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const { data: product, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { product };
  });