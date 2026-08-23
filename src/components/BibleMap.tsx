import { useState } from "react";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";

/* ── pin positions (percentages from top-left) ── */
interface MapPin {
  id: string;
  x: number; // left %
  y: number; // top %
  icon: string;
}

const PINS: MapPin[] = [
  // Babylon/Mesopotamia (placed on the eastern/northern edge of the map)
  { id: "eden_fall",       x: 90, y: 45, icon: "🌳" },
  { id: "noahs_ark",      x: 75, y: 12, icon: "🚢" },
  { id: "tower_babel",    x: 88, y: 25, icon: "🗼" },
  
  // Egypt & Sinai
  { id: "parting_sea",    x: 32, y: 64, icon: "🌊" },
  { id: "tabernacle",     x: 46, y: 79, icon: "⛺" },
  
  // Canaan / Israel (Jerusalem cluster spread slightly so they don't overlap entirely)
  { id: "walls_jericho",  x: 65, y: 58, icon: "🏰" },
  { id: "solomon_temple", x: 62.5, y: 61, icon: "🏛️" },
  { id: "herods_temple",  x: 61.5, y: 62.5, icon: "🏛️" },
  { id: "ezekiel_temple", x: 63.5, y: 63, icon: "🏛️" },
  { id: "mount_of_olives",x: 64, y: 61, icon: "⛰️" },
  { id: "golgotha",       x: 61, y: 60.5, icon: "✝️" },
  
  // Heavenly (hovering above)
  { id: "new_jerusalem",  x: 62.5, y: 55, icon: "✨" },
];

interface BibleMapProps {
  onSelectStructure: (id: string) => void;
  onClose: () => void;
}

export default function BibleMap({ onSelectStructure, onClose }: BibleMapProps) {
  const { locale } = useLocale();
  const structures = structuresFor(locale);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const base = import.meta.env.BASE_URL || "/";

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Bijbelse Geografie" : "Biblical Geography"}
      onClose={onClose}
      wide={true}
    >
      <div className="relative mx-auto w-full max-w-[700px] overflow-hidden rounded-xl border border-line-warm bg-surface shadow-inner" style={{ aspectRatio: '627/1024', maxHeight: '75vh' }}>
        
        {/* Static Map Image */}
        <img 
          src={`${base}img/bible-map.png`}
          alt="Bible Map"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Interactive Pins */}
        {PINS.map((pin) => {
          const struct = structures.find((s) => s.id === pin.id);
          if (!struct) return null;
          
          const isHeavenly = pin.id === "new_jerusalem";
          const isHovered = hoveredId === pin.id;

          return (
            <div 
              key={pin.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              onMouseEnter={() => setHoveredId(pin.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* The Pin */}
              <button
                onClick={() => { onSelectStructure(pin.id); onClose(); }}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg transition-transform hover:scale-110 hover:z-50 focus:outline-none ${
                  isHeavenly 
                    ? "border-[#f5ecd0] bg-gradient-to-br from-[#e8d5a0] to-[#c4a35a]" 
                    : "border-[#d4b96a] bg-gradient-to-br from-[#c4a35a] to-[#a68832]"
                }`}
                style={{
                  boxShadow: isHeavenly ? '0 0 15px rgba(245,236,208,0.6)' : '0 4px 12px rgba(0,0,0,0.4)'
                }}
              >
                <span className="text-lg">{pin.icon}</span>
                
                {/* Custom Tooltip */}
                <div 
                  className={`pointer-events-none absolute bottom-full left-1/2 mb-3 w-56 -translate-x-1/2 rounded-xl border border-line-warm bg-paper p-3 text-left shadow-2xl transition-all duration-200 ${
                    isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  {/* Tooltip Triangle */}
                  <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-line-warm bg-paper"></div>
                  
                  <div className="relative z-10 flex gap-3">
                    <img 
                      src={`${base}img/${pin.id}/thumbnail.webp`} 
                      alt={struct.name}
                      className="h-12 w-12 flex-none rounded-md object-cover border border-line-subtle"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-display truncate text-sm font-bold text-ink">{struct.name}</p>
                      <p className="truncate text-[10px] italic text-ink-muted">{struct.geography.regionLabel}</p>
                      <p className="mt-1 text-[10px] font-semibold text-accent">
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
      <p className="mt-4 text-center text-xs italic text-ink-muted">
        {locale === "nl" 
          ? "Beweeg over een locatie voor een preview. Klik om het 3D-model te openen." 
          : "Hover over a location for a preview. Click to open the 3D model."}
      </p>
    </ModalShell>
  );
}
