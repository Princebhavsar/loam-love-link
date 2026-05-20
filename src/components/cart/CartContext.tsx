import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  product_id: string;
  slug: string;
  name: string;
  price_per_yard: number;
  image_path: string | null;
  yards: number;
};

type CartCtx = {
  items: CartItem[];
  add: (it: Omit<CartItem, "yards"> & { yards?: number }) => void;
  remove: (product_id: string) => void;
  setYards: (product_id: string, yards: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "clsd_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const subtotal = items.reduce((s, i) => s + i.price_per_yard * i.yards, 0);
    return {
      items,
      open,
      setOpen,
      add: (it) =>
        setItems((prev) => {
          const yards = it.yards ?? 1;
          const found = prev.find((p) => p.product_id === it.product_id);
          if (found) {
            return prev.map((p) =>
              p.product_id === it.product_id ? { ...p, yards: p.yards + yards } : p,
            );
          }
          return [...prev, { ...it, yards }];
        }),
      remove: (id) => setItems((prev) => prev.filter((p) => p.product_id !== id)),
      setYards: (id, y) =>
        setItems((prev) =>
          prev.map((p) => (p.product_id === id ? { ...p, yards: Math.max(0.5, y) } : p)),
        ),
      clear: () => setItems([]),
      subtotal,
      count: items.reduce((s, i) => s + i.yards, 0),
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside provider");
  return v;
}