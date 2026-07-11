import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, listPosts } from "@/lib/blog.functions";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { blogCover } from "@/lib/blog-images";
import { getBlogGuide } from "@/lib/blog-content";
import { SITE } from "@/lib/site-config";
import { Phone, Mail, MapPin, ArrowLeft, CalendarDays, CheckCircle2, Clock, ArrowRight, HelpCircle } from "lucide-react";

const SITE_URL = "https://citylandscapesuppliesdepot.com";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params, loaderData }) => {
    const post = (loaderData as { post?: { title: string; excerpt?: string; cover_image?: string } } | undefined)?.post;
    const guide = getBlogGuide(params.slug);
    const title = guide?.seoTitle ?? post?.title ?? params.slug;
    const desc = guide?.metaDescription ?? post?.excerpt ?? "Landscaping tips from City Landscape Supplies Depot.";
    const url = `${SITE_URL}/blog/${params.slug}`;
    const image = post ? blogCover(post.cover_image, 0) : undefined;
    const faqSchema = guide?.faqs
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...(guide ? [{ name: "keywords", content: guide.keywords.join(", ") }] : []),
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
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
                description: desc,
                image,
                datePublished: (post as { published_at?: string }).published_at,
                dateModified: (post as { updated_at?: string }).updated_at ?? (post as { published_at?: string }).published_at,
                author: { "@type": "Organization", name: SITE.name },
                publisher: { "@type": "Organization", name: SITE.name },
                mainEntityOfPage: url,
                keywords: guide?.keywords,
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                  { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
                  { "@type": "ListItem", position: 3, name: post.title, item: url },
                ],
              }),
            },
            ...(faqSchema
              ? [
                  {
                    type: "application/ld+json",
                    children: JSON.stringify(faqSchema),
                  },
                ]
              : []),
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

function formatDate(iso?: string | null) {
  if (!iso) return "Blog";
  const d = new Date(iso);
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

function PostBody() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery({ queryKey: ["post", slug], queryFn: () => getPost({ data: { slug } }) });
  const { data: all } = useSuspenseQuery({ queryKey: ["posts"], queryFn: () => listPosts() });
  const p = data.post!;
  const guide = getBlogGuide(p.slug);
  const cover = blogCover(p.cover_image, 0);
  const related = all.posts.filter((x) => x.slug !== p.slug).slice(0, 4);
  const intro = guide?.intro ?? [p.content ?? ""];
  const sections = guide?.sections ?? [];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <article>
          <img src={cover} alt={p.title} className="aspect-video w-full rounded-xl object-cover" />
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-primary">
            <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{formatDate(p.published_at)}</span>
            {guide?.readingTime && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{guide.readingTime}</span>}
          </div>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{p.title}</h1>
          {p.excerpt && <p className="mt-3 text-lg text-muted-foreground">{p.excerpt}</p>}
          {guide?.keywords && (
            <div className="mt-5 flex flex-wrap gap-2">
              {guide.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{keyword}</span>)}
            </div>
          )}

          <div className="mt-8 space-y-5 text-base leading-7 text-foreground">
            {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          {sections.length > 0 ? (
            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 border-t border-border pt-8">
                  <h2 className="text-2xl font-bold leading-tight">{section.title}</h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                    {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 grid gap-2 text-sm text-foreground sm:grid-cols-2">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-2 rounded-md bg-muted/60 p-3"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-line text-foreground">{p.content}</div>
          )}

          {guide?.checklist && (
            <section className="mt-12 rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">Project checklist</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {guide.checklist.map((item) => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />{item}</li>)}
              </ul>
            </section>
          )}

          {guide?.relatedLinks && (
            <section className="mt-8 rounded-xl border border-border bg-muted/40 p-6">
              <h2 className="text-xl font-bold">Recommended next steps</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {guide.relatedLinks.map((link) => (
                  <a key={link.label} href={link.href} className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
                    {link.label}<ArrowRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>
          )}

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