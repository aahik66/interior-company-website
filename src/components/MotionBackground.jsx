export default function MotionBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Signature Geometric Plexus Architectural Texture Overlay */}
      <div
        className="absolute inset-0 bg-repeat bg-top"
        style={{
          backgroundImage: "url('/assets/bg-texture.png')",
          backgroundSize: "1100px auto",
          opacity: 0.55,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
