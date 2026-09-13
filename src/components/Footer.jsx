import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Cost Calculator", href: "/cost-calculator" },
  { label: "Overview", href: "/about#overview" },
  { label: "Our Team", href: "/about#team" },
  { label: "Quality Policy", href: "/about#quality-policy" },
  { label: "Careers", href: "/about#career" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-400 font-bold">Dimension Composition</p>
          <p className="text-base sm:text-lg font-semibold text-white">Modern interiors that feel calm, intentional, and beautifully lived in.</p>
          <div className="flex items-center gap-3 pt-1">
            {[
              { Icon: FaInstagram, href: "https://www.instagram.com", label: "Instagram" },
              { Icon: FaWhatsapp, href: "https://wa.me/8801700000000", label: "WhatsApp" },
              { Icon: HiOutlineMail, href: "mailto:contact.dimensioncomposition@gmail.com", label: "Email" },
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

        <div className="grid grid-cols-2 gap-6 sm:gap-12">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">Contact</p>
            <div className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-gray-300">
              <p className="break-all">contact.dimensioncomposition@gmail.com</p>
              <p>+880 1700-000000</p>
              <p className="text-xs text-gray-400">Gulshan-2 / Banani, Dhaka</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center sm:items-start gap-2 px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <p>© {new Date().getFullYear()} Dimension Composition. All rights reserved.</p>
          <p className="text-gray-500">Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}



