import { useState } from "react";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";

interface MapPin {
  id: string;
  x: number; // left %
  y: number; // top %
  offsetX?: number;
  offsetY?: number;
}

const PINS: MapPin[] = [
  // Geographically accurate Web Mercator projection coordinates
  { id: "eden_fall",       x: 94.74, y: 70.77 },
  { id: "noahs_ark",       x: 80.53, y: 2.50 },
  { id: "tower_babel",     x: 81.16, y: 59.23 },
  { id: "parting_sea",     x: 18.68, y: 79.66 },
  { id: "tabernacle",      x: 26.18, y: 88.89 },
  { id: "walls_jericho",   x: 33.92, y: 62.00, offsetX: 10, offsetY: -10 },
  
  // Jerusalem Cluster (Spread out pixel-wise so they don't overlap)
  { id: "solomon_temple",  x: 32.82, y: 64.95, offsetX: -16, offsetY: 0 },
  { id: "herods_temple",   x: 32.82, y: 64.97, offsetX: -6, offsetY: 16 },
  { id: "ezekiel_temple",  x: 32.82, y: 64.92, offsetX: -6, offsetY: -16 },
  { id: "mount_of_olives", x: 32.87, y: 64.94, offsetX: 16, offsetY: 0 },
  { id: "golgotha",        x: 32.78, y: 64.94, offsetX: -28, offsetY: -8 },
  { id: "new_jerusalem",   x: 32.82, y: 64.94, offsetX: 0, offsetY: -32 },
];

export default function BibleMap({ onSelectStructure, onClose }: { onSelectStructure: (id: string) => void, onClose: () => void }) {
  const { locale } = useLocale();
  const structures = structuresFor(locale);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const base = import.meta.env.BASE_URL || "/";

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Exacte Geografische Locaties" : "Exact Geographic Locations"}
      onClose={onClose}
      wide={true}
    >
      <div className="relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-xl border border-line shadow-inner bg-paper" style={{ aspectRatio: '1024/704', minHeight: "400px" }}>
        
        {/* Real Geographic Map Background (Canvas Light Gray) */}
        <img 
          src={`${base}img/real-map-bg.jpg`}
          alt="Geographic Map of the Middle East"
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-80"
        />

        {/* Large Decorative Labels */}
        <div className="absolute inset-0 pointer-events-none">
            <span className="absolute text-ink-muted/40 font-serif italic font-bold tracking-widest" style={{ left: '15%', top: '65%', fontSize: '1.5rem' }}>EGYPT</span>
            <span className="absolute text-ink-muted/40 font-serif italic font-bold tracking-widest" style={{ left: '38%', top: '60%', fontSize: '1.2rem' }}>CANAAN</span>
            <span className="absolute text-ink-muted/40 font-serif italic font-bold tracking-widest" style={{ left: '60%', top: '45%', fontSize: '1.5rem' }}>MESOPOTAMIA</span>
        </div>

        {/* Interactive Pins */}
        {PINS.map((pin) => {
          const struct = structures.find((s) => s.id === pin.id);
          if (!struct) return null;
          
          const isHeavenly = pin.id === "new_jerusalem";
          const isHovered = hoveredId === pin.id;

          return (
            <div 
              key={pin.id}
              className="absolute z-10"
              style={{ 
                  left: `calc(${pin.x}% + ${pin.offsetX || 0}px)`, 
                  top: `calc(${pin.y}% + ${pin.offsetY || 0}px)`,
                  transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => setHoveredId(pin.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Elegant dot */}
              <button
                onClick={() => { onSelectStructure(pin.id); onClose(); }}
                className="group relative flex items-center justify-center focus:outline-none"
              >
                <div 
                  className={`h-4 w-4 rounded-full border-[2.5px] transition-all duration-300 ${
                    isHeavenly 
                      ? "border-[#FFD700] bg-surface shadow-[0_0_15px_rgba(255,215,0,0.6)]" 
                      : "border-surface bg-[#3C5E70] shadow-md"
                  } ${isHovered ? "scale-150" : "scale-100"}`}
                />
                
                {/* Hover Ring */}
                {isHovered && (
                  <div 
                    className={`absolute inset-[-8px] rounded-full border transition-all duration-500 animate-ping opacity-30 ${
                      isHeavenly ? "border-[#FFD700]" : "border-[#3C5E70]"
                    }`}
                  />
                )}

                {/* Custom Tooltip matching the UI */}
                <div 
                  className={`pointer-events-none absolute bottom-full left-1/2 mb-3 w-56 -translate-x-1/2 rounded-xl border border-line-strong bg-surface p-3 text-left shadow-2xl transition-all duration-200 ${
                    isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-line-strong bg-surface"></div>
                  <div className="relative z-10 flex gap-3">
                    <img 
                      src={`${base}img/${pin.id}/thumbnail.webp`} 
                      alt={struct.name}
                      className="h-12 w-12 flex-none rounded-md object-cover border border-line"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-display truncate text-sm font-bold text-ink">{struct.name}</p>
                      <p className="truncate text-[10px] italic text-ink-muted">{struct.geography.regionLabel}</p>
                      <p className="mt-1 text-[10px] font-semibold" style={{ color: "#3C5E70" }}>
                        {locale === "nl" ? "Klik om te openen →" : "Click to open →"}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </ModalShell>
  );
}
