"use client";

import { useEffect, useRef } from "react";

function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function FadeSection({
  children,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}) {
  const ref = useFadeIn() as React.RefObject<HTMLDivElement>;
  return (
    <Tag ref={ref} className={`fade-in ${className}`} style={style}>
      {children}
    </Tag>
  );
}
