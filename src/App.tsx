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
    subtitle: 'WEB & INTERACTIVE EXPERIENCES',
    title: 'WEB DEVELOPMENT',
    bg: '#1E3A8A', // Deep cobalt blue
    panel: '#3B82F6', // Lighter blue
    textColor: '#EFF6FF',
    desc: 'Architecting high-performance web applications, interactive 3D experiences, and scalable design systems with React, TypeScript, and Next.js.',
    ghostText: 'WEB DEV',
    logos: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Next.js' }
    ],
    src: 'webdev_jolly.png?v=3',
  },
  {
    subtitle: 'MOTION & POST-PRODUCTION',
    title: 'VIDEO EDITING',
    bg: '#5B21B6', // Deep purple
    panel: '#8B5CF6', // Violet
    textColor: '#F5F3FF',
    desc: 'Crafting high-retention visual stories, seamless motion transitions, pacing, and cinematic audio design across Premiere Pro, After Effects, and Blender.',
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
    subtitle: 'SYSTEMS & AUTOMATION',
    title: 'WORKFLOW AUTOMATION',
    bg: '#064E3B', // Deep emerald
    panel: '#10B981', // Mint/emerald
    textColor: '#ECFDF5',
    desc: 'Engineering autonomous API workflows, web scrapers, webhook pipelines, and custom backend tools to eliminate manual bottlenecks.',
    ghostText: 'AUTOMATE',
    logos: [
      { name: 'Python' },
      { name: 'Zapier' },
      { name: 'OpenAI' }
    ],
    src: 'Automation.png',
  },
  {
    subtitle: 'COMMERCE & CMS PLATFORMS',
    title: 'CMS & E-COMMERCE',
    bg: '#78350F', // Dark amber/brown
    panel: '#F59E0B', // Amber
    textColor: '#FEF3C7',
    desc: 'Building bespoke Shopify themes and scalable WordPress architectures engineered for checkout conversion and rapid page speeds.',
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
  let centerScale = isMobile ? 1.3 : 1.75;
  let bottom = isMobile ? '22%' : '0';

  if (persona && role === 'center') {
    if (isMobile) {
      centerScale = (persona as any).mobileCenterScale ?? 1.3;
      bottom = (persona as any).mobileCenterBottom ?? '22%';
    } else {
      centerScale = (persona as any).centerScale ?? 1.75;
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
        height: isMobile ? '64%' : '94%',
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
        height: isMobile ? '18%' : '30%',
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
        height: isMobile ? '18%' : '30%',
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
        height: isMobile ? '15%' : '24%',
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

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
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{
        backgroundColor: active.bg,
        fontFamily: "'Inter', sans-serif",
        transition: `background-color ${ANIM_MS}ms ${EASE}`,
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
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
            className="whitespace-nowrap uppercase transition-all duration-700 select-none text-center"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(50px, 15vw, 220px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '0.03em',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.16)',
            }}
          >
            {active.ghostText}
          </span>
        </div>

        {/* Brand logo: Skillhub */}
        <div
          className="absolute left-4 top-4 z-[60] flex items-center select-none sm:left-8 sm:top-6"
          style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          <div className="flex items-center text-xl sm:text-2xl font-black tracking-tighter leading-none drop-shadow-md">
            <span className="text-white mr-1.5 font-black tracking-tight">Skill</span>
            <span className="bg-[#F79B26] text-black px-2 py-1 rounded-md sm:rounded-lg font-black text-[0.88em] leading-none inline-flex items-center justify-center">
              hub
            </span>
          </div>
        </div>

        {/* Floating related skills logos around the active figure */}
        {/* Desktop Version */}
        <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
          <div
            className="absolute animate-float-1 glass-badge flex items-center gap-3.5 px-6 py-3.5 rounded-2xl text-white font-semibold text-sm tracking-wider transition-all duration-700"
            style={{
              left: 'calc(50% - 22vw)',
              top: '24%',
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
              right: 'calc(50% - 22vw)',
              top: '38%',
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
              left: 'calc(50% - 20vw)',
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
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-10 sm:left-10 sm:right-10 z-[60] flex flex-col md:flex-row items-center md:items-end justify-between gap-4 sm:gap-6 transition-all duration-500">

          {/* Left section: copy + nav */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left" style={{ maxWidth: 480 }}>
            <div className="mb-2 sm:mb-3 flex items-center select-none">
              <span
                className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-white/70 uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {active.subtitle}
              </span>
            </div>

            <h2
              className="text-3xl sm:text-6xl font-black uppercase text-white leading-[1.05] tracking-[0.02em] transition-all duration-500 mb-3 sm:mb-4"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {active.title}
            </h2>

            <p
              className="mb-5 hidden text-xs text-white/90 sm:mb-7 sm:block sm:text-sm max-w-[440px]"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                opacity: 0.9,
                lineHeight: 1.65,
                letterSpacing: '0.01em',
              }}
            >
              {active.desc}
            </p>

            <div className="flex gap-3.5 items-center">
              <button
                type="button"
                aria-label="Previous figurine (Left Arrow key)"
                title="Previous (← Arrow)"
                onClick={() => navigate('prev')}
                className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]"
              >
                <ArrowLeft size={22} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                aria-label="Next figurine (Right Arrow key)"
                title="Next (→ Arrow)"
                onClick={() => navigate('next')}
                className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]"
              >
                <ArrowRight size={22} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
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
              fontFamily: "'Space Grotesk', sans-serif",
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
