'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

const FINE_POINTER = '(hover: hover) and (prefers-reduced-motion: no-preference)';
const EASE = 'cubic-bezier(.76,0,.24,1)';

/* ---------- Keyframes (render once next to <MotionStyles />) ---------- */
export function ImmersiveStyles() {
  return (
    <style>{`
      @keyframes ev-draw { from { stroke-dashoffset: 120 } to { stroke-dashoffset: 0 } }
      @keyframes ev-fade { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
      @keyframes ev-clip { from { clip-path: inset(100% 0 0 0 round 24px) } to { clip-path: inset(0 0 0 0 round 24px) } }
      @keyframes ev-settle { from { transform: scale(1.25) } to { transform: scale(1) } }
      @keyframes ev-burst { 0% { transform: translate(0,0) scale(.4) rotate(0); opacity: 0 } 15% { opacity: 1 } 100% { transform: translate(var(--dx),var(--dy)) scale(1) rotate(var(--rot)); opacity: 0 } }
      @keyframes ev-mesh-a { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(8vw,5vh) scale(1.2) } }
      @keyframes ev-mesh-b { 0%,100% { transform: translate(0,0) scale(1.1) } 50% { transform: translate(-7vw,-6vh) scale(.9) } }
      @keyframes ev-wave { to { transform: translateX(-50%) } }
    `}</style>
  );
}

/* ---------- 1. Opening curtain: leaf draws itself, then the panel lifts away ---------- */
export function IntroCurtain() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');

  useEffect(() => {
    const quick = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';
    const t1 = window.setTimeout(() => setPhase('out'), quick ? 100 : 1700);
    const t2 = window.setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, quick ? 200 : 2600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#123B2A]"
      style={{ transform: phase === 'out' ? 'translateY(-100%)' : 'none', transition: `transform 900ms ${EASE}` }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="#DDF3E5" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" strokeDasharray="120" style={{ animation: 'ev-draw 1.4s ease-out both' }} />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" strokeDasharray="120" style={{ animation: 'ev-draw 1.4s ease-out .2s both' }} />
      </svg>
      <p className="text-lg tracking-wide text-[#DDF3E5]" style={{ animation: 'ev-fade 1s ease-out .6s both' }}>
        EcoVision Bali
      </p>
    </div>
  );
}

/* ---------- 2. Soft light that trails the pointer ---------- */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia(FINE_POINTER).matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const loop = () => {
      cx += (x - cx) * 0.1;
      cy += (y - cy) * 0.1;
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 320}px, ${cy - 320}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[640px] w-[640px] rounded-full mix-blend-multiply [@media(hover:hover)]:block"
      style={{ background: 'radial-gradient(circle, rgba(111,211,154,.30), transparent 65%)' }}
    />
  );
}

/* ---------- 3. Slowly breathing gradient mesh (put inside a relative, overflow-hidden section) ---------- */
export function MeshBackdrop({ dark = false }: { dark?: boolean }) {
  const a = dark ? 'rgba(35,134,83,.35)' : 'rgba(221,243,229,.9)';
  const b = dark ? 'rgba(111,211,154,.18)' : 'rgba(111,211,154,.28)';
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[10%] top-[5%] h-[55vmax] w-[55vmax] rounded-full blur-3xl" style={{ background: a, animation: 'ev-mesh-a 22s ease-in-out infinite' }} />
      <div className="absolute -right-[15%] bottom-[-10%] h-[50vmax] w-[50vmax] rounded-full blur-3xl" style={{ background: b, animation: 'ev-mesh-b 26s ease-in-out infinite' }} />
    </div>
  );
}

/* ---------- 4. Word-by-word blur-in for headings ---------- */
export function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
  const el = ref.current;

  if (!el || typeof IntersectionObserver === 'undefined') {
    setShown(true);
    return;
  }

  const fallback = window.setTimeout(() => {
    setShown(true);
  }, 1200);

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        io.disconnect();
        window.clearTimeout(fallback);
      }
    },
    { threshold: 0.1 },
  );

  io.observe(el);

  return () => {
    io.disconnect();
    window.clearTimeout(fallback);
  };
}, []);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="ev-reveal inline-block"
          style={{
            opacity: shown ? 1 : 0,
            filter: shown ? 'blur(0)' : 'blur(10px)',
            transform: shown ? 'none' : 'translateY(.5em)',
            transition: `opacity .9s ease ${delay + i * 70}ms, filter .9s ease ${delay + i * 70}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay + i * 70}ms`,
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

/* ---------- 5. Button that leans toward the pointer ---------- */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  function move(e: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || !window.matchMedia(FINE_POINTER).matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }

  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => ref.current && (ref.current.style.transform = '')}
      className="inline-block touch-auto transition-transform duration-300 ease-out"
    >
      {children}
    </span>
  );
}

/* ---------- 6. Layers that drift with the pointer, giving the hero depth ---------- */
export function Depth({ children, depth = 20, className = '' }: { children: ReactNode; depth?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia(FINE_POINTER).matches) return;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      if (ref.current) ref.current.style.transform = `translate3d(${nx * depth}px, ${ny * depth}px, 0)`;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [depth]);

  return (
    <div ref={ref} className={`transition-transform duration-700 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ---------- 7. Slow scroll parallax ---------- */
export function Parallax({ children, speed = 0.08, className = '' }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ---------- 8. Image that unveils with a clip and a slow settle ---------- */
export function ImageReveal({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`} style={{ animation: 'ev-clip 1.4s cubic-bezier(.76,0,.24,1) .5s both' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" style={{ animation: 'ev-settle 2.2s cubic-bezier(.2,.7,.2,1) .5s both' }} />
    </div>
  );
}

/* ---------- 9. Card with a light that follows the cursor inside it ---------- */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  return (
    <div ref={ref} onPointerMove={move} className={`group/spot relative h-full overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: 'radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(35,134,83,.13), transparent 60%)' }}
      />
      {children}
    </div>
  );
}

/* ---------- 10. Leaf burst celebrating a finished analysis (mount with a changing key) ---------- */
export function LeafBurst({ count = 16 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 z-20 h-0 w-0">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const dist = 90 + (i % 4) * 28;
        const style = {
          '--dx': `${Math.cos(angle) * dist}px`,
          '--dy': `${Math.sin(angle) * dist - 20}px`,
          '--rot': `${(i % 2 ? 1 : -1) * (120 + i * 12)}deg`,
          animation: `ev-burst 1.3s cubic-bezier(.2,.7,.2,1) ${i * 18}ms both`,
        } as CSSProperties;
        return (
          <svg key={i} viewBox="0 0 24 24" fill={i % 3 ? '#238653' : '#6fd39a'} className="absolute -left-2 -top-2 h-4 w-4" style={style}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          </svg>
        );
      })}
    </div>
  );
}

/* ---------- 11. Flowing wave divider between sections ---------- */
export function Wave({ fill = '#F6F9F5', flip = false }: { fill?: string; flip?: boolean }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative h-14 w-full overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 2400 80" preserveAspectRatio="none" className="absolute bottom-0 h-full w-[200%]" style={{ animation: 'ev-wave 24s linear infinite' }}>
        <path d="M0 40 C 150 0, 350 80, 600 40 S 1050 0, 1200 40 C 1350 0, 1550 80, 1800 40 S 2250 0, 2400 40 V80 H0 Z" fill={fill} />
      </svg>
    </div>
  );
}
