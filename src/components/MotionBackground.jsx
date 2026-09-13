export default function MotionBackground() {
  // Ultra-clean architectural background: no distracting floating wireframes or spinning cubes
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" />
  );
}
