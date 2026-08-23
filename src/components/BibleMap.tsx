import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Annotation } from "react-simple-maps";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";

// GeoJSON/TopoJSON map URL
const geoUrl = import.meta.env.BASE_URL ? `${import.meta.env.BASE_URL}data/world.json` : "/data/world.json";

/* ── real-world coordinates [longitude, latitude] ── */
interface MapPin {
  id: string;
  coords: [number, number]; 
  icon: string;
  offsetX?: number;
  offsetY?: number;
}

const PINS: MapPin[] = [
  // Babylon/Mesopotamia
  { id: "eden_fall",       coords: [47.000, 31.000], icon: "🌳" }, 
  { id: "noahs_ark",      coords: [44.300, 39.700], icon: "🚢" }, 
  { id: "tower_babel",    coords: [44.420, 32.536], icon: "🗼" }, 
  
  // Egypt & Sinai
  { id: "parting_sea",    coords: [32.550, 29.800], icon: "🌊" }, 
  { id: "tabernacle",     coords: [33.975, 28.539], icon: "⛺" }, 
  
  // Canaan / Israel (Slightly spread out the Jerusalem ones so they don't exactly overlap)
  { id: "walls_jericho",  coords: [35.444, 31.870], icon: "🏰", offsetX: 15, offsetY: -10 },
  { id: "solomon_temple", coords: [35.235, 31.778], icon: "🏛️", offsetX: -20, offsetY: 0 },
  { id: "herods_temple",  coords: [35.235, 31.775], icon: "🏛️", offsetX: -10, offsetY: 20 },
  { id: "ezekiel_temple", coords: [35.235, 31.782], icon: "🏛️", offsetX: -10, offsetY: -20 },
  { id: "mount_of_olives",coords: [35.245, 31.779], icon: "⛰️", offsetX: 20, offsetY: 0 },
  { id: "golgotha",       coords: [35.229, 31.779], icon: "✝️", offsetX: -35, offsetY: -10 },
  
  // Heavenly
  { id: "new_jerusalem",  coords: [35.235, 31.780], icon: "✨", offsetX: 0, offsetY: -40 },
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

  // Filter out any missing structures
  const activePins = useMemo(() => {
    return PINS.map(pin => {
      const struct = structures.find(s => s.id === pin.id);
      return struct ? { ...pin, struct } : null;
    }).filter(Boolean) as (MapPin & { struct: any })[];
  }, [structures]);

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Bijbelse Geografie" : "Biblical Geography"}
      onClose={onClose}
      wide={true}
    >
      <div className="relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-xl border border-line-warm shadow-inner" style={{ backgroundColor: "#22201e", height: "65vh", minHeight: "500px" }}>
        
        <ComposableMap 
          projection="geoMercator" 
          projectionConfig={{ scale: 3200, center: [37.5, 31.5] }}
          width={1000}
          height={600}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup zoom={1} minZoom={0.5} maxZoom={8}>
            {/* The Map Geometry (Countries) */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#36312a"
                    stroke="#595041"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#423c34", outline: "none", cursor: "pointer" },
                      pressed: { fill: "#36312a", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Custom Labels on the Map */}
            <Annotation subject={[34.8, 31.5]} dx={-60} dy={20} connectorProps={{ stroke: "none" }}>
              <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#8c7d65" fontSize={14} fontWeight="bold" opacity={0.6} style={{ fontFamily: "serif", fontStyle: "italic" }}>Canaan</text>
            </Annotation>
            <Annotation subject={[31.0, 28.0]} dx={0} dy={0} connectorProps={{ stroke: "none" }}>
              <text x="0" textAnchor="middle" alignmentBaseline="middle" fill="#8c7d65" fontSize={18} fontWeight="bold" opacity={0.5} style={{ fontFamily: "serif", fontStyle: "italic", letterSpacing: "4px" }}>EGYPT</text>
            </Annotation>
            <Annotation subject={[43.0, 33.0]} dx={0} dy={0} connectorProps={{ stroke: "none" }}>
              <text x="0" textAnchor="middle" alignmentBaseline="middle" fill="#8c7d65" fontSize={18} fontWeight="bold" opacity={0.5} style={{ fontFamily: "serif", fontStyle: "italic", letterSpacing: "4px" }}>MESOPOTAMIA</text>
            </Annotation>

            {/* Pins */}
            {activePins.map((pin) => {
              const isHeavenly = pin.id === "new_jerusalem";
              const isHovered = hoveredId === pin.id;

              return (
                <Marker 
                  key={pin.id} 
                  coordinates={pin.coords}
                  onMouseEnter={() => setHoveredId(pin.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => { onSelectStructure(pin.id); onClose(); }}
                  style={{ cursor: "pointer" }}
                >
                  <g transform={`translate(${pin.offsetX || 0}, ${pin.offsetY || 0})`}>
                    {/* The Dot / Pin Base */}
                    <circle 
                      r={isHovered ? 18 : 14} 
                      fill={isHeavenly ? "#f5ecd0" : "#c4a35a"} 
                      stroke={isHeavenly ? "#ffffff" : "#614e24"} 
                      strokeWidth={2}
                      style={{ transition: "all 0.2s" }}
                    />
                    
                    {/* Emoji / Icon inside pin */}
                    <text 
                      textAnchor="middle" 
                      y={4} 
                      fontSize={isHovered ? 16 : 12}
                      style={{ transition: "all 0.2s", pointerEvents: "none" }}
                    >
                      {pin.icon}
                    </text>

                    {/* SVG Tooltip rendered perfectly within the vector space */}
                    {isHovered && (
                      <g transform="translate(0, -30)">
                        {/* Tooltip Background */}
                        <rect 
                          x={-75} 
                          y={-50} 
                          width={150} 
                          height={40} 
                          rx={6} 
                          fill="#181512" 
                          stroke="#c4a35a" 
                          strokeWidth={1}
                        />
                        {/* Tooltip Arrow */}
                        <polygon points="-6,-10 6,-10 0,0" fill="#181512" stroke="#c4a35a" strokeWidth={1} />
                        {/* Tooltip Arrow cover block (to hide the stroke on the top side of the arrow) */}
                        <line x1={-5} y1={-10} x2={5} y2={-10} stroke="#181512" strokeWidth={2} />
                        
                        {/* Tooltip Text */}
                        <text 
                          textAnchor="middle" 
                          y={-32} 
                          fill="#e8e0d4" 
                          fontSize={12} 
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {pin.struct.name}
                        </text>
                        <text 
                          textAnchor="middle" 
                          y={-18} 
                          fill="#999" 
                          fontSize={9} 
                          fontFamily="sans-serif"
                        >
                          {locale === "nl" ? "Klik om te openen" : "Click to open"}
                        </text>
                      </g>
                    )}
                  </g>
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Floating Zoom Hints UI */}
        <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center">
          <span className="rounded-full border border-line-warm bg-paper/90 px-4 py-1.5 text-[11px] font-medium text-ink-muted backdrop-blur-sm">
            {locale === "nl" 
              ? "Scroll om in te zoomen • Sleep om te pannen" 
              : "Scroll to zoom • Drag to pan"}
          </span>
        </div>
      </div>
    </ModalShell>
  );
}
