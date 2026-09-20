import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHead = ({
  title = "Best Interior Firm in Dhaka | Dimension Composition",
  description = "Dimension Composition is recognized as the best interior firm in Dhaka, Bangladesh. Specializing in luxury residential duplex, apartment, office, & commercial interior design.",
  keywords = "best interior firm in dhaka, best interior design company in dhaka, top interior designer bangladesh, luxury interior design dhaka, duplex home design, office interior firm, dimension composition",
  canonical = "https://dimensioncomposition.com/",
  ogImage = "https://dimensioncomposition.com/assets/logo.png",
  ogType = "website",
  schema = null,
}) => {
  const siteName = "Dimension Composition";
  const formattedSchema = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data JSON-LD */}
      {formattedSchema.map((item, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
