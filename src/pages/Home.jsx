import SEOHead from "../components/SEOHead";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import Categories from "../components/Categories";
import Process from "../components/Process";
import VideoTestimonials from "../components/VideoTestimonials";
import Reviews from "../components/Reviews";
import Careers from "../components/Careers";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "Dimension Composition",
      "image": "https://dimensioncomposition.com/assets/logo.png",
      "@id": "https://dimensioncomposition.com/#organization",
      "url": "https://dimensioncomposition.com",
      "telephone": "+8801739835017",
      "priceRange": "৳৳৳",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "House -204, Port Road, Block-A, Bashundhara Riverview, Hashnabad",
        "addressLocality": "Keraniganj, Dhaka",
        "postalCode": "1310",
        "addressCountry": "BD"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.6850,
        "longitude": 90.4125
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "48",
        "bestRating": "5",
        "worstRating": "1"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      },
      "sameAs": [
        "https://www.facebook.com/ashik5795",
        "https://www.instagram.com"
      ],
      "description": "Premier luxury interior design and architectural planning firm in Dhaka, Bangladesh."
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Luxury Residential & Commercial Interior Design in Dhaka",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Dimension Composition"
      },
      "areaServed": {
        "@type": "City",
        "name": "Dhaka"
      },
      "description": "Custom interior architecture, duplex home design, modern apartment decor, modular kitchen, and luxury office interior execution."
    }
  ];

  return (
    <main className="relative w-full bg-gray-50 text-gray-800">
      <SEOHead
        title="Best Interior Firm in Dhaka | Dimension Composition"
        description="Dimension Composition is recognized as the best interior firm in Dhaka, Bangladesh. Specializing in luxury residential duplex, apartment, office, & commercial interior design in Gulshan, Banani, Uttara, & Bashundhara."
        keywords="best interior firm in dhaka, best interior design company in dhaka, top interior designer bangladesh, luxury interior design dhaka, duplex home design, office interior firm, dimension composition"
        canonical="https://dimensioncomposition.com/"
        schema={homeSchema}
      />
      <Hero />
      <MarqueeStrip />
      <Categories />
      <Process />
      <VideoTestimonials />
      <Reviews />
      <Careers />
      <ContactSection />
    </main>
  );
}
