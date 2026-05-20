import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { posts: data ?? [] };
});

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { post };
  });