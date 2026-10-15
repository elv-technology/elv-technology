'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navLinks, socialLinks } from "./nav-links";

interface MobileMenuProps {
  pathname: string;
  isMobileMenuOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ pathname, isMobileMenuOpen, onClose }: MobileMenuProps) {
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  // Track open nested category in mobile
  const [mobileNestedOpen, setMobileNestedOpen] = useState<string | null>(null);

  useEffect(() => {
    setMobileSubmenuOpen(null);
    setMobileNestedOpen(null);
  }, [pathname]);

  return (
    /* Mobile menu overlay - sibling to header, high z-index */
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
                      onClick={onClose}
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
                      aria-label={`Toggle ${link.label} submenu`}
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
                                  onClick={onClose}
                                  className="flex-1 px-2 py-1.5 hover:text-[#D61F26]"
                                >
                                  {sub.label}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => setMobileNestedOpen(mobileNestedOpen === sub.label ? null : sub.label)}
                                  className="p-2 text-foreground/50 hover:text-[#D61F26]"
                                  aria-label={`Toggle ${sub.label} sub-items`}
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
                                      onClick={onClose}
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
                              onClick={onClose}
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
                onClick={onClose}
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
            onClick={onClose}
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
  );
}
