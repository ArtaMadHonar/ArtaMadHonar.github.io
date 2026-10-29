import React, { useState } from 'react';
import { Play, Pause, Sparkles, Eye, Film, Volume2, VolumeX, Maximize2, ShieldCheck, Cpu } from 'lucide-react';

interface VisualArtCanvasProps {
  type:
    | 'hero-showreel'
    | 'wonderful-day'
    | 'commercial-cgi'
    | 'vfx-mapping'
    | 'web3-nft'
    | 'game-lab'
    | 'character-concept'
    | 'character-saman'
    | 'character-poopi'
    | 'character-mentor'
    | 'character-creature';
  className?: string;
  onOpenViewer?: () => void;
  showControls?: boolean;
  imageUrl?: string;
}

export const VisualArtCanvas: React.FC<VisualArtCanvasProps> = ({
  type,
  className = '',
  onOpenViewer,
  showControls = true,
  imageUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);

  // Toggle playback
  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  // Toggle audio
  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Toggle wireframe view
  const handleWireframeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWireframeMode(!wireframeMode);
  };

  return (
    <div
      onClick={onOpenViewer}
      className={`relative group overflow-hidden select-none bg-[#1C1917] cursor-pointer transition-all duration-300 ${className}`}
    >
      {/* Background Graphic Content based on Type */}
      {type === 'hero-showreel' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#161412] via-[#2D241E] to-[#45362B] flex items-center justify-center">
          {/* Subtle warm animated ambient light */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_60%_40%,#D97706_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-30 mix-blend-color-dodge bg-[radial-gradient(circle_at_30%_70%,#F59E0B_0%,transparent_50%)]" />

          {/* SVG Artwork: Pixar Style Animated Masterpiece Teaser */}
          <svg
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'group-hover:scale-102'}`}
            viewBox="0 0 1200 675"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="warmLight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#D97706" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="skinGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <radialGradient id="hologramGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#B45309" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FDE68A" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
            </defs>

            {/* Architectural Studio Stage Background */}
            <rect width="1200" height="675" fill="#1C1815" />
            {wireframeMode && <rect width="1200" height="675" fill="url(#grid)" />}

            {/* Volumetric Sunbeam Shafts */}
            <polygon points="1200,0 800,0 350,675 750,675" fill="url(#warmLight)" opacity="0.35" />
            <polygon points="1100,0 950,0 550,675 800,675" fill="url(#warmLight)" opacity="0.45" />

            {/* Stylized Floating Mechanical Watch & Cinematic Gearworks */}
            <g transform="translate(680, 240)" opacity="0.85">
              <circle cx="0" cy="0" r="140" stroke="#FDE68A" strokeWidth={wireframeMode ? "1.5" : "3"} strokeDasharray="4 6" opacity="0.4" />
              <circle cx="0" cy="0" r="110" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
              <circle cx="0" cy="0" r="75" fill="#29201A" stroke="#FDE68A" strokeWidth="3" />
              <circle cx="0" cy="0" r="50" fill="url(#hologramGlow)" />
              {/* Planetary gears */}
              <circle cx="-35" cy="-20" r="18" stroke="#FDE68A" strokeWidth="2" fill="#1C1815" />
              <circle cx="35" cy="20" r="14" stroke="#FDE68A" strokeWidth="2" fill="#1C1815" />
              <line x1="0" y1="0" x2="25" y2="-45" stroke="#FDE68A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="-35" y2="15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Stylized Pixar Explorer Character Silhouette & Lighting */}
            <g transform="translate(380, 260)">
              {/* Character Back Rim Light */}
              <ellipse cx="60" cy="80" rx="95" ry="120" fill="#F59E0B" opacity="0.25" filter="blur(20px)" />
              {/* Body */}
              <path
                d="M 20 220 C 15 150, 45 120, 75 120 C 105 120, 135 150, 130 220 Z"
                fill="#3D2E24"
                stroke={wireframeMode ? "#FCD34D" : "none"}
                strokeWidth="1.5"
              />
              {/* Warm Scarf / Collar */}
              <path d="M 40 120 Q 75 140 110 120 Q 115 135 105 145 Q 75 155 45 145 Z" fill="#D97706" />
              {/* Head */}
              <circle cx="75" cy="70" r="52" fill="#E8B282" />
              {/* Stylized Hair */}
              <path d="M 28 65 C 25 35, 60 15, 85 20 C 110 25, 125 45, 120 75 C 115 50, 95 35, 75 40 C 50 45, 35 55, 28 65 Z" fill="#452718" />
              {/* Expressive Eyes */}
              <ellipse cx="62" cy="70" rx="9" ry="11" fill="#FFFFFF" />
              <circle cx="64" cy="70" r="5.5" fill="#1C1917" />
              <circle cx="66" cy="68" r="2" fill="#FFFFFF" />

              <ellipse cx="90" cy="70" rx="9" ry="11" fill="#FFFFFF" />
              <circle cx="92" cy="70" r="5.5" fill="#1C1917" />
              <circle cx="94" cy="68" r="2" fill="#FFFFFF" />

              {/* Gentle Smile */}
              <path d="M 68 90 Q 77 98 87 90" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Goggles on Forehead */}
              <ellipse cx="58" cy="42" rx="14" ry="11" fill="#D97706" stroke="#FDE68A" strokeWidth="2" />
              <ellipse cx="92" cy="42" rx="14" ry="11" fill="#D97706" stroke="#FDE68A" strokeWidth="2" />
              <path d="M 72 42 L 78 42" stroke="#FDE68A" strokeWidth="3" />
            </g>

            {/* Cute Robotic / Fluffy Companion */}
            <g transform="translate(560, 370)">
              <circle cx="40" cy="40" r="34" fill="#E2E8F0" stroke={wireframeMode ? "#38BDF8" : "none"} strokeWidth="1.5" />
              <ellipse cx="40" cy="38" rx="22" ry="14" fill="#0F172A" />
              <circle cx="34" cy="38" r="5" fill="#38BDF8" />
              <circle cx="46" cy="38" r="5" fill="#38BDF8" />
              <path d="M 40 6 L 40 0" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="40" cy="0" r="4" fill="#F59E0B" />
            </g>

            {/* Depth Dust & Bokeh Particles */}
            <circle cx="200" cy="180" r="3" fill="#FDE68A" opacity="0.6" />
            <circle cx="280" cy="320" r="5" fill="#FDE68A" opacity="0.4" />
            <circle cx="880" cy="150" r="4" fill="#FDE68A" opacity="0.5" />
            <circle cx="980" cy="450" r="6" fill="#FDE68A" opacity="0.3" />
            <circle cx="620" cy="120" r="2" fill="#FDE68A" opacity="0.7" />
          </svg>
        </div>
      )}

      {type === 'wonderful-day' && (
        <div className="absolute inset-0 bg-[#0C0B0A] flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <>
              {/* Ambient blurred backdrop to prevent harsh black borders */}
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-125 pointer-events-none"
              />
              {/* Main uncropped artwork poster */}
              <img
                src={imageUrl}
                alt="انیمیشن سینمایی روز شگفت‌انگیز"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="sync"
                className="relative z-10 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-101"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <svg className="w-full h-full object-cover hidden" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1200" height="675" fill="#291F18" />
              </svg>
            </>
          ) : (
            <svg className="w-full h-full object-cover" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="persianSun" cx="70%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#78350F" stopOpacity="0.0" />
                </radialGradient>
                <linearGradient id="oasisDunes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
              </defs>

              {/* Sky & Radiant Sun */}
              <rect width="1200" height="675" fill="#291F18" />
              <rect width="1200" height="675" fill="url(#persianSun)" />

              {/* Distant Persian Clay Architectural Domes & Minarets */}
              <g opacity="0.45" fill="#6B3C18">
                <path d="M 500 450 Q 560 320 620 450 Z" />
                <rect x="548" y="300" width="24" height="60" rx="3" />
                <path d="M 560 270 Q 550 300 570 300 Z" />

                <path d="M 640 450 Q 720 280 800 450 Z" />
                <rect x="708" y="250" width="24" height="60" rx="3" />
                <circle cx="720" cy="245" r="7" fill="#FDE68A" />

                <path d="M 380 450 Q 430 350 480 450 Z" />
              </g>

              {/* Stylized Rolling Golden Dunes */}
              <path d="M 0 520 Q 300 440 650 510 T 1200 480 L 1200 675 L 0 675 Z" fill="url(#oasisDunes)" opacity="0.8" />
              <path d="M 0 580 Q 400 520 850 590 T 1200 560 L 1200 675 L 0 675 Z" fill="#2A1305" />

              {/* Feature Film Protagonist: Young Hero & Companion on Hilltop */}
              <g transform="translate(580, 390)">
                {/* Hilltop Glow */}
                <ellipse cx="60" cy="110" rx="140" ry="25" fill="#F59E0B" opacity="0.3" filter="blur(10px)" />
                {/* Hero Silhouette with Golden Rim Lighting */}
                <circle cx="50" cy="50" r="28" fill="#FDE68A" />
                <path d="M 25 110 C 25 80, 75 80, 75 110 Z" fill="#F59E0B" />
                <path d="M 75 80 L 110 50" stroke="#FEF08A" strokeWidth="5" strokeLinecap="round" />
                {/* Pointing to the Horizon */}
                <circle cx="112" cy="48" r="4" fill="#FFFFFF" />

                {/* Small Pet Companion next to him */}
                <ellipse cx="10" cy="95" rx="16" ry="14" fill="#FDE68A" />
                <circle cx="10" cy="80" r="10" fill="#FEF08A" />
                <path d="M 2 74 L 6 82" stroke="#78350F" strokeWidth="2" />
                <path d="M 18 74 L 14 82" stroke="#78350F" strokeWidth="2" />
              </g>

              {/* Cinema Title typography watermark inside preview */}
              <text x="600" y="210" textAnchor="middle" fill="#FAF8F5" fillOpacity="0.12" fontSize="56" fontWeight="bold" fontFamily="Vazirmatn">
                A WONDERFUL DAY
              </text>
            </svg>
          )}
        </div>
      )}

      {type === 'commercial-cgi' && (
        <div className="absolute inset-0 bg-[#0C0B0A] flex items-center justify-center overflow-hidden">
          {/* Ambient blurred backdrop to prevent harsh black borders */}
          <img
            src={imageUrl || 'https://s1.uploadkon.ir/94160ee8-99c8-4a18-996e-9ceb72a0da45/94160ee8-99c8-4a18-996e-9ceb72a0da45-Moeini%20Teaser%202.webp'}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-125 pointer-events-none"
          />
          {/* Main uncropped artwork */}
          <img
            src={imageUrl || 'https://s1.uploadkon.ir/94160ee8-99c8-4a18-996e-9ceb72a0da45/94160ee8-99c8-4a18-996e-9ceb72a0da45-Moeini%20Teaser%202.webp'}
            alt="تیزرسازی تبلیغاتی سطح بالا"
            referrerPolicy="no-referrer"
            loading="eager"
            className="relative z-10 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-101"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <svg className="w-full h-full object-cover hidden" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="chromeLight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#A8A29E" />
                <stop offset="50%" stopColor="#292524" />
                <stop offset="75%" stopColor="#78716C" />
                <stop offset="100%" stopColor="#1C1917" />
              </linearGradient>
              <linearGradient id="amberLiquid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
            <rect width="800" height="600" fill="#0C0B0A" />
            <ellipse cx="400" cy="100" rx="300" ry="100" fill="#FFFFFF" opacity="0.04" filter="blur(40px)" />
            <ellipse cx="400" cy="460" rx="220" ry="35" fill="#1C1917" stroke="#44403C" strokeWidth="1" />
            <ellipse cx="400" cy="460" rx="140" ry="18" fill="#F59E0B" opacity="0.12" filter="blur(15px)" />
            <g transform="translate(330, 200)">
              <rect x="25" y="0" width="90" height="30" rx="4" fill="url(#chromeLight)" stroke="#78716C" strokeWidth="1" />
              <path
                d="M 10 40 C 0 80, -20 200, 10 240 C 20 250, 120 250, 130 240 C 160 200, 140 80, 130 40 Z"
                fill="#1C1917"
                stroke="#57534E"
                strokeWidth="1.5"
              />
              <path
                d="M 25 70 C 20 100, 10 180, 25 210 C 35 220, 105 220, 115 210 C 130 180, 120 100, 115 70 Z"
                fill="url(#amberLiquid)"
                opacity="0.75"
              />
              <line x1="30" y1="65" x2="20" y2="215" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
              <line x1="42" y1="75" x2="35" y2="190" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
            </g>
          </svg>
        </div>
      )}

      {type === 'vfx-mapping' && (
        <div className="absolute inset-0 bg-[#101819] flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="laserBeam1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D6B16A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D6B16A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="laserBeam2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#65B7B5" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#82B9D8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="1200" height="675" fill="#101819" />

            {/* Stadium Mega Stage Architecture */}
            <polygon points="200,500 400,200 800,200 1000,500" stroke="#3E777A" strokeWidth="2" fill="#162224" />
            <polygon points="300,500 450,280 750,280 900,500" stroke="#D6B16A" strokeWidth="1.5" strokeOpacity="0.65" fill="#1C2A2C" />
            <polygon points="400,500 500,340 700,340 800,500" stroke="#65B7B5" strokeWidth="1.5" strokeOpacity="0.6" fill="#132326" />

            {/* Projection Mapping Holographic Cube on Stage */}
            <g transform="translate(600, 360)">
              <polygon points="0,-80 70,-40 0,0 -70,-40" fill="#65B7B5" fillOpacity="0.35" stroke="#EDE9DF" strokeWidth="1.5" />
              <polygon points="-70,-40 0,0 0,80 -70,40" fill="#3E777A" fillOpacity="0.45" stroke="#EDE9DF" strokeWidth="1.5" />
              <polygon points="0,0 70,-40 70,40 0,80" fill="#D6B16A" fillOpacity="0.5" stroke="#EDE9DF" strokeWidth="1.5" />
            </g>

            {/* Monumental Stage Lasers */}
            <polygon points="600,200 100,0 150,0" fill="url(#laserBeam1)" opacity="0.6" />
            <polygon points="600,200 1050,0 1100,0" fill="url(#laserBeam1)" opacity="0.6" />
            <polygon points="500,220 0,150 0,200" fill="url(#laserBeam2)" opacity="0.45" />
            <polygon points="700,220 1200,150 1200,200" fill="url(#laserBeam2)" opacity="0.45" />

            {/* Cheering Crowd Silhouettes */}
            <path
              d="M 0 675 Q 50 580 100 675 Q 150 570 200 675 Q 250 590 300 675 Q 350 560 400 675 Q 450 585 500 675 Q 550 570 600 675 Q 650 580 700 675 Q 750 565 800 675 Q 850 580 900 675 Q 950 570 1000 675 Q 1050 585 1100 675 Q 1150 570 1200 675 Z"
              fill="#0A0F10"
            />
          </svg>
        </div>
      )}

      {type === 'web3-nft' && (
        <div className="absolute inset-0 bg-[#131C1E] flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ethGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#65B7B5" />
                <stop offset="100%" stopColor="#82B9D8" />
              </linearGradient>
            </defs>
            <rect width="1200" height="675" fill="#131C1E" />

            {/* Sacred Geometry Circles */}
            <circle cx="600" cy="338" r="190" stroke="#3E777A" strokeWidth="1" strokeDasharray="6 6" opacity="0.6" />
            <circle cx="600" cy="338" r="145" stroke="#65B7B5" strokeWidth="1.5" opacity="0.4" />
            <circle cx="600" cy="338" r="95" stroke="#D6B16A" strokeWidth="1" opacity="0.5" />

            {/* Ethereum Rhombus Emblem Silhouette */}
            <polygon points="600,198 670,318 600,358 530,318" fill="url(#ethGradient)" opacity="0.85" />
            <polygon points="600,373 670,333 600,428 530,333" fill="url(#ethGradient)" opacity="0.65" />

            {/* Stylized 2D Collectible Character Silhouette */}
            <circle cx="600" cy="308" r="45" fill="#EDE9DF" />
            <path d="M 580 303 Q 600 316 620 303" stroke="#1E2424" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="588" cy="296" rx="4" ry="6" fill="#1E2424" />
            <ellipse cx="612" cy="296" rx="4" ry="6" fill="#1E2424" />
            {/* Horns / Sacred Crown */}
            <path d="M 570 273 Q 550 218 540 198 Q 565 228 580 268" fill="#D6B16A" />
            <path d="M 630 273 Q 650 218 660 198 Q 635 228 620 268" fill="#D6B16A" />
          </svg>
        </div>
      )}

      {type === 'game-lab' && (
        <div className="absolute inset-0 bg-[#11191A] flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="675" fill="#11191A" />
            {/* Game Lab Sci-Fi Portal Grid */}
            <g stroke="#65B7B5" strokeWidth="1" opacity="0.3">
              <line x1="0" y1="338" x2="1200" y2="338" />
              <line x1="600" y1="0" x2="600" y2="675" />
              <circle cx="600" cy="338" r="80" />
              <circle cx="600" cy="338" r="160" strokeDasharray="8 8" />
              <circle cx="600" cy="338" r="240" />
            </g>
            {/* Interactive Futuristic Holographic Diamond */}
            <g transform="translate(600, 338)">
              <polygon points="0,-90 90,0 0,90 -90,0" fill="#182527" stroke="#65B7B5" strokeWidth="2" />
              <polygon points="0,-60 60,0 0,60 -60,0" fill="#3E777A" fillOpacity="0.4" stroke="#D6B16A" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="16" fill="#D6B16A" />
            </g>
          </svg>
        </div>
      )}

      {type === 'character-concept' && (
        <div className="absolute inset-0 bg-[#1A1816] flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 1067 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1067" height="600" fill="#1C1917" />
            {/* Concept Turnaround Orthographic Guides */}
            <line x1="80" y1="120" x2="987" y2="120" stroke="#57534E" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <line x1="80" y1="300" x2="987" y2="300" stroke="#57534E" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <line x1="80" y1="480" x2="987" y2="480" stroke="#57534E" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

            {/* Front View */}
            <g transform="translate(370, 300)">
              <ellipse cx="0" cy="-120" rx="40" ry="46" fill="#E8B282" />
              <path d="M -30 -160 C -30 -190, 30 -190, 30 -160 Z" fill="#452718" />
              <rect x="-35" y="-60" width="70" height="90" rx="8" fill="#D97706" />
              <line x1="-15" y1="30" x2="-15" y2="130" stroke="#452718" strokeWidth="14" strokeLinecap="round" />
              <line x1="15" y1="30" x2="15" y2="130" stroke="#452718" strokeWidth="14" strokeLinecap="round" />
            </g>

            {/* Side 3/4 View */}
            <g transform="translate(690, 300)">
              <ellipse cx="0" cy="-120" rx="34" ry="46" fill="#E8B282" />
              <path d="M -20 -160 C -10 -190, 40 -180, 20 -150 Z" fill="#452718" />
              <rect x="-25" y="-60" width="55" height="90" rx="8" fill="#D97706" />
              <line x1="-5" y1="30" x2="-5" y2="130" stroke="#452718" strokeWidth="14" strokeLinecap="round" />
              <line x1="20" y1="30" x2="15" y2="130" stroke="#452718" strokeWidth="14" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      )}

      {type === 'character-saman' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1B12] via-[#452718] to-[#1C120B] flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
            <radialGradient id="samanSun" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
            </radialGradient>
            <rect width="800" height="450" fill="#1F1510" />
            <circle cx="400" cy="180" r="140" fill="url(#samanSun)" />
            {/* Saman character with golden goggles */}
            <g transform="translate(400, 240)">
              {/* Explorer jacket */}
              <path d="M -70 140 C -80 60, -30 20, 0 20 C 30 20, 80 60, 70 140 Z" fill="#D97706" />
              <path d="M -40 20 Q 0 45 40 20 Q 30 55 0 50 Q -30 55 -40 20 Z" fill="#92400E" />
              {/* Head */}
              <circle cx="0" cy="-40" r="54" fill="#F6C492" />
              {/* Hair */}
              <path d="M -50 -50 C -45 -95, 30 -90, 50 -45 C 35 -70, -30 -75, -50 -50 Z" fill="#451A03" />
              {/* Goggles on head */}
              <ellipse cx="-22" cy="-68" rx="16" ry="13" fill="#D97706" stroke="#FEF08A" strokeWidth="2.5" />
              <ellipse cx="22" cy="-68" rx="16" ry="13" fill="#D97706" stroke="#FEF08A" strokeWidth="2.5" />
              <line x1="-6" y1="-68" x2="6" y2="-68" stroke="#FEF08A" strokeWidth="3" />
              {/* Expressive eyes */}
              <ellipse cx="-16" cy="-38" rx="8" ry="10" fill="#FFFFFF" />
              <circle cx="-14" cy="-38" r="5" fill="#18181B" />
              <circle cx="-12" cy="-40" r="1.5" fill="#FFFFFF" />

              <ellipse cx="16" cy="-38" rx="8" ry="10" fill="#FFFFFF" />
              <circle cx="18" cy="-38" r="5" fill="#18181B" />
              <circle cx="20" cy="-40" r="1.5" fill="#FFFFFF" />
              {/* Joyful smile */}
              <path d="M -12 -18 Q 0 -8 12 -18" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </div>
      )}

      {type === 'character-poopi' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="450" fill="#0B1120" />
            <circle cx="400" cy="225" r="120" fill="#38BDF8" opacity="0.15" filter="blur(30px)" />
            {/* Cute robotic companion */}
            <g transform="translate(400, 230)">
              {/* Floating shadow */}
              <ellipse cx="0" cy="90" rx="45" ry="10" fill="#020617" opacity="0.6" />
              {/* Antenna */}
              <line x1="0" y1="-65" x2="0" y2="-90" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
              <circle cx="0" cy="-94" r="7" fill="#F59E0B" />
              {/* Spherical body */}
              <circle cx="0" cy="-10" r="60" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
              {/* Visor faceplate */}
              <rect x="-42" y="-30" width="84" height="42" rx="21" fill="#0F172A" />
              {/* LED eyes */}
              <circle cx="-18" cy="-9" r="8" fill="#38BDF8" />
              <circle cx="18" cy="-9" r="8" fill="#38BDF8" />
              {/* Small jet thruster */}
              <path d="M -15 50 L 15 50 L 0 70 Z" fill="#F59E0B" opacity="0.8" />
            </g>
          </svg>
        </div>
      )}

      {type === 'character-mentor' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#38281B] via-[#2A1E14] to-[#17100B] flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="450" fill="#1C140E" />
            {/* Master Watchmaker Sohrab in workshop */}
            <g transform="translate(400, 220)">
              <circle cx="0" cy="0" r="110" stroke="#FDE68A" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <circle cx="0" cy="0" r="75" stroke="#F59E0B" strokeWidth="1.5" opacity="0.5" />
              {/* Body in warm coat */}
              <path d="M -60 140 C -70 50, -30 20, 0 20 C 30 20, 70 50, 60 140 Z" fill="#422006" />
              {/* Head with silver beard */}
              <circle cx="0" cy="-35" r="48" fill="#E5B287" />
              {/* Eyeglasses */}
              <circle cx="-16" cy="-36" r="10" stroke="#FDE68A" strokeWidth="2" fill="none" />
              <circle cx="16" cy="-36" r="10" stroke="#FDE68A" strokeWidth="2" fill="none" />
              <line x1="-6" y1="-36" x2="6" y2="-36" stroke="#FDE68A" strokeWidth="2" />
              {/* Kind eyes */}
              <circle cx="-16" cy="-36" r="3" fill="#18181B" />
              <circle cx="16" cy="-36" r="3" fill="#18181B" />
              {/* Soft beard */}
              <path d="M -30 -15 C -25 35, 25 35, 30 -15 Z" fill="#E2E8F0" />
            </g>
          </svg>
        </div>
      )}

      {type === 'character-creature' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#132A3B] via-[#0E1F2C] to-[#08121A] flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="450" fill="#0A161F" />
            <circle cx="400" cy="200" r="100" fill="#2DD4BF" opacity="0.2" filter="blur(25px)" />
            {/* Crystal creature */}
            <g transform="translate(400, 220)">
              {/* Rocky organic body */}
              <path d="M -50 80 Q -80 0 -30 -40 Q 0 -60 30 -40 Q 80 0 50 80 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
              {/* Crystal horns */}
              <polygon points="-25,-40 -35,-85 -15,-55" fill="#2DD4BF" opacity="0.9" />
              <polygon points="25,-40 35,-85 15,-55" fill="#2DD4BF" opacity="0.9" />
              <polygon points="0,-45 0,-95 8,-50" fill="#67E8F9" />
              {/* Bioluminescent eyes */}
              <ellipse cx="-20" cy="-5" rx="7" ry="9" fill="#2DD4BF" />
              <ellipse cx="20" cy="-5" rx="7" ry="9" fill="#2DD4BF" />
            </g>
          </svg>
        </div>
      )}

      {/* Scrim Overlay for Contrast & Metadata Readability (Only for Video Player) */}
      {showControls && type !== 'commercial-cgi' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />
      )}

      {/* Poster Mode Caption for commercial-cgi */}
      {type === 'commercial-cgi' && (
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium font-soft">
            <span>نمونه تولیدات تصویری و CGI</span>
          </div>
        </div>
      )}

      {/* Interactive Video Controls Overlay */}
      {showControls && type !== 'commercial-cgi' && (
        <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between pointer-events-auto">
          {/* Top Bar inside Card */}
          <div className="flex items-center justify-between text-xs text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-white/90 text-xs font-medium font-soft">
                ۴K Master Cinema
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                onClick={handleMuteToggle}
                aria-label="صدا"
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Center Play Button for Showcase */}
          <div className="flex items-center justify-center my-auto">
            <button
              onClick={handlePlayToggle}
              aria-label={isPlaying ? 'توقف پخش' : 'پخش ویدیو'}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FAF8F4]/95 hover:bg-[#FAF8F4] text-[#3E777A] flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 translate-x-0.5 fill-current" />
              )}
            </button>
          </div>

          {/* Bottom Bar: Quiet timecode & title */}
          <div className="flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/10 font-soft">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider latin-soft text-[#D6B16A]">
              A WONDERFUL DAY · 3D FEATURE
            </div>
            <div className="text-xs text-white/80">
              «روز شگفت‌انگیز» · آرتا ماد هنر
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
