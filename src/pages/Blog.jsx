import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { API_BASE } from "../config/api";
import {
  HiOutlineSearch,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineArrowRight,
  HiOutlineChevronRight,
  HiOutlineSparkles,
  HiOutlineBookOpen,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Residential", "Commercial", "Budget Guides", "Materials"];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/blogs`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setBlogs(data);
        }
      } catch (err) {
        console.warn("Could not fetch blogs, using fallback data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.summary.toLowerCase().includes(search.toLowerCase()) ||
      (b.tags && b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs[0];

  const blogSchema = [
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
          "name": "Blog & Guides",
          "item": "https://dimensioncomposition.com/blog"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Dimension Composition Interior Design Blog",
      "description": "Expert architectural design insights, interior budgeting guides, and material selection tips in Dhaka, Bangladesh.",
      "url": "https://dimensioncomposition.com/blog"
    }
  ];

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800">
      <SEOHead
        title="Interior Design Blog & Budget Guides Dhaka | Dimension Composition"
        description="Expert architectural design insights, apartment interior budgeting guides, material selection tips, & duplex trends in Dhaka, Bangladesh."
        keywords="interior design blog dhaka, apartment decor guide bangladesh, duplex design tips, interior budget calculator, dimension composition blog"
        canonical="https://dimensioncomposition.com/blog"
        schema={blogSchema}
      />

      {/* 1. HERO BANNER */}
      <section className="relative isolate overflow-hidden bg-slate-900 pt-32 pb-16 text-white">
        <img
          src="/assets/projects/livingroom4.jpg"
          alt="Interior Design Blog & Guides"
          className="absolute inset-0 h-full w-full object-cover opacity-20 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 mb-4">
            <Link to="/" className="hover:text-brand-500 transition">
              Home
            </Link>
            <HiOutlineChevronRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-brand-500 font-semibold">Blog & Guides</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
              <HiOutlineBookOpen className="h-4 w-4" />
              Architectural Insights & Material Guides
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Interior Design <span className="text-brand-500">Blog & Budget Guides</span>
            </h1>
            <p className="mt-4 text-xs sm:text-base text-slate-300 leading-relaxed">
              Expert advice on luxury home interiors, apartment cost budgeting, material choices, and modern commercial office planning in Dhaka.
            </p>
          </div>

          {/* Search Bar & Category Filters */}
          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles by title, keywords, or topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-900/80 text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE SPOTLIGHT */}
      {!search && selectedCategory === "All" && featuredBlog && (
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px]">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow">
                Featured Article
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-3">
                  <span className="px-2.5 py-1 bg-brand-50 text-brand-700 rounded-md font-bold">
                    {featuredBlog.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4" /> {featuredBlog.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug hover:text-brand-600 transition">
                  <Link to={`/blog/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                </h2>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {featuredBlog.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <HiOutlineUser className="h-4 w-4 text-brand-500" />
                  <span>{featuredBlog.author}</span>
                </div>

                <Link
                  to={`/blog/${featuredBlog.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition"
                >
                  Read Full Article <HiOutlineArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. ARTICLES GRID */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredBlogs.length} posts
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading interior design articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 bg-white rounded-2xl border border-slate-200 text-center text-slate-500">
            No articles found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog._id || blog.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-2">
                      <span className="flex items-center gap-1">
                        <HiOutlineClock className="h-3.5 w-3.5 text-brand-500" />
                        {blog.readTime || "5 min read"}
                      </span>
                      <span>•</span>
                      <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition leading-snug line-clamp-2">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500 truncate max-w-[140px]">
                      By {blog.author || "Dimension Team"}
                    </span>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                    >
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. WHATSAPP & CONSULTATION BANNER */}
      <section className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Need Expert Architect Advice?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Have Questions About Your Apartment Design or Budget?
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Connect directly with our senior architects at <strong>Dimension Composition</strong> for a personalized floor plan layout consultation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/cost-calculator"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg transition hover:scale-105"
            >
              Calculate Interior Cost →
            </Link>
            <a
              href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20read%20your%20blog%20and%20would%20like%20a%20free%20design%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-lg transition hover:scale-105"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
