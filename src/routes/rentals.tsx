import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SITE } from "@/lib/site-config";
import { Phone, Mail } from "lucide-react";
import miniSkidSteer from "@/assets/rentals/mini-skid-steer.jpg";
import plateCompactor from "@/assets/rentals/plate-compactor.jpg";
import wheelbarrow from "@/assets/rentals/wheelbarrow.jpg";
import sodCutter from "@/assets/rentals/sod-cutter.jpg";
import powerRake from "@/assets/rentals/power-rake.jpg";
import utilityTrailer from "@/assets/rentals/utility-trailer.jpg";
import landscapeRake from "@/assets/rentals/landscape-rake.jpg";
import lawnMower from "@/assets/rentals/lawn-mower.jpg";
import sodRoller from "@/assets/rentals/sod-roller.jpg";
import groundCompactor from "@/assets/rentals/ground-compactor.jpg";

export const Route = createFileRoute("/rentals")({
  head: () => ({ meta: [
    { title: "Equipment Rentals — City Landscape Supplies Depot" },
    { name: "description", content: "Rent landscaping equipment in Edmonton — skid steers, compactors, lawn mowers, sod rollers, landscape rakes and more. Daily rates with promotional discounts." },
    { property: "og:title", content: "Equipment Rentals in Edmonton — City Landscape Supplies Depot" },
    { property: "og:description", content: "Rent skid steers, compactors, lawn mowers, sod rollers and more in Edmonton. Daily rates with promotional discounts." },
    { property: "og:url", content: "https://citylandscapesuppliesdepot.com/rentals" },
  ],
  links: [{ rel: "canonical", href: "https://citylandscapesuppliesdepot.com/rentals" }],
  }),
  component: RentalsPage,
});

const RENTALS = [
  { name: "Mini Skid Steer", daily: 285, desc: "Compact loader for moving mulch, rock, soil — fits through fence gates.", image: miniSkidSteer },
  { name: "Plate Compactor", daily: 65, desc: "Ideal for compacting gravel base under pavers or sheds.", image: plateCompactor },
  { name: "Heavy-Duty Wheelbarrow", daily: 15, desc: "6 cu. ft. contractor wheelbarrow with pneumatic tire.", image: wheelbarrow },
  { name: "Sod Cutter", daily: 95, desc: "Removes existing turf cleanly before reseeding or landscaping.", image: sodCutter },
  { name: "Power Rake / Dethatcher", daily: 85, desc: "Prep your lawn for overseed or remove thatch buildup.", image: powerRake },
  { name: "Utility Trailer (5x10)", daily: 55, desc: "Bring a truck — we hook up and load you with material.", image: utilityTrailer },
  { name: "Landscape Rake", daily: 75, desc: "Tow-behind rake to level soil and clear debris before seeding.", image: landscapeRake },
  { name: "Lawn Mower", daily: 45, desc: "Self-propelled gas mower for clean cuts on residential lawns.", image: lawnMower },
  { name: "SOD Roller", daily: 25, desc: "Water-fillable roller to press sod and seed into firm contact with soil.", image: sodRoller },
  { name: "Ground Compactor", daily: 95, desc: "Jumping-jack rammer for compacting trenches and tight base areas.", image: groundCompactor },
];

function RentalsPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-muted/40 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Rentals</p>
          <h1 className="mt-2 text-4xl font-bold">Equipment rentals for your project</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">DIY-friendly equipment by the day or weekend. Reserve through our quote form — we'll confirm availability. Pair your rental with our <Link to="/shop" className="text-primary hover:underline">landscape supplies</Link> like mulch, river rock and topsoil for a complete project.</p>
          <div className="mt-4 max-w-3xl rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
            <p className="font-semibold text-foreground">Need it for just a few hours? Running a promotion?</p>
            <p className="mt-1 text-muted-foreground">
              If you're only looking for a few hours of use, kindly <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-1 text-primary hover:underline"><Phone className="h-3.5 w-3.5" />call</a> or <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1 text-primary hover:underline"><Mail className="h-3.5 w-3.5" />email</a> us — we also provide promotional discounts on rentals. Feel free to call our reception department for all current ongoing promotions and availability.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="sr-only">Available rental equipment</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RENTALS.map((r) => (
            <div key={r.name} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
              <img src={r.image} alt={`${r.name} rental in Edmonton`} loading="lazy" width={1024} height={1024} className="aspect-video w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-bold">{r.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <p className="mt-4 text-2xl font-bold text-primary">${r.daily}<span className="text-sm font-normal text-muted-foreground"> / day</span></p>
                <Link to="/contact" className="mt-4 inline-block w-full rounded-md bg-primary py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">Reserve</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-lg border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">Planning a bigger project?</h2>
          <p className="mt-2">
            Browse our full <Link to="/shop" className="text-primary hover:underline">shop of landscaping materials</Link>, check seasonal tips on the <Link to="/blog" className="text-primary hover:underline">blog</Link>, learn more <Link to="/about" className="text-primary hover:underline">about us</Link>, or <Link to="/contact" className="text-primary hover:underline">contact our team</Link> for a custom quote.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}