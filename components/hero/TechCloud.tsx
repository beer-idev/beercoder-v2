"use client";
import { useEffect, useRef, useState } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiVite,
  SiGraphql,
  SiPrisma,
  SiRedux,
  SiSass,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiGithub,
  SiFirebase,
  SiSupabase,
  SiDigitalocean,
  SiAmazon,
  SiNetlify,
  SiVercel,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiOracle,
  SiPython,
  SiUbuntu,
  SiLinux,
  SiKubernetes,
} from "react-icons/si";

// ชุดไอคอนที่ไม่ซ้ำ เลือกมาให้พอดีกับจำนวนตำแหน่ง (เล็กและเรียบง่าย)
const ICONS = [
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiPrisma,
  SiGithub,
  SiAmazon,
];

type Item = { x: number; y: number; size: number; drift: "x" | "y"; depth: number; Icon: (p: { size?: number }) => JSX.Element };

// ตำแหน่งคงที่ (กระจายซ้าย-ขวา-บน-ล่าง) จำนวนพอดีกับไอคอนด้านบน
const POS: Array<{ x: number; y: number }> = [
  { x: 3, y: 10 },
  { x: 17, y: 9 },
  { x: 34, y: 8 },
  { x: 56, y: 10 },
  { x: 77, y: 8 },
  { x: 93, y: 12 },
  { x: 10, y: 30 },
  { x: 28, y: 32 },
  { x: 66, y: 30 },
  { x: 86, y: 28 },
  { x: 20, y: 78 },
  { x: 82, y: 80 },
];

// ขนาดใหญ่ขึ้นสไตล์ badge (ไม่เท่ากันทุกอัน)
const SIZES = [36, 30, 34, 28, 36, 32, 30, 34, 32, 30, 36, 34];

const NO_TEXT = { x1: 12, x2: 46, y1: 22, y2: 60 }; // โซนประมาณข้อความ hero (หน่วยเป็น %)

function clampToSafe(x: number, y: number) {
  let nx = Math.min(98, Math.max(2, x));
  let ny = Math.min(90, Math.max(8, y));
  if (nx > NO_TEXT.x1 && nx < NO_TEXT.x2 && ny > NO_TEXT.y1 && ny < NO_TEXT.y2) {
    // ดันออกไปด้านซ้ายหรือขวาที่ใกล้กว่า + margin 1%
    const distLeft = Math.abs(nx - NO_TEXT.x1);
    const distRight = Math.abs(NO_TEXT.x2 - nx);
    nx = distLeft < distRight ? NO_TEXT.x1 - 1 : NO_TEXT.x2 + 1;
  }
  return { x: nx, y: ny };
}

const items: Item[] = POS.map((p, i) => {
  const safe = clampToSafe(p.x, p.y);
  const min = Math.min(...SIZES);
  const max = Math.max(...SIZES);
  const depth = (SIZES[i % SIZES.length] - min) / (max - min || 1); // 0..1
  return {
    x: safe.x,
    y: safe.y,
    size: SIZES[i % SIZES.length],
    drift: i % 2 === 0 ? "x" : "y",
    depth,
    Icon: ICONS[i],
  };
});

export default function TechCloud() {
  // editable state (press "e" to toggle edit mode)
  const [edit, setEdit] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [stateItems, setStateItems] = useState(items);
  const dragIndex = useRef<number | null>(null);
  const autoEdit = useRef(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const saved = window.localStorage.getItem("tech-cloud-pos-v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setStateItems((prev) => prev.map((it, i) => ({ ...it, ...parsed[i] })));
      } catch {}
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e") setEdit((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragIndex.current === null || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      const safe = clampToSafe(xPct, yPct);
      setStateItems((arr) => arr.map((it, i) => (i === dragIndex.current ? { ...it, x: safe.x, y: safe.y } : it)));
    };
    const onUp = () => {
      if (dragIndex.current !== null) {
        dragIndex.current = null;
        setDragging(null);
        try {
          const minimal = stateItems.map(({ x, y }) => ({ x, y }));
          window.localStorage.setItem("tech-cloud-pos-v1", JSON.stringify(minimal));
        } catch {}
      }
      if (autoEdit.current) {
        setEdit(false);
        autoEdit.current = false;
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [stateItems]);

  // parallax following mouse (subtle)
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      setMouse({ x: e.clientX / w, y: e.clientY / h });
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  const onMouseDown = (i: number) => (e: React.MouseEvent) => {
    if (!edit) {
      autoEdit.current = true;
      setEdit(true);
    }
    e.preventDefault();
    dragIndex.current = i;
    setDragging(i);
  };

  // detect mobile to reduce icons (5-6)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Mobile: hide tech icons entirely per request
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`${edit ? "z-50" : "-z-10"} pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen`}
    >
      {stateItems.map(({ x, y, size, drift, depth, Icon }, i) => (
        <span
          key={i}
          onMouseDown={onMouseDown(i)}
          className={`absolute pointer-events-auto ${
            edit && dragging === i
              ? ""
              : drift === "x"
              ? "animate-[driftX_11s_ease-in-out_infinite]"
              : "animate-[driftY_13s_ease-in-out_infinite]"
          } ${edit ? "cursor-move" : ""}`}
          style={{ left: `${x}%`, top: `${y}%`, zIndex: Math.round(10 + depth * 10) }}
        >
          <span className="relative inline-grid place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:ring-[color:var(--tropical-teal)]/50 hover:shadow-[0_20px_60px_rgba(91,192,190,0.18)]"
            style={{ width: size + 14, height: size + 14, opacity: 0.65 + depth * 0.35 }}>
            {/* glow */}
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl" style={{
              boxShadow: `0 12px 30px rgba(0,0,0,${0.25 + depth * 0.25}), 0 0 24px rgba(111,255,233,${0.05 + depth * 0.1})`
            }} />
            {/* icon with subtle parallax */}
            <span className="text-slate-200/90" style={{
              transform: `translate3d(${(mouse.x - 0.5) * 8 * (0.2 + depth)}px, ${(mouse.y - 0.5) * 8 * (0.2 + depth)}px, 0)`
            }}>
              <Icon size={size} />
            </span>
          </span>
        </span>
      ))}
      </div>  );}
