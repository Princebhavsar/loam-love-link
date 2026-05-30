import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, listPosts } from "@/lib/blog.functions";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { blogCover } from "@/lib/blog-images";
import { SITE } from "@/lib/site-config";
import { Phone, Mail, MapPin, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params, loaderData }) => {
    const post = (loaderData as { post?: { title: string; excerpt?: string; cover_image?: string } } | undefined)?.post;
    const title = post?.title ?? params.slug;
    const desc = post?.excerpt ?? "Landscaping tips from City Landscape Supplies Depot.";
    const url = `https://citylandscapesuppliesdepot.com/blog/${params.slug}`;
    return {
      meta: [
        { title: `${title} — Blog | City Landscape Supplies Depot` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
              }),
            },
          ]
        : [],
    };
  },
  component: BlogPost,
  loader: async ({ context, params }) => {
    const res = await context.queryClient.ensureQueryData({ queryKey: ["post", params.slug], queryFn: () => getPost({ data: { slug: params.slug } }) });
    if (!res.post) throw notFound();
    await context.queryClient.ensureQueryData({ queryKey: ["posts"], queryFn: () => listPosts() });
    return res;
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
  const { data: all } = useSuspenseQuery({ queryKey: ["posts"], queryFn: () => listPosts() });
  const p = data.post!;
  const cover = blogCover(p.cover_image, 0);
  const related = all.posts.filter((x) => x.slug !== p.slug).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <article>
          <img src={cover} alt={p.title} className="aspect-video w-full rounded-xl object-cover" />
          <p className="mt-6 text-xs uppercase tracking-widest text-primary">
            {p.published_at ? new Date(p.published_at).toLocaleDateString() : "Blog"}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{p.title}</h1>
          {p.excerpt && <p className="mt-3 text-lg text-muted-foreground">{p.excerpt}</p>}
          <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-line text-foreground">{p.content}</div>

          <div className="mt-12 rounded-xl border border-border bg-muted/40 p-6">
            <h2 className="text-lg font-semibold">Need supplies for your project?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse our <Link to="/shop" className="text-primary hover:underline">landscape supplies</Link>, reserve a{" "}
              <Link to="/rentals" className="text-primary hover:underline">rental</Link>, or{" "}
              <Link to="/contact" className="text-primary hover:underline">request a quote</Link>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/contact" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Contact us
              </Link>
              <Link to="/promo" className="inline-flex items-center rounded-md border border-input px-4 py-2 text-sm font-semibold hover:bg-accent">
                Claim 10% off
              </Link>
            </div>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Get in touch</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /> <a className="hover:underline" href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
              <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" /> <a className="hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> <a className="hover:underline" target="_blank" rel="noreferrer" href={SITE.mapUrl}>{SITE.address}</a></li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-primary">Shop landscape supplies</Link></li>
              <li><Link to="/rentals" className="hover:text-primary">Equipment rentals</Link></li>
              <li><Link to="/promo" className="hover:text-primary">Claim 10% off</Link></li>
              <li><Link to="/about" className="hover:text-primary">About us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          {related.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">More posts</h3>
              <ul className="mt-3 space-y-3">
                {related.map((r, i) => (
                  <li key={r.id}>
                    <Link to="/blog/$slug" params={{ slug: r.slug }} className="group flex gap-3">
                      <img src={blogCover(r.cover_image, i)} alt="" className="h-14 w-20 flex-none rounded object-cover" />
                      <span className="text-sm font-medium leading-snug group-hover:text-primary">{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function BlogPost() {
  return (
    <SiteLayout>
      <Suspense fallback={<p className="py-24 text-center text-muted-foreground">Loading…</p>}><PostBody /></Suspense>
    </SiteLayout>
  );
}