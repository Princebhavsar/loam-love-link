import { createFileRoute, Link } from "@tanstack/react-router";
import { listPosts } from "@/lib/blog.functions";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Blog — Landscaping Tips | City Landscape Supplies Depot" },
    { name: "description", content: "Seasonal landscaping tips, project ideas and material guides from Edmonton's supply experts." },
  ]}),
  component: BlogPage,
  loader: ({ context }) => context.queryClient.ensureQueryData({ queryKey: ["posts"], queryFn: () => listPosts() }),
});

function PostsList() {
  const { data } = useSuspenseQuery({ queryKey: ["posts"], queryFn: () => listPosts() });
  if (data.posts.length === 0) return <p className="py-12 text-center text-muted-foreground">No posts yet — check back soon.</p>;
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data.posts.map((p) => (
        <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-md">
          {p.cover_image && <img src={p.cover_image} alt="" className="aspect-video w-full object-cover transition group-hover:scale-105" />}
          <div className="p-5">
            <p className="text-xs text-muted-foreground">{p.published_at ? new Date(p.published_at).toLocaleDateString() : ""}</p>
            <h2 className="mt-1 text-lg font-bold group-hover:text-primary">{p.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function BlogPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-muted/40 py-12">
        <div className="mx-auto max-w-7xl px-4"><p className="text-xs font-semibold uppercase tracking-widest text-primary">Blog</p><h1 className="mt-2 text-4xl font-bold">Tips, projects & material guides</h1></div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Suspense fallback={<p className="text-center text-muted-foreground">Loading…</p>}><PostsList /></Suspense>
      </section>
    </SiteLayout>
  );
}