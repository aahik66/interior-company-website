import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE } from "../../config/api";
import {
  HiOutlineCloudUpload,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePhotograph,
  HiOutlineLink,
} from "react-icons/hi";

export default function GalleryUploader({
  gallery = [],
  onChange,
  label = "Project Gallery Images",
}) {
  const { token } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Gallery array
  const list = Array.isArray(gallery)
    ? gallery
    : typeof gallery === "string"
    ? gallery.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const handleMultipleFiles = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch(`${API_BASE}/upload/multiple`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to upload gallery images");
      }

      // Append newly uploaded image URLs to existing gallery
      const updatedList = [...list, ...data.urls];
      onChange(updatedList);
    } catch (err) {
      setError(err.message || "Could not upload images");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChange([...list, urlInput.trim()]);
    setUrlInput("");
    setShowUrlInput(false);
  };

  const handleRemoveImage = (indexToRemove) => {
    const updated = list.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-3 text-xs sm:text-sm">
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-700 flex items-center gap-1.5">
          <HiOutlinePhotograph className="h-4 w-4 text-brand-500" />
          <span>{label}</span>
          <span className="text-[11px] text-slate-400 font-normal">({list.length} images)</span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm disabled:opacity-50"
          >
            <HiOutlineCloudUpload className="h-3.5 w-3.5" />
            <span>Upload from Computer</span>
          </button>

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition"
          >
            <HiOutlineLink className="h-3.5 w-3.5" />
            <span>Add Link</span>
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleMultipleFiles}
        className="hidden"
      />

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-2 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Uploading progress indicator */}
      {uploading && (
        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-3 flex items-center justify-center gap-2 text-xs text-brand-700 font-semibold">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          <span>Uploading photos from your computer to server...</span>
        </div>
      )}

      {/* Add Direct Web Link Form */}
      {showUrlInput && (
        <form onSubmit={handleAddUrl} className="flex gap-2 animate-fadeIn">
          <input
            type="text"
            placeholder="Paste image URL (e.g. https://... or /assets/project.jpg)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 p-2 text-xs font-mono focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs hover:bg-brand-600"
          >
            Add
          </button>
        </form>
      )}

      {/* Gallery Image Grid */}
      {list.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          {list.map((imgUrl, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={imgUrl}
                alt={`Gallery ${idx + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/projects/livingroom1.jpeg";
                }}
              />
              {/* Delete Overlay Button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute inset-0 bg-red-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                title="Remove photo"
              >
                <HiOutlineTrash className="h-5 w-5 text-red-300" />
              </button>
              <span className="absolute bottom-1 left-1 bg-black/60 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:border-brand-400 hover:bg-slate-50 transition"
        >
          <p className="text-xs text-slate-500">
            No gallery photos added yet. Click <span className="text-brand-600 font-bold">"Upload from Computer"</span> to select photos from your local disk or click <span className="font-semibold text-slate-700">"Add Link"</span>.
          </p>
        </div>
      )}
    </div>
  );
}
