import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { productImage } from "@/lib/product-images";
import { SITE } from "@/lib/site-config";
import { Suspense } from "react";
import logo from "@/assets/logo.png";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
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
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {data.products.slice(0, 8).map((p) => (
        <div key={p.id} className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md">
          <img src={productImage(p.image_path)} alt={p.name} className="aspect-square w-full object-cover" loading="lazy" />
          <div className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.category}</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.short_description}</p>
            <p className="mt-3 text-lg font-bold text-primary">${Number(p.price_per_yard).toFixed(2)}<span className="text-xs font-normal text-muted-foreground"> / yard</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href={`tel:${SITE.phone}`} className="hover:underline">📞 {SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="hidden sm:inline hover:underline">✉ {SITE.email}</a>
            <a href={SITE.mapUrl} target="_blank" rel="noreferrer" className="hidden md:inline hover:underline">📍 {SITE.address}</a>
          </div>
          <div className="text-xs opacity-80">10% OFF first order — code WELCOME10</div>
        </div>
      </div>
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
          <img src={logo} alt={SITE.name} className="h-14 w-auto" />
          <nav className="hidden gap-6 text-sm font-medium text-foreground md:flex">
            <a href="#products" className="hover:text-primary">Shop</a>
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
          <a href="#contact" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">Request a Quote</a>
        </div>
      </header>
      {/* Hero */}
      <section className="relative">
        <img src={hero} alt="" className="h-[60vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">10% off first order</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white md:text-6xl">Edmonton's trusted landscape supply yard.</h1>
          <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">Mulch, decorative rock, soil, sand & gravel — delivered to your driveway or ready for pickup.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#products" className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:opacity-90">Shop Online</a>
            <a href="#contact" className="rounded-md border border-white/60 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/20">Request a Quote</a>
          </div>
        </div>
      </section>
      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Products</p>
            <h2 className="mt-2 text-3xl font-bold">Premium landscape materials by the yard</h2>
          </div>
        </div>
        <Suspense fallback={<div className="py-12 text-center text-muted-foreground">Loading products…</div>}>
          <ProductGrid />
        </Suspense>
      </section>
      {/* Why us */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold">Why choose us</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { t: "Local Edmonton yard", d: "Trusted neighborhood supplier with same-day pickup available." },
              { t: "Fair, transparent pricing", d: "By-the-yard pricing — no hidden fees, no surprises." },
              { t: "Fast delivery", d: "Reliable delivery across Edmonton and surrounding areas." },
            ].map((f) => (
              <div key={f.t} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold">Get in touch</h2>
        <p className="mt-2 text-muted-foreground">Call, email, or stop by the yard.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <a href={`tel:${SITE.phone}`} className="rounded-lg border border-border bg-card p-5 hover:border-primary"><p className="text-xs uppercase text-muted-foreground">Phone</p><p className="mt-1 font-semibold">{SITE.phone}</p></a>
          <a href={`mailto:${SITE.email}`} className="rounded-lg border border-border bg-card p-5 hover:border-primary"><p className="text-xs uppercase text-muted-foreground">Email</p><p className="mt-1 font-semibold break-all">{SITE.email}</p></a>
          <a href={SITE.mapUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-border bg-card p-5 hover:border-primary"><p className="text-xs uppercase text-muted-foreground">Visit</p><p className="mt-1 font-semibold">{SITE.address}</p></a>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <img src={logo} alt={SITE.name} className="h-12 w-auto brightness-0 invert" />
            <p className="mt-4 text-sm opacity-80">Edmonton's source for landscape supplies — mulch, rock, soil, sand & gravel.</p>
          </div>
          <div>
            <h4 className="font-semibold">Opening hours</h4>
            <ul className="mt-3 space-y-1 text-sm opacity-90">{SITE.hours.map((h) => (<li key={h.day}>{h.day}: {h.time}</li>))}</ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <p className="mt-3 text-sm opacity-90">{SITE.address}<br/>{SITE.phone}<br/>{SITE.email}</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} {SITE.name}. Built by {SITE.builtBy}.</div>
      </footer>
    </div>
  );
}
