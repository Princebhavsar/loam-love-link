import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useMemo, useState } from "react";
import { listProducts } from "@/lib/products.functions";
import { productImage } from "@/lib/product-images";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useCart } from "@/components/cart/CartContext";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Mulch, Rock, Soil & Sand | City Landscape Supplies Depot" },
      { name: "description", content: "Browse our full catalog of premium mulch, decorative rock, topsoil, sand and gravel. Priced per cubic yard with pickup or delivery." },
      { property: "og:title", content: "Shop Landscape Supplies — City Landscape Supplies Depot Edmonton" },
      { property: "og:description", content: "Browse premium mulch, decorative rock, topsoil, sand and gravel. Priced per cubic yard with pickup or delivery in Edmonton." },
      { property: "og:url", content: "https://citylandscapesuppliesdepot.com/shop" },
    ],
    links: [{ rel: "canonical", href: "https://citylandscapesuppliesdepot.com/shop" }],
  }),
  component: ShopPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({ queryKey: ["products"], queryFn: () => listProducts() }),
});

function ShopList() {
  const { data } = useSuspenseQuery({ queryKey: ["products"], queryFn: () => listProducts() });
  const cart = useCart();
  const [cat, setCat] = useState<string>("all");
  const cats = useMemo(() => Array.from(new Set(data.products.map((p) => p.category))), [data]);
  const filtered = cat === "all" ? data.products : data.products.filter((p) => p.category === cat);
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={() => setCat("all")} className={`rounded-full border px-4 py-1.5 text-sm ${cat === "all" ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>All</button>
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm capitalize ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <div key={p.id} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-md">
            <Link to="/shop/$slug" params={{ slug: p.slug }} className="overflow-hidden">
              <img src={productImage(p.image_path, p.slug)} alt={`${p.name} — landscaping supply in Edmonton`} className="aspect-square w-full object-cover transition group-hover:scale-105" loading="lazy" width={800} height={800} />
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.category}</p>
              <Link to="/shop/$slug" params={{ slug: p.slug }}><h2 className="mt-1 font-semibold hover:text-primary">{p.name}</h2></Link>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.short_description}</p>
              <p className="mt-2 text-lg font-bold text-primary">${Number(p.price_per_yard).toFixed(2)}<span className="text-xs font-normal text-muted-foreground"> / yard</span></p>
              <button onClick={() => { cart.add({ product_id: p.id, slug: p.slug, name: p.name, price_per_yard: Number(p.price_per_yard), image_path: p.image_path }); cart.setOpen(true); }} className="mt-3 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">Add to Quote</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ShopPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-muted/40 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Shop</p>
          <h1 className="mt-2 text-4xl font-bold">Landscape supplies — by the yard</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Add any item to your quote cart. Our team confirms availability, delivery fee, and total before charging.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="sr-only">Product catalog</h2>
        <Suspense fallback={<p className="py-12 text-center text-muted-foreground">Loading…</p>}>
          <ShopList />
        </Suspense>
      </section>
    </SiteLayout>
  );
}