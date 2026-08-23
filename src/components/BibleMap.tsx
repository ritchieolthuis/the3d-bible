import React from "react";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Coordinates [lat, lng]
interface MapPin {
  id: string;
  coords: [number, number];
  offset?: [number, number]; // For clustering Jerusalem
}

const PINS: MapPin[] = [
  // Babylon/Mesopotamia
  { id: "eden_fall",       coords: [31.000, 47.000] },
  { id: "noahs_ark",       coords: [39.700, 44.300] },
  { id: "tower_babel",     coords: [32.536, 44.420] },
  
  // Egypt & Sinai
  { id: "parting_sea",     coords: [29.800, 32.550] },
  { id: "tabernacle",      coords: [28.539, 33.975] },
  
  // Canaan / Israel
  { id: "walls_jericho",   coords: [31.870, 35.444] },
  
  // Jerusalem Cluster (Spread out pixel-wise in Leaflet using DivIcon HTML/CSS)
  { id: "solomon_temple",  coords: [31.778, 35.235], offset: [-15, -15] },
  { id: "herods_temple",   coords: [31.778, 35.235], offset: [15, -15] },
  { id: "ezekiel_temple",  coords: [31.778, 35.235], offset: [-15, 15] },
  { id: "mount_of_olives", coords: [31.778, 35.235], offset: [15, 15] },
  { id: "golgotha",        coords: [31.778, 35.235], offset: [-30, 0] },
  { id: "new_jerusalem",   coords: [31.778, 35.235], offset: [0, -30] },
];

const HISTORICAL_LABELS = [
  { text: "KONINKRIJK JUDA", coords: [31.4, 35.0], color: "#c4a35a", size: "12px" },
  { text: "KONINKRIJK ISRAËL", coords: [32.3, 35.2], color: "#3C5E70", size: "12px" },
  { text: "MOAB", coords: [31.5, 35.8], color: "#9aa7af", size: "11px" },
  { text: "EDOM", coords: [30.4, 35.4], color: "#9aa7af", size: "11px" },
  { text: "AMMON", coords: [31.9, 36.1], color: "#9aa7af", size: "11px" },
  { text: "FILISTIJNEN", coords: [31.5, 34.5], color: "#9aa7af", size: "10px" },
  { text: "ARAM", coords: [33.5, 36.3], color: "#9aa7af", size: "11px" },
  { text: "EGYPTE", coords: [29.0, 31.0], color: "#3C5E70", size: "16px" },
  { text: "BABYLONIË", coords: [32.0, 45.0], color: "#c4a35a", size: "16px" },
  { text: "ASSYRIË", coords: [35.0, 43.0], color: "#9aa7af", size: "14px" },
];

// Custom DivIcon generator to match the app's clean Ivory/Slate Blue style
function createCustomIcon(isHeavenly: boolean, offset: [number, number] = [0, 0]) {
  return L.divIcon({
    className: 'custom-bible-pin',
    html: `
      <div style="
        width: 14px; 
        height: 14px; 
        background: ${isHeavenly ? '#FFD700' : '#3C5E70'}; 
        border: 2px solid ${isHeavenly ? '#ffffff' : '#f4f6f7'}; 
        border-radius: 50%; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.4);
        transform: translate(${offset[0]}px, ${offset[1]}px);
      ">
        ${isHeavenly ? `<div style="position:absolute; inset:-6px; border: 1px solid #FFD700; border-radius:50%; animation: pulse 2s infinite;"></div>` : ''}
      </div>
    `,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
}

// Invisible icon for text labels
const labelIcon = L.divIcon({ className: 'dummy-label-icon', html: '', iconSize: [0,0] });

export default function BibleMap({ onSelectStructure, onClose }: { onSelectStructure: (id: string) => void, onClose: () => void }) {
  const { locale } = useLocale();
  const structures = structuresFor(locale);
  const base = import.meta.env.BASE_URL || "/";

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Historische Wereld" : "Historical World"}
      onClose={onClose}
      wide={true}
    >
      <div className="relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-xl border border-line-strong shadow-inner bg-paper" style={{ height: "70vh", minHeight: "500px" }}>
        
        <MapContainer 
          center={[31.8, 36.5]} 
          zoom={6} 
          minZoom={4}
          maxZoom={12}
          style={{ height: "100%", width: "100%", background: "#f4f6f7" }}
          attributionControl={false}
        >
          {/* Extremely clean, label-free historical basemap (ArcGIS Canvas Light Gray) */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          />
          
          {/* Add beautiful antique sepia blend to make it look old-fashioned */}
          <div className="leaflet-layer-blend" style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 400, background: 'rgba(212, 197, 169, 0.15)', mixBlendMode: 'multiply' }}></div>

          {/* Historical Kingdom Labels */}
          {HISTORICAL_LABELS.map((lbl, idx) => (
            <Marker key={`lbl-${idx}`} position={lbl.coords as [number, number]} icon={labelIcon}>
              <Tooltip 
                permanent 
                direction="center" 
                className="historical-map-label"
              >
                <span style={{ 
                  color: lbl.color, 
                  fontSize: lbl.size, 
                  fontFamily: 'serif', 
                  fontWeight: 'bold', 
                  letterSpacing: '2px',
                  textShadow: '0 0 5px #f4f6f7, 0 0 10px #f4f6f7'
                }}>
                  {lbl.text}
                </span>
              </Tooltip>
            </Marker>
          ))}

          {/* Interactive Pins */}
          {PINS.map((pin) => {
            const struct = structures.find((s) => s.id === pin.id);
            if (!struct) return null;
            
            const isHeavenly = pin.id === "new_jerusalem";

            return (
              <Marker 
                key={pin.id} 
                position={pin.coords as [number, number]} 
                icon={createCustomIcon(isHeavenly, pin.offset)}
                eventHandlers={{
                  click: () => {
                    onSelectStructure(pin.id);
                    onClose();
                  }
                }}
              >
                <Tooltip direction="top" offset={[pin.offset?.[0] || 0, (pin.offset?.[1] || 0) - 10]} className="custom-map-tooltip">
                  <div className="flex gap-3 items-center p-1">
                    <img 
                      src={`${base}img/${pin.id}/thumbnail.webp`} 
                      alt={struct.name}
                      className="h-10 w-10 flex-none rounded-sm object-cover border border-line"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-display truncate text-xs font-bold text-ink m-0">{struct.name}</p>
                      <p className="truncate text-[9px] italic text-ink-muted m-0 leading-tight">{struct.geography.regionLabel}</p>
                      <p className="mt-0.5 text-[9px] font-semibold m-0" style={{ color: "#3C5E70" }}>
                        {locale === "nl" ? "Klik om te openen →" : "Click to open →"}
                      </p>
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      
      <p className="mt-4 text-center text-xs italic text-ink-muted">
        {locale === "nl" 
          ? "Sleep om de kaart te verplaatsen. Scroll om in te zoomen. Klik op een locatie om te openen." 
          : "Drag to pan. Scroll to zoom. Click a location to open."}
      </p>
    </ModalShell>
  );
}
