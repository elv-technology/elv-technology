'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/ui/logo";
import {
  Menu,
  X,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Solutions",
    href: "/solutions",
    submenu: [
      {
        label: "Security & Surveillance",
        href: "/solutions/security-surveillance",
        items: [
          { label: "Security & Surveillance", href: "/solutions/security-surveillance#security-surveillance-system" },
          { label: "Access Control & Time Attendance", href: "/solutions/security-surveillance#access-control" },
          { label: "Gate Barrier", href: "/solutions/security-surveillance#gate-barrier" },
          { label: "Nurse Call System", href: "/solutions/security-surveillance#nurse-call" },
          { label: "Queue Management System", href: "/solutions/security-surveillance#queue-management" },
          { label: "Disabled Toilet Alarm System", href: "/solutions/security-surveillance#disabled-alarm" },
        ]
      },
      {
        label: "Audio Visual Solutions",
        href: "/solutions/audio-visual",
        items: [
          { label: "Music Systems & BGM", href: "/solutions/audio-visual#music-bgm" },
          { label: "Indoor Video Wall", href: "/solutions/audio-visual#video-wall" },
          { label: "Conference Room", href: "/solutions/audio-visual#conference-room" },
          { label: "Meeting & Boardroom", href: "/solutions/audio-visual#meeting-boardroom" },
          { label: "Digital Signage", href: "/solutions/audio-visual#digital-signage" },
          { label: "LED Screen", href: "/solutions/audio-visual#led-screen" },
          { label: "Control Systems", href: "/solutions/audio-visual#control-systems" },
        ]
      },
      {
        label: "Network & Communications",
        href: "/solutions/network-communications",
        items: [
          { label: "Structured Cabling", href: "/solutions/network-communications#structured-cabling" },
          { label: "Wireless Network", href: "/solutions/network-communications#wireless-network" },
          { label: "Audio Video Intercom", href: "/solutions/network-communications#intercom" },
          { label: "Two Way Radio", href: "/solutions/network-communications#radio" },
          { label: "IP Phones", href: "/solutions/network-communications#ip-phones" },
          { label: "IPTV / SMATV", href: "/solutions/network-communications#iptv-smatv" },
          { label: "IT Equipment", href: "/solutions/network-communications#it-equipment" },
        ]
      },
      {
        label: "Home Automation",
        href: "/solutions/home-automation",
        items: [
          { label: "Home Automation", href: "/solutions/home-automation#automation" },
          { label: "Lighting Control", href: "/solutions/home-automation#lighting-control" },
        ]
      },
    ],
  },
  { label: "Partners & Clients", href: "/partners-clients" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/elv_technology_solutions/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/elvtechnology2020",
    icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/elv-technology-solutions-abu-dhabi/",
    icon: Linkedin,
  },
  {
    label: "X",
    href: "https://x.com/elv_technology",
    icon: XIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/971547922800",
    icon: MessageCircle,
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Track hovered category for desktop flyout
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  // Track open nested category in mobile
  const [mobileNestedOpen, setMobileNestedOpen] = useState<string | null>(null);

  const pathname = usePathname() || "";

  useEffect(() => {
    setMounted(true);
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
    setOpenDropdown(null);
    setMobileSubmenuOpen(null);
    setMobileNestedOpen(null);
    setActiveCategory(null);
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

              {/* Desktop nav */}
              <nav className="hidden xl:flex items-center gap-4 lg:gap-6">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.submenu &&
                      link.submenu.some((sub) => pathname === sub.href)) || (link.href.startsWith("/case-studies") && pathname.startsWith("/case-studies"));

                  if (link.submenu) {
                    return (
                      <div
                        key={link.label}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => {
                          setOpenDropdown(null);
                          setActiveCategory(null);
                        }}
                      >
                        <Link
                          href={link.href}
                          className={`relative flex items-center gap-1.5 px-1 py-2 text-[13px] font-bold font-space-grotesk uppercase tracking-normal whitespace-nowrap transition-colors duration-300 ${isActive
                            ? "text-[#D61F26]"
                            : isDark ? "text-slate-900 dark:text-white hover:text-[#D61F26]" : "text-white hover:text-[#D61F26]"
                            }`}
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-3 w-3 shrink-0 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180" : ""
                              }`}
                          />
                        </Link>

                        {/* Dropdown Container */}
                        <div
                          className={`absolute top-full left-0 pt-2 transition-all duration-300 ${openDropdown === link.label
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                            }`}
                        >
                          <div className="bg-background rounded-xl border border-border shadow-xl shadow-foreground/5 p-2 flex">

                            {/* Level 1 Menu (Categories) */}
                            <div className="w-64 shrink-0">
                              {link.submenu.map((sub) => (
                                <div
                                  key={sub.label}
                                  onMouseEnter={() => setActiveCategory(sub.label)}
                                  className="relative"
                                >
                                  <Link
                                    href={sub.href}
                                    className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-[13px] transition-all duration-200 ${activeCategory === sub.label
                                      ? "bg-accent/5 text-accent"
                                      : "text-foreground/70 hover:bg-accent/5 hover:text-accent"
                                      }`}
                                  >
                                    {sub.label}
                                    {sub.items && <ChevronRight className="h-3 w-3 opacity-50" />}
                                  </Link>
                                </div>
                              ))}
                            </div>

                            {/* Level 2 Menu (Sub-items Flyout) */}
                            {link.submenu.some(s => s.label === activeCategory && s.items) && (
                              <div className="w-64 border-l border-border pl-2 ml-1">
                                {link.submenu.find(s => s.label === activeCategory)?.items?.map((item) => (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    className="block rounded-lg px-4 py-2.5 text-[13px] text-foreground/70 transition-all duration-200 hover:bg-accent/5 hover:text-accent"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`relative px-1 py-2 text-[13px] font-bold font-space-grotesk uppercase tracking-normal whitespace-nowrap transition-colors duration-300 group ${isActive
                        ? "text-[#D61F26]"
                        : isDark ? "text-slate-900 dark:text-white hover:text-[#D61F26]" : "text-white hover:text-[#D61F26]"
                        }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#D61F26] rounded-full transition-all duration-300 ${isActive
                          ? "w-4"
                          : "w-0 group-hover:w-4"
                          }`}
                      />
                    </Link>
                  );
                })}
              </nav>
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

      {/* Mobile menu overlay - sibling to header, high z-index */}
      <div
        className={`xl:hidden fixed inset-0 z-[90] bg-white dark:bg-slate-950 transition-all duration-500 ${isMobileMenuOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <div className="px-6 pt-32 pb-8 h-full overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;

              if (link.submenu) {
                return (
                  <div key={link.label} className="flex flex-col">
                    <div 
                      className="flex items-center justify-between rounded-xl px-5 py-3.5 transition-all duration-300"
                      style={{
                        transitionDelay: isMobileMenuOpen
                          ? `${i * 50}ms`
                          : "0ms",
                        transform: isMobileMenuOpen
                          ? "translateX(0)"
                          : "translateX(-20px)",
                        opacity: isMobileMenuOpen ? 1 : 0,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-[16px] font-medium flex-1 ${isActive
                          ? "text-[#D61F26]"
                          : "text-foreground/70 hover:text-foreground"
                          }`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubmenuOpen(
                            mobileSubmenuOpen === link.label ? null : link.label
                          )
                        }
                        className="p-2 -mr-2 text-foreground/50 hover:text-[#D61F26] transition-colors"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${mobileSubmenuOpen === link.label ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${mobileSubmenuOpen === link.label
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="pl-6 py-1 flex flex-col gap-1">
                        {link.submenu.map((sub) => (
                          <div key={sub.label}>
                            {sub.items ? (
                              <>
                                <div className="flex items-center justify-between rounded-lg px-2 py-1 text-sm text-foreground/80 transition-colors hover:bg-accent/5">
                                  <Link
                                    href={sub.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex-1 px-2 py-1.5 hover:text-[#D61F26]"
                                  >
                                    {sub.label}
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => setMobileNestedOpen(mobileNestedOpen === sub.label ? null : sub.label)}
                                    className="p-2 text-foreground/50 hover:text-[#D61F26]"
                                  >
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileNestedOpen === sub.label ? "rotate-180" : ""}`} />
                                  </button>
                                </div>

                                {/* Nested Accordion Content */}
                                <div className={`overflow-hidden transition-all duration-300 ${mobileNestedOpen === sub.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                  <div className="pl-4 border-l border-border/50 ml-4 py-1 flex flex-col gap-1">
                                    {sub.items.map(item => (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="rounded-lg px-4 py-2 text-xs text-foreground/60 transition-colors hover:text-[#D61F26] hover:bg-accent/5 block"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <Link
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block rounded-lg px-4 py-2.5 text-sm text-foreground/60 transition-colors hover:text-[#D61F26] hover:bg-accent/5"
                              >
                                {sub.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-xl px-5 py-3.5 text-[16px] font-medium transition-all duration-300 ${isActive
                    ? "bg-accent/5 text-[#D61F26]"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${i * 50}ms`
                      : "0ms",
                    transform: isMobileMenuOpen
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    opacity: isMobileMenuOpen ? 1 : 0,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-border pt-6">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-full bg-[#D61F26] px-6 py-3.5 text-sm font-black font-montserrat uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#D61F26]/90 shadow-lg shadow-[#D61F26]/20"
            >
              Contact Us
            </Link>
          </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-[#D61F26] hover:border-[#D61F26]"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
