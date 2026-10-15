"use client";

import type { CSSProperties, ReactNode } from "react";
import { useIntersection } from "@/hooks/use-intersection";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Classes applied once the element has scrolled into view. */
  visibleClassName?: string;
  /** Classes applied until then. */
  hiddenClassName?: string;
  threshold?: number;
  style?: CSSProperties;
}

export default function FadeIn({
  children,
  className = "",
  visibleClassName = "animate-fade-in-up",
  hiddenClassName = "",
  threshold = 0.1,
  style,
}: FadeInProps) {
  const { ref, isVisible } = useIntersection<HTMLDivElement>(threshold);

  return (
    <div ref={ref} className={`${className} ${isVisible ? visibleClassName : hiddenClassName}`} style={style}>
      {children}
    </div>
  );
}
