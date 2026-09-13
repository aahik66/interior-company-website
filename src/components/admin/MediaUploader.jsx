import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE } from "../../config/api";
import {
  HiOutlineCloudUpload,
  HiOutlineLink,
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineX,
  HiOutlineCheck,
} from "react-icons/hi";

export default function MediaUploader({
  label,
  value,
  onChange,
  accept = "image/*",
  isVideo = false,
  helperText = "",
}) {
  const { token } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [activeMode, setActiveMode] = useState("upload"); // "upload" | "link"

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/upload/single`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "File upload failed");
      }

      // Update parent value with new uploaded URL
      onChange(data.url);
    } catch (err) {
      setError(err.message || "Could not upload file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleClear = () => {
    onChange("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2 text-xs sm:text-sm">
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-700 flex items-center gap-1.5">
          {isVideo ? (
            <HiOutlineVideoCamera className="text-brand-500 h-4 w-4" />
          ) : (
            <HiOutlinePhotograph className="text-brand-500 h-4 w-4" />
          )}
          <span>{label}</span>
        </label>

        {/* Tab switch between Local Disk & Web Link */}
        <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveMode("upload")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeMode === "upload"
                ? "bg-white text-slate-900 shadow-sm font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            📁 Local Disk Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("link")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeMode === "link"
                ? "bg-white text-slate-900 shadow-sm font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            🔗 Web Link
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-2 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Mode 1: Upload from Computer */}
      {activeMode === "upload" ? (
        <div className="space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              uploading
                ? "border-brand-400 bg-brand-50/30"
                : "border-slate-300 hover:border-brand-500 hover:bg-slate-50/80 bg-white"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />

            {uploading ? (
              <div className="flex flex-col items-center justify-center gap-1.5 py-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
                <p className="text-xs font-semibold text-brand-600">
                  Uploading from your computer to server...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 py-1">
                <HiOutlineCloudUpload className="h-6 w-6 text-brand-500" />
                <p className="text-xs font-semibold text-slate-800">
                  Click to choose {isVideo ? "video" : "image"} from your Computer / Local Disk
                </p>
                <p className="text-[11px] text-slate-400">
                  Supports {isVideo ? "MP4, WEBM, MOV (up to 150MB)" : "JPG, PNG, WEBP (up to 20MB)"}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Mode 2: Direct Web URL */
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <HiOutlineLink className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              isVideo
                ? "https://.../video.mp4 or /assets/video.mp4"
                : "https://.../image.jpg or /assets/image.jpg"
            }
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-brand-500 bg-white"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-red-500"
              title="Clear"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Live Preview of Current Value */}
      {value && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            {isVideo ? (
              <video
                src={value}
                controls
                className="h-14 w-24 object-cover rounded-lg border border-slate-300 bg-black"
              />
            ) : (
              <img
                src={value}
                alt="Uploaded Preview"
                className="h-14 w-20 object-cover rounded-lg border border-slate-300 bg-white flex-shrink-0"
                onError={(e) => {
                  e.target.src = "/assets/projects/livingroom1.jpeg";
                }}
              />
            )}
            <div className="overflow-hidden">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mb-0.5">
                <HiOutlineCheck className="h-3 w-3" /> Selected Media
              </span>
              <p className="text-[11px] font-mono text-slate-600 truncate max-w-xs">{value}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition flex-shrink-0"
            title="Remove media"
          >
            <HiOutlineX className="h-4 w-4" />
          </button>
        </div>
      )}

      {helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}
    </div>
  );
}
