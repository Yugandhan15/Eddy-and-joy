export const SITE = {
  name: "Eddy and Joy",
  tagline: "Premium Hair Salon & Beauty Studio",
  url: "https://eddyandjoy.com",
  phone: "+91 9578338299",
  phoneHref: "tel:+919578338299",
  email: "yuganj0@gmail.com",
  whatsapp: "https://wa.me/+919578338299",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  googleMaps: "https://maps.google.com/",
  address: "12 Lakeview Avenue, Ambattur, Chennai, Tamil Nadu 600053",
  hours: [
    { day: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 9:00 PM" },
    { day: "Sunday", time: "10:00 AM – 6:00 PM" },
  ],
  stats: {
    yearsExperience: 12,
    happyClients: 8400,
    projectsCompleted: 15200,
    rating: 4.9,
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
