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

// Coordinates calibrated for the vertical bible-map.png (Bronze Age Map)
const PINS: MapPin[] = [
  // Babylon/Mesopotamia (Right side)
  { id: "eden_fall",       x: 88, y: 45 },
  { id: "tower_babel",     x: 84, y: 35 },
  { id: "noahs_ark",       x: 75, y: 12 },
  
  // Egypt & Sinai (Bottom Left)
  { id: "parting_sea",     x: 28, y: 68 },
  { id: "tabernacle",      x: 35, y: 78 },
  
  // Canaan / Israel (Center-Left)
  { id: "walls_jericho",   x: 48, y: 52 },
  
  // Jerusalem Cluster (Spread out slightly around the center of Judah)
  { id: "solomon_temple",  x: 46, y: 55, offsetX: -16, offsetY: 0 },
  { id: "herods_temple",   x: 46, y: 55, offsetX: -6, offsetY: 16 },
  { id: "ezekiel_temple",  x: 46, y: 55, offsetX: -6, offsetY: -16 },
  { id: "mount_of_olives", x: 46, y: 55, offsetX: 16, offsetY: 0 },
  { id: "golgotha",        x: 46, y: 55, offsetX: -28, offsetY: -8 },
  { id: "new_jerusalem",   x: 46, y: 55, offsetX: 0, offsetY: -32 },
];

// High detail historical region labels to overlay on the map
const REGIONS = [
  { name: "KONINKRIJK ISRAËL", x: 45, y: 44, color: "#3C5E70" }, // Northern kingdom
  { name: "KONINKRIJK JUDA", x: 42, y: 58, color: "#c4a35a" },   // Southern kingdom
  { name: "MOAB", x: 52, y: 60, color: "#9aa7af" },
  { name: "EDOM", x: 48, y: 66, color: "#9aa7af" },
  { name: "AMMON", x: 53, y: 54, color: "#9aa7af" },
  { name: "FILISTIJNEN", x: 37, y: 57, color: "#9aa7af" },
  { name: "EGYPTE", x: 20, y: 75, color: "#3C5E70" },
  { name: "ASSYRISCHE RIJK", x: 75, y: 25, color: "#9aa7af" },
  { name: "BABYLONIË", x: 80, y: 40, color: "#c4a35a" },
];

export default function BibleMap({ onSelectStructure, onClose }: { onSelectStructure: (id: string) => void, onClose: () => void }) {
  const { locale } = useLocale();
  const structures = structuresFor(locale);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const base = import.meta.env.BASE_URL || "/";

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Historische Geografie" : "Historical Geography"}
      onClose={onClose}
      wide={true}
    >
      {/* Container matches the aspect ratio of the original vertical bible-map.png */}
      <div className="relative mx-auto w-full max-w-[627px] overflow-hidden rounded-xl border-2 border-line-warm bg-paper shadow-inner" style={{ aspectRatio: '627/1024', maxHeight: "75vh" }}>
        
        {/* The user's original highly detailed map image */}
        <img 
          src={`${base}img/bible-map.png`}
          alt="Historical Bible Map"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* High-detail Historical Region Labels overlaid on the map */}
        <div className="absolute inset-0 pointer-events-none">
            {REGIONS.map((region, i) => (
                <span 
                    key={i} 
                    className="absolute font-serif font-bold tracking-widest text-center" 
                    style={{ 
                        left: `${region.x}%`, 
                        top: `${region.y}%`, 
                        color: region.color,
                        transform: 'translate(-50%, -50%)',
                        fontSize: 'clamp(0.6rem, 1.5vw, 1rem)',
                        textShadow: '0 0 4px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.5)',
                        opacity: 0.9
                    }}
                >
                    {region.name}
                </span>
            ))}
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
                    className={`absolute inset-[-8px] rounded-full border transition-all duration-500 animate-ping opacity-40 ${
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
