export type GalleryCategory = "Hair" | "Beauty" | "Facial" | "Waxing" | "Nails";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  image: string;
  alt: string;
  size: "tall" | "wide" | "square";
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    category: "Hair",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop",
    alt: "Stylist finishing a precision haircut",
    size: "tall",
  },
  {
    id: "g2",
    category: "Nails",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop",
    alt: "Close-up of a fresh gel manicure",
    size: "square",
  },
  {
    id: "g3",
    category: "Facial",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop",
    alt: "Client receiving a relaxing facial",
    size: "wide",
  },
  {
    id: "g4",
    category: "Hair",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
    alt: "Hair colour application in progress",
    size: "square",
  },
  {
    id: "g5",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=1000&auto=format&fit=crop",
    alt: "Eyebrow threading session",
    size: "tall",
  },
  {
    id: "g6",
    category: "Waxing",
    image: "https://images.unsplash.com/photo-1570172619644-7c4eb1b27c69?q=80&w=1000&auto=format&fit=crop",
    alt: "Skin prep before a waxing treatment",
    size: "square",
  },
  {
    id: "g7",
    category: "Hair",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
    alt: "Finished blow-dry styling",
    size: "wide",
  },
  {
    id: "g8",
    category: "Nails",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000&auto=format&fit=crop",
    alt: "Pedicure soak and care",
    size: "square",
  },
  {
    id: "g9",
    category: "Facial",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop",
    alt: "Facial cleansing ritual",
    size: "tall",
  },
  {
    id: "g10",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000&auto=format&fit=crop",
    alt: "Salon interior and styling chairs",
    size: "wide",
  },
  {
    id: "g11",
    category: "Hair",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000&auto=format&fit=crop",
    alt: "Stylist consultation before a cut",
    size: "square",
  },
  {
    id: "g12",
    category: "Waxing",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
    alt: "Post-treatment skin care",
    size: "square",
  },
];

export const GALLERY_FILTERS: ("All" | GalleryCategory)[] = [
  "All",
  "Hair",
  "Beauty",
  "Facial",
  "Waxing",
  "Nails",
];
