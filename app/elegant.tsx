'use client';
/**
 * EcoVision Bali — lapisan desain elegan + animasi + interaksi.
 * Tidak menyentuh logika AI (/api/analyze, /api/quiz, riwayat, dll).
 * Pasang: <ElegantStyles /> dan <ElegantEffects /> di Home().
 */
import { useEffect } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root{ --ec-ease:cubic-bezier(.22,.8,.2,1); --ec-forest:#123B2A; --ec-moss:#238653; --ec-gold:#B8923F; }
html{ scroll-behavior:smooth; }
body:not(#ec){ font-family:'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
h1:not(#ec),h2:not(#ec),h3:not(#ec){ font-family:'Fraunces',Georgia,serif; font-weight:500; letter-spacing:-.015em; font-variation-settings:'SOFT' 60; }
h1:not(#ec){ letter-spacing:-.03em; }
::selection{ background:#DDF3E5; color:var(--ec-forest); }
*{ scrollbar-width:thin; scrollbar-color:#9fcfb3 transparent; }
:focus-visible{ outline:2px solid var(--ec-moss); outline-offset:3px; }

/* Scroll reveal (dilepas otomatis setelah selesai agar hover Tailwind normal) */
html [data-rv]{ opacity:0; transform:translate3d(0,24px,0); filter:blur(6px);
  transition:opacity .9s var(--ec-ease),transform .9s var(--ec-ease),filter .9s var(--ec-ease);
  transition-delay:calc(var(--i,0)*80ms); }
html [data-rv].ec-in{ opacity:1; transform:none; filter:none; }

/* Kartu interaktif: tilt + sorotan mengikuti kursor */
[data-tilt]{ position:relative; transform-style:preserve-3d; will-change:transform; }
[data-tilt]::after{ content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; opacity:0;
  transition:opacity .35s ease;
  background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(35,134,83,.11),transparent 62%); }
#about [data-tilt]::after{ background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.14),transparent 62%); }
[data-tilt]:hover::after{ opacity:1; }

/* Navigasi aktif */
header nav a{ position:relative; }
header nav a::after{ content:''; position:absolute; left:0; right:0; bottom:-6px; height:2px; border-radius:2px;
  background:var(--ec-gold); transform:scaleX(0); transform-origin:left; transition:transform .45s var(--ec-ease); }
header nav a:hover::after,header nav a[data-active='true']::after{ transform:scaleX(1); }
header nav a[data-active='true']{ color:var(--ec-moss); }

/* Ripple tombol */
.ec-ripple{ position:absolute; border-radius:999px; pointer-events:none; background:rgba(255,255,255,.45);
  transform:scale(0); animation:ec-ripple .65s ease-out forwards; }
@keyframes ec-ripple{ to{ transform:scale(1); opacity:0; } }

/* Momen AI: garis pindai saat menganalisis + hasil muncul halus */
[role='status']{ overflow:hidden; }
[role='status']::after{ content:''; position:absolute; left:8%; right:8%; top:0; height:2px; border-radius:2px;
  background:linear-gradient(90deg,transparent,#DDF3E5,transparent); box-shadow:0 0 22px 6px rgba(221,243,229,.55);
  animation:ec-scan 1.9s var(--ec-ease) infinite alternate; }
@keyframes ec-scan{ from{ top:6%; } to{ top:94%; } }
#scanner article{ animation:ec-rise .9s var(--ec-ease) both; }
@keyframes ec-rise{ from{ opacity:0; transform:translateY(28px) scale(.985); } to{ opacity:1; transform:none; } }
[role='dialog']{ animation:ec-pop .4s var(--ec-ease) both; }
@keyframes ec-pop{ from{ opacity:0; transform:scale(.94) translateY(10px); } to{ opacity:1; transform:none; } }

/* Kuis: umpan balik jelas saat memilih jawaban */
#eco-quiz button{ transition:transform .3s var(--ec-ease),background-color .25s,border-color .25s,box-shadow .3s; }
#eco-quiz button:not(:disabled):hover{ transform:translateX(5px); }
#eco-quiz button.border-green-500{ animation:ec-pulse .55s var(--ec-ease); }
#eco-quiz button.border-rose-400{ animation:ec-shake .45s ease; }
@keyframes ec-pulse{ 40%{ transform:scale(1.025); box-shadow:0 0 0 6px rgba(34,197,94,.15); } }
@keyframes ec-shake{ 20%,60%{ transform:translateX(-6px); } 40%,80%{ transform:translateX(6px); } }

/* Badge hero melayang pelan */
#home .absolute.rounded-2xl{ animation:ec-float 7s ease-in-out infinite alternate; }
#home .absolute.rounded-2xl:last-of-type{ animation-delay:-3.5s; }
@keyframes ec-float{ to{ transform:translateY(-8px); } }

@media (prefers-reduced-motion:reduce){
  html{ scroll-behavior:auto; }
  html [data-rv]{ opacity:1; transform:none; filter:none; transition:none; }
  *,*::before,*::after{ animation-duration:.01ms !important; animation-iteration-count:1 !important; }
}
`;

export function ElegantStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

export function ElegantEffects() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: Array<() => void> = [];

    /* 1. Reveal saat scroll */
    if (!reduce) {
      const selectors = [
        'section:not(#home):not(#scanner) .max-w-2xl > *',
        'section:not(#home):not(#scanner) article',
        'section:not(#home):not(#scanner) .space-y-6 > *',
        'section:not(#home):not(#scanner) .rounded-3xl.shadow-lg',
        '#scanner .max-w-2xl > *',
        '#scanner .max-w-3xl',
        'footer .grid > *',
      ];
      const found = new Set<HTMLElement>();
      document.querySelectorAll<HTMLElement>(selectors.join(',')).forEach((el) => found.add(el));
      const targets = [...found].filter((el) => {
        let p = el.parentElement;
        while (p) {
          if (found.has(p)) return false;
          p = p.parentElement;
        }
        return true;
      });

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            io.unobserve(el);
            el.classList.add('ec-in');
            const i = Number(el.style.getPropertyValue('--i')) || 0;
            window.setTimeout(() => {
              el.removeAttribute('data-rv');
              el.classList.remove('ec-in');
              el.style.removeProperty('--i');
            }, 1400 + i * 80);
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );

      targets.forEach((el) => {
        const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.setProperty('--i', String(Math.min(index, 5)));
        el.setAttribute('data-rv', '');
        io.observe(el);
      });
      cleanups.push(() => io.disconnect());
    }

    /* 2. Tilt + spotlight pada kartu */
    document
      .querySelectorAll<HTMLElement>('#waste-categories article, #how-it-works article, #about article')
      .forEach((el) => el.setAttribute('data-tilt', ''));

    if (fine && !reduce) {
      let active: HTMLElement | null = null;
      const reset = (el: HTMLElement | null) => {
        if (el) el.style.transform = '';
      };
      const onMove = (e: PointerEvent) => {
        const card = (e.target as HTMLElement).closest?.('[data-tilt]') as HTMLElement | null;
        if (card !== active) {
          reset(active);
          active = card;
        }
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 7}deg) translateY(-6px)`;
      };
      const onLeave = () => {
        reset(active);
        active = null;
      };
      document.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        document.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      });
    }

    /* 3. Menu aktif mengikuti posisi scroll */
    const navIds = ['home', 'how-it-works', 'waste-categories', 'about'];
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          document.querySelectorAll<HTMLAnchorElement>('header a[href^="#"]').forEach((a) => {
            a.dataset.active = String(a.getAttribute('href') === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) navObserver.observe(section);
    });
    cleanups.push(() => navObserver.disconnect());

    /* 4. Ripple pada tombol bulat */
    const onDown = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest?.('a.rounded-full, button.rounded-full') as HTMLElement | null;
      if (!btn || (btn as HTMLButtonElement).disabled) return;
      if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const dot = document.createElement('span');
      dot.className = 'ec-ripple';
      dot.style.width = dot.style.height = `${size}px`;
      dot.style.left = `${e.clientX - r.left - size / 2}px`;
      dot.style.top = `${e.clientY - r.top - size / 2}px`;
      btn.appendChild(dot);
      window.setTimeout(() => dot.remove(), 700);
    };
    document.addEventListener('pointerdown', onDown, { passive: true });
    cleanups.push(() => document.removeEventListener('pointerdown', onDown));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
