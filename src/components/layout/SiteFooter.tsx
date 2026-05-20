import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { SITE } from "@/lib/site-config";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={logo} alt={SITE.name} className="h-14 w-auto brightness-0 invert" />
          <p className="mt-4 text-sm opacity-80">{SITE.tagline}</p>
          <div className="mt-4 flex gap-3 opacity-90">
            <a href={SITE.socials.facebook} aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
            <a href={SITE.socials.instagram} aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
            <a href={SITE.socials.twitter} aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li><Link to="/shop" className="hover:underline">Shop</Link></li>
            <li><Link to="/rentals" className="hover:underline">Rentals</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/promo" className="hover:underline">Claim 10% Off</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Visit & Contact</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5" /> {SITE.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5" /> {SITE.email}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5" /> {SITE.address}</li>
          </ul>
          <div className="mt-4 space-y-1 text-xs opacity-80">
            {SITE.hours.map((h) => (
              <p key={h.day}>{h.day}: {h.time}</p>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Get yard tips & offers</h4>
          <p className="mt-2 text-sm opacity-80">Join our newsletter for seasonal tips and special pricing.</p>
          <div className="mt-3"><NewsletterSignup variant="footer" /></div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {SITE.name}. Built by {SITE.builtBy}.
      </div>
    </footer>
  );
}