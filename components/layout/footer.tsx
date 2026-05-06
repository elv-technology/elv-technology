"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/ui/logo";
import {
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

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

const elvSystems = [
  { label: "Security and Surveillance", href: "/solutions/security-surveillance#security-surveillance-system" },
  { label: "Access Control & Time Attendance", href: "/solutions/security-surveillance#access-control" },
  { label: "Gate Barrier System", href: "/solutions/security-surveillance#gate-barrier" },
  { label: "Nurse Call System", href: "/solutions/security-surveillance#nurse-call" },
  { label: "Queue Management System", href: "/solutions/security-surveillance#queue-management" },
  { label: "Disabled Toilet Alarm System", href: "/solutions/security-surveillance#disabled-alarm" },
];

const avSolutions = [
  { label: "Music and BGM System", href: "/solutions/audio-visual#music-bgm" },
  { label: "Indoor Video Wall", href: "/solutions/audio-visual#video-wall" },
  { label: "Conference Room", href: "/solutions/audio-visual#conference-room" },
  { label: "Meeting Room & Board Room", href: "/solutions/audio-visual#meeting-boardroom" },
  { label: "Digital Signage", href: "/solutions/audio-visual#digital-signage" },
  { label: "LED Screen", href: "/solutions/audio-visual#led-screen" },
  { label: "Control Systems", href: "/solutions/audio-visual#control-systems" },
];

const networkComms = [
  { label: "Structured Cabling Solutions", href: "/solutions/network-communications#structured-cabling" },
  { label: "Wireless Network Solutions", href: "/solutions/network-communications#wireless-network" },
  { label: "Audio Video Intercom", href: "/solutions/network-communications#intercom" },
  { label: "2-Way Radio Solutions", href: "/solutions/network-communications#radio" },
  { label: "IP Phone", href: "/solutions/network-communications#ip-phones" },
  { label: "IPTV / SMATV", href: "/solutions/network-communications#iptv-smatv" },
  { label: "IT Equipment's", href: "/solutions/network-communications#it-equipment" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
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

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-black font-montserrat text-white mb-5 uppercase tracking-[0.2em]">
        {title}
      </h3>
      <ul className="flex flex-col gap-1.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[12px] text-slate-200 font-medium transition-all duration-300 hover:text-white hover:translate-x-1 inline-block"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        }
      },
      { threshold: 0.05 }
    );

    const elements = footerRef.current?.querySelectorAll("[data-footer-animate]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="bg-slate-500 text-slate-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10 lg:gap-6">
          {/* Company Info */}
          <div
            className="lg:col-span-2"
            data-footer-animate
            style={{ animationDelay: "0.1s" }}
          >
            <Link href="/" className="inline-flex flex-col items-center gap-1 mb-5 group shrink-0">
              <LogoIcon className="w-[100px] sm:w-[120px] h-auto transition-transform duration-300 group-hover:scale-105 pointer-events-none select-none text-white" />
              <span className="text-[11px] sm:text-[12px] font-black font-montserrat text-white tracking-[0.2em] mt-3 pointer-events-none select-none uppercase">
                ELV TECHNOLOGY SOLUTIONS
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white mb-5 max-w-xs">
              ELV Technology Solutions, one of the best ELV & Audio-Visual
              Integrators in Abu Dhabi.
            </p>

            <div className="flex flex-col gap-3 mb-5">
              <a
                href="https://maps.app.goo.gl/16dAZSietMquBWUw6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-slate-200 transition-colors group-hover:text-white" />
                <p className="text-sm text-white font-medium transition-colors group-hover:text-white">
                  P.O. Box 36815 Grand Outlet Building, M01, Al Danah E18_02 <br /> Al
                  Falah St., Abu Dhabi, UAE
                </p>
              </a>
              <a
                href="mailto:info@etssmart.com"
                className="flex items-center gap-3 group"
              >
                <Mail className="h-4 w-4 shrink-0 text-slate-200 transition-colors group-hover:text-white" />
                <span className="text-sm text-white font-medium transition-colors group-hover:text-white">
                  info@etssmart.com
                </span>
              </a>
              <a
                href="tel:+97124418186"
                className="flex items-center gap-3 group"
              >
                <Phone className="h-4 w-4 shrink-0 text-slate-200 transition-colors group-hover:text-white" />
                <span className="text-sm text-white font-medium transition-colors group-hover:text-white">
                  +971 2441 8186
                </span>
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-white transition-all duration-300 hover:bg-[hsl(0,80%,38%)] hover:text-[#fff] hover:border-[hsl(0,80%,38%)] hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div data-footer-animate style={{ animationDelay: "0.2s" }}>
            <FooterLinkGroup title="Quick Links" links={quickLinks} />
          </div>

          {/* ELV Systems */}
          <div data-footer-animate style={{ animationDelay: "0.3s" }}>
            <FooterLinkGroup title="ELV Systems" links={elvSystems} />
          </div>

          {/* AV Solutions */}
          <div data-footer-animate style={{ animationDelay: "0.4s" }}>
            <FooterLinkGroup title="AV Solutions" links={avSolutions} />
          </div>

          {/* Network & Communications */}
          <div data-footer-animate style={{ animationDelay: "0.5s" }}>
            <FooterLinkGroup title="Network & Communications" links={networkComms} />
          </div>

          {/* Home Automation */}
          <div data-footer-animate style={{ animationDelay: "0.6s" }}>
            <h3 className="text-[11px] font-black font-montserrat text-white mb-5 uppercase tracking-[0.2em]">
              Home Automation
            </h3>
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link
                  href="/solutions/home-automation#automation"
                  className="text-[12px] text-slate-200 font-medium transition-all duration-300 hover:text-white hover:translate-x-1 inline-block"
                >
                  Home Automation & Lighting Control System
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Map */}
        <div
          className="mt-16 rounded-2xl overflow-hidden border border-[#1a1a1a]"
          data-footer-animate
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="https://maps.app.goo.gl/16dAZSietMquBWUw6"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group cursor-pointer"
          >
            <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-300 group-hover:bg-white/10 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14524.742248818517!2d54.35250187629337!3d24.479026608716584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e4302c2a57b27%3A0xac5b0d59d8799824!2sELV%20Technology%20Solutions%20-%20CCTV%20Installation%20%7C%20Access%20Control%20System%20%7C%20Audio%20Visual%20Solutions%20%7C%20BGM%20%7C%20Digital%20Signages!5e0!3m2!1sen!2sae!4v1773615165943!5m2!1sen!2sae"
              width="100%"
              height="200"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ELV Technology Solutions Location"
              className="pointer-events-none"
            />
          </a>
        </div>

        {/* Careers */}
        <div
          className="mt-12 rounded-2xl bg-white/10 border border-white/20 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:border-white/40"
          data-footer-animate
          style={{ animationDelay: "0.7s" }}
        >
          <div>
            <Link href="/careers" className="inline-block group">
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-[0.15em] group-hover:text-accent transition-colors">
                Careers
              </h3>
            </Link>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              Interested in joining our team? Submit your CV to{" "}
              <a
                href="mailto:info@etssmart.com"
                className="text-white underline underline-offset-4 decoration-white/50 transition-colors hover:decoration-white"
              >
                info@etssmart.com
              </a>
              , and we{"'"}ll be in touch after reviewing your application.
            </p>
          </div>
          <Link
            href="/careers"
            className="shrink-0 flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[hsl(0,80%,38%)] hover:text-[#fff] hover:border-[hsl(0,80%,38%)]"
          >
            Apply Now
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white">
              ELV Technology Solutions - Sole Proprietorship LLC. All rights
              reserved.
            </p>
            <p className="text-xs text-white">Abu Dhabi, UAE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
