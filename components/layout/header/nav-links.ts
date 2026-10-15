import { Instagram, Facebook, Linkedin, MessageCircle, type LucideIcon } from "lucide-react";
import { XIcon } from "./x-icon";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavCategory extends NavItem {
  items?: NavItem[];
}

export interface NavLink extends NavItem {
  submenu?: NavCategory[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon | typeof XIcon;
}

export const navLinks: NavLink[] = [
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

export const socialLinks: SocialLink[] = [
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
