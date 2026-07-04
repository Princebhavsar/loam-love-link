import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { getProduct } from "@/lib/products.functions";
import { productImage } from "@/lib/product-images";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useCart } from "@/components/cart/CartContext";

export const Route = createFileRoute("/shop/$slug")({
  head: ({ params, loaderData }) => {
    const product = (loaderData as { product?: { name: string; slug?: string; short_description?: string; price_per_yard?: number | string; image_path?: string } } | undefined)?.product;
    const name = product?.name ?? params.slug.replace(/-/g, " ");
    const title = `${name} — City Landscape Supplies Depot`;
    const desc = product?.short_description ?? `Buy ${name} by the cubic yard in Edmonton with pickup or delivery.`;
    const url = `https://citylandscapesuppliesdepot.com/shop/${params.slug}`;
    const image = product ? productImage(product.image_path, params.slug) : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: product
        ? [{
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: desc,
              image,
              offers: {
                "@type": "Offer",
                price: Number(product.price_per_yard ?? 0),
                priceCurrency: "CAD",
                availability: "https://schema.org/InStock",
                url,
              },
            }),
          }]
        : [],
    };
  },
  component: ProductPage,
  loader: async ({ context, params }) => {
    const res = await context.queryClient.ensureQueryData({
      queryKey: ["product", params.slug],
      queryFn: () => getProduct({ data: { slug: params.slug } }),
    });
    if (!res.product) throw notFound();
    return res;
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">Back to shop →</Link>
      </div>
    </SiteLayout>
  ),
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery({ queryKey: ["product", slug], queryFn: () => getProduct({ data: { slug } }) });
  const cart = useCart();
  const [yards, setYards] = useState(1);
  const p = data.product!;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary">← Back to shop</Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <img src={productImage(p.image_path, p.slug)} alt={p.name} className="aspect-square w-full rounded-xl object-cover" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{p.category}</p>
          <h1 className="mt-2 text-4xl font-bold">{p.name}</h1>
          <p className="mt-2 text-2xl font-bold text-primary">${Number(p.price_per_yard).toFixed(2)} <span className="text-base font-normal text-muted-foreground">/ cubic yard</span></p>
          <p className="mt-4 text-muted-foreground">{p.short_description}</p>
          {p.description && <p className="mt-4 whitespace-pre-line text-sm text-muted-foreground">{p.description}</p>}
          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-medium">Yards</label>
            <input type="number" min={0.5} step={0.5} value={yards} onChange={(e) => setYards(Number(e.target.value))} className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <span className="text-lg font-bold">= ${(Number(p.price_per_yard) * yards).toFixed(2)}</span>
          </div>
          <button
            onClick={() => { cart.add({ product_id: p.id, slug: p.slug, name: p.name, price_per_yard: Number(p.price_per_yard), image_path: p.image_path, yards }); cart.setOpen(true); }}
            className="mt-6 w-full rounded-md bg-primary py-3 font-bold text-primary-foreground hover:opacity-90 sm:w-auto sm:px-8"
          >
            Add to Quote
          </button>
          {p.delivery_notes && <p className="mt-4 rounded-md bg-muted p-3 text-xs text-muted-foreground">📦 {p.delivery_notes}</p>}
        </div>
      </div>
    </div>
  );
}

function ProductPage() {
  return (
    <SiteLayout>
      <Suspense fallback={<p className="py-24 text-center text-muted-foreground">Loading…</p>}>
        <ProductDetail />
      </Suspense>
    </SiteLayout>
  );
}