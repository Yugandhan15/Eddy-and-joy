export type ServiceCategory = "Hair" | "Nails" | "Beauty" | "Facial" | "Waxing";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    slug: "haircut",
    name: "Signature Haircut",
    category: "Hair",
    description: "Precision cutting tailored to your face shape and lifestyle.",
    longDescription:
      "A consultation-led cut from our senior stylists, finished with a wash and blow-dry. We shape every cut around how your hair falls naturally, so it grows out as well as it walks out.",
    price: "From ₹599",
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "blow-dry-styling",
    name: "Blow-dry & Styling",
    category: "Hair",
    description: "Salon-grade volume and shine for everyday or special occasions.",
    longDescription:
      "Wash, blow-dry and style using heat-protected techniques and premium products, finished with your choice of sleek, voluminous or soft-wave looks.",
    price: "From ₹499",
    duration: "40 min",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "root-touch-up",
    name: "Root Touch-up",
    category: "Hair",
    description: "Seamless colour matching to keep regrowth invisible.",
    longDescription:
      "Our colourists match your existing shade precisely and apply along the root line only, keeping colour fresh between full appointments.",
    price: "From ₹899",
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "deep-conditioning",
    name: "Deep Conditioning Therapy",
    category: "Hair",
    description: "Intensive moisture and repair treatment for stressed hair.",
    longDescription:
      "A restorative mask treatment infused with steam therapy to repair dryness, frizz and damage, leaving hair visibly softer and stronger.",
    price: "From ₹799",
    duration: "35 min",
    image:
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "basic-manicure",
    name: "Classic Manicure",
    category: "Nails",
    description: "Shape, cuticle care and polish for naturally healthy hands.",
    longDescription:
      "Nail shaping, cuticle grooming, hand massage and your choice of polish finish — a quiet ritual for hands that do a lot of work.",
    price: "From ₹399",
    duration: "30 min",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "basic-pedicure",
    name: "Classic Pedicure",
    category: "Nails",
    description: "Soothing soak, exfoliation and polish for refreshed feet.",
    longDescription:
      "A warm soak, callus care, exfoliation and massage followed by precise shaping and polish — fully resets tired feet.",
    price: "From ₹499",
    duration: "40 min",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "gel-nail-polish",
    name: "Gel Nail Polish",
    category: "Nails",
    description: "Chip-resistant, high-shine colour that lasts for weeks.",
    longDescription:
      "Long-wear gel polish cured under LED light for a glossy finish that resists chipping for up to three weeks.",
    price: "From ₹699",
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "eyebrow-threading",
    name: "Eyebrow Threading",
    category: "Beauty",
    description: "Precise, hair-by-hair shaping using the traditional thread method.",
    longDescription:
      "A precise, gentle shaping technique that defines your natural brow line with clean, even results and minimal irritation.",
    price: "From ₹99",
    duration: "15 min",
    image:
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "body-waxing",
    name: "Body Waxing",
    category: "Waxing",
    description: "Smooth, long-lasting hair removal using gentle, skin-safe wax.",
    longDescription:
      "Full or part body waxing using low-temperature wax formulated for sensitive skin, leaving skin smooth for weeks.",
    price: "From ₹299",
    duration: "30–60 min",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "face-clean-up",
    name: "Face Clean-up",
    category: "Facial",
    description: "Deep cleansing and exfoliation for instantly fresher skin.",
    longDescription:
      "A relaxing 30-minute clean-up that lifts dirt and dead skin, leaving your complexion brighter ahead of any occasion.",
    price: "From ₹499",
    duration: "30 min",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "basic-facial",
    name: "Signature Facial",
    category: "Facial",
    description: "A full facial ritual for deep nourishment and glow.",
    longDescription:
      "Cleansing, steam, extraction, massage and mask layered into a full facial ritual designed to nourish and visibly brighten skin.",
    price: "From ₹999",
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1570172619644-7c4eb1b27c69?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "d-tan-treatment",
    name: "D-Tan Treatment",
    category: "Facial",
    description: "Targeted treatment to lift sun tan and even out skin tone.",
    longDescription:
      "A de-tanning ritual for face and neck (or body) that lifts sun damage and evens out tone, leaving skin visibly brighter.",
    price: "From ₹599",
    duration: "30 min",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Hair",
  "Nails",
  "Beauty",
  "Facial",
  "Waxing",
];
