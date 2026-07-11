import { createFileRoute, Link, Outlet, useMatch } from "@tanstack/react-router";
import { listPosts } from "@/lib/blog.functions";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { blogCover, blogHero } from "@/lib/blog-images";
import { getBlogGuide } from "@/lib/blog-content";

const SITE_URL = "https://citylandscapesuppliesdepot.com";

function formatDate(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Landscaping Blog — Edmonton Yard Tips & Guides" },
      { name: "description", content: "Read Edmonton landscaping tips, mulch and rock guides, spring yard prep checklists, and equipment rental advice from local supply experts." },
      { name: "keywords", content: "Edmonton landscaping blog, mulch tips, decorative rock guide, spring yard prep, landscape supplies Edmonton" },
      { property: "og:title", content: "Landscaping Blog — City Landscape Supplies Depot" },
      { property: "og:description", content: "Practical Edmonton yard guides for mulch, decorative rock, soil, spring prep, rentals and landscape supplies." },
      { property: "og:url", content: `${SITE_URL}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogPage,
  loader: ({ context }) => context.queryClient.ensureQueryData({ queryKey: ["posts"], queryFn: () => listPosts() }),
});

function PostsList() {
  const { data } = useSuspenseQuery({ queryKey: ["posts"], queryFn: () => listPosts() });
  if (data.posts.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">New articles are on the way — check back soon.</p>
        <p className="mt-4 text-sm">
          In the meantime, explore our <Link to="/shop" className="text-primary hover:underline">landscape supplies</Link>,
          {" "}<Link to="/rentals" className="text-primary hover:underline">equipment rentals</Link>, or
          {" "}<Link to="/contact" className="text-primary hover:underline">get a free quote</Link>.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data.posts.map((p, i) => (
        <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-md">
          <img
            src={blogCover(p.cover_image, i)}
            alt={p.title}
            loading="lazy"
            className="aspect-video w-full object-cover transition group-hover:scale-105"
          />
          <div className="p-5">
            <p className="text-xs text-muted-foreground">{formatDate(p.published_at)}</p>
            <h2 className="mt-1 text-lg font-bold group-hover:text-primary">{p.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(getBlogGuide(p.slug)?.keywords.slice(0, 2) ?? ["Edmonton landscaping"]).map((keyword) => (
                <span key={keyword} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{keyword}</span>
              ))}
            </div>
            <span className="mt-5 inline-flex text-sm font-semibold text-primary">Read full guide →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function BlogPage() {
  const childMatch = useMatch({ from: "/blog/$slug", shouldThrow: false });
  if (childMatch) return <Outlet />;

  return (
    <SiteLayout>
      <section className="relative border-b border-border">
        <img src={blogHero} alt="Landscaped Edmonton backyard with mulch and stone" className="h-72 w-full object-cover md:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Blog</p>
            <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">Tips, projects & material guides</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Seasonal advice from Edmonton's landscape supply experts — from mulch and rock selection to equipment know-how.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Suspense fallback={<p className="text-center text-muted-foreground">Loading…</p>}><PostsList /></Suspense>
        <div className="mt-12 rounded-lg border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">Ready to start your project?</h2>
          <p className="mt-2">
            Shop <Link to="/shop" className="text-primary hover:underline">premium mulch, rock and soil</Link>, reserve <Link to="/rentals" className="text-primary hover:underline">DIY equipment rentals</Link>, or <Link to="/contact" className="text-primary hover:underline">request a delivery quote</Link>. New customers can also <Link to="/promo" className="text-primary hover:underline">claim 10% off</Link>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}