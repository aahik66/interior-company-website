export function getOptimizedImageUrl(src, fallback = "/assets/projects/livingroom3.jpg") {
  if (!src) return fallback;
  return src;
}

export function handleImageError(e, fallback = "/assets/projects/livingroom3.jpg") {
  const target = e.target;
  if (!target.dataset.triedFallback) {
    target.dataset.triedFallback = "render";
    // If it is /uploads/..., try fetching directly from the Render backend
    if (target.src.includes("/uploads/")) {
      const filename = target.src.split("/uploads/").pop();
      target.src = `https://interior-company-website.onrender.com/uploads/${filename}`;
      return;
    }
  }
  if (target.dataset.triedFallback === "render") {
    target.dataset.triedFallback = "default";
    target.src = fallback;
  }
}
