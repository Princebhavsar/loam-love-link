export type BlogGuide = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  readingTime: string;
  intro: string[];
  sections: Array<{
    id: string;
    title: string;
    body: string[];
    bullets?: string[];
  }>;
  checklist?: string[];
  relatedLinks: Array<{ label: string; href: string }>;
  faqs?: Array<{ question: string; answer: string }>;
};

export const BLOG_GUIDES: Record<string, BlogGuide> = {
  "landscape-supplies-edmonton-guide": {
    slug: "landscape-supplies-edmonton-guide",
    seoTitle: "Landscape Supplies Edmonton — Rock, Mulch, Soil & Rentals",
    metaDescription:
      "Local buyer's guide to landscape supplies in Edmonton: decorative rock, mulch, topsoil, garden mix, sand and equipment rentals with pickup or delivery.",
    keywords: [
      "landscape supplies edmonton",
      "landscape materials edmonton",
      "landscaping supply stores",
      "landscaping rock edmonton",
      "garden supplies edmonton",
      "landscaping products edmonton",
      "supplies for landscaping",
      "white rock landscaping supplies",
      "garden and landscape supplies",
      "garden landscaping supplies",
      "city landscaping",
      "landscape supplies",
      "landscape materials",
    ],
    readingTime: "8 min read",
    intro: [
      "Finding the right landscape supplies in Edmonton can feel overwhelming — there are dozens of rock types, several mulch colours, multiple soil blends and a long list of rental equipment to choose from. The good news is that most residential projects come down to a handful of well-tested products.",
      "This buyer's guide walks through what to look for at Edmonton landscaping supply stores, how to pick the right materials for common yard projects, and how to save time on pickup and delivery. Everything below is written for local homeowners and contractors working with real Alberta soil, weather and yard layouts.",
    ],
    sections: [
      {
        id: "why-local",
        title: "Why buy landscape supplies locally in Edmonton",
        body: [
          "Buying garden and landscape supplies from an Edmonton yard means shorter delivery windows, fresher product and staff who understand our freeze-thaw seasons. Local landscaping supply stores can also match rock and mulch to what neighbouring homes already use, which keeps a street looking consistent.",
          "City Landscape Supplies Depot stocks the most common landscaping products Edmonton yards actually need — decorative rock, mulch, topsoil, garden mix, road crush, play sand and rental equipment — in one location off 78 Ave NW.",
        ],
        bullets: [
          "Same-week pickup and delivery across Edmonton",
          "Bulk pricing on rock, mulch, soil and aggregate",
          "Local advice on what works in Alberta yards",
        ],
      },
      {
        id: "rock",
        title: "Landscaping rock in Edmonton: sizes, colours and uses",
        body: [
          "Landscaping rock is the most popular long-term ground cover in Edmonton because it handles wind, snow and dry summers without breaking down. The right choice depends on colour, size and how the area will be used.",
          "For bright, modern front yards, Crystal White Rock and other white rock landscaping supplies create high contrast against dark siding. For a natural Rocky Mountain look, Rundle Rock in 20mm, 40mm or 50–90mm works with wood fences and mature trees. For bold contemporary designs, Majestic Midnight and Purple Sparkle add depth beside light concrete and pavers.",
        ],
        bullets: [
          "20mm rock — walkways, borders and side yards",
          "40mm rock — decorative beds and foundation lines",
          "50–100mm rock — feature areas, drainage and erosion control",
          "Wash Round Rock — clean-look drainage and downspout splash zones",
        ],
      },
      {
        id: "mulch",
        title: "Mulch for Edmonton garden beds",
        body: [
          "Mulch is the fastest way to refresh a yard between seasons. Black, cedar, pine, red and nugget bark are the most requested colours in Edmonton because they hold up well through spring runoff and summer sun.",
          "For most beds, plan for a 2–3 inch depth. New beds usually need 3 inches; established beds only need a 1–2 inch top-up each spring. If you're not sure how much to order, use our mulch calculator guide before booking pickup or delivery.",
        ],
      },
      {
        id: "soil",
        title: "Topsoil, garden mix and specialty blends",
        body: [
          "Not all soil is the same. Screened topsoil is ideal for lawn repair and levelling low spots. Garden mix (a 3-1-1 blend of soil, peat and compost) is the better choice for planting beds, raised gardens and vegetable boxes.",
          "For Edmonton yards recovering from construction, a fresh layer of quality topsoil often makes the difference between patchy grass and a full, healthy lawn by mid-summer.",
        ],
        bullets: [
          "Topsoil — lawn levelling and seed bed prep",
          "Garden Mix 3-1-1 — planting beds and raised boxes",
          "Play sand — sandboxes and paver base joints",
        ],
      },
      {
        id: "aggregate",
        title: "Aggregate, limestone and road crush",
        body: [
          "Aggregate products are the backbone of driveways, parking pads, shed bases and paver installations. Road Crush 20mm compacts into a firm, stable surface that stands up to vehicles and Edmonton winters. Grey Limestone in 20-30mm, 30-65mm and 75-100mm handles pathways, French drains and erosion zones.",
          "For paver and slab installations, a compacted road crush base topped with a thin layer of screened material gives the cleanest long-term finish.",
        ],
      },
      {
        id: "rentals",
        title: "Equipment rentals for DIY landscaping",
        body: [
          "The right rental turns a full weekend of manual labour into a few focused hours. Our Edmonton yard rents landscape rakes, sod rollers, lawn mowers and ground compactors alongside our regular material sales.",
          "If you only need a tool for a few hours instead of a full day, call or email ahead — short-term rental arrangements can often be made for local customers.",
        ],
        bullets: [
          "Landscape rake — levelling soil and spreading materials",
          "Sod roller — pressing sod and new seed into contact with soil",
          "Ground compactor — paver bases, gravel pads and driveways",
          "Lawn mower — quick turf refresh before selling or hosting",
        ],
      },
      {
        id: "delivery",
        title: "Pickup, delivery and how much to order",
        body: [
          "Most Edmonton homeowners underestimate how much material they need. Measure the area in feet, choose a depth and multiply by that depth in feet to get cubic feet. Divide by 27 for cubic yards. Round up slightly to allow for settling and edges.",
          "Bring a truck and trailer for pickup, or request local delivery when the order is larger than half a yard. Confirm access to the drop zone in advance — narrow gates and low overhanging branches are the two most common delivery surprises.",
        ],
      },
    ],
    checklist: [
      "Measure the project area in feet before ordering",
      "Choose rock or mulch based on colour and size, not just price",
      "Use garden mix for beds and topsoil for lawns",
      "Book equipment rentals ahead of peak weekends",
      "Confirm delivery access — gate width, overhead clearance, drop zone",
    ],
    relatedLinks: [
      { label: "Browse all landscape supplies", href: "/shop" },
      { label: "See equipment rentals", href: "/rentals" },
      { label: "How to calculate mulch", href: "/blog/how-to-calculate-mulch" },
      { label: "Choosing decorative rock", href: "/blog/choosing-the-right-decorative-rock" },
      { label: "Spring landscape prep", href: "/blog/spring-landscape-prep" },
      { label: "Request a delivery quote", href: "/contact" },
    ],
  },
  "how-to-calculate-mulch": {
    slug: "how-to-calculate-mulch",
    seoTitle: "How Much Mulch Do I Need? Edmonton Yard Calculator",
    metaDescription:
      "Learn how to calculate mulch by cubic yard, choose the right depth, and order black, cedar, pine or red mulch for Edmonton landscape beds.",
    keywords: [
      "how much mulch do I need",
      "mulch calculator Edmonton",
      "black mulch Edmonton",
      "cedar mulch delivery",
      "landscape supplies Edmonton",
    ],
    readingTime: "5 min read",
    intro: [
      "Mulch is one of the fastest ways to refresh a yard, protect plant roots, reduce weeds and make garden beds look finished. The most common mistake is ordering by guesswork instead of measuring the bed area and target depth.",
      "Use this guide to calculate cubic yards accurately before requesting pickup or delivery from City Landscape Supplies Depot.",
    ],
    sections: [
      {
        id: "measure-area",
        title: "Measure the bed area first",
        body: [
          "Measure the length and width of each garden bed in feet. For rectangular beds, multiply length by width. For irregular beds, split the space into smaller rectangles, measure each one, and add the totals together.",
          "If the bed has curves, round up slightly. A small buffer is better than leaving thin spots around shrubs, fence lines or edging.",
        ],
        bullets: [
          "10 ft × 12 ft bed = 120 square feet",
          "Two 4 ft × 20 ft beds = 160 square feet total",
          "Round irregular spaces up by 5–10% for cleaner coverage",
        ],
      },
      {
        id: "choose-depth",
        title: "Choose the right mulch depth",
        body: [
          "For most Edmonton garden beds, 2–3 inches of mulch is ideal. New beds or bare soil usually need close to 3 inches. Existing beds with mulch already in place may only need a 1–2 inch top-up.",
          "Avoid piling mulch directly against tree trunks or plant stems. Leave a small gap so moisture does not sit against the bark.",
        ],
        bullets: ["Fresh bed: 3 inches", "Annual refresh: 1–2 inches", "Tree rings: keep mulch pulled back from the trunk"],
      },
      {
        id: "cubic-yard-formula",
        title: "Use the cubic yard formula",
        body: [
          "Convert your depth from inches to feet, multiply by square footage, then divide by 27. The formula is: square feet × depth in feet ÷ 27 = cubic yards.",
          "For example, a 120 square foot bed at 3 inches deep is 120 × 0.25 ÷ 27 = 1.11 cubic yards. Ordering 1.25 yards gives you a practical buffer for edges and settling.",
        ],
      },
      {
        id: "pick-material",
        title: "Pick the best mulch for the look you want",
        body: [
          "Black mulch gives a bold contrast against green lawns and light stone. Cedar mulch has a natural warm tone and classic garden look. Pine mulch and red mulch are useful when you want a softer or more decorative finish.",
          "If you are matching an existing bed, bring a photo or visit the yard before ordering so the colour and texture feel consistent across the property.",
        ],
      },
    ],
    checklist: [
      "Measure every bed in feet",
      "Select 2–3 inches for most beds",
      "Convert inches to feet before calculating",
      "Order a small buffer for edges and settling",
      "Ask about pickup or local delivery availability",
    ],
    relatedLinks: [
      { label: "Shop Black Mulch", href: "/shop/black-mulch" },
      { label: "Shop Cedar Mulch", href: "/shop/cedar-mulch" },
      { label: "Request a delivery quote", href: "/contact" },
    ],
  },
  "choosing-the-right-decorative-rock": {
    slug: "choosing-the-right-decorative-rock",
    seoTitle: "Choosing Decorative Rock for Edmonton Landscapes",
    metaDescription:
      "Compare decorative rock colours, sizes and uses for Edmonton yards, including Crystal White, Rundle Rock, Purple Spark and Majestic Midnight.",
    keywords: [
      "decorative rock Edmonton",
      "landscape rock delivery",
      "Rundle Rock Edmonton",
      "Crystal White Rock",
      "Majestic Midnight rock",
    ],
    readingTime: "6 min read",
    intro: [
      "Decorative rock is durable, low-maintenance and well suited to Edmonton's freeze-thaw seasons. It works especially well around pathways, side yards, foundation beds and modern front-yard designs.",
      "The right product depends on colour, rock size, drainage needs and how the area will be used day to day.",
    ],
    sections: [
      {
        id: "match-colour",
        title: "Match rock colour to your home exterior",
        body: [
          "Light stone such as Crystal White Rock brightens shaded spaces and creates a crisp modern contrast. Dark rock such as Majestic Midnight gives a dramatic finish beside light siding, concrete and contemporary fencing.",
          "Natural tones like Rundle Rock are easier to blend with mature trees, wood fences and established neighbourhood landscapes.",
        ],
      },
      {
        id: "choose-size",
        title: "Choose the right size for the application",
        body: [
          "Smaller rock is easier to walk on and works well for borders, side yards and decorative beds. Larger rock creates more texture and stays visually prominent in open areas, but it can be less comfortable underfoot.",
          "For pathways, keep the surface compact and use proper edging. For display beds, larger pieces can reduce movement and create a stronger design statement.",
        ],
        bullets: ["20mm rock: borders, beds and walkable zones", "40mm rock: decorative coverage with more texture", "50–100mm rock: feature areas and erosion control"],
      },
      {
        id: "install-base",
        title: "Install fabric, edging and base correctly",
        body: [
          "A clean installation starts with removing weeds, shaping the grade and adding commercial landscape fabric where appropriate. Edging keeps rock contained and helps separate it from lawn or mulch.",
          "For drainage areas, avoid trapping water against the foundation. Keep grades moving away from the home and ask for advice if you are unsure which aggregate fits the job.",
        ],
      },
      {
        id: "maintenance",
        title: "Plan for long-term maintenance",
        body: [
          "Decorative rock does not need annual top-ups like mulch, but leaves, dust and wind-blown debris can collect over time. A blower, rake and occasional rinse will keep the finish looking clean.",
          "If the area receives heavy foot traffic, expect to rake the surface back into place occasionally.",
        ],
      },
    ],
    checklist: [
      "Use light rock to brighten shaded areas",
      "Use dark rock for high-contrast modern designs",
      "Pick smaller rock for walkable areas",
      "Install edging before delivery when possible",
      "Confirm delivery access for bulk orders",
    ],
    relatedLinks: [
      { label: "Shop Crystal White Rock", href: "/shop/crystal-white-rock" },
      { label: "Shop Rundle Rock 20mm", href: "/shop/rundle-rock-20mm" },
      { label: "Browse all decorative rock", href: "/shop" },
    ],
  },
  "spring-landscape-prep": {
    slug: "spring-landscape-prep",
    seoTitle: "Spring Landscape Prep Checklist for Edmonton Yards",
    metaDescription:
      "Prepare your Edmonton yard for spring with a practical checklist for cleanup, soil top-up, mulch refresh, edging, lawn prep and rental equipment.",
    keywords: [
      "spring landscape prep Edmonton",
      "yard cleanup checklist",
      "topsoil Edmonton",
      "garden mix delivery",
      "landscaping equipment rentals Edmonton",
    ],
    readingTime: "7 min read",
    intro: [
      "Spring is the best time to reset garden beds, repair lawn damage and prepare soil before the busy growing season. A clear order of work helps you avoid redoing the same area twice.",
      "This checklist is written for Edmonton homeowners planning a practical weekend project or preparing for a larger landscape refresh.",
    ],
    sections: [
      {
        id: "cleanup",
        title: "Start with cleanup and inspection",
        body: [
          "Remove winter debris, broken branches and leftover leaves before adding new material. Look for low spots, compacted areas, damaged edging and places where snow melt washed soil or rock out of position.",
          "This inspection helps you decide whether you need topsoil, garden mix, mulch, decorative rock or equipment before the weekend starts.",
        ],
      },
      {
        id: "soil",
        title: "Refresh soil before planting",
        body: [
          "Garden beds often benefit from a top-up of quality garden mix before planting annuals, perennials or vegetables. Spread material evenly, remove large clumps and avoid burying plant crowns too deeply.",
          "For lawn repairs, screened topsoil can help level shallow low spots and support seed germination when applied carefully.",
        ],
        bullets: ["Use garden mix for planting beds", "Use screened topsoil for lawn repair", "Do not smother existing grass with thick soil layers"],
      },
      {
        id: "mulch-rock",
        title: "Top up mulch or reset decorative rock",
        body: [
          "Mulch beds usually need a light refresh after winter. Rake old mulch flat first, then add enough new material to restore a consistent 2–3 inch depth.",
          "For decorative rock, rake displaced stone back into place, clear debris and add matching rock only where coverage is thin.",
        ],
      },
      {
        id: "rentals",
        title: "Use the right rental equipment for heavy work",
        body: [
          "The right tool can turn a full weekend of labour into a few focused hours. A landscape rake helps level soil, a sod roller improves seed or sod contact, and a compactor is useful when preparing a firm base for pavers or gravel areas.",
          "If you only need equipment for a few hours, call ahead to ask about availability and promotional rental discounts.",
        ],
      },
    ],
    checklist: [
      "Clear debris before adding new materials",
      "Repair edging and low spots first",
      "Top up garden beds with appropriate soil",
      "Refresh mulch to an even 2–3 inch depth",
      "Reserve rental equipment before peak weekends",
    ],
    relatedLinks: [
      { label: "Shop Garden Mix", href: "/shop/garden-mix" },
      { label: "Shop Topsoil", href: "/shop/topsoil" },
      { label: "View equipment rentals", href: "/rentals" },
    ],
  },
};

export function getBlogGuide(slug: string): BlogGuide | undefined {
  return BLOG_GUIDES[slug];
}