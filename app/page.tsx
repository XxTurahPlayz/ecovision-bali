'use client';
import {
  MotionStyles,
  ScrollProgress,
  BackToTop,
  FloatingLeaves,
  Reveal,
} from "./motion";
import { ElegantStyles, ElegantEffects } from "./elegant";
import ReactMarkdown from "react-markdown";
import {
  ImmersiveStyles,
  IntroCurtain,
  CursorGlow,
  MeshBackdrop,
  SplitText,
  Magnetic,
  Depth,
  Parallax,
  ImageReveal,
  SpotlightCard,
  LeafBurst,
  Wave,
} from "./immersive";
import { LanguageProvider, LanguageToggle, useLang } from "./i18n";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
  type ReactElement,
} from 'react';

type IconProps = { className?: string };

function IconBase({ className, children }: IconProps & { children: ReactElement | ReactElement[] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

function LeafIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </>
    </IconBase>
  );
}

function MenuIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    </IconBase>
  );
}

function CloseIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </>
    </IconBase>
  );
}

function ArrowRightIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </>
    </IconBase>
  );
}

function UploadIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M17 8l-5-5-5 5" />
        <path d="M12 3v12" />
      </>
    </IconBase>
  );
}

function ScanIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M7 12h10" />
      </>
    </IconBase>
  );
}

function SparklesIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    </IconBase>
  );
}

function CheckCircleIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12.5l2.5 2.5L16 9.5" />
      </>
    </IconBase>
  );
}

function RefreshIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M21 12a9 9 0 1 1-2.64-6.36L21 8" />
        <path d="M21 3v5h-5" />
      </>
    </IconBase>
  );
}

function TrashIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
      </>
    </IconBase>
  );
}

function ChevronDownIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M6 9l6 6 6-6" />
    </IconBase>
  );
}

function AlertIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </>
    </IconBase>
  );
}

function RecycleIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M7 19H4.5a1.5 1.5 0 0 1-1.3-2.25L6 10" />
        <path d="M12 5.5L9.5 3 7 5.5" />
        <path d="M17 5h2.5a1.5 1.5 0 0 1 1.3 2.25L18 14" />
        <path d="M14 19h4.5a1.5 1.5 0 0 0 1.3-2.25L17 10" />
        <path d="M10 19l-3 0 0-3" />
      </>
    </IconBase>
  );
}

function DropIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 2.7s-6 6.3-6 10.3a6 6 0 0 0 12 0c0-4-6-10.3-6-10.3z" />
    </IconBase>
  );
}

function UsersIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    </IconBase>
  );
}

function BookIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
      </>
    </IconBase>
  );
}

function BulbIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
      </>
    </IconBase>
  );
}

function CameraIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </>
    </IconBase>
  );
}

type CategoryId = 'organic' | 'recyclable' | 'residual' | 'hazardous';

// Text (name, description, examples, guidance) lives in i18n.tsx under cat.<id>.*
interface CategoryMeta {
  id: CategoryId;
  icon: (props: IconProps) => ReactElement;
  chip: string;
  iconWrap: string;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: 'organic',
    icon: LeafIcon,
    chip: 'bg-amber-50 text-amber-800 ring-amber-200',
    iconWrap: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'recyclable',
    icon: RecycleIcon,
    chip: 'bg-sky-50 text-sky-800 ring-sky-200',
    iconWrap: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'residual',
    icon: TrashIcon,
    chip: 'bg-stone-100 text-stone-700 ring-stone-300',
    iconWrap: 'bg-stone-200 text-stone-700',
  },
  {
    id: 'hazardous',
    icon: AlertIcon,
    chip: 'bg-rose-50 text-rose-800 ring-rose-200',
    iconWrap: 'bg-rose-100 text-rose-700',
  },
];

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

function validateImage(file: File, t: (key: string) => string): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) return t('err.format');
  if (file.size === 0) return t('err.empty');
  if (file.size > MAX_IMAGE_BYTES) return t('err.size');
  return null;
}

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
}

const NAV_LINKS = [
  { id: 'home', key: 'nav.home' },
  { id: 'how-it-works', key: 'nav.how' },
  { id: 'waste-categories', key: 'nav.categories' },
  { id: 'about', key: 'nav.about' },
];

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123B2A] text-white shadow-sm">
        <LeafIcon className="h-4 w-4" />
      </span>
      <span className="text-base font-semibold tracking-tight text-[#17251D]">
        EcoVision <span className="text-[#238653]">Bali</span>
      </span>
    </span>
  );
}

function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solid = scrolled || menuOpen;

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setMenuOpen(false);
    scrollToSection(event, id);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-[#DDF3E5] bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20">
        <a href="#home" aria-label={t('nav.homeAria')} onClick={(e) => handleLinkClick(e, 'home')}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="text-sm font-medium text-[#17251D]/75 transition-colors hover:text-[#238653]"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <a
            href="#scanner"
            onClick={(e) => handleLinkClick(e, 'scanner')}
            className="hidden rounded-full bg-[#238653] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#123B2A] hover:shadow-md md:inline-flex"
          >
            {t('nav.start')}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DDF3E5] bg-white text-[#17251D] transition-colors hover:bg-[#DDF3E5] md:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-[#DDF3E5] bg-white md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="rounded-xl px-3 py-3.5 text-base font-medium text-[#17251D] transition-colors hover:bg-[#F6F9F5] hover:text-[#238653]"
              >
                {t(link.key)}
              </a>
            ))}
            <a
              href="#scanner"
              onClick={(e) => handleLinkClick(e, 'scanner')}
              className="mt-3 rounded-full bg-[#238653] px-5 py-3.5 text-center text-sm font-semibold text-white"
            >
              {t('nav.start')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

const HERO_IMAGE =
  'https://images.pexels.com/photos/29484316/pexels-photo-29484316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

function Hero() {
  const { t } = useLang();
  return (
    <section id="home" className="relative overflow-hidden bg-[#F6F9F5] pb-24 pt-32 lg:pb-32 lg:pt-44">
      <MeshBackdrop />

      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#DDF3E5]/80 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#DDF3E5]/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-8 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#238653] shadow-sm ring-1 ring-[#DDF3E5]">
            <SparklesIcon className="h-3.5 w-3.5" />
            {t('hero.badge')}
          </span>

          {/* key={...} re-triggers the SplitText animation when the language changes */}
          <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-[#17251D] sm:text-6xl lg:text-7xl">
            <SplitText key={t('hero.title1')} text={t('hero.title1')} />
            <span className="mt-2 block text-[#238653]">
              <SplitText key={t('hero.title2')} text={t('hero.title2')} delay={250} />
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#718078] lg:mx-0">{t('hero.desc')}</p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Magnetic>
              <a
                href="#scanner"
                onClick={(e) => scrollToSection(e, 'scanner')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#238653] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#238653]/20 transition-all hover:-translate-y-0.5 hover:bg-[#123B2A]"
              >
                {t('hero.cta1')}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, 'how-it-works')}
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#17251D] ring-1 ring-[#DDF3E5] transition-all hover:-translate-y-0.5 hover:ring-[#238653]/50"
              >
                {t('hero.cta2')}
              </a>
            </Magnetic>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#17251D]/75 lg:justify-start">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-[#238653]" />
              {t('hero.check1')}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-[#238653]" />
              {t('hero.check2')}
            </li>
          </ul>
        </div>

        <Depth className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rounded-[32px] bg-white p-3 shadow-2xl ring-1 ring-[#DDF3E5]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#123B2A]">
              <ImageReveal src={HERO_IMAGE} alt={t('hero.imgAlt')} className="absolute inset-0" />

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,59,42,0.5),transparent_60%)]" />

              <div className="pointer-events-none absolute inset-8">
                <span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-white" />
                <span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-white" />
                <span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-white" />
                <span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-white" />
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#DDF3E5] shadow-[0_0_18px_4px_rgba(221,243,229,0.55)]" />
              </div>
            </div>

            <div className="absolute -left-4 top-14 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-[#DDF3E5] sm:-left-10">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DDF3E5] text-[#238653]">
                  <ScanIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-[#718078]">{t('hero.detected')}</p>
                  <p className="text-sm font-semibold text-[#17251D]">{t('hero.petName')}</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-2 w-56 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-[#DDF3E5] sm:-right-8">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#17251D]">{t('hero.recyclable')}</span>
                <span className="text-xs font-semibold text-[#238653]">94%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#DDF3E5]">
                <div className="h-full w-[94%] rounded-full bg-[#238653]" />
              </div>
              <p className="mt-2 text-[11px] text-[#718078]">{t('hero.hint')}</p>
            </div>
          </div>
        </Depth>
      </div>
    </section>
  );
}

function UploadDropzone({
  onBrowse,
  onCamera,
  onDropFile,
}: {
  onBrowse: () => void;
  onCamera: () => void;
  onDropFile: (file: File) => void;
}) {
  const { t } = useLang();
  const [isDragging, setIsDragging] = useState(false);

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onDropFile(file);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`group flex min-h-[320px] w-full flex-col items-center justify-center gap-5 rounded-[24px] border-2 border-dashed px-6 py-12 text-center transition-all duration-300 focus-visible:ring-4 focus-visible:ring-[#238653]/30 focus-visible:outline-none ${
        isDragging
          ? 'scale-[1.01] border-[#238653] bg-[#DDF3E5]/70'
          : 'border-[#238653]/30 bg-[#F6F9F5] hover:border-[#238653]/60 hover:bg-[#DDF3E5]/40'
      }`}
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#238653] shadow-sm ring-1 ring-[#DDF3E5] transition-transform duration-300 ${
          isDragging ? '-translate-y-1' : 'group-hover:-translate-y-1'
        }`}
      >
        <UploadIcon className="h-7 w-7" />
      </span>
      <span className="space-y-2">
        <span className="block text-lg font-semibold text-[#17251D]">
          {isDragging ? t('scan.drop') : t('scan.drag')}
        </span>
        <span className="block text-sm text-[#718078]">{t('scan.formats')}</span>
        <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBrowse}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#238653] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123B2A]"
          >
            <UploadIcon className="h-4 w-4" />
            {t('scan.gallery')}
          </button>

          <button
            type="button"
            onClick={onCamera}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#238653] ring-1 ring-[#238653]/30 transition hover:bg-[#DDF3E5]"
          >
            <CameraIcon className="h-4 w-4" />
            {t('scan.camera')}
          </button>
        </div>
      </span>
    </div>
  );
}

function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.77 2 12 2 12s0 3.23.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.23 22 12 22 12s0-3.23-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

// Turns every link form the AI might produce (bare URL, <url>, [text](url)) into a clean
// markdown link, so the renderer below can show it as a button.
function linkify(text: string): string {
  return text.replace(
    /\[([^\]]*)\]\((https?:[^)]+)\)|<(https?:[^>\s]+)>|(https?:\/\/[^\s<>)\]]+)/g,
    (_m, label: string | undefined, mdUrl: string | undefined, angleUrl: string | undefined, bareUrl: string | undefined) => {
      const raw = (mdUrl ?? angleUrl ?? bareUrl ?? '').trim();
      const url = raw.replace(/[.,;:!?]+$/, '').replace(/\s+/g, '+');
      return `[${label || 'link'}](${url})`;
    },
  );
}

function MarkdownLink({ href, label }: { href?: string; label: string }) {
  if (!href) return null;
  const isYouTube = /(^https?:\/\/)?([a-z0-9-]+\.)?(youtube\.com|youtu\.be)/i.test(href);

  if (!isYouTube) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#238653] underline underline-offset-2">
        {href}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-1 inline-flex items-center gap-2 rounded-full bg-[#238653] px-4 py-2 text-sm font-semibold text-white no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-[#123B2A] hover:shadow-md"
    >
      <PlayIcon className="h-4 w-4" />
      {label}
    </a>
  );
}

// Supports both English and Indonesian section headings from the AI response
function splitAnalysis(analysis: string) {
  const marker = /##\s*4\.\s*(Creative Reuse Ideas|Ide Daur Ulang Kreatif)/i;
  const match = analysis.match(marker);

  if (!match || match.index === undefined) {
    return { main: analysis, creative: "" };
  }

  return {
    main: analysis.slice(0, match.index).trim(),
    creative: analysis.slice(match.index).trim(),
  };
}

function AnalysisResult({ analysis, previewUrl }: { analysis: string; previewUrl: string }) {
  const { t } = useLang();
  const { main, creative } = splitAnalysis(analysis);

  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-xl ring-1 ring-[#DDF3E5]">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="relative min-h-[260px] bg-[#123B2A] lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt={t('res.photoAlt')} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6 p-6 sm:p-8 lg:p-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DDF3E5] px-3 py-1.5 text-xs font-semibold text-[#238653]">
              <CheckCircleIcon className="h-3.5 w-3.5" />
              {t('res.done')}
            </span>

            <h3 className="text-2xl font-semibold tracking-tight text-[#17251D]">{t('res.title')}</h3>

            <p className="text-sm leading-relaxed text-[#718078]">{t('res.powered')}</p>
          </div>

          <div className="rounded-2xl border border-[#DDF3E5] bg-[#F6F9F5] p-5">
            <h4 className="mb-3 text-sm font-semibold text-[#238653]">{t('res.heading')}</h4>

            <div className="text-sm leading-7 text-[#17251D] [&_strong]:font-bold [&_strong]:text-[#123B2A] [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:pl-1 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_em]:italic">
              <ReactMarkdown
                components={{ a: ({ href }) => <MarkdownLink href={href} label={t('res.watch')} /> }}
              >
                {linkify(main.replace(/\\([*_])/g, "$1"))}
              </ReactMarkdown>
            </div>
            {creative && (
              <div className="overflow-hidden rounded-2xl border border-[#BFE8CC] bg-white">
                <div className="border-b border-[#DDF3E5] bg-[#EAF7EE] p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">♻️</span>
                    <h4 className="text-lg font-bold text-[#123B2A]">{t('res.reuse')}</h4>
                  </div>
                  <p className="mt-1 text-sm text-[#718078]">{t('res.reuseSub')}</p>
                </div>

                <div className="space-y-4 p-5 text-sm leading-7 text-[#17251D] [&_h3]:mt-5 [&_h3]:rounded-xl [&_h3]:bg-[#F0F8F2] [&_h3]:p-3 [&_h3]:font-bold [&_h3]:text-[#238653] [&_h3:first-child]:mt-0 [&_strong]:font-bold [&_strong]:text-[#123B2A] [&_ul]:my-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_p]:my-2">
                  <ReactMarkdown
                    components={{ a: ({ href }) => <MarkdownLink href={href} label={t('res.watch')} /> }}
                  >
                    {linkify(creative.replace(/\\([*_])/g, "$1"))}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 rounded-2xl border border-[#DDF3E5] bg-[#DDF3E5]/50 p-4">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#238653]" />
            <p className="text-sm leading-relaxed text-[#17251D]">{t('res.note')}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      image.src = reader.result as string;
    };

    reader.onerror = reject;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const maxSize = 600;

      let width = image.width;
      let height = image.height;

      if (width > height && width > maxSize) {
        height = (height * maxSize) / width;
        width = maxSize;
      } else if (height > maxSize) {
        width = (width * maxSize) / height;
        height = maxSize;
      }

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Failed to compress the photo."));
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.6));
    };

    image.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type HistoryItem = {
  id: string;
  image: string;
  fileName: string;
  analysis: string;
  date: string;
};

function WasteScanner() {
  const { t, tl, lang } = useLang();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const runRef = useRef(0);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const steps = tl('scan.steps');

  function deleteHistory(id: string) {
    const updated = history.filter((item) => item.id !== id);

    setHistory(updated);
    localStorage.setItem("ecovision-history", JSON.stringify(updated));

    if (selectedHistory?.id === id) {
      setSelectedHistory(null);
    }
  }

  function clearAllHistory() {
    setHistory([]);
    localStorage.removeItem("ecovision-history");
    setSelectedHistory(null);
    setShowClearConfirm(false);
  }

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("ecovision-history");

      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, []);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!isAnalyzing) {
      setStepIndex(0);
      return;
    }
    const timer = window.setInterval(() => {
      setStepIndex((index) => Math.min(index + 1, 2));
    }, 850);
    return () => window.clearInterval(timer);
  }, [isAnalyzing]);

  function selectFile(next: File) {
    const validationError = validateImage(next, t);
    if (validationError) {
      setError(validationError);
      return;
    }
    runRef.current += 1;
    setError(null);
    setAnalysis(null);
    setIsAnalyzing(false);
    setPreviewUrl(null);
    setFile(next);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0];
    event.target.value = '';
    if (next) selectFile(next);
  }

  function removeImage() {
    runRef.current += 1;
    setFile(null);
    setPreviewUrl(null);
    setAnalysis(null);
    setError(null);
    setIsAnalyzing(false);
  }

  async function analyze() {
    if (!file) return;

    const run = ++runRef.current;
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("lang", lang); // tells /api/analyze which language to answer in

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t('err.analysis'));
      }

      if (run === runRef.current) {
        setAnalysis(result.analysis);

        const newHistory: HistoryItem = {
          id: crypto.randomUUID(),
          image: await compressImage(file),
          fileName: file.name,
          analysis: result.analysis,
          date: new Date().toLocaleString(lang === 'id' ? 'id-ID' : 'en-US'),
        };

        setHistory((previous) => {
          const updated = [newHistory, ...previous].slice(0, 5);

          localStorage.setItem("ecovision-history", JSON.stringify(updated));

          return updated;
        });
      }
    } catch (error) {
      if (run === runRef.current) {
        setError(error instanceof Error ? error.message : t('err.analysis'));
      }
    } finally {
      if (run === runRef.current) {
        setIsAnalyzing(false);
      }
    }
  }

  const openPicker = () => inputRef.current?.click();
  const openCamera = () => cameraInputRef.current?.click();

  return (
    <section id="scanner" className="scroll-mt-24 bg-[#F6F9F5] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#238653] ring-1 ring-[#DDF3E5]">
            <ScanIcon className="h-3.5 w-3.5" />
            {t('scan.badge')}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-[#17251D] sm:text-4xl">{t('scan.title')}</h2>
          <p className="text-lg leading-relaxed text-[#718078]">{t('scan.desc')}</p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="mx-auto w-full max-w-3xl rounded-[32px] bg-white p-4 shadow-lg ring-1 ring-[#DDF3E5] sm:p-6">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handleInputChange}
              tabIndex={-1}
              aria-hidden="true"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              className="sr-only"
              onChange={handleInputChange}
              tabIndex={-1}
              aria-hidden="true"
            />

            {file && previewUrl ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#123B2A]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt={`${t('scan.selectedAlt')}: ${file.name}`}
                  className="h-full w-full object-cover"
                />
                {isAnalyzing && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#123B2A]/70"
                  >
                    <div className="relative flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg">
                      <ScanIcon className="h-5 w-5 animate-pulse text-[#238653]" />
                      <span className="text-sm font-semibold text-[#17251D]">{steps[stepIndex]}...</span>
                    </div>
                    <p className="mt-4 text-sm font-medium text-white">{t('scan.analyzingMsg')}</p>
                  </div>
                )}
              </div>
            ) : (
              <UploadDropzone onBrowse={openPicker} onCamera={openCamera} onDropFile={selectFile} />
            )}

            {file && (
              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={openPicker}
                    disabled={isAnalyzing}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[#17251D] transition hover:bg-[#DDF3E5] disabled:opacity-50"
                  >
                    <RefreshIcon className="h-4 w-4" />
                    {t('scan.replace')}
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    disabled={isAnalyzing}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[#17251D] transition hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
                  >
                    <TrashIcon className="h-4 w-4" />
                    {t('scan.remove')}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={analyze}
                  disabled={isAnalyzing}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#238653] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#123B2A] hover:shadow-lg disabled:translate-y-0 disabled:opacity-70"
                >
                  {isAnalyzing ? t('scan.analyzing') : t('scan.analyze')}
                </button>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 ring-1 ring-rose-200"
              >
                {error}
              </p>
            )}
          </div>

          {analysis && previewUrl && (
            <div className="mt-10">
              <AnalysisResult analysis={analysis} previewUrl={previewUrl} />
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-12">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold text-[#17251D]">{t('hist.title')}</h3>

                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                >
                  {t('hist.clear')}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="relative w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#DDF3E5] transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedHistory(item)}
                      className="block w-full text-left"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.fileName} className="h-40 w-full object-cover" />

                      <div className="p-4 pr-14">
                        <p className="truncate font-semibold text-[#17251D]">{item.fileName}</p>
                        <p className="mt-1 text-xs text-[#718078]">{item.date}</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteHistory(item.id)}
                      aria-label={`${t('hist.delete')} ${item.fileName}`}
                      className="absolute right-3 top-[170px] rounded-full bg-rose-50 p-2 text-rose-600 transition hover:bg-rose-100"
                      title={t('hist.delete')}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedHistory && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
              <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
                <button
                  type="button"
                  onClick={() => setSelectedHistory(null)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-[#F6F9F5] px-4 py-2 text-sm font-semibold text-[#17251D] hover:bg-[#DDF3E5]"
                >
                  {t('hist.close')}
                </button>

                <h3 className="mb-2 pr-20 text-2xl font-semibold text-[#17251D]">{t('hist.details')}</h3>

                <p className="mb-5 text-sm text-[#718078]">
                  {selectedHistory.fileName} · {selectedHistory.date}
                </p>

                <AnalysisResult analysis={selectedHistory.analysis} previewUrl={selectedHistory.image} />
              </div>
            </div>
          )}

          {showClearConfirm && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#10251B]/60 p-4 backdrop-blur-sm">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="clear-history-title"
                className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl ring-1 ring-[#DDF3E5]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <TrashIcon className="h-6 w-6" />
                </div>

                <h3 id="clear-history-title" className="mt-5 text-center text-xl font-semibold text-[#17251D]">
                  {t('hist.confirmTitle')}
                </h3>

                <p className="mt-2 text-center text-sm leading-relaxed text-[#718078]">{t('hist.confirmDesc')}</p>

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 rounded-full bg-[#F6F9F5] px-5 py-3 text-sm font-semibold text-[#17251D] hover:bg-[#DDF3E5]"
                  >
                    {t('hist.cancel')}
                  </button>

                  <button
                    type="button"
                    onClick={clearAllHistory}
                    className="flex-1 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700"
                  >
                    {t('hist.confirm')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: CategoryMeta }) {
  const { t, tl } = useLang();
  const [expanded, setExpanded] = useState(false);
  const Icon = category.icon;
  const guidanceId = `${category.id}-guidance`;

  return (
    <article className="group flex flex-col rounded-[28px] bg-white p-7 ring-1 ring-[#DDF3E5] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#123B2A]/5">
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${category.iconWrap}`}
      >
        <Icon className="h-6 w-6" />
      </span>

      <h3 className="mt-6 text-xl font-semibold tracking-tight text-[#17251D]">{t(`cat.${category.id}.name`)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#718078]">{t(`cat.${category.id}.desc`)}</p>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#17251D]/60">{t('cat.examples')}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tl(`cat.${category.id}.ex`).map((example) => (
          <li key={example} className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${category.chip}`}>
            {example}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={guidanceId}
          className="flex w-full items-center justify-between rounded-2xl bg-[#F6F9F5] px-4 py-3 text-sm font-semibold text-[#17251D] transition-colors hover:bg-[#DDF3E5] focus-visible:ring-2 focus-visible:ring-[#238653] focus-visible:outline-none"
        >
          {t('cat.guidance')}
          <ChevronDownIcon
            className={`h-4 w-4 text-[#238653] transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          id={guidanceId}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ${
            expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <p className="overflow-hidden px-1 pt-3 text-sm leading-relaxed text-[#17251D]/80">
            {t(`cat.${category.id}.guide`)}
          </p>
        </div>
      </div>
    </article>
  );
}

function CategoryExplorer() {
  const { t } = useLang();
  return (
    <section id="waste-categories" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#238653]">{t('cat.label')}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#17251D] sm:text-4xl">{t('cat.title')}</h2>
          <p className="text-lg leading-relaxed text-[#718078]">{t('cat.desc')}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

const HOW_STEPS = [
  { number: '01', key: 'how.1', icon: CameraIcon },
  { number: '02', key: 'how.2', icon: ScanIcon },
  { number: '03', key: 'how.3', icon: BulbIcon },
];

function HowItWorks() {
  const { t } = useLang();
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-[#F6F9F5] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#238653]">{t('how.label')}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#17251D] sm:text-4xl">{t('how.title')}</h2>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {HOW_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className="group rounded-[28px] bg-white p-8 ring-1 ring-[#DDF3E5] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#123B2A]/5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123B2A] text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-3xl font-semibold tracking-tight text-[#DDF3E5]">{step.number}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-[#17251D]">{t(`${step.key}.title`)}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#718078]">{t(`${step.key}.desc`)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const BALI_IMAGE =
  'https://images.pexels.com/photos/36133244/pexels-photo-36133244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const PILLARS = [
  { key: 'about.p1', icon: RecycleIcon },
  { key: 'about.p2', icon: BookIcon },
  { key: 'about.p3', icon: DropIcon },
  { key: 'about.p4', icon: UsersIcon },
];

function BaliImpact() {
  const { t } = useLang();
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-[#123B2A] py-24 text-white lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BALI_IMAGE} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#123B2A,rgba(18,59,42,0.95),rgba(18,59,42,0.8))]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#DDF3E5]">{t('about.label')}</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t('about.title')}</h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">{t('about.desc')}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.key}
                  className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDF3E5] text-[#123B2A]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{t(`${pillar.key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{t(`${pillar.key}.desc`)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-[#17251D] py-16 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-white/70">{t('foot.desc')}</p>
          </div>

          <nav aria-label="Footer" className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#DDF3E5]">{t('foot.explore')}</p>
            <ul className="space-y-3">
              {[...NAV_LINKS, { id: 'scanner', key: 'nav.start' }].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#DDF3E5]">{t('foot.contact')}</p>
            <p className="text-sm leading-relaxed text-white/75">{t('foot.contactText')}</p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-sm text-white/60">
          <p>&copy; 2026 EcoVision Bali. {t('foot.rights')}</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      {/* Animation styles */}
      <MotionStyles />
      <ImmersiveStyles />
      <ElegantStyles />

      {/* Opening effects */}
      <IntroCurtain />
      <CursorGlow />
      <ElegantEffects />

      {/* Global effects */}
      <ScrollProgress />
      <BackToTop />

      {/* Main EcoVision Bali sections */}
      <Navbar />
      <Hero />
      <WasteScanner />
      <CategoryExplorer />
      <EcoQuizGame />
      <HowItWorks />
      <BaliImpact />
      <Footer />
    </LanguageProvider>
  );
}

function EcoQuizGame() {
  const { t, lang } = useLang();
  // topic/difficulty values stay in English (sent to the API); only the labels are translated
  const [topic, setTopic] = useState("Waste Management");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState<
    {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

  async function startQuiz() {
    setLoading(true);
    setError("");
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, lang }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || t('quiz.createFail'));
      }

      setQuestions(data.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('quiz.error'));
    } finally {
      setLoading(false);
    }
  }

  function selectOption(optionIndex: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionIndex);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  }

  return (
    <section id="eco-quiz" className="relative overflow-hidden bg-[#F4FBF5] px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex rounded-full bg-[#DDF3E5] px-4 py-2 text-sm font-semibold text-[#238653]">
          {t('quiz.badge')}
        </span>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#123B2A] md:text-5xl">{t('quiz.title')}</h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#718078]">{t('quiz.desc')}</p>

        {!questions.length && (
          <div className="mx-auto mt-10 rounded-3xl bg-white p-8 text-left shadow-lg ring-1 ring-[#DDF3E5]">
            <h3 className="text-xl font-bold text-[#123B2A]">{t('quiz.ready')}</h3>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-[#123B2A]">{t('quiz.topic')}</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#DDF3E5] bg-white p-3 text-[#123B2A] outline-none focus:ring-2 focus:ring-[#238653]"
              >
                <option value="Waste Management">{t('quiz.t1')}</option>
                <option value="Bali's Environment">{t('quiz.t2')}</option>
                <option value="Balinese Culture and Environment">{t('quiz.t3')}</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-[#123B2A]">{t('quiz.diff')}</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#DDF3E5] bg-white p-3 text-[#123B2A] outline-none focus:ring-2 focus:ring-[#238653]"
              >
                <option value="Easy">{t('quiz.easy')}</option>
                <option value="Medium">{t('quiz.medium')}</option>
                <option value="Hard">{t('quiz.hard')}</option>
              </select>
            </div>

            {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}

            <button
              type="button"
              onClick={startQuiz}
              disabled={loading}
              className="mt-7 w-full rounded-full bg-[#238653] px-6 py-4 font-bold text-white transition hover:bg-[#123B2A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t('quiz.creating') : t('quiz.start')}
            </button>
          </div>
        )}

        {questions.length > 0 && (
          <div className="mx-auto mt-10 rounded-3xl bg-white p-8 text-left shadow-lg ring-1 ring-[#DDF3E5]">
            {finished ? (
              <div className="py-8 text-center">
                <div className="text-6xl">🏆</div>
                <h3 className="mt-5 text-2xl font-bold text-[#123B2A]">{t('quiz.complete')}</h3>
                <p className="mt-3 text-lg text-[#718078]">
                  {t('quiz.score')}: {score} {t('quiz.outOf')} {questions.length}
                </p>
                <button
                  type="button"
                  onClick={startQuiz}
                  className="mt-7 rounded-full bg-[#238653] px-8 py-3 font-bold text-white hover:bg-[#123B2A]"
                >
                  {t('quiz.again')}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[#238653]">
                    {t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {questions.length}
                  </span>
                  <span className="text-sm font-semibold text-[#718078]">
                    {t('quiz.scoreShort')}: {score}
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#DDF3E5]">
                  <div
                    className="h-full rounded-full bg-[#238653] transition-all"
                    style={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>

                <h3 className="mt-8 text-xl font-bold leading-relaxed text-[#123B2A]">
                  {questions[currentQuestion].question}
                </h3>

                <div className="mt-6 space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === questions[currentQuestion].correctAnswer;
                    const isSelected = selectedAnswer === index;

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={selectedAnswer !== null}
                        onClick={() => selectOption(index)}
                        className={`w-full rounded-2xl border p-4 text-left transition ${
                          selectedAnswer !== null && isCorrect
                            ? "border-green-500 bg-green-50 text-green-800"
                            : isSelected
                              ? "border-rose-400 bg-rose-50 text-rose-700"
                              : "border-[#DDF3E5] text-[#123B2A] hover:bg-[#F4FBF5]"
                        }`}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className="mt-6 rounded-2xl bg-[#F4FBF5] p-5">
                    <p className="font-bold text-[#123B2A]">
                      {selectedAnswer === questions[currentQuestion].correctAnswer
                        ? t('quiz.correct')
                        : t('quiz.wrong')}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#718078]">{questions[currentQuestion].explanation}</p>
                    <button
                      type="button"
                      onClick={nextQuestion}
                      className="mt-5 w-full rounded-full bg-[#238653] px-6 py-3 font-bold text-white hover:bg-[#123B2A]"
                    >
                      {currentQuestion === questions.length - 1 ? t('quiz.results') : t('quiz.next')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
