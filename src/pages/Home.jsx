import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import Categories from "../components/Categories";
import Process from "../components/Process";
import VideoTestimonials from "../components/VideoTestimonials";
import Reviews from "../components/Reviews";
import Careers from "../components/Careers";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <main className="relative w-full bg-transparent text-gray-800">
      <Hero />
      <MarqueeStrip />
      <Categories />
      <Process />
      <VideoTestimonials />
      <Reviews />
      <Careers />
      <ContactSection />
    </main>
  );
}
