import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import {
  HiOutlinePlay,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineX,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { FaYoutube } from "react-icons/fa";

function extractYoutubeId(url) {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : "";
}

export default function VideosTab() {
  const { authFetch } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({
    clientName: "",
    quote: "",
    project: "",
    youtubeUrl: "",
    location: "Dhaka, Bangladesh",
    thumbnail: "",
  });

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/videos`);
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
      }
    } catch (err) {
      console.warn("Failed to fetch video testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete video testimonial "${title}"?`)) return;
    try {
      await authFetch(`${API_BASE}/videos/${id}`, {
        method: "DELETE",
      });
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete video");
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const ytid = extractYoutubeId(newVideo.youtubeUrl);
      const thumbnailToUse =
        newVideo.thumbnail ||
        (ytid ? `https://img.youtube.com/vi/${ytid}/hqdefault.jpg` : "/assets/projects/livingroom1.jpeg");

      const created = await authFetch(`${API_BASE}/videos`, {
        method: "POST",
        body: JSON.stringify({
          ...newVideo,
          thumbnail: thumbnailToUse,
        }),
      });
      setVideos([created, ...videos]);
      setIsAddOpen(false);
      setNewVideo({
        clientName: "",
        quote: "",
        project: "",
        youtubeUrl: "",
        location: "Dhaka, Bangladesh",
        thumbnail: "",
      });
    } catch (err) {
      alert(err.message || "Failed to add video");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Client Video Testimonials
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage YouTube client interviews displayed on the homepage video section.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-brand-500/20 transition hover:scale-105"
        >
          <HiOutlinePlus className="h-4 w-4" /> Add Video Interview
        </button>
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="mt-2 text-xs text-slate-500">Loading video testimonials...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-sm font-bold text-slate-700">No video testimonials found</p>
          <p className="text-xs text-slate-500 mt-1">Add a YouTube interview link to inspire potential clients.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v) => {
            const ytid = extractYoutubeId(v.youtubeUrl);
            const thumb =
              v.thumbnail ||
              (ytid ? `https://img.youtube.com/vi/${ytid}/hqdefault.jpg` : "/assets/projects/livingroom1.jpeg");

            return (
              <div
                key={v._id || v.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Thumbnail with Play Icon */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                  <img
                    src={thumb}
                    alt={v.quote}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = "/assets/projects/livingroom1.jpeg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                      <FaYoutube className="h-5 w-5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-white uppercase tracking-wider">
                    {v.location || "Dhaka"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-brand-600 line-clamp-1">
                      "{v.quote}"
                    </h4>
                    <p className="text-sm font-bold text-slate-900 mt-1">{v.clientName}</p>
                    <p className="text-xs text-slate-500">{v.project}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={v.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-red-600"
                    >
                      <HiOutlineExternalLink className="h-4 w-4" /> Watch on YouTube
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDelete(v._id, v.clientName)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Delete video"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Video Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Add Video Testimonial</h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline Quote *</label>
                <input
                  type="text"
                  required
                  placeholder='e.g. "DIMENSION COMPOSITION IS WHAT I TRUST"'
                  value={newVideo.quote}
                  onChange={(e) => setNewVideo({ ...newVideo, quote: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Name(s) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Tanvir & Sabrina Ahmed"
                  value={newVideo.clientName}
                  onChange={(e) => setNewVideo({ ...newVideo, clientName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Gulshan-2 Duplex Residence"
                  value={newVideo.project}
                  onChange={(e) => setNewVideo({ ...newVideo, project: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">YouTube Video URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={newVideo.youtubeUrl}
                  onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Gulshan, Dhaka"
                  value={newVideo.location}
                  onChange={(e) => setNewVideo({ ...newVideo, location: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-md shadow-brand-500/20"
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
