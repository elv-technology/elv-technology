'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";
import { socialLinks } from "./header/nav-links";
import { DesktopNav } from "./header/desktop-nav";
import { MobileMenu } from "./header/mobile-menu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname() || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Color logic
  const isDark = isScrolled || isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-[110]">
          <div className="flex items-center justify-between gap-8 lg:gap-12">
            <div className="flex items-center gap-4 lg:gap-8">
              {/* Logo */}
              <Link href="/" className="flex flex-col items-center justify-center group shrink-0">
                <LogoIcon className={`w-[60px] sm:w-[70px] h-auto transition-transform duration-300 group-hover:scale-105 pointer-events-none select-none ${isDark ? "text-slate-900 dark:text-white" : "text-white"}`} />
                <span className="text-[8px] sm:text-[9px] font-bold font-space-grotesk tracking-[0.15em] uppercase mt-2 pointer-events-none select-none">
                  {/* E-L-V */}
                  <span style={{ color: isDark ? '#0f172a' : '#ffffff' }}>E</span>
                  <span style={{ color: isDark ? '#0f172a' : '#ffffff' }}>LV </span>
                  {/* T-E-C-H-N-O-L-O-G-Y */}
                  <span style={{ color: isDark ? '#0f172a' : '#ffffff' }}>T</span>
                  <span style={{ color: isDark ? '#0f172a' : '#ffffff' }}>ECHNOLOGY </span>
                  {/* S-O-L-U-T-I-O-N-S */}
                  <span style={{ color: isDark ? '#0f172a' : '#ffffff' }}>S</span>
                  <span style={{ color: isDark ? '#0f172a' : '#ffffff' }}>OLUTIONS</span>
                </span>
              </Link>

              <DesktopNav pathname={pathname} isDark={isDark} />
            </div>

            {/* Contact Us button + Mobile toggle */}
            <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-2.5 mr-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all duration-300 hover:text-[#D61F26] hover:scale-110 ${isDark ? "text-slate-900 dark:text-white" : "text-white"}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#D61F26] px-6 py-2.5 text-[13px] font-bold font-space-grotesk uppercase tracking-wide text-white whitespace-nowrap transition-all duration-300 hover:bg-[#D61F26]/90 hover:shadow-lg hover:shadow-[#D61F26]/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Contact Us
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`xl:hidden flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${isDark ? "text-slate-900 dark:text-white" : "text-white"}`}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="relative h-5 w-5">
                  <Menu
                    className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMobileMenuOpen
                      ? "opacity-0 rotate-90 scale-0"
                      : "opacity-100 rotate-0 scale-100"
                      }`}
                  />
                  <X
                    className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMobileMenuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-0"
                      }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu pathname={pathname} isMobileMenuOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
