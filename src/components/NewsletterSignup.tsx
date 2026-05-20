import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/contact.functions";
import { toast } from "sonner";

export function NewsletterSignup({ variant = "default" }: { variant?: "default" | "footer" }) {
  const sub = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isFooter = variant === "footer";
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        try {
          await sub({ data: { email, source: variant } });
          toast.success("You're subscribed — thanks!");
          setEmail("");
        } catch (err: any) {
          toast.error(err?.message ?? "Could not subscribe");
        } finally {
          setLoading(false);
        }
      }}
      className="flex w-full gap-2"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className={
          isFooter
            ? "w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
            : "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        }
      />
      <button
        disabled={loading}
        className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "…" : "Join"}
      </button>
    </form>
  );
}