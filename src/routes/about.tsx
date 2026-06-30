import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — City Landscape Supplies Depot Edmonton" },
    { name: "description", content: "Locally owned Edmonton landscape supply yard delivering quality mulch, rock, soil and sand." },
    { property: "og:title", content: "About — City Landscape Supplies Depot" },
    { property: "og:description", content: "Locally owned Edmonton landscape supply yard delivering quality mulch, rock, soil and sand." },
    { property: "og:url", content: "https://citylandscapesuppliesdepot.com/about" },
  ],
  links: [{ rel: "canonical", href: "https://citylandscapesuppliesdepot.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/10 to-transparent py-16">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">About us</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">A trusted Edmonton landscape supply yard</h1>
          <p className="mt-4 text-lg text-muted-foreground">City Landscape Supplies Depot is a family-owned yard serving homeowners, landscapers and contractors across the Edmonton area. We stock premium mulches, decorative rock, screened topsoil, sand and gravel — all priced fairly by the cubic yard.</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div><h2 className="text-2xl font-bold">Our promise</h2><p className="mt-3 text-muted-foreground">No hidden fees. No upsells. Just honest pricing on materials we'd use in our own yard.</p></div>
          <div><h2 className="text-2xl font-bold">Pickup or delivery</h2><p className="mt-3 text-muted-foreground">Drive in to our yard at {SITE.address} or have our drivers deliver right to your driveway — usually same week.</p></div>
          <div><h2 className="text-2xl font-bold">Local expertise</h2><p className="mt-3 text-muted-foreground">We know Edmonton soil, weather and seasons. Not sure what works for your project? Call us — we'll help.</p></div>
          <div><h2 className="text-2xl font-bold">Projects of every size</h2><p className="mt-3 text-muted-foreground">From a single yard for a backyard refresh to multi-truckload commercial deliveries — same fair price.</p></div>
        </div>
        <div className="mt-12 rounded-2xl bg-primary p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-bold">Ready to plan your next project?</h3>
          <Link to="/contact" className="mt-4 inline-block rounded-md bg-white px-6 py-3 font-bold text-primary hover:bg-white/90">Request a Quote</Link>
        </div>
      </section>
    </SiteLayout>
  );
}