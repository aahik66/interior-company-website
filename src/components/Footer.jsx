import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { useSettings } from "../context/SettingsContext";
import Logo from "./Logo";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Cost Calculator", href: "/cost-calculator" },
  { label: "Blog & Guides", href: "/blog" },
  { label: "Overview", href: "/about#overview" },
  { label: "Our Team", href: "/about#team" },
  { label: "Quality Policy", href: "/about#quality-policy" },
  { label: "Careers", href: "/about#career" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const { settings } = useSettings();

  const phoneMain = settings?.phoneNumber || "+880 1739-835017";
  const phoneSecondary = settings?.secondaryPhoneNumber || "+880 1601-370090";
  const whatsappNum = settings?.whatsappNumber || "8801739835017";
  const emailAddr = settings?.email || "contact@dimensioncomposition.com";
  const addressText =
    settings?.address ||
    "House -204, Port Road, Block-A, Bashundhara Riverview, Hashnabad, Keraniganj, Dhaka-1310";

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <div className="flex items-center gap-3">
            <Logo className="h-11 w-11" rounded="rounded-full" />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-brand-400 font-bold leading-tight">Dimension</p>
              <p className="text-sm font-bold tracking-wider text-white leading-tight">Composition</p>
            </div>
          </div>
          <p className="text-base sm:text-lg font-semibold text-white">Modern interiors that feel calm, intentional, and beautifully lived in.</p>
          <div className="flex items-center gap-3 pt-1">
            {[
              { Icon: FaInstagram, href: settings?.instagramUrl || "https://www.instagram.com", label: "Instagram" },
              { Icon: FaWhatsapp, href: `https://wa.me/${whatsappNum}`, label: "WhatsApp" },
              { Icon: HiOutlineMail, href: `mailto:${emailAddr}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 text-white transition hover:-translate-y-0.5 hover:bg-brand-500"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">Navigate</p>
            <div className="mt-3 sm:mt-4 flex flex-col gap-2 text-xs sm:text-sm text-gray-300">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="transition hover:text-brand-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">Studio & Contact</p>
            <div className="mt-3 sm:mt-4 space-y-2.5 text-xs sm:text-sm text-gray-300">
              <a href={`mailto:${emailAddr}`} className="block break-all hover:text-brand-400 transition">
                {emailAddr}
              </a>
              <div className="flex flex-col gap-1 text-xs sm:text-sm">
                <a href={`tel:${phoneMain.replace(/\s+/g, "")}`} className="hover:text-brand-400 transition font-medium">
                  {phoneMain} <span className="text-[11px] text-brand-400">(Main)</span>
                </a>
                <a href={`tel:${phoneSecondary.replace(/\s+/g, "")}`} className="hover:text-brand-400 transition font-medium">
                  {phoneSecondary} <span className="text-[11px] text-gray-400">(Hotline)</span>
                </a>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                {addressText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <p>© {new Date().getFullYear()} Dimension Composition. All rights reserved.</p>
          <p className="text-gray-400">
            Designed & Developed by{" "}
            <a
              href="https://www.facebook.com/ashik5795"
              target="_blank"
              rel="noreferrer"
              className="text-brand-400 font-semibold hover:underline transition"
            >
              Ashikur Rahman
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}



