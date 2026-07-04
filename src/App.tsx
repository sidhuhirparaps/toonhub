import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
      { name: 'Premiere' },
      { name: 'After Effects' },
      { name: 'Blender' }
    ],
    src: 'edit_jolly.png',
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
  switch (name) {
    case 'React':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" stroke="#61DAFB" strokeWidth="2.5">
          <ellipse cx="50" cy="50" rx="8" ry="22" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="8" ry="22" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="8" ry="22" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="4.5" fill="#61DAFB" />
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <rect width="100" height="100" rx="15" fill="#3178C6" />
          <text x="20" y="80" fill="white" fontSize="60" fontWeight="bold" fontFamily="sans-serif">TS</text>
        </svg>
      );
    case 'Next.js':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" stroke="#FFFFFF" strokeWidth="4">
          <circle cx="50" cy="50" r="44" stroke="#FFFFFF" />
          <path d="M70 70 L38 32 L38 68" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M62 32 L62 55" stroke="#FFFFFF" strokeLinecap="round" />
        </svg>
      );
    case 'Premiere':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <rect width="100" height="100" rx="15" fill="#00005C" />
          <text x="18" y="72" fill="#EA38FF" fontSize="52" fontWeight="bold" fontFamily="sans-serif">Pr</text>
        </svg>
      );
    case 'After Effects':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <rect width="100" height="100" rx="15" fill="#00005C" />
          <text x="15" y="72" fill="#9999FF" fontSize="52" fontWeight="bold" fontFamily="sans-serif">Ae</text>
        </svg>
      );
    case 'Blender':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <path d="M50 10 C62 10 75 18 80 28 C85 38 82 52 72 60 C68 63 60 65 52 65 C38 65 25 54 22 40 C20 28 28 15 40 11 C43 10 47 10 50 10 Z" fill="#E87D0D" />
          <circle cx="50" cy="38" r="14" fill="white" />
          <circle cx="50" cy="38" r="7" fill="#E87D0D" />
          <path d="M50 24 C55 24 75 12 85 24 M50 38 C55 45 75 48 80 62 M50 52 C45 60 70 75 75 80" stroke="white" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <path d="M50 10 C30 10 28 18 28 28 L28 36 L50 36 L50 40 L20 40 C10 40 10 50 10 60 C10 70 18 72 28 72 L34 72 L34 66 C34 56 42 48 52 48 L72 48 L72 40 C72 30 64 28 54 28 L48 28 L48 22 C48 12 40 10 30 10 Z" fill="#3776AB" />
          <path d="M50 90 C70 90 72 82 72 72 L72 64 L50 64 L50 60 L80 60 C90 60 90 50 90 40 C90 30 82 28 72 28 L66 28 L66 34 C66 44 58 52 48 52 L28 52 L28 60 C28 70 36 72 46 72 L52 72 L52 78 C52 88 60 90 70 90 Z" fill="#FFE873" />
          <circle cx="38" cy="22" r="3.5" fill="white" />
          <circle cx="62" cy="78" r="3.5" fill="black" />
        </svg>
      );
    case 'Zapier':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <polygon points="50,10 62,38 90,38 68,58 78,88 50,70 22,88 32,58 10,38 38,38" fill="#FF4F00" />
        </svg>
      );
    case 'OpenAI':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" stroke="#10A37F" strokeWidth="6">
          <path d="M50 20 A30 30 0 0 1 80 50 A30 30 0 0 1 50 80 A30 30 0 0 1 20 50 A30 30 0 0 1 50 20 Z" />
          <path d="M50 35 A15 15 0 0 1 65 50 A15 15 0 0 1 50 65 A15 15 0 0 1 35 50 A15 15 0 0 1 50 35 Z" />
          <path d="M50 20 L50 80 M20 50 L80 50" />
        </svg>
      );
    case 'Shopify':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <path d="M80 30 L65 15 C62 12 58 10 54 10 L46 10 C42 10 38 12 35 15 L20 30 L15 30 C12 30 10 32 10 35 L15 85 C16 88 18 90 22 90 L78 90 C82 90 84 88 85 85 L90 35 C90 32 88 30 85 30 L80 30 Z M50 18 C52 18 54 20 56 22 L64 30 L36 30 L44 22 C46 20 48 18 50 18 Z M45 45 C45 42 48 40 52 40 C56 40 58 42 58 45 C58 50 45 52 45 60 C45 65 48 68 52 68 C56 68 60 65 60 62 L55 62 C55 63 54 64 52 64 C50 64 49 63 49 61 C49 57 62 55 62 46 C62 40 58 36 52 36 C46 36 41 40 41 45 L45 45 Z" fill="#96BF48" />
        </svg>
      );
    case 'WordPress':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="#21759B" />
          <path d="M50 15 C31 15 15 31 15 50 C15 58 18 66 23 72 L36 36 L43 36 L49 55 L55 36 L61 36 L74 72 C79 66 82 50 82 50 C82 31 66 15 50 15 Z M50 82 C46 82 42 81 38 80 L47 54 L52 70 L50 82 Z M69 77 C63 80 57 82 50 82 C49 82 47 82 46 82 L55 58 L69 77 Z" fill="white" />
        </svg>
      );
    case 'PHP':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="currentColor">
          <ellipse cx="50" cy="50" rx="45" ry="30" fill="#777BB4" />
          <text x="20" y="60" fill="white" fontSize="32" fontWeight="bold" fontFamily="sans-serif" fontStyle="italic">PHP</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="4">
          <circle cx="50" cy="50" r="35" />
          <path d="M50 25 L50 75 M25 50 L75 50" />
        </svg>
      );
  }
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );

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
          className="absolute left-4 top-6 z-[60] text-sm font-black uppercase text-white sm:left-8 flex items-center gap-1.5 select-none"
          style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '0.12em' }}
        >
          <span className="px-1.5 py-0.5 bg-white text-black rounded-sm font-sans font-black text-xs">SKILL</span>
          <span>HUB</span>
        </div>

        {/* Floating related skills logos around the active figure */}
        {/* Desktop Version */}
        <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
          <div
            className="absolute animate-float-1 glass-badge flex items-center gap-3.5 px-6 py-3.5 rounded-2xl text-white font-semibold text-sm tracking-wider transition-all duration-700"
            style={{
              left: 'calc(50% - 390px)',
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
              right: 'calc(50% - 390px)',
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
              left: 'calc(50% - 350px)',
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
              left: '6%',
              top: '38%',
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
              right: '6%',
              top: '46%',
              opacity: isAnimating ? 0 : 1,
              boxShadow: `0 4px 16px 0 rgba(0, 0, 0, 0.2), 0 0 10px ${active.panel}33`
            }}
          >
            <TechIcon name={active.logos[1].name} />
            <span>{active.logos[1].name}</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {PERSONAS.map((p, index) => {
            const role = getRole(index, activeIndex);
            return (
              <div key={p.title} style={getItemStyle(role, isMobile, p)}>
                <img
                  src={p.src}
                  alt={p.title}
                  draggable={false}
                  className="h-full w-full select-none"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom-left copy + nav */}
        <div
          className="absolute bottom-6 left-4 z-[60] sm:bottom-20 sm:left-24 transition-all duration-500"
          style={{ maxWidth: 480 }}
        >
          {/* Tagline showing user-slogan & details */}
          <div className="mb-2 sm:mb-4 flex flex-wrap gap-2 select-none">
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

        {/* Bottom-right link */}
        <a
          href="https://www.sidhuhirpara.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-4 z-[60] flex items-center gap-2 uppercase text-white transition-all duration-200 hover:opacity-100 hover:translate-x-1 sm:bottom-20 sm:right-10"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(24px, 4vw, 56px)',
            fontWeight: 400,
            opacity: 0.95,
            letterSpacing: '0.02em',
            lineHeight: 1,
            textDecoration: 'none',
          }}
        >
          HIRE ME
          <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}
