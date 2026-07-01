import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { productImage } from "@/lib/product-images";
import { SITE } from "@/lib/site-config";
import { Suspense } from "react";
import hero from "@/assets/hero.jpg";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useCart } from "@/components/cart/CartContext";
import { Truck, ShieldCheck, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "City Landscape Supplies Depot — Edmonton Mulch, Rock & Soil" },
      { name: "description", content: "Premium mulch, decorative rock, soil, sand and gravel in Edmonton. Same-day pickup or delivery. Save 10% on your first order." },
      { property: "og:title", content: "City Landscape Supplies Depot — Edmonton's Landscape Supply Yard" },
      { property: "og:description", content: "Premium mulch, decorative rock, soil, sand and gravel in Edmonton. Same-day pickup or delivery." },
      { property: "og:url", content: "https://citylandscapesuppliesdepot.com/" },
    ],
    links: [{ rel: "canonical", href: "https://citylandscapesuppliesdepot.com/" }],
  }),
  component: Index,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["products"],
      queryFn: () => listProducts(),
    }),
});

function ProductGrid() {
  const { data } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => listProducts(),
  });
  const cart = useCart();
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {data.products.slice(0, 8).map((p) => (
        <div key={p.id} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md">
          <Link to="/shop/$slug" params={{ slug: p.slug }} className="block overflow-hidden">
            <img src={productImage(p.image_path, p.slug)} alt={p.name} className="aspect-square w-full object-cover transition group-hover:scale-105" loading="lazy" />
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.category}</p>
            <Link to="/shop/$slug" params={{ slug: p.slug }}>
              <h3 className="mt-1 text-base font-semibold text-foreground hover:text-primary">{p.name}</h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.short_description}</p>
            <p className="mt-3 text-lg font-bold text-primary">${Number(p.price_per_yard).toFixed(2)}<span className="text-xs font-normal text-muted-foreground"> / yard</span></p>
            <button
              onClick={() => { cart.add({ product_id: p.id, slug: p.slug, name: p.name, price_per_yard: Number(p.price_per_yard), image_path: p.image_path }); cart.setOpen(true); }}
              className="mt-3 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              Add to Quote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative">
        <img
          src={hero}
          alt="Edmonton landscape supply yard"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">10% off first order</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white md:text-6xl">Edmonton's trusted landscape supply yard.</h1>
          <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">Mulch, decorative rock, soil, sand & gravel — delivered to your driveway or ready for pickup.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/shop" className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:opacity-90">Shop Online</Link>
            <Link to="/contact" className="rounded-md border border-white/60 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/20">Request a Quote</Link>
          </div>
        </div>
      </section>
      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Products</p>
            <h2 className="mt-2 text-3xl font-bold">Premium landscape materials by the yard</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <Suspense fallback={<div className="py-12 text-center text-muted-foreground">Loading products…</div>}>
          <ProductGrid />
        </Suspense>
      </section>
      {/* Why us */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold">Why Edmonton chooses us</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { Icon: MapPin, t: "Local Edmonton yard", d: "Trusted neighborhood supplier with same-day pickup available." },
              { Icon: ShieldCheck, t: "Fair, transparent pricing", d: "By-the-yard pricing — no hidden fees, no surprises." },
              { Icon: Truck, t: "Fast delivery", d: "Reliable delivery across Edmonton and surrounding areas." },
            ].map((f) => (
              <div key={f.t} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <f.Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA strip */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4">
          <div>
            <h3 className="text-2xl font-bold">Ready to get started?</h3>
            <p className="text-sm opacity-90">Free quotes — usually answered same day.</p>
          </div>
          <Link to="/contact" className="rounded-md bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-white/90">Request a Quote</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
