import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/rentals")({
  head: () => ({ meta: [
    { title: "Equipment Rentals — City Landscape Supplies Depot" },
    { name: "description", content: "Rent compact equipment for your landscape project — skid steers, compactors and more." },
  ]}),
  component: RentalsPage,
});

const RENTALS = [
  { name: "Mini Skid Steer", daily: 285, desc: "Compact loader for moving mulch, rock, soil — fits through fence gates." },
  { name: "Plate Compactor", daily: 65, desc: "Ideal for compacting gravel base under pavers or sheds." },
  { name: "Heavy-Duty Wheelbarrow", daily: 15, desc: "6 cu. ft. contractor wheelbarrow with pneumatic tire." },
  { name: "Sod Cutter", daily: 95, desc: "Removes existing turf cleanly before reseeding or landscaping." },
  { name: "Power Rake / Dethatcher", daily: 85, desc: "Prep your lawn for overseed or remove thatch buildup." },
  { name: "Utility Trailer (5x10)", daily: 55, desc: "Bring a truck — we hook up and load you with material." },
];

function RentalsPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-muted/40 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Rentals</p>
          <h1 className="mt-2 text-4xl font-bold">Equipment rentals for your project</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">DIY-friendly equipment by the day or weekend. Reserve through our quote form — we'll confirm availability.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RENTALS.map((r) => (
            <div key={r.name} className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-bold">{r.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              <p className="mt-4 text-2xl font-bold text-primary">${r.daily}<span className="text-sm font-normal text-muted-foreground"> / day</span></p>
              <Link to="/contact" className="mt-4 inline-block w-full rounded-md bg-primary py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">Reserve</Link>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}