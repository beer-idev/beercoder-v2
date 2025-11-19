"use client";
import { useEffect, useRef, useState, type ElementType, type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  as?: ElementType;
  className?: string;
  delay?: number; // ms before reveal
  y?: number; // translateY px (initial)
  duration?: number; // ms animation duration
}>;

export default function ScrollReveal({ as = "div", className = "", delay = 0, y = 16, duration = 700, children }: Props) {
  const Comp: any = as;
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShow(true), delay);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const style = show
    ? { opacity: 1, transform: "translateY(0)" }
    : { opacity: 0, transform: `translateY(${y}px)` };

  return (
    <Comp
      ref={ref}
      className={`${className} will-change-transform`}
      style={{
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}
