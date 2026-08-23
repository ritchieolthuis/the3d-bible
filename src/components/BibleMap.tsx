import { useEffect, useRef } from "react";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Coordinates [lat, lng]
interface MapPin {
  id: string;
  coords: [number, number];
  offset?: [number, number]; 
}

const PINS: MapPin[] = [
  { id: "eden_fall",       coords: [31.000, 47.000] },
  { id: "noahs_ark",       coords: [39.700, 44.300] },
  { id: "tower_babel",     coords: [32.536, 44.420] },
  { id: "parting_sea",     coords: [29.800, 32.550] },
  { id: "tabernacle",      coords: [28.539, 33.975] },
  { id: "walls_jericho",   coords: [31.870, 35.444] },
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

export default function BibleMap({ onSelectStructure, onClose }: { onSelectStructure: (id: string) => void, onClose: () => void }) {
  const { locale } = useLocale();
  const structures = structuresFor(locale);
  const base = import.meta.env.BASE_URL || "/";
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    
    // Initialize map
    const map = L.map(mapRef.current, {
      center: [31.8, 36.5],
      zoom: 6,
      minZoom: 4,
      maxZoom: 12,
      attributionControl: false
    });

    // Add TileLayer (Antique/Historical Base)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map);

    // Add labels
    HISTORICAL_LABELS.forEach(lbl => {
      const icon = L.divIcon({ className: 'dummy-label-icon', html: '' });
      const marker = L.marker(lbl.coords as [number, number], { icon, interactive: false }).addTo(map);
      marker.bindTooltip(
        `<span style="color: ${lbl.color}; font-size: ${lbl.size}; font-family: serif; font-weight: bold; letter-spacing: 2px; text-shadow: 0 0 5px #f4f6f7, 0 0 10px #f4f6f7;">${lbl.text}</span>`,
        { permanent: true, direction: 'center', className: 'historical-map-label' }
      );
    });

    // Add pins
    PINS.forEach(pin => {
      const struct = structures.find(s => s.id === pin.id);
      if (!struct) return;
      const isHeavenly = pin.id === "new_jerusalem";
      const marker = L.marker(pin.coords as [number, number], { icon: createCustomIcon(isHeavenly, pin.offset) }).addTo(map);
      
      const tooltipHtml = `
        <div style="display:flex; gap:12px; align-items:center; padding:4px;">
          <img src="${base}img/${pin.id}/thumbnail.webp" alt="${struct.name}" style="height:40px; width:40px; object-fit:cover; border-radius:4px; border:1px solid #ddd;" onerror="this.style.display='none'"/>
          <div style="flex:1; overflow:hidden;">
            <p style="margin:0; font-weight:bold; font-size:12px; color:#222; text-transform:uppercase;">${struct.name}</p>
            <p style="margin:0; font-size:9px; font-style:italic; color:#666;">${struct.geography.regionLabel}</p>
            <p style="margin:2px 0 0 0; font-size:9px; font-weight:bold; color:#3C5E70;">${locale === "nl" ? "Klik om te openen →" : "Click to open →"}</p>
          </div>
        </div>
      `;
      marker.bindTooltip(tooltipHtml, { direction: 'top', offset: [pin.offset?.[0] || 0, (pin.offset?.[1] || 0) - 10], className: 'custom-map-tooltip' });
      
      marker.on('click', () => {
        onSelectStructure(pin.id);
        onClose();
      });
    });

    return () => {
      map.remove();
    };
  }, [base, locale, structures, onSelectStructure, onClose]);

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Historische Wereld" : "Historical World"}
      onClose={onClose}
      wide={true}
    >
      <div className="relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-xl border border-line-strong shadow-inner bg-paper" style={{ height: "70vh", minHeight: "500px" }}>
        
        {/* React 19 compatible raw Leaflet mount point */}
        <div ref={mapRef} style={{ width: "100%", height: "100%", background: "#f4f6f7", zIndex: 1 }} />
        
        {/* Antique sepia blend */}
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 400, background: 'rgba(212, 197, 169, 0.15)', mixBlendMode: 'multiply' }}></div>
      </div>
      
      <div className="hidden historical-map-label custom-map-tooltip custom-bible-pin"></div>
      <p className="mt-4 text-center text-xs italic text-ink-muted">
        {locale === "nl" 
          ? "Sleep om de kaart te verplaatsen. Scroll om in te zoomen. Klik op een locatie om te openen." 
          : "Drag to pan. Scroll to zoom. Click a location to open."}
      </p>
    </ModalShell>
  );
}
