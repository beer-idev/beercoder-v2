"use client";
import React from "react";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string; // expects "#id" for in-page scroll
  offset?: number; // optional pixel offset
  updateHash?: boolean; // default false: do not change URL
};

export default function SmoothLink({ href, offset = 0, updateHash = false, onClick, ...rest }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = window.scrollY + rect.top - offset;
        window.scrollTo({ top, behavior: "smooth" });
        if (updateHash) {
          history.pushState(null, "", href);
        }
      }
    }
    onClick?.(e);
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}
