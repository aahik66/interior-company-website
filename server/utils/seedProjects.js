import Project from "../models/Project.js";

const defaultProjects = [
  // Bedroom (4)
  {
    title: "Serene Master Bedroom",
    image: "/assets/projects/bedroom3.jpeg",
    category: "Bedroom",
    description: "Layered linens, warm woods, and soft lighting for a calm, luxurious retreat tailored for relaxation.",
    duration: "40 Days",
    area: "420 sq.ft",
    location: "Gulshan Modern Residence",
    materials: ["Smoked Oak Paneling", "Belgian Linen Upholstery", "Warm 3000K LED Cove", "Brushed Brass Fixtures"],
    gallery: [
      "/assets/projects/bedroom3.jpeg",
      "/assets/projects/bedroom2.jpeg",
      "/assets/projects/bedroom6.jpeg",
      "/assets/projects/bedroom7.jpeg",
    ],
  },
  {
    title: "Coastal Suite",
    image: "/assets/projects/bedroom2.jpeg",
    category: "Bedroom",
    description: "Light, airy bedroom with coastal textures, sculptural bedside lighting, and panoramic floor-to-ceiling vistas.",
    duration: "35 Days",
    area: "380 sq.ft",
    location: "Banani Penthouse",
    materials: ["Natural White Oak", "Matte Brass Hardware", "Linen Sheer Drapery", "Micro-cement Headboard Wall"],
    gallery: [
      "/assets/projects/bedroom2.jpeg",
      "/assets/projects/bedroom3.jpeg",
      "/assets/projects/bedroom5.jpeg",
      "/assets/projects/bedroom7.jpeg",
    ],
  },
  {
    title: "Muted Loft Bedroom",
    image: "/assets/projects/bedroom7.jpeg",
    category: "Bedroom",
    description: "A pared-back loft bedroom with soft ambient lighting, custom acoustic wall slatting, and tailored bedding.",
    duration: "45 Days",
    area: "510 sq.ft",
    location: "Dhanmondi Modern Duplex",
    materials: ["Acoustic Walnut Slatting", "Fluted Glass Wardrobe Doors", "Concealed LED Profiles", "Handcrafted Wool Rug"],
    gallery: [
      "/assets/projects/bedroom7.jpeg",
      "/assets/projects/bedroom6.jpeg",
      "/assets/projects/bedroom5.jpeg",
      "/assets/projects/bedroom2.jpeg",
    ],
  },
  {
    title: "Structured Retreat Bedroom",
    image: "/assets/projects/bedroom6.jpeg",
    category: "Bedroom",
    description: "Crisp architectural lines with warm wood accents, balanced bedside sconces, and generous integrated wardrobe storage.",
    duration: "30 Days",
    area: "360 sq.ft",
    location: "Uttara Contemporary Villa",
    materials: ["Textured Bouclé Fabric", "Engineered Hardwood Flooring", "Blackened Steel Trim", "Dim-to-warm Downlights"],
    gallery: [
      "/assets/projects/bedroom6.jpeg",
      "/assets/projects/bedroom7.jpeg",
      "/assets/projects/bedroom3.jpeg",
      "/assets/projects/bedroom5.jpeg",
    ],
  },

  // Bridal Room (4)
  {
    title: "Bridal Elegance",
    image: "/assets/projects/bridal.jpeg",
    category: "Bridal Room",
    description: "Romantic palette with soft velvet upholstery, customized vanity mirror with Hollywood illumination, and graceful drapery.",
    duration: "45 Days",
    area: "460 sq.ft",
    location: "Bashundhara Luxury Estate",
    materials: ["Rose Quartz Marble Vanity", "Silk-Velvet Upholstery", "Rose Gold Trim", "CRI 95+ Studio Mirror Lighting"],
    gallery: [
      "/assets/projects/bridal.jpeg",
      "/assets/projects/bridal 2.jpeg",
      "/assets/projects/bridal3.jpeg",
      "/assets/projects/bridal5.jpeg",
    ],
  },
  {
    title: "Heritage Bridal Lounge",
    image: "/assets/projects/bridal5.jpeg",
    category: "Bridal Room",
    description: "Statement seating and layered textiles create a celebratory bridal suite combining timeless heritage with contemporary flair.",
    duration: "50 Days",
    area: "540 sq.ft",
    location: "Baridhara Diplomatic Zone",
    materials: ["Carved Teak Elements", "Hand-loomed Silk Textiles", "Crystal Chandelier", "Polished Travertine"],
    gallery: [
      "/assets/projects/bridal5.jpeg",
      "/assets/projects/bridal.jpeg",
      "/assets/projects/bridal4.jpeg",
      "/assets/projects/bridal1.jpeg",
    ],
  },
  {
    title: "Rose Gold Bridal Suite",
    image: "/assets/projects/bridal3.jpeg",
    category: "Bridal Room",
    description: "Warm metallic accents with blush textiles, bespoke accessory display island, and intimate private dressing salon.",
    duration: "40 Days",
    area: "410 sq.ft",
    location: "Banani Residential Tower",
    materials: ["Rose Gold Electroplated Metal", "Blush Cashmere Wall Coverings", "Illuminated Glass Vitrines", "Italian Marble Flooring"],
    gallery: [
      "/assets/projects/bridal3.jpeg",
      "/assets/projects/bridal.jpeg",
      "/assets/projects/bridal4.jpeg",
      "/assets/projects/bridal 2.jpeg",
    ],
  },
  {
    title: "Garden Bridal Retreat",
    image: "/assets/projects/bridal4.jpeg",
    category: "Bridal Room",
    description: "Light-filled bridal room with layered sheers, botanical organic tones, and an open layout celebrating natural day-lighting.",
    duration: "35 Days",
    area: "390 sq.ft",
    location: "Gulshan Lakefront Residence",
    materials: ["Natural Rattan Accents", "Calacatta Gold Countertops", "Frosted Privacy Glazing", "Dimmable Ambient Sconces"],
    gallery: [
      "/assets/projects/bridal4.jpeg",
      "/assets/projects/bridal3.jpeg",
      "/assets/projects/bridal1.jpeg",
      "/assets/projects/bridal5.jpeg",
    ],
  },

  // Kitchen (4)
  {
    title: "Minimal Chef's Kitchen",
    image: "/assets/projects/kitchen1.jpeg",
    category: "Kitchen",
    description: "Streamlined handle-less cabinetry with seamless waterfall stone island, concealed appliances, and high-performance task lighting.",
    duration: "55 Days",
    area: "350 sq.ft",
    location: "Gulshan Luxury Apartment",
    materials: ["Statuario Quartz Waterfall Island", "Fingerprint-resistant Matte Acrylic", "Integrated Bosch Appliances", "Anodized Aluminum Channel Pulls"],
    gallery: [
      "/assets/projects/kitchen1.jpeg",
      "/assets/projects/kitchen2.jpeg",
      "/assets/projects/kitchen5.jpeg",
      "/assets/projects/kitchen6.jpeg",
    ],
  },
  {
    title: "Warm Entertainer's Kitchen",
    image: "/assets/projects/kitchen2.jpeg",
    category: "Kitchen",
    description: "Open-plan kitchen with rich natural wood tones, dark graphite surfaces, wine chiller bar, and expansive breakfast counter.",
    duration: "50 Days",
    area: "420 sq.ft",
    location: "Bashundhara R/A Villa",
    materials: ["Natural Walnut Veneer", "Honed Nero Marquina Marble", "Matte Black Dornbracht Fixtures", "Under-cabinet Linear Lighting"],
    gallery: [
      "/assets/projects/kitchen2.jpeg",
      "/assets/projects/kitchen1.jpeg",
      "/assets/projects/kitchen6.jpeg",
      "/assets/projects/kitchen5.jpeg",
    ],
  },
  {
    title: "Walnut Chef Kitchen",
    image: "/assets/projects/kitchen6.jpeg",
    category: "Kitchen",
    description: "Rich walnut cabinetry, durable porcelain slab surfaces, spice pullouts, and high-efficiency induction cooking island.",
    duration: "60 Days",
    area: "480 sq.ft",
    location: "Dhanmondi Signature Suite",
    materials: ["American Walnut Timber", "12mm Sintered Stone Porcelain", "German Soft-close Blum Hardware", "Sculptural Pendant Lighting"],
    gallery: [
      "/assets/projects/kitchen6.jpeg",
      "/assets/projects/kitchen5.jpeg",
      "/assets/projects/kitchen2.jpeg",
      "/assets/projects/kitchen1.jpeg",
    ],
  },
  {
    title: "Social Dining Kitchen",
    image: "/assets/projects/kitchen5.jpeg",
    category: "Kitchen",
    description: "A dining-forward kitchen layout designed for seamless hosting, featuring an open breakfast bar and custom fluted glass pantry.",
    duration: "45 Days",
    area: "400 sq.ft",
    location: "Uttara Sector 4 Penthouse",
    materials: ["Fluted Glass Paneling", "Polished Quartzite Counters", "Warm Champagne Brass", "Recessed Magnetic Track Lighting"],
    gallery: [
      "/assets/projects/kitchen5.jpeg",
      "/assets/projects/kitchen6.jpeg",
      "/assets/projects/kitchen1.jpeg",
      "/assets/projects/kitchen2.jpeg",
    ],
  },

  // Living Room (4)
  {
    title: "Modern Living Room",
    image: "/assets/projects/living room.jpeg",
    category: "Living Room",
    description: "Tailored modular seating, curated contemporary art gallery wall, and balanced architectural lighting create an inviting salon.",
    duration: "60 Days",
    area: "650 sq.ft",
    location: "Gulshan Avenue Residence",
    materials: ["Full-grain Italian Leather", "Custom Fluted Wall Feature", "Micro-topped Floor Coating", "Architectural LED Spotlights"],
    gallery: [
      "/assets/projects/living room.jpeg",
      "/assets/projects/dining.jpeg",
      "/assets/projects/livingroom4.jpg",
      "/assets/projects/livingroom3.jpg",
    ],
  },
  {
    title: "Garden View Lounge",
    image: "/assets/projects/dining.jpeg",
    category: "Living Room",
    description: "Seamless indoor-outdoor living with indoor greenery planters, sculptural dining table, neutral upholstery, and terrace integration.",
    duration: "55 Days",
    area: "720 sq.ft",
    location: "Baridhara Lakeside Duplex",
    materials: ["Solid White Oak Dining Table", "Imported Travertine Side Tables", "Automated Sheer Drapery", "Low-glare Linear Washers"],
    gallery: [
      "/assets/projects/dining.jpeg",
      "/assets/projects/living room.jpeg",
      "/assets/projects/livingroom3.jpg",
      "/assets/projects/livingroom4.jpg",
    ],
  },
  {
    title: "Warm Gathering Living Room",
    image: "/assets/projects/livingroom4.jpg",
    category: "Living Room",
    description: "Plush sectional seating, accent fireplace feature, and warm acoustic paneling engineered for conversation and family comfort.",
    duration: "50 Days",
    area: "580 sq.ft",
    location: "Banani Luxury Residence",
    materials: ["Acoustic Fabric Wall Panels", "Linear Vapor Fireplace", "Textured Chenille Sofa", "Warm 2700K Ambient Sconces"],
    gallery: [
      "/assets/projects/livingroom4.jpg",
      "/assets/projects/livingroom3.jpg",
      "/assets/projects/living room.jpeg",
      "/assets/projects/dining.jpeg",
    ],
  },
  {
    title: "Sunlit Studio Lounge",
    image: "/assets/projects/livingroom3.jpg",
    category: "Living Room",
    description: "Open-plan lounge anchored by clean geometric lines, high ceilings, natural textures, and bespoke floating media joinery.",
    duration: "45 Days",
    area: "530 sq.ft",
    location: "Dhanmondi Lakefront Villa",
    materials: ["Floating Veneer Console", "Terrazzo Side Elements", "Brushed Bronze Accents", "Bespoke Modular Seating"],
    gallery: [
      "/assets/projects/livingroom3.jpg",
      "/assets/projects/livingroom4.jpg",
      "/assets/projects/dining.jpeg",
      "/assets/projects/living room.jpeg",
    ],
  },
];

export async function seedProjects() {
  let inserted = 0;
  let updated = 0;
  const allowedTitles = defaultProjects.map((p) => p.title);
  await Project.deleteMany({ title: { $nin: allowedTitles } });

  for (const project of defaultProjects) {
    const res = await Project.updateOne(
      { title: project.title },
      { $set: project },
      { upsert: true }
    );
    if (res.upsertedCount) {
      inserted += 1;
    } else if (res.modifiedCount) {
      updated += 1;
    }
  }
  if (inserted > 0 || updated > 0) {
    console.log(`Seeded ${inserted} and refreshed ${updated} default projects with rich specs & galleries`);
  }
}
