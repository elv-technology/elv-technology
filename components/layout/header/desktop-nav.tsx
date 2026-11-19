'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navLinks } from "./nav-links";

interface DesktopNavProps {
  pathname: string;
  isDark: boolean;
}

export function DesktopNav({ pathname, isDark }: DesktopNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Track hovered category for desktop flyout
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setOpenDropdown(null);
    setActiveCategory(null);
  }, [pathname]);

  return (
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
  );
}
