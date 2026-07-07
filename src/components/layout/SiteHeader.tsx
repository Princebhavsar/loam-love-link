import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Navigation, Facebook, Instagram, Twitter, Linkedin, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { SITE } from "@/lib/site-config";
import { useCart } from "@/components/cart/CartContext";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/rentals", label: "Rentals" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const cart = useCart();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="bg-secondary text-secondary-foreground text-xs sm:text-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="h-3.5 w-3.5" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="hidden sm:inline-flex items-center gap-1.5 hover:underline">
              <Mail className="h-3.5 w-3.5" /> {SITE.email}
            </a>
            <a href={SITE.mapUrl} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-1.5 hover:underline">
              <MapPin className="h-3.5 w-3.5" /> {SITE.address}
            </a>
            <a href={SITE.directionsUrl} target="_blank" rel="noreferrer" className="hidden lg:inline-flex items-center gap-1.5 hover:underline">
              <Navigation className="h-3.5 w-3.5" /> Directions
            </a>
          </div>
          <div className="flex items-center gap-3 opacity-90">
            <a href={SITE.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href={SITE.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href={SITE.socials.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)"><Twitter className="h-4 w-4" /></a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt={SITE.name} className="h-16 w-auto" />
          </Link>
          <nav className="hidden gap-7 text-sm font-medium text-foreground lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => cart.setOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent"
              aria-label="Open quote cart"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Quote</span>
              {cart.items.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cart.items.length}
                </span>
              )}
            </button>
            <Link
              to="/contact"
              className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 md:inline-block"
            >
              Request a Quote
            </Link>
            <button
              className="rounded-md border border-input p-2 lg:hidden"
              onClick={() => setOpenMenu((v) => !v)}
              aria-label="Toggle menu"
            >
              {openMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {openMenu && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpenMenu(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}