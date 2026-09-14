export default function Logo({
  className = "h-11 w-11",
  rounded = "rounded-full",
  alt = "Dimension Composition Logo",
  imgClassName = "p-0.5",
}) {
  return (
    <div
      className={`logo-shine-wrapper ${rounded} ${className} bg-white shadow-sm border border-gray-100/80 flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      title="Dimension Composition"
    >
      <img
        src="/assets/logo.png"
        alt={alt}
        className={`w-full h-full object-contain ${rounded} ${imgClassName}`}
      />
    </div>
  );
}
