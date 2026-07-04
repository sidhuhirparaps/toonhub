import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiBlender,
  SiPython,
  SiZapier,
  SiShopify,
  SiWordpress,
  SiPhp
} from 'react-icons/si';
import {
  TbBrandOpenai
} from 'react-icons/tb';

const PERSONAS = [
  {
    title: 'WEB DEVELOPMENT',
    subtitle: 'FULL STACK MASCOT',
    bg: '#1E3A8A', // Deep cobalt blue
    panel: '#3B82F6', // Lighter blue
    textColor: '#EFF6FF',
    slogan: 'BUILD.',
    sleeveText: 'NEXT.JS // THREE.JS // GSAP',
    desc: 'Crafting blazing-fast interactive web applications with React, TypeScript, and modern design systems. Focused on flawless performance and premium styling.',
    ghostText: 'WEB DEV',
    logos: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Next.js' }
    ],
    src: 'webdev_jolly.png?v=3',
  },
  {
    title: 'VIDEO EDITING',
    subtitle: 'MOTION DESIGN MASCOT',
    bg: '#5B21B6', // Deep purple
    panel: '#8B5CF6', // Violet
    textColor: '#F5F3FF',
    slogan: 'CUT THE NOISE',
    sleeveText: '60FPS // RENDER',
    desc: 'Designing high-retention, cinematic-style video content with custom transitions, audio engineering, and engaging motion graphics that hook viewers.',
    ghostText: 'MOTION',
    logos: [
      { name: 'Premiere Pro' },
      { name: 'After Effects' },
      { name: 'Blender' }
    ],
    src: 'edit_jolly.png?v=2',
    centerScale: 1.68,
    centerBottom: '-11%',
    mobileCenterScale: 1.25,
    mobileCenterBottom: '14%',
  },
  {
    title: 'WORKFLOW AUTOMATION',
    subtitle: 'API & INTEGRATIONS MASCOT',
    bg: '#064E3B', // Deep emerald
    panel: '#10B981', // Mint/emerald
    textColor: '#ECFDF5',
    slogan: 'FLOW STATE',
    sleeveText: 'CRON // ACTIVE',
    desc: 'Connecting APIs, building automated scrapers, database syncs, and custom backend scripts to eliminate repetitive tasks and streamline workflows.',
    ghostText: 'AUTOMATE',
    logos: [
      { name: 'Python' },
      { name: 'Zapier' },
      { name: 'OpenAI' }
    ],
    src: 'Automation.png',
  },
  {
    title: 'CMS & E-COMMERCE',
    subtitle: 'SHOPIFY & WORDPRESS MASCOT',
    bg: '#78350F', // Dark amber/brown
    panel: '#F59E0B', // Amber
    textColor: '#FEF3C7',
    slogan: 'SCALE UP',
    sleeveText: 'CMS // CONVERT',
    desc: 'Developing high-converting, custom-tailored e-commerce stores and CMS websites with custom theme components, plugins, and speed optimization.',
    ghostText: 'COMMERCE',
    logos: [
      { name: 'Shopify' },
      { name: 'WordPress' },
      { name: 'PHP' }
    ],
    src: 'ecommerce.png',
    centerScale: 1.68,
    centerBottom: '-14%',
    mobileCenterScale: 1.25,
    mobileCenterBottom: '15%',
  },
] as const;

const ANIM_MS = 650;
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const ITEM_TRANSITION = `transform ${ANIM_MS}ms ${EASE}, filter ${ANIM_MS}ms ${EASE}, opacity ${ANIM_MS}ms ${EASE}, left ${ANIM_MS}ms ${EASE}, height ${ANIM_MS}ms ${EASE}, bottom ${ANIM_MS}ms ${EASE}`;

type Role = 'center' | 'left' | 'right' | 'back';

function getRole(imageIndex: number, activeIndex: number): Role {
  if (imageIndex === activeIndex) return 'center';
  if (imageIndex === (activeIndex + 3) % 4) return 'left';
  if (imageIndex === (activeIndex + 1) % 4) return 'right';
  return 'back';
}

function getItemStyle(role: Role, isMobile: boolean, persona?: typeof PERSONAS[number]): CSSProperties {
  const base: CSSProperties = {
    position: 'absolute',
    aspectRatio: '0.6 / 1',
    transform: 'translateX(-50%)',
    transition: ITEM_TRANSITION,
    willChange: 'transform, filter, opacity',
  };

  // Determine scale and bottom positioning, allowing custom overrides per persona
  let centerScale = isMobile ? 1.25 : 1.68;
  let bottom = isMobile ? '22%' : '0';

  if (persona && role === 'center') {
    if (isMobile) {
      centerScale = (persona as any).mobileCenterScale ?? 1.25;
      bottom = (persona as any).mobileCenterBottom ?? '22%';
    } else {
      centerScale = (persona as any).centerScale ?? 1.68;
      bottom = (persona as any).centerBottom ?? '0';
    }
  }

  switch (role) {
    case 'center':
      return {
        ...base,
        transform: `translateX(-50%) scale(${centerScale})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom,
      };
    case 'left':
      return {
        ...base,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '20%' : '30%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    case 'right':
      return {
        ...base,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '80%' : '70%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    case 'back':
      return {
        ...base,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: 1,
        zIndex: 5,
        left: '50%',
        height: isMobile ? '13%' : '22%',
        bottom: isMobile ? '32%' : '12%',
      };
  }
}

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

function TechIcon({ name }: { name: string }) {
  const iconClass = "w-6 h-6 transition-transform duration-300 hover:scale-110";

  switch (name) {
    case 'React':
      return <SiReact className={iconClass} style={{ color: '#61DAFB' }} />;
    case 'TypeScript':
      return <SiTypescript className={iconClass} style={{ color: '#3178C6' }} />;
    case 'Next.js':
      return <SiNextdotjs className={iconClass} style={{ color: '#FFFFFF' }} />;
    case 'Premiere Pro':
      return (
        <svg viewBox="0 0 100 100" className={iconClass}>
          <rect width="100" height="100" rx="22" fill="#000046" />
          <text
            x="50"
            y="65"
            fill="#9099FF"
            fontSize="48"
            fontWeight="bold"
            fontFamily="'Inter', 'Outfit', sans-serif"
            textAnchor="middle"
            letterSpacing="-0.02em"
          >
            Pr
          </text>
        </svg>
      );
    case 'After Effects':
      return (
        <svg viewBox="0 0 100 100" className={iconClass}>
          <rect width="100" height="100" rx="22" fill="#000046" />
          <text
            x="50"
            y="65"
            fill="#9099FF"
            fontSize="48"
            fontWeight="bold"
            fontFamily="'Inter', 'Outfit', sans-serif"
            textAnchor="middle"
            letterSpacing="-0.02em"
          >
            Ae
          </text>
        </svg>
      );
    case 'Blender':
      return <SiBlender className={iconClass} style={{ color: '#E87D0D' }} />;
    case 'Python':
      return <SiPython className={iconClass} style={{ color: '#3776AB' }} />;
    case 'Zapier':
      return <SiZapier className={iconClass} style={{ color: '#FF4F00' }} />;
    case 'OpenAI':
      return <TbBrandOpenai className={iconClass} style={{ color: '#10A37F' }} />;
    case 'Shopify':
      return <SiShopify className={iconClass} style={{ color: '#96BF48' }} />;
    case 'WordPress':
      return <SiWordpress className={iconClass} style={{ color: '#21759B' }} />;
    case 'PHP':
      return <SiPhp className={iconClass} style={{ color: '#777BB4' }} />;
    default:
      return null;
  }
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );
  const [pointerStart, setPointerStart] = useState<number | null>(null);

  useEffect(() => {
    PERSONAS.forEach((p) => {
      const el = new Image();
      el.src = p.src;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4,
      );
      window.setTimeout(() => setIsAnimating(false), ANIM_MS);
    },
    [isAnimating],
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only trigger for main (left) click
    setPointerStart(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (pointerStart === null) return;
    const diffX = e.clientX - pointerStart;
    const threshold = 50; // pixels to trigger navigation

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        navigate('prev');
      } else {
        navigate('next');
      }
    }
    setPointerStart(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, [pointerStart, navigate]);

  const handlePointerCancel = useCallback((e: React.PointerEvent) => {
    setPointerStart(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const active = PERSONAS[activeIndex];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: active.bg,
        fontFamily: "'Inter', sans-serif",
        transition: `background-color ${ANIM_MS}ms ${EASE}`,
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: GRAIN_SVG,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
          aria-hidden
        />

        {/* Giant ghost text with elegant state changes */}
        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center transition-all duration-700 ease-in-out"
          style={{
            top: '16%',
            zIndex: 2,
            opacity: isAnimating ? 0.25 : 1,
            transform: `scale(${isAnimating ? 0.95 : 1})`,
          }}
        >
          <span
            className="whitespace-nowrap uppercase transition-all duration-700"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 24vw, 360px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '0.06em',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.16)',
            }}
          >
            {active.ghostText}
          </span>
        </div>

        {/* Brand label */}
        <div
          className="absolute left-4 top-6 z-[60] flex items-center gap-2.5 select-none sm:left-8"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white font-extrabold text-sm tracking-tighter border border-white/20 shadow-md">
            S
          </div>
          <div className="flex flex-col justify-center leading-none">
            <span className="text-[9px] font-semibold tracking-[0.25em] text-white/50 uppercase mb-0.5">
              CREATIVE
            </span>
            <span className="text-xs font-black tracking-widest text-white uppercase">
              SKILL<span className="text-white/60 font-medium">HUB</span>
            </span>
          </div>
        </div>

        {/* Floating related skills logos around the active figure */}
        {/* Desktop Version */}
        <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
          <div
            className="absolute animate-float-1 glass-badge flex items-center gap-3.5 px-6 py-3.5 rounded-2xl text-white font-semibold text-sm tracking-wider transition-all duration-700"
            style={{
              left: 'calc(50% - 20vw)',
              top: '26%',
              opacity: isAnimating ? 0 : 1,
              transform: `scale(${isAnimating ? 0.8 : 1})`,
              boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.2), 0 0 15px ${active.panel}44`
            }}
          >
            <TechIcon name={active.logos[0].name} />
            <span>{active.logos[0].name}</span>
          </div>

          <div
            className="absolute animate-float-2 glass-badge flex items-center gap-3.5 px-6 py-3.5 rounded-2xl text-white font-semibold text-sm tracking-wider transition-all duration-700"
            style={{
              right: 'calc(50% - 20vw)',
              top: '40%',
              opacity: isAnimating ? 0 : 1,
              transform: `scale(${isAnimating ? 0.8 : 1})`,
              boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.2), 0 0 15px ${active.panel}44`
            }}
          >
            <TechIcon name={active.logos[1].name} />
            <span>{active.logos[1].name}</span>
          </div>

          <div
            className="absolute animate-float-3 glass-badge flex items-center gap-3.5 px-6 py-3.5 rounded-2xl text-white font-semibold text-sm tracking-wider transition-all duration-700"
            style={{
              left: 'calc(50% - 18vw)',
              top: '56%',
              opacity: isAnimating ? 0 : 1,
              transform: `scale(${isAnimating ? 0.8 : 1})`,
              boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.2), 0 0 15px ${active.panel}44`
            }}
          >
            <TechIcon name={active.logos[2].name} />
            <span>{active.logos[2].name}</span>
          </div>
        </div>

        {/* Mobile Version Floating Badges */}
        <div className="absolute inset-0 pointer-events-none z-30 md:hidden">
          <div
            className="absolute animate-float-1 glass-badge flex items-center gap-2 px-3 py-2 rounded-xl text-white font-semibold text-[11px] tracking-wide transition-all duration-700"
            style={{
              left: '5%',
              top: '32%',
              opacity: isAnimating ? 0 : 1,
              boxShadow: `0 4px 16px 0 rgba(0, 0, 0, 0.2), 0 0 10px ${active.panel}33`
            }}
          >
            <TechIcon name={active.logos[0].name} />
            <span>{active.logos[0].name}</span>
          </div>

          <div
            className="absolute animate-float-2 glass-badge flex items-center gap-2 px-3 py-2 rounded-xl text-white font-semibold text-[11px] tracking-wide transition-all duration-700"
            style={{
              right: '5%',
              top: '44%',
              opacity: isAnimating ? 0 : 1,
              boxShadow: `0 4px 16px 0 rgba(0, 0, 0, 0.2), 0 0 10px ${active.panel}33`
            }}
          >
            <TechIcon name={active.logos[1].name} />
            <span>{active.logos[1].name}</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none select-none"
          style={{ zIndex: 3 }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {PERSONAS.map((p, index) => {
            const role = getRole(index, activeIndex);
            return (
              <div key={p.title} style={getItemStyle(role, isMobile, p)}>
                <img
                  src={p.src}
                  alt={p.title}
                  draggable={false}
                  className="h-full w-full select-none pointer-events-none"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Section (Copy & Navigation + HIRE ME Button) */}
        <div className="absolute bottom-6 left-4 right-4 sm:bottom-16 sm:left-12 sm:right-12 z-[60] flex flex-col md:flex-row items-center md:items-end justify-between gap-6 transition-all duration-500">

          {/* Left section: copy + nav */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left" style={{ maxWidth: 480 }}>
            {/* Tagline showing user-slogan & details (Stats HUD - hidden on mobile/tablet) */}
            <div className="mb-3 hidden md:flex flex-wrap gap-2 select-none">
              <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded bg-white/10 text-white font-mono tracking-wider uppercase border border-white/10">
                Chest: "{active.slogan}"
              </span>
              <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded bg-white/10 text-white font-mono tracking-wider uppercase border border-white/10">
                Sleeve: {active.sleeveText}
              </span>
            </div>

            <div className="mb-3 sm:mb-5">
              <span className="block text-xs font-bold tracking-[0.26em] text-white/70 uppercase mb-0.5 sm:mb-1">
                {active.subtitle}
              </span>
              <h2
                className="text-3xl sm:text-6xl font-black uppercase text-white leading-[1.1] tracking-[0.03em] transition-all duration-500"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                {active.title}
              </h2>
            </div>

            <p
              className="mb-5 hidden text-xs text-white/95 sm:mb-7 sm:block sm:text-sm"
              style={{ opacity: 0.9, lineHeight: 1.6, letterSpacing: '0.01em' }}
            >
              {active.desc}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous figurine"
                onClick={() => navigate('prev')}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white bg-transparent transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10 sm:h-16 sm:w-16"
              >
                <ArrowLeft size={26} strokeWidth={2.25} />
              </button>
              <button
                type="button"
                aria-label="Next figurine"
                onClick={() => navigate('next')}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white bg-transparent transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10 sm:h-16 sm:w-16"
              >
                <ArrowRight size={26} strokeWidth={2.25} />
              </button>
            </div>
          </div>

          {/* Right section: HIRE US Button (Interactive Pill) */}
          <a
            href="https://www.sidhuhirpara.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 pl-7 pr-3 py-3 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black hover:border-white select-none"
            style={{
              fontSize: '13px',
              boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.2)`
            }}
          >
            <span>HIRE US</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-black group-hover:text-white">
              <ArrowRight size={20} strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
