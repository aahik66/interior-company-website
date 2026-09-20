import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { API_BASE } from "../config/api";
import {
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineChevronRight,
  HiOutlineArrowLeft,
  HiOutlineShare,
  HiOutlineBookmark,
} from "react-icons/hi";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function BlogSingle() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/blogs/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);

          // Fetch related articles
          const relRes = await fetch(`${API_BASE}/blogs`);
          if (relRes.ok) {
            const relData = await relRes.json();
            if (Array.isArray(relData)) {
              setRelated(relData.filter((b) => b.slug !== slug).slice(0, 3));
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch blog detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Loading article details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <p className="text-sm text-slate-600 mt-2">The article you are looking for does not exist or has been moved.</p>
        <Link
          to="/blog"
          className="mt-6 px-6 py-2.5 rounded-full bg-brand-500 text-white font-bold text-sm shadow hover:bg-brand-600 transition"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const pageTitle = blog.seoTitle || `${blog.title} | Dimension Composition`;
  const pageDesc = blog.seoDescription || blog.summary;
  const canonicalUrl = `https://dimensioncomposition.com/blog/${blog.slug}`;

  const articleSchema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://dimensioncomposition.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://dimensioncomposition.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": blog.title,
          "item": canonicalUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "image": [blog.image],
      "datePublished": blog.createdAt || new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": blog.author || "Dimension Composition"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Dimension Composition",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dimensioncomposition.com/assets/logo.png"
        }
      },
      "description": pageDesc
    }
  ];

  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800">
      <SEOHead
        title={pageTitle}
        description={pageDesc}
        keywords={blog.seoKeywords || blog.tags?.join(", ")}
        canonical={canonicalUrl}
        ogImage={blog.image}
        ogType="article"
        schema={articleSchema}
      />

      {/* HEADER HERO */}
      <section className="relative isolate bg-slate-900 pt-32 pb-16 text-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 mb-6">
            <Link to="/" className="hover:text-brand-500 transition">
              Home
            </Link>
            <HiOutlineChevronRight className="h-3.5 w-3.5 text-slate-500" />
            <Link to="/blog" className="hover:text-brand-500 transition">
              Blog
            </Link>
            <HiOutlineChevronRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-brand-500 font-semibold truncate max-w-[200px] sm:max-w-none">
              {blog.category}
            </span>
          </nav>

          <span className="inline-block bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            {blog.category}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <HiOutlineUser className="h-4 w-4 text-brand-400" />
              <span>{blog.author || "Dimension Composition Editorial"}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <HiOutlineClock className="h-4 w-4 text-brand-400" />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
            <span>•</span>
            <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT BODY */}
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 -mt-8 relative z-20 pb-20">
        <article className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          {/* Main Cover Image */}
          <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-8 bg-slate-100">
            <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
          </div>

          {/* Short Lead Summary */}
          <div className="bg-slate-50 border-l-4 border-brand-500 p-4 sm:p-6 rounded-r-xl mb-8 text-sm sm:text-base font-medium text-slate-700 leading-relaxed italic">
            "{blog.summary}"
          </div>

          {/* Formatted HTML Article Content */}
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Embedded WhatsApp Callout */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <h4 className="font-extrabold text-base sm:text-lg">Designing a New Home or Renovation?</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Get layout planning guidance & cost estimation from senior architects.
              </p>
            </div>
            <a
              href={`https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20read%20your%20article%20'${encodeURIComponent(
                blog.title
              )}'%20and%20need%20design%20advice.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow transition hover:scale-105 whitespace-nowrap"
            >
              <FaWhatsapp className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Share Buttons & Tags */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tags:</span>
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 text-[#1877F2] hover:bg-slate-200 transition"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 text-[#0A66C2] hover:bg-slate-200 transition"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </article>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Related Interior Design Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="aspect-[16/10] w-full object-cover rounded-xl mb-3"
                    />
                    <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition text-sm line-clamp-2 mt-1">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-brand-500 mt-4 block">Read Guide →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
