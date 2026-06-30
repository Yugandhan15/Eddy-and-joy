import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/fraunces/300.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500-italic.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingButtons } from "@/components/layout/floating-buttons";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Premium Hair Salon & Beauty Studio`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Eddy and Joy is a premium hair salon and beauty studio offering haircuts, styling, nails, facials and waxing in a calm, modern space. Book your appointment online.",
  keywords: [
    "Eddy and Joy",
    "premium salon",
    "hair salon",
    "beauty studio",
    "book appointment salon",
    "facial",
    "manicure pedicure",
  ],
  openGraph: {
    title: `${SITE.name} | Premium Hair Salon & Beauty Studio`,
    description:
      "A premium hair salon and beauty studio. Book haircuts, styling, nails, facials and waxing online.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Premium Hair Salon & Beauty Studio`,
    description: "Book your appointment at Eddy and Joy, a premium hair salon and beauty studio.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: SITE.name,
              image: `${SITE.url}/og-image.jpg`,
              telephone: SITE.phone,
              email: SITE.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: SITE.address,
              },
              url: SITE.url,
              sameAs: [SITE.instagram, SITE.facebook],
            }),
          }}
        />
      </body>
    </html>
  );
}
