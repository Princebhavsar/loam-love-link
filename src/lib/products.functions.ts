import { createServerFn } from "@tanstack/react-start";
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