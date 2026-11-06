'use client';
import * as React from 'react';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/* ---------- Global keyframes (render once, e.g. at the top of Home) ---------- */
export function MotionStyles() {
  return (
    <style>{`
      @keyframes ev-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
      @keyframes ev-scan { 0% { top: 6%; opacity: 0 } 10% { opacity: 1 } 90% { opacity: 1 } 100% { top: 94%; opacity: 0 } }
      @keyframes ev-rise { from { opacity: 0; transform: translateY(22px) } to { opacity: 1; transform: none } }
      @keyframes ev-word { from { opacity: 0; transform: translateY(60%) rotateX(-60deg) } to { opacity: 1; transform: none } }
      @keyframes ev-fall {
        0% { transform: translate3d(0,-10vh,0) rotate(0deg); opacity: 0 }
        10% { opacity: .7 } 90% { opacity: .5 }
        100% { transform: translate3d(var(--ev-drift,40px),110vh,0) rotate(360deg); opacity: 0 }
      }
      @keyframes ev-marquee { to { transform: translateX(-50%) } }
      @keyframes ev-ring { 0% { transform: scale(.8); opacity: .6 } 100% { transform: scale(2.2); opacity: 0 } }
      @keyframes ev-shine { to { background-position: 200% center } }
      .ev-shine-text {
        background: linear-gradient(90deg,#238653,#6fd39a,#238653);
        background-size: 200% auto; -webkit-background-clip: text; background-clip: text;
        color: transparent; animation: ev-shine 4s linear infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important }
        .ev-reveal { opacity: 1 !important; transform: none !important }
      }
    `}</style>
  );
}

/* ---------- Scroll-triggered reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ev-reveal ${className}`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px) scale(.98)`,
        transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Scroll progress bar (fixed, top of page) ---------- */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div ref={barRef} className="h-full origin-left bg-gradient-to-r from-[#238653] to-[#6fd39a]" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}

/* ---------- Back-to-top button ---------- */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#238653] text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-[#123B2A] focus-visible:ring-4 focus-visible:ring-[#238653]/30 focus-visible:outline-none ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

/* ---------- Number that counts up when it appears ---------- */
export function CountUp({ to, duration = 1200, suffix = '' }: { to: number; duration?: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, duration]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

/* ---------- Progress bar that fills from 0 on mount ---------- */
export function GrowBar({ percent, className = '' }: { percent: number; className?: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setWidth(percent));
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  return <div className={`h-full rounded-full transition-[width] duration-[1400ms] ease-out ${className}`} style={{ width: `${width}%` }} />;
}

/* ---------- Glowing scan line (hero image + analysis overlay) ---------- */
export function ScanBeam({ duration = 2.4 }: { duration?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-x-0 h-0.5 bg-[#DDF3E5] shadow-[0_0_24px_6px_rgba(111,211,154,0.7)]"
        style={{ animation: `ev-scan ${duration}s ease-in-out infinite` }}
      />
    </div>
  );
}

/* ---------- Drifting leaves (decorative background) ---------- */
const LEAVES = [
  { left: '6%', size: 18, delay: 0, dur: 16, drift: 60 },
  { left: '18%', size: 12, delay: 5, dur: 20, drift: -40 },
  { left: '33%', size: 22, delay: 9, dur: 18, drift: 50 },
  { left: '52%', size: 14, delay: 2, dur: 22, drift: -70 },
  { left: '68%', size: 20, delay: 7, dur: 17, drift: 40 },
  { left: '82%', size: 13, delay: 12, dur: 21, drift: -50 },
  { left: '93%', size: 17, delay: 4, dur: 19, drift: 30 },
];

export function FloatingLeaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {LEAVES.map((leaf, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="#238653"
          fillOpacity={0.18}
          className="absolute top-0"
          style={
            {
              left: leaf.left,
              width: leaf.size,
              height: leaf.size,
              '--ev-drift': `${leaf.drift}px`,
              animation: `ev-fall ${leaf.dur}s linear ${leaf.delay}s infinite`,
            } as React.CSSProperties
          }
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        </svg>
      ))}
    </div>
  );
}

/* ---------- Rotating word with flip-in animation ---------- */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="inline-block [perspective:600px]" aria-live="polite">
      <span key={index} className="ev-shine-text inline-block" style={{ animation: 'ev-word .55s cubic-bezier(.2,.7,.2,1) both, ev-shine 4s linear infinite' }}>
        {words[index]}
      </span>
    </span>
  );
}

/* ---------- 3D tilt on hover (pointer devices only) ---------- */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function canTilt() {
    return window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;
  }

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !canTilt()) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = '';
  }

  return (
    <div ref={ref} onPointerMove={handleMove} onPointerLeave={reset} className={`h-full transition-transform duration-200 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Infinite marquee strip ---------- */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[#DDF3E5] bg-white py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" aria-hidden="true">
      <div className="flex w-max gap-10 whitespace-nowrap" style={{ animation: 'ev-marquee 32s linear infinite' }}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-medium text-[#17251D]/70">
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-[#238653]/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Pulsing rings behind an icon or badge ---------- */
export function PulseRing() {
  return (
    <>
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-[#238653]/50" style={{ animation: 'ev-ring 2.4s ease-out infinite' }} />
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-[#238653]/40" style={{ animation: 'ev-ring 2.4s ease-out 1.2s infinite' }} />
    </>
  );
}
