import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/lib/blog.functions";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug} — Blog | City Landscape Supplies Depot` }] }),
  component: BlogPost,
  loader: async ({ context, params }) => {
    const res = await context.queryClient.ensureQueryData({ queryKey: ["post", params.slug], queryFn: () => getPost({ data: { slug: params.slug } }) });
    if (!res.post) throw notFound();
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">Back to blog →</Link>
      </div>
    </SiteLayout>
  ),
});

function PostBody() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery({ queryKey: ["post", slug], queryFn: () => getPost({ data: { slug } }) });
  const p = data.post!;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">← All posts</Link>
      {p.cover_image && <img src={p.cover_image} alt="" className="mt-4 aspect-video w-full rounded-xl object-cover" />}
      <p className="mt-6 text-xs text-muted-foreground">{p.published_at ? new Date(p.published_at).toLocaleDateString() : ""}</p>
      <h1 className="mt-2 text-4xl font-bold leading-tight">{p.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{p.excerpt}</p>
      <div className="mt-8 whitespace-pre-line text-foreground">{p.content}</div>
    </article>
  );
}

function BlogPost() {
  return (
    <SiteLayout>
      <Suspense fallback={<p className="py-24 text-center text-muted-foreground">Loading…</p>}><PostBody /></Suspense>
    </SiteLayout>
  );
}