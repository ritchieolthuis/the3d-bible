import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

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

function createCustomIcon(isHeavenly: boolean, isSelected: boolean = false, offset: [number, number] = [0, 0]) {
  return L.divIcon({
    className: 'custom-bible-pin',
    html: `
      <div style="
        width: ${isSelected ? '20px' : '14px'}; 
        height: ${isSelected ? '20px' : '14px'}; 
        background: ${isHeavenly ? '#FFD700' : '#3C5E70'}; 
        border: 2px solid ${isHeavenly ? '#ffffff' : '#f4f6f7'}; 
        border-radius: 50%; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.4);
        transform: translate(${offset[0]}px, ${offset[1]}px);
        transition: all 0.2s ease-in-out;
      ">
        ${isHeavenly ? `<div style="position:absolute; inset:-6px; border: 1px solid #FFD700; border-radius:50%; animation: pulse 2s infinite;"></div>` : ''}
        ${isSelected ? `<div style="position:absolute; inset:-8px; border: 2px solid #3C5E70; border-radius:50%; opacity: 0.5;"></div>` : ''}
      </div>
    `,
    iconSize: isSelected ? [20, 20] : [14, 14],
    iconAnchor: isSelected ? [10, 10] : [7, 7]
  });
}

export default function BibleMap({ onSelectStructure, onClose }: { onSelectStructure: (id: string) => void, onClose: () => void }) {
  const { locale } = useLocale();
  const structures = structuresFor(locale);
  const base = import.meta.env.BASE_URL || "/";
  const mapRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMapId, setActiveMapId] = useState<string | null>(null);
  const leafletMapInstance = useRef<L.Map | null>(null);

  const filteredPins = PINS.filter(pin => {
      const struct = structures.find(s => s.id === pin.id);
      if (!struct) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return struct.name.toLowerCase().includes(q) || struct.geography.regionLabel.toLowerCase().includes(q);
  });

  const handleSidebarClick = (id: string, coords: [number, number]) => {
      setActiveMapId(id);
      if (leafletMapInstance.current) {
          leafletMapInstance.current.flyTo(coords, 9, { duration: 1.5 });
      }
  };

  useEffect(() => {
    if (!mapRef.current) return;
    
    const map = L.map(mapRef.current, {
      center: [31.8, 36.5],
      zoom: 6,
      minZoom: 4,
      maxZoom: 12,
      attributionControl: false
    });
    
    leafletMapInstance.current = map;

    // Use exact CartoDB Positron base map without ANY CSS filters
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

    return () => {
      map.remove();
      leafletMapInstance.current = null;
    };
  }, [base, locale]);

  useEffect(() => {
      const map = leafletMapInstance.current;
      if (!map) return;

      const markers: L.Marker[] = [];

      PINS.forEach(pin => {
        const struct = structures.find(s => s.id === pin.id);
        if (!struct) return;
        const isHeavenly = pin.id === "new_jerusalem";
        const isSelected = activeMapId === pin.id;
        
        const marker = L.marker(pin.coords as [number, number], { 
            icon: createCustomIcon(isHeavenly, isSelected, pin.offset) 
        }).addTo(map);
        
        const tooltipHtml = `
          <div style="display:flex; gap:12px; align-items:center; padding:6px; min-width: 220px; white-space: normal;">
            <img src="${base}img/${pin.id}/thumbnail.webp" alt="${struct.name}" style="height:48px; width:48px; object-fit:cover; border-radius:4px; border:1px solid #ddd;" onerror="this.style.display='none'"/>
            <div style="flex:1;">
              <p style="margin:0; font-weight:bold; font-size:13px; color:#222; text-transform:uppercase; line-height: 1.2;">${struct.name}</p>
              <p style="margin:2px 0 0 0; font-size:10px; font-style:italic; color:#666;">${struct.geography.regionLabel}</p>
              <p style="margin:4px 0 0 0; font-size:10px; font-weight:bold; color:#3C5E70;">${locale === "nl" ? "Klik om te openen →" : "Click to open →"}</p>
            </div>
          </div>
        `;
        
        marker.bindTooltip(tooltipHtml, { direction: 'top', offset: [pin.offset?.[0] || 0, (pin.offset?.[1] || 0) - (isSelected ? 14 : 10)], className: 'custom-map-tooltip' });
        
        marker.on('click', () => {
          if (activeMapId === pin.id) {
              onSelectStructure(pin.id);
              onClose();
          } else {
              setActiveMapId(pin.id);
              map.flyTo(pin.coords as [number, number], 9, { duration: 1.0 });
          }
        });

        markers.push(marker);
      });

      return () => {
          markers.forEach(m => m.remove());
      };
  }, [base, locale, structures, activeMapId, onSelectStructure, onClose]);

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Historische Wereld" : "Historical World"}
      onClose={onClose}
      wide={true}
    >
      <div className="mx-auto w-full max-w-[1200px] flex flex-col md:flex-row overflow-hidden rounded-xl border border-line-strong shadow-inner bg-paper" style={{ height: "75vh", minHeight: "550px" }}>
        
        {/* LEFT PANE */}
        <div className="w-full md:w-80 h-full flex flex-col border-b md:border-b-0 md:border-r border-line-warm bg-surface">
            <div className="p-4 border-b border-line-warm">
                <input 
                    type="text" 
                    placeholder={locale === "nl" ? "Zoek plaatsen..." : "Search places..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 text-sm border border-line rounded bg-paper focus:outline-none focus:border-gold"
                />
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
                <p className="px-2 text-xs font-bold text-ink-muted mb-2 uppercase">
                    {filteredPins.length} {locale === "nl" ? "bouwwerken gevonden" : "structures found"}
                </p>
                {filteredPins.map(pin => {
                    const struct = structures.find(s => s.id === pin.id)!;
                    const isActive = activeMapId === pin.id;
                    return (
                        <button
                            key={pin.id}
                            onClick={() => handleSidebarClick(pin.id, pin.coords as [number, number])}
                            className={`w-full text-left px-3 py-3 rounded-lg mb-1 flex items-center gap-3 transition-colors ${isActive ? 'bg-paper shadow-sm border border-line-warm' : 'hover:bg-paper border border-transparent'}`}
                        >
                            <img 
                                src={`${base}img/${pin.id}/thumbnail.webp`} 
                                alt=""
                                className="w-10 h-10 object-cover rounded shadow-sm flex-none"
                            />
                            <div className="flex-1 overflow-hidden">
                                <p className={`truncate text-sm font-bold ${isActive ? 'text-ink' : 'text-ink-muted'}`}>{struct.name}</p>
                                <p className="truncate text-[10px] text-ink-light">{struct.geography.regionLabel}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>

        {/* RIGHT PANE */}
        <div className="relative flex-1 h-full">
            <div ref={mapRef} style={{ width: "100%", height: "100%", background: "#f8f9fa", zIndex: 1 }} />
        </div>

      </div>
      <div className="hidden custom-map-tooltip custom-bible-pin"></div>
    </ModalShell>
  );
}
