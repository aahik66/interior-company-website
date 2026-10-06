import SEOHead from "../components/SEOHead";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import Categories from "../components/Categories";
import Process from "../components/Process";
import VideoTestimonials from "../components/VideoTestimonials";
import Reviews from "../components/Reviews";
import Careers from "../components/Careers";
import FAQSection, { faqData } from "../components/FAQSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": ["HomeAndConstructionBusiness", "ProfessionalService"],
      "name": "Dimension Composition",
      "alternateName": "Dimension Composition Interior Architecture",
      "image": "https://dimensioncomposition.com/assets/logo.png",
      "@id": "https://dimensioncomposition.com/#organization",
      "url": "https://dimensioncomposition.com",
      "telephone": "+8801739835017",
      "priceRange": "৳৳৳",
      "currenciesAccepted": "BDT",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, bKash, Nagad",
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
      "areaServed": [
        {
          "@type": "Country",
          "name": "Bangladesh"
        },
        {
          "@type": "City",
          "name": "Dhaka"
        },
        {
          "@type": "City",
          "name": "Chittagong"
        },
        {
          "@type": "City",
          "name": "Sylhet"
        }
      ],
      "knowsAbout": [
        "Residential Interior Design",
        "Commercial Office Interior Design",
        "Luxury Duplex Home Architecture",
        "Modern Apartment Interior",
        "Modular Kitchen Design",
        "Hospitality & Restaurant Interior",
        "Turnkey Interior Execution"
      ],
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
      "description": "Leading luxury residential and commercial interior design & architectural planning firm in Dhaka, serving clients across all of Bangladesh."
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Turnkey Residential & Commercial Interior Design in Bangladesh",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Dimension Composition"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Bangladesh"
      },
      "description": "Comprehensive turnkey interior design for luxury duplex homes, apartments, modular kitchens, and corporate offices across Dhaka and all over Bangladesh."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }
  ];

  return (
    <main className="relative w-full bg-gray-50 text-gray-800">
      <SEOHead
        title="Best Interior Design Company in Bangladesh | Dimension Composition"
        description="Dimension Composition is a leading interior design company in Bangladesh. Turnkey luxury residential duplex, flat, & commercial corporate office interior solutions across Dhaka & nationwide."
        keywords="interior design company in bangladesh, best interior firm in dhaka, luxury duplex interior design bangladesh, modern apartment interior, commercial office interior dhaka, restaurant interior firm bd, turnkey interior solution, dimension composition"
        canonical="https://dimensioncomposition.com/"
        schema={homeSchema}
      />
      <Hero />
      <MarqueeStrip />
      <Categories />
      <Process />
      <VideoTestimonials />
      <Reviews />
      <FAQSection />
      <Careers />
      <ContactSection />
    </main>
  );
}
