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
    faqs: [
      {
        question: "What landscape supplies do you stock in Edmonton?",
        answer:
          "We carry decorative rock, mulch, screened topsoil, garden mix, road crush, grey limestone, play sand, wash round rock and rental equipment such as landscape rakes, sod rollers, lawn mowers and ground compactors.",
      },
      {
        question: "Do you deliver landscape supplies across Edmonton?",
        answer:
          "Yes. We offer local delivery across Edmonton and surrounding areas. You can also pick up from our yard at 1404 78 Ave NW with your own truck or trailer.",
      },
      {
        question: "How do I estimate how much rock or mulch to order?",
        answer:
          "Measure length × width × depth in feet, then divide by 27 to get cubic yards. Order a little extra to account for settling and edges. Use our mulch calculator guide or contact us for help.",
      },
      {
        question: "Which decorative rock is best for Edmonton winters?",
        answer:
          "All our decorative rock handles freeze-thaw cycles well. Rundle Rock and Crystal White Rock are especially popular for durability, while Majestic Midnight and Purple Sparkle work well for modern designs.",
      },
      {
        question: "Can I rent equipment for only a few hours?",
        answer:
          "Absolutely. If you only need a tool for a few hours, call or email ahead and we can discuss short-term rental options for local customers.",
      },
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
  "landscaping-rock-edmonton-white-rock-guide": {
    slug: "landscaping-rock-edmonton-white-rock-guide",
    seoTitle: "Landscaping Rock Edmonton — White Rock & Decorative Stone",
    metaDescription:
      "Landscaping rock in Edmonton: compare white rock, limestone, Rundle and wash rock, sizes, coverage and prices. Pickup or delivery from City Landscape Supplies Depot.",
    keywords: [
      "landscaping rock edmonton",
      "white rock landscaping supplies",
      "city landscaping",
      "landscape rock edmonton",
      "white decorative rock edmonton",
      "landscape supplies edmonton",
    ],
    readingTime: "7 min read",
    intro: [
      "Landscaping rock is one of the most popular upgrades for Edmonton yards — it handles our freeze-thaw cycles, needs no annual top-up and keeps weeds down when installed over fabric.",
      "This guide covers the landscaping rock Edmonton homeowners buy most, with a close look at white rock landscaping supplies, how much you need, and how City Landscaping customers get it delivered fast.",
    ],
    sections: [
      {
        id: "popular-rock",
        title: "The most popular landscaping rock in Edmonton",
        body: [
          "Most Edmonton projects use one of five rock families. Each has its own colour, texture and best use, so start by matching the rock to the job rather than the photo.",
        ],
        bullets: [
          "Crystal White Rock — bright, modern and ideal for front beds",
          "Limestone (20–100mm) — neutral grey-white, great value for large areas",
          "Rundle Rock — natural earth tones that blend with mature yards",
          "Wash Rock — rounded river stone, comfortable underfoot and good for drainage",
          "Majestic Midnight & Purple Spark — dark, high-contrast feature stone",
        ],
      },
      {
        id: "white-rock",
        title: "White rock landscaping supplies: what to know",
        body: [
          "White rock reflects light, brightens shaded north-facing beds and pairs well with dark siding, black edging and modern planters. It is the go-to choice for crisp, contemporary curb appeal.",
          "Because white stone shows debris more than darker rock, install quality landscape fabric underneath and use solid edging to keep soil and mulch from mixing in. A leaf blower keeps it looking fresh through the season.",
        ],
        bullets: [
          "Use 20mm for walkable areas and borders",
          "Use 40mm+ for open beds and around downspouts",
          "Combine with Majestic Midnight for a two-tone design",
        ],
      },
      {
        id: "how-much",
        title: "How much landscaping rock do you need?",
        body: [
          "Measure length × width in feet, multiply by depth in feet (2–3 inches is typical, so 0.17–0.25 ft), then divide by 27 to get cubic yards. One cubic yard of 20mm rock covers roughly 100–120 sq ft at 3 inches deep.",
          "Add about 10% for uneven grades. Our quote cart calculates yardage for you — add products and adjust the quantity with the + and − buttons.",
        ],
      },
      {
        id: "install",
        title: "Installing landscaping rock the right way",
        body: [
          "Remove sod and weeds, grade the area so water flows away from your foundation, lay commercial landscape fabric, set edging, then spread rock evenly with a rake. For heavier jobs, our ground compactor and landscape rake rentals make prep faster.",
        ],
      },
      {
        id: "pickup-delivery",
        title: "Pickup and delivery across Edmonton",
        body: [
          "City Landscape Supplies Depot, at 1404 78 Ave NW, stocks landscaping rock in bulk for pickup seven days a week, with delivery across Edmonton, Sherwood Park, St. Albert and surrounding areas. Request a quote and we'll confirm price and delivery timing.",
        ],
      },
    ],
    checklist: [
      "Pick rock colour to match your home exterior",
      "Choose size by use: walkable vs. decorative",
      "Calculate cubic yards and add 10%",
      "Install fabric and edging before delivery",
      "Confirm driveway access for the delivery truck",
    ],
    relatedLinks: [
      { label: "Shop Crystal White Rock", href: "/shop/crystal-white-rock" },
      { label: "Shop Limestone 20–30mm", href: "/shop/limestone-20-30mm" },
      { label: "Shop Wash Rock 20mm", href: "/shop/wash-rocks-20mm" },
      { label: "Rent a ground compactor", href: "/rentals" },
      { label: "Landscape supplies Edmonton guide", href: "/blog/landscape-supplies-edmonton-guide" },
    ],
    faqs: [
      { question: "What is the best landscaping rock for Edmonton winters?", answer: "Limestone, Rundle Rock and wash rock all handle freeze-thaw cycles well. Angular rock like limestone locks together and moves less; rounded wash rock drains best." },
      { question: "Does white landscaping rock stay white?", answer: "Yes, if installed over landscape fabric with solid edging. Occasional blowing or rinsing removes dust and leaves." },
      { question: "How much does landscaping rock cost in Edmonton?", answer: "Price depends on rock type and size. Request a quote online or call (780) 490-0306 for current bulk pricing and delivery rates." },
      { question: "Do you deliver landscaping rock?", answer: "Yes — we deliver across Edmonton and nearby communities, or you can pick up from our yard at 1404 78 Ave NW." },
    ],
  },
  "fall-yard-prep-edmonton": {
    slug: "fall-yard-prep-edmonton",
    seoTitle: "Fall Yard Prep in Edmonton — Get Your Landscape Winter-Ready",
    metaDescription:
      "Edmonton fall yard checklist: mulch beds, top dress lawns, protect rock gardens and plan spring landscape supplies before the ground freezes.",
    keywords: ["fall yard prep edmonton", "winterize garden edmonton", "fall mulching", "landscape supplies edmonton", "garden supplies edmonton"],
    readingTime: "6 min read",
    intro: [
      "Edmonton winters are long, and the work you do in October and November decides how your yard looks in May. A few hours of fall prep protects plants from freeze-thaw damage, keeps beds tidy and gives you a head start on spring.",
      "This checklist covers the jobs that matter most for Alberta yards, and the landscape supplies that make each one easier.",
    ],
    sections: [
      {
        id: "mulch",
        title: "Add a fresh layer of mulch before the freeze",
        body: [
          "Mulch acts like a blanket for perennial roots. A 2–3 inch layer of cedar, pine or nugget bark mulch keeps soil temperature steadier and reduces frost heave, which can push shallow-rooted plants out of the ground.",
          "Wait until the top inch of soil is cool but not frozen, then spread mulch evenly and keep it a few inches away from tree trunks and stems.",
        ],
        bullets: ["Cedar mulch: long-lasting and aromatic", "Nugget bark: chunky, slow to break down", "Coloured mulch: holds colour through winter"],
      },
      {
        id: "lawn",
        title: "Top dress and level your lawn",
        body: [
          "Fall is a great time to fill low spots with a thin layer of screened topsoil. Grass roots keep growing until the ground freezes, so a light top dressing settles in over winter and gives a smoother lawn in spring.",
          "Keep top dressing under half an inch at a time so you don't smother the grass.",
        ],
      },
      {
        id: "rock",
        title: "Protect rock beds and pathways",
        body: [
          "Clear leaves from decorative rock now — wet leaves left all winter stain light rock and break down into soil where weeds can root. A leaf blower on low works best for white and limestone beds.",
          "Check edging along walkways. If rock has spilled onto the lawn, rake it back and top up thin spots so snow shovelling doesn't scrape fabric bare.",
        ],
      },
      {
        id: "plan",
        title: "Plan spring projects now",
        body: [
          "Measure the beds, patios and paths you want to redo next year while it's fresh in your mind. Knowing your square footage makes spring quotes faster, and you can book materials and rental equipment before the busy season.",
        ],
      },
    ],
    checklist: [
      "Spread 2–3 inches of mulch on perennial beds",
      "Top dress low lawn spots with topsoil",
      "Blow leaves off decorative rock",
      "Fix edging and top up thin rock areas",
      "Measure spring projects and request a quote",
    ],
    relatedLinks: [
      { label: "Shop mulch, rock & soil", href: "/shop" },
      { label: "How to calculate mulch", href: "/blog/how-to-calculate-mulch" },
      { label: "Spring landscape prep", href: "/blog/spring-landscape-prep" },
      { label: "Request a quote", href: "/contact" },
    ],
    faqs: [
      { question: "When should I mulch in Edmonton in the fall?", answer: "Late September through early November, once soil has cooled but before it freezes solid." },
      { question: "Can landscape supplies be delivered in late fall?", answer: "Yes — as long as roads and driveways are accessible we deliver across Edmonton. Call (780) 490-0306 to confirm timing." },
      { question: "Should I remove leaves from rock beds?", answer: "Yes. Leaves trap moisture, stain light rock and create a base for weeds to grow in spring." },
    ],
  },
  "topsoil-vs-garden-mix": {
    slug: "topsoil-vs-garden-mix",
    seoTitle: "Topsoil vs Garden Mix — Which Soil Do You Need? (Edmonton)",
    metaDescription:
      "Topsoil or garden mix? Learn the difference, which soil to use for lawns, raised beds and gardens in Edmonton, and how much to order by the cubic yard.",
    keywords: ["topsoil vs garden mix", "topsoil edmonton", "garden soil edmonton", "raised bed soil", "landscape materials"],
    readingTime: "5 min read",
    intro: [
      "Topsoil and garden mix look similar in a pile, but they do very different jobs. Picking the wrong one can mean a patchy lawn or vegetables that never quite take off.",
      "Here's a plain-language breakdown of each soil and the projects it suits best in Edmonton yards.",
    ],
    sections: [
      {
        id: "topsoil",
        title: "What is topsoil?",
        body: [
          "Screened topsoil is the upper layer of natural soil, sifted to remove rocks and debris. It's the right choice for building up grade, filling holes, levelling lawns and laying a base under new sod or seed.",
        ],
        bullets: ["New sod or seeded lawns", "Grading and filling low spots", "Backfilling around foundations (with proper slope)"],
      },
      {
        id: "garden-mix",
        title: "What is garden mix?",
        body: [
          "Garden mix blends topsoil with compost and other organic matter for more nutrients and better structure. It holds moisture while still draining, which flowers, shrubs and vegetables love.",
        ],
        bullets: ["Raised beds and vegetable gardens", "Flower beds and new shrub plantings", "Refreshing tired, compacted beds"],
      },
      {
        id: "how-much",
        title: "How much soil to order",
        body: [
          "Multiply length × width in feet, then multiply by depth in inches divided by 12. Divide the result by 27 to get cubic yards. For new lawns plan on 4–6 inches of topsoil; for raised beds fill to the full bed depth with garden mix.",
          "Example: a 4 ft × 8 ft raised bed, 12 inches deep, needs about 1.2 cubic yards.",
        ],
      },
    ],
    checklist: ["Lawn or grading → topsoil", "Flowers, veggies, raised beds → garden mix", "Calculate cubic yards and add 10%", "Book pickup or delivery"],
    relatedLinks: [
      { label: "Shop topsoil & garden mix", href: "/shop" },
      { label: "Rent a sod roller", href: "/rentals" },
      { label: "Landscape supplies Edmonton guide", href: "/blog/landscape-supplies-edmonton-guide" },
      { label: "Request a quote", href: "/contact" },
    ],
    faqs: [
      { question: "Can I use garden mix for my lawn?", answer: "You can, but it's usually more than a lawn needs. Screened topsoil is the more economical base for sod and seed." },
      { question: "Can I plant vegetables in topsoil only?", answer: "They will grow, but garden mix gives better nutrients and moisture balance for higher yields." },
      { question: "How much soil fits in a pickup truck?", answer: "Most half-ton pickups safely carry about 1 cubic yard of soil. For larger orders, delivery is easier." },
    ],
  },
  "mulch-types-guide": {
    slug: "mulch-types-guide",
    seoTitle: "Cedar, Pine, Bark or Coloured Mulch? Edmonton Mulch Guide",
    metaDescription:
      "Compare cedar, pine, nugget bark, black and red mulch. Learn which mulch lasts longest, looks best and suits Edmonton gardens, with depth and coverage tips.",
    keywords: ["types of mulch", "cedar mulch edmonton", "black mulch", "red mulch", "garden landscaping supplies"],
    readingTime: "5 min read",
    intro: [
      "Mulch is one of the easiest ways to make a yard look finished while saving water and cutting down on weeds. But with cedar, pine, bark and coloured options, which one should you pick?",
    ],
    sections: [
      {
        id: "cedar",
        title: "Cedar mulch",
        body: ["Cedar has a natural reddish-brown tone and a fresh scent. It breaks down slowly, so it lasts longer between top-ups, and it's a popular all-round choice for Edmonton flower beds."],
      },
      {
        id: "pine",
        title: "Pine mulch",
        body: ["Pine mulch is lighter in colour and budget-friendly. It's great for large areas, tree rings and natural-looking beds."],
      },
      {
        id: "bark",
        title: "Nugget bark",
        body: ["Larger bark chunks stay put in wind and rain and take years to break down. They work well around shrubs and on gentle slopes."],
      },
      {
        id: "coloured",
        title: "Black and red mulch",
        body: ["Coloured mulches give a bold, modern look. Black makes green foliage pop; red pairs well with brick and warm-toned homes. Both hold colour well through a season."],
      },
      {
        id: "depth",
        title: "How deep to spread mulch",
        body: ["Aim for 2–3 inches. One cubic yard covers roughly 100–160 square feet at that depth. Keep mulch a few inches away from stems and tree trunks to prevent rot."],
      },
    ],
    checklist: ["Choose mulch by look and lifespan", "Pull weeds and edge beds first", "Spread 2–3 inches deep", "Top up yearly as needed"],
    relatedLinks: [
      { label: "Shop mulch", href: "/shop" },
      { label: "How to calculate mulch", href: "/blog/how-to-calculate-mulch" },
      { label: "Rent a wheelbarrow", href: "/rentals" },
      { label: "Request a quote", href: "/contact" },
    ],
    faqs: [
      { question: "Which mulch lasts the longest?", answer: "Nugget bark and cedar mulch break down the slowest, so they need fewer top-ups." },
      { question: "Is coloured mulch safe for gardens?", answer: "Our coloured mulches use dyes made for landscaping. For vegetable gardens, many people prefer natural cedar or pine." },
      { question: "Do I need landscape fabric under mulch?", answer: "It's optional. Fabric helps in weedy areas, but mulch alone works well in planted beds and lets organic matter reach the soil." },
    ],
  },
};

export function getBlogGuide(slug: string): BlogGuide | undefined {
  return BLOG_GUIDES[slug];
}