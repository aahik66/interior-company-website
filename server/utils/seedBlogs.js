import Blog from "../models/Blog.js";

const initialBlogs = [
  {
    title: "Top 10 Interior Design Trends in Dhaka for 2026",
    slug: "top-10-interior-design-trends-dhaka-2026",
    author: "Arch. Ashikur Rahman",
    category: "Residential",
    image: "/assets/projects/livingroom4.jpg",
    summary: "Discover the latest luxury residential interior trends shaping Gulshan, Banani, Uttara, and Bashundhara homes in 2026—from biophilic accent walls to concealed smart illumination.",
    content: `
      <h2>The Evolution of Luxury Living in Dhaka</h2>
      <p>As Dhaka's urban landscape accelerates, luxury apartment homeowners are prioritizing biophilic wellness, acoustic insulation, and seamless modular joinery. In 2026, interior design in Bangladesh moves beyond simple decorative layering toward architectural spatial harmony.</p>
      
      <h3>1. Warm Minimalist Neutral Palettes</h3>
      <p>Gone are the heavy dark wood finishes of the past decade. Modern apartments in Gulshan and Banani favor warm beige, muted champagne fluted panels, and natural greige plaster finishes that reflect natural ambient sunlight.</p>

      <h3>2. Concealed Smart LED Architectural Coves</h3>
      <p>Recessed COB LED strip lighting integrated into ceiling coves and floor baseboards provides glare-free illumination. Dimmable smart lighting setups allow homeowners to switch from high-productivity daylight to warm evening dinner ambiance effortlessly.</p>

      <h3>3. High-Gloss & Matte Hybrid Modular Kitchens</h3>
      <p>Kitchens in Dhaka duplexes have evolved into social centers. Combining matte HPL charcoal cabinetry with white quartz waterfall island counters creates an inviting, durable cooking environment that withstands heavy Asian cuisine usage.</p>

      <h3>4. Acoustic Upholstered Headboard Wall Features</h3>
      <p>Master bedrooms feature floor-to-ceiling upholstered fabric paneled headboards with concealed brass trims, providing superior sound isolation from traffic noise while exuding 5-star hotel luxury.</p>

      <p>At <strong>Dimension Composition</strong>, our architectural design team crafts bespoke interior solutions tailored to your floor plan and lifestyle requirements.</p>
    `,
    tags: ["Trends", "Residential", "Dhaka Interior", "Luxury Homes"],
    readTime: "6 min read",
    seoTitle: "Top 10 Interior Design Trends in Dhaka for 2026 | Dimension Composition",
    seoDescription: "Discover 2026 luxury interior design trends in Dhaka. From biophilic features to acoustic bedrooms & modular kitchens in Gulshan, Banani, & Uttara.",
    seoKeywords: "interior design trends dhaka 2026, luxury interior dhaka, apartment interior bangladesh, gulshan duplex decor",
    isPublished: true,
  },
  {
    title: "Apartment Interior Design Cost Guide in Dhaka: Budget Breakdown",
    slug: "apartment-interior-design-cost-guide-dhaka",
    author: "Eng. Farhan Tanvir",
    category: "Budget Guides",
    image: "/assets/projects/kitchen1.jpeg",
    summary: "Complete financial guide and square-foot cost breakdown for 1200 sq.ft to 3000 sq.ft residential interior execution in Dhaka.",
    content: `
      <h2>Understanding Interior Design Budgeting in Bangladesh</h2>
      <p>Planning an interior design project for your new apartment requires clear itemized budgeting. Costs vary depending on material selection, board grade (Gorjan Plywood vs Particle Board), hardware brands (Blum vs local fittings), and lighting quality.</p>
      
      <h3>Square Foot Cost Rates in Dhaka (2026)</h3>
      <ul>
        <li><strong>Standard Package:</strong> BDT 900 - 1,400 / sq.ft</li>
        <li><strong>Premium Package:</strong> BDT 1,500 - 2,400 / sq.ft</li>
        <li><strong>Luxury Turnkey Package:</strong> BDT 2,500 - 4,500+ / sq.ft</li>
      </ul>

      <h3>Key Cost Factors</h3>
      <p>1. <strong>Woodwork & Joinery (45% of total budget):</strong> Custom master bedroom wardrobes, foyer shoe units, TV cabinets, and modular kitchen units form the largest chunk of investment.</p>
      <p>2. <strong>False Ceiling & Lighting (15%):</strong> Moisture-resistant gypsum board ceiling with warm LED strip lights, spot lights, and decorative magnetic tracks.</p>
      <p>3. <strong>Civil & Electrical Modifications (15%):</strong> Tile work, plumbing fittings, wall paint (Asian Paints / Berger Silk), and power point extensions.</p>
      <p>4. <strong>Furniture & Soft Furnishings (25%):</strong> Custom sofa sets, marble dining tables, sheer curtains, and balcony turfing.</p>

      <p>Want an exact itemized cost estimation for your flat? Use our online <a href="/cost-calculator">Interior Cost Calculator</a> to estimate your figures instantly.</p>
    `,
    tags: ["Cost Guide", "Budgeting", "Interior Price Dhaka", "Apartment Fitout"],
    readTime: "7 min read",
    seoTitle: "Apartment Interior Design Cost Guide in Dhaka | Itemized Budget",
    seoDescription: "Learn apartment interior design cost per sq ft in Dhaka. Breakdown of woodwork, ceiling, lighting, & furniture costs for 1200-3000 sq ft flats.",
    seoKeywords: "apartment interior cost dhaka, interior design price per sq ft bangladesh, home decor cost gulshan, interior calculator dhaka",
    isPublished: true,
  },
  {
    title: "Designing Modern Executive Offices for High Productivity in Dhaka",
    slug: "designing-modern-executive-offices-dhaka",
    author: "Dimension Composition Team",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    summary: "How modern corporate offices in Motijheel, Gulshan, and Uttara utilize ergonomic open layouts, acoustic video conference rooms, and brand identity interiors.",
    content: `
      <h2>The Workplace Revolution in Commercial Spaces</h2>
      <p>Modern corporate offices in Dhaka are abandoning traditional cubicle layouts in favor of open collaboration zones, acoustic private phone booths, and state-of-the-art conference facilities.</p>
      
      <h3>Essential Elements of Commercial Interior Design</h3>
      <p>1. <strong>Ergonomic Workstations:</strong> Height-adjustable desk pods equipped with wire management channels ensure employee comfort and reduce workplace fatigue.</p>
      <p>2. <strong>Soundproof Conference Rooms:</strong> Double-glazed glass partitions combined with acoustic ceiling baffles prevent sound leaks during high-stakes video meetings.</p>
      <p>3. <strong>Brand Culture Foyer:</strong> Reception zones featuring 3D backlit company logos, biophilic vertical green walls, and welcoming lounge seating leave a lasting impression on visiting clients.</p>
    `,
    tags: ["Commercial", "Office Interior", "Corporate Dhaka", "Workspace Design"],
    readTime: "5 min read",
    seoTitle: "Modern Corporate Office Interior Design in Dhaka | Commercial Solutions",
    seoDescription: "Explore corporate office interior design solutions in Gulshan & Banani, Dhaka. Executive chambers, acoustic conference rooms & ergonomic desks.",
    seoKeywords: "office interior firm dhaka, corporate interior bangladesh, executive office design, commercial space planner dhaka",
    isPublished: true,
  }
];

export async function seedBlogs() {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(initialBlogs);
      console.log("Seeded initial blog articles successfully!");
    }
  } catch (err) {
    console.warn("Blog seed check skipped or error:", err.message);
  }
}
