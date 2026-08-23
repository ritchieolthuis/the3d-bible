import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";
import L from "leaflet";
import CONTEXT_PLACES from "@/data/contextPlaces";
import 'leaflet/dist/leaflet.css';

interface MapPin {
  id: string;
  coords: [number, number];
  offset?: [number, number]; 
  hideOnMap?: boolean;
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
  { id: "new_jerusalem",   coords: [31.778, 35.235], hideOnMap: true }, 
];




const EXODUS_ROUTE: [number, number][] = [
    [30.800, 31.830], [30.550, 32.100], [30.450, 32.350], 
    [29.800, 32.400], [29.800, 32.550], [29.350, 32.950], 
    [29.100, 33.100], [28.700, 33.700], [28.539, 33.975]
];

function createCustomIcon(isHeavenly: boolean, isSelected: boolean = false, offset: [number, number] = [0, 0], isMapOnly: boolean = false) {
  const bgColor = isMapOnly ? '#f4f6f7' : (isHeavenly ? '#FFD700' : '#3C5E70');
  const borderColor = isMapOnly ? '#3C5E70' : (isHeavenly ? '#ffffff' : '#f4f6f7');
  
  const size = isMapOnly ? (isSelected ? '16px' : '10px') : (isSelected ? '20px' : '14px');
  const anchorOffset = isMapOnly ? (isSelected ? 8 : 5) : (isSelected ? 10 : 7);

  return L.divIcon({
    className: 'custom-bible-pin',
    html: `
      <div style="
        width: ${size}; 
        height: ${size}; 
        background: ${bgColor}; 
        border: ${isMapOnly ? '2px' : '2px'} solid ${borderColor}; 
        border-radius: 50%; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transform: translate(${offset[0]}px, ${offset[1]}px);
        transition: all 0.2s ease-in-out;
      ">
        ${isHeavenly ? `<div style="position:absolute; inset:-6px; border: 1px solid #FFD700; border-radius:50%; animation: pulse 2s infinite;"></div>` : ''}
        ${isSelected && !isMapOnly ? `<div style="position:absolute; inset:-8px; border: 2px solid #3C5E70; border-radius:50%; opacity: 0.5;"></div>` : ''}
        ${isSelected && isMapOnly ? `<div style="position:absolute; inset:-4px; background: #3C5E70; border-radius:50%; opacity: 0.2;"></div>` : ''}
      </div>
    `,
    iconSize: [parseInt(size), parseInt(size)],
    iconAnchor: [anchorOffset, anchorOffset]
  });
}

export default function BibleMap({ onSelectStructure, onClose }: { onSelectStructure: (id: string) => void, onClose: () => void }) {
  const { locale } = useLocale();
  const isNl = locale === "nl";
  const structures = structuresFor(locale);
  const base = import.meta.env.BASE_URL || "/";
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMapId, setActiveMapId] = useState<string | null>(null);
  const [isSidebarDetailOpen, setIsSidebarDetailOpen] = useState(false);
  const leafletMapInstance = useRef<L.Map | null>(null);

  const allListItems = [
    ...PINS.map(pin => {
      const s = structures.find(x => x.id === pin.id);
      
      const buildStory = () => {
          if (!s) return "";
          const parts = [];
          if (s.description) parts.push(s.description);
          if (s.biblicalMeaning) {
              parts.push(`**${isNl ? 'Theologische Betekenis' : 'Theological Significance'}**`);
              parts.push(s.biblicalMeaning);
          }
          if (s.didYouKnow) {
              parts.push(`**${isNl ? 'Wist je dat?' : 'Did you know?'}**`);
              parts.push(s.didYouKnow);
          }
          return parts.join("\n\n");
      };

      return {
          id: pin.id,
          coords: pin.coords,
          name: s ? s.name : pin.id,
          regionLabel: s ? s.geography.regionLabel : "",
          isStructure: true,
          hideOnMap: pin.hideOnMap,
          story: buildStory(),
          verses: [] as string[]
      };
    }).filter(p => structures.some(s => s.id === p.id)),
    ...CONTEXT_PLACES.map(cp => ({
        id: cp.id,
        coords: cp.coords,
        name: isNl ? cp.name.nl : cp.name.en,
        regionLabel: isNl ? cp.region.nl : cp.region.en,
        isStructure: false,
        hideOnMap: false,
        story: isNl ? cp.story.nl : cp.story.en,
        verses: cp.verses
    }))
  ];

  const filteredList = allListItems.filter(item => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.regionLabel.toLowerCase().includes(q);
  });

  const activeItemData = allListItems.find(item => item.id === activeMapId);

  const handleSidebarClick = (item: typeof allListItems[0]) => {
      setActiveMapId(item.id);
      setIsSidebarDetailOpen(true);
      
      if (!item.hideOnMap && leafletMapInstance.current) {
          leafletMapInstance.current.flyTo(item.coords, 10, { duration: 1.5 });
      }
  };

  const handleMapPinClick = (id: string, coords: [number, number]) => {
      setActiveMapId(id);
      setIsSidebarDetailOpen(true);
      if (leafletMapInstance.current) {
          leafletMapInstance.current.flyTo(coords, 10, { duration: 1.0 });
      }
  };

  useEffect(() => {
    if (!mapRef.current) return;
    
    const map = L.map(mapRef.current, {
      minZoom: 3,
      maxZoom: 12,
      attributionControl: false,
      zoomSnap: 0.5
    });
    
    // Set exact overview as requested (fits Egypt up to Turkey, and Mediterranean to Iran)
    // Start with a strict bounding box that perfectly aligns with the requested view
    const viewBounds = L.latLngBounds([
        [25.0, 23.5], 
        [41.5, 51.5]
    ]);
    map.fitBounds(viewBounds, { padding: [10, 10] });
    
    leafletMapInstance.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { subdomains: 'abcd', maxZoom: 19 }).addTo(map);

    L.polyline(EXODUS_ROUTE, {
        color: '#3C5E70',
        weight: 3,
        opacity: 0.6,
        dashArray: '5, 10',
        lineCap: 'round',
    }).addTo(map);

    const fixMapSize = () => {
        map.invalidateSize();
    };
    
    // Leaflet needs to know its container size. If rendered inside a flex/modal layout, 
    // it sometimes calculates 0x0 on the exact mount frame.
    setTimeout(fixMapSize, 50);
    setTimeout(fixMapSize, 250);
    setTimeout(fixMapSize, 500);

    const resizeObserver = new ResizeObserver(() => {
        fixMapSize();
    });
    if (mapContainerRef.current) {
        resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      leafletMapInstance.current = null;
    };
  }, [base, locale]);

  // Render map markers
  useEffect(() => {
      const map = leafletMapInstance.current;
      if (!map) return;
      const markers: L.Marker[] = [];

      PINS.forEach(pin => {
        if (pin.hideOnMap) return; 
        const struct = structures.find(s => s.id === pin.id);
        if (!struct) return;
        
        const isSelected = activeMapId === pin.id;
        const marker = L.marker(pin.coords as [number, number], { 
            icon: createCustomIcon(false, isSelected, pin.offset, false) 
        }).addTo(map);
        
        const tooltipHtml = `
          <div style="display:flex; gap:12px; align-items:center; padding:6px; min-width: 220px; white-space: normal;">
            <img src="${base}img/${pin.id}/thumbnail.webp" alt="${struct.name}" style="height:48px; width:48px; object-fit:cover; border-radius:4px; border:1px solid #ddd;" onerror="this.style.display='none'"/>
            <div style="flex:1;">
              <p style="margin:0; font-weight:bold; font-size:13px; color:#222; text-transform:uppercase; line-height: 1.2;">${struct.name}</p>
              <p style="margin:2px 0 0 0; font-size:10px; font-style:italic; color:#666;">${struct.geography.regionLabel}</p>
              <p style="margin:4px 0 0 0; font-size:10px; font-weight:bold; color:#3C5E70;">${isNl ? "Lees het verhaal →" : "Read the story →"}</p>
            </div>
          </div>
        `;
        
        marker.bindTooltip(tooltipHtml, { direction: 'top', offset: [pin.offset?.[0] || 0, (pin.offset?.[1] || 0) - (isSelected ? 14 : 10)], className: 'custom-map-tooltip' });
        
        marker.on('click', () => handleMapPinClick(pin.id, pin.coords as [number, number]));
        markers.push(marker);
      });

      CONTEXT_PLACES.forEach(cp => {
          const isSelected = activeMapId === cp.id;
          const marker = L.marker(cp.coords as [number, number], {
              icon: createCustomIcon(false, isSelected, [0,0], true)
          }).addTo(map);

          const tooltipHtml = `
            <div style="padding:6px; min-width: 180px; white-space: normal;">
              <p style="margin:0 0 4px 0; font-weight:bold; font-size:13px; color:#222; text-transform:uppercase; line-height: 1.2;">${isNl ? cp.name.nl : cp.name.en}</p>
              <p style="margin:0; font-size:11px; color:#444;">${isNl ? "Lees het verhaal →" : "Read the story →"}</p>
            </div>
          `;

          marker.bindTooltip(tooltipHtml, { direction: 'top', offset: [0, isSelected ? -10 : -6], className: 'custom-map-tooltip' });
          marker.on('click', () => handleMapPinClick(cp.id, cp.coords as [number, number]));
          markers.push(marker);
      });

      return () => {
          markers.forEach(m => m.remove());
      };
  }, [base, locale, structures, activeMapId, isSidebarDetailOpen]);

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Historische Wereld" : "Historical World"}
      onClose={onClose}
      wide={true}
      allowFullscreen={true}
    >
      <div 
        ref={mapContainerRef}
        className="mx-auto w-full flex-1 min-h-[550px] grid grid-cols-1 md:grid-cols-[320px_1fr] overflow-hidden bg-paper rounded-xl border border-line-strong shadow-inner"
      >
        
        {/* LEFT PANE - Dynamic Layout */}
        <div className="h-full flex flex-col border-b md:border-b-0 md:border-r border-line-warm bg-surface relative">
            
            {/* 1. LIST VIEW */}
            {!isSidebarDetailOpen && (
              <>
                <div className="p-4 border-b border-line-warm">
                    <input 
                        type="text" 
                        placeholder={locale === "nl" ? "Zoek plaatsen..." : "Search places..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2.5 pl-4 text-sm border border-line-warm rounded-lg bg-paper focus:outline-none focus:border-terracotta text-ink-soft transition-colors shadow-inner"
                    />
                </div>
                
                <div className="flex-1 overflow-y-auto p-2">
                    <p className="px-2 text-xs font-bold text-ink-muted mb-2 uppercase">
                        {filteredList.length} {locale === "nl" ? "locaties gevonden" : "locations found"}
                    </p>
                    {filteredList.map(item => {
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSidebarClick(item)}
                                className={`w-full text-left px-3 py-3 rounded-xl mb-1 flex items-center gap-4 transition-colors hover:bg-paper border border-transparent`}
                            >
                                {item.isStructure ? (
                                    <img src={`${base}img/${item.id}/thumbnail.webp`} alt="" className="w-14 h-14 object-cover rounded-md flex-none border border-line-warm shadow-sm" />
                                ) : (
                                    <div className="w-14 h-14 rounded-md flex items-center justify-center bg-paper-deep flex-none border border-line-warm shadow-sm">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-muted"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    </div>
                                )}
                                <div className="flex-1 overflow-hidden pl-1">
                                    <p className="truncate text-[0.95rem] font-bold text-ink">{item.name}</p>
                                    <p className="truncate text-[11px] text-ink-light mt-0.5">{item.regionLabel}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>
              </>
            )}

            {/* 2. DETAIL VIEW (The "Prism Story" panel) */}
            {isSidebarDetailOpen && activeItemData && (
              <div className="flex-1 overflow-y-auto flex flex-col bg-paper absolute inset-0 z-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="px-5 py-4 flex items-center justify-between border-b border-line-warm bg-surface sticky top-0 z-20 shadow-sm">
                    <span className="font-display text-sm font-bold tracking-wide text-ink-muted uppercase">
                        {isNl ? "Locatie Details" : "Location Details"}
                    </span>
                    <button 
                        onClick={() => setIsSidebarDetailOpen(false)}
                        className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink" 
                        aria-label="Sluiten"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                
                <div className="p-5 flex-1">
                    {activeItemData.isStructure && (
                        <img src={`${base}img/${activeItemData.id}/thumbnail.webp`} alt="" className="w-full h-40 object-cover rounded-xl mb-5 border border-line-warm shadow-sm" />
                    )}
                    
                    <h2 className="font-display mt-2 text-[1.9rem] font-bold leading-none text-ink">{activeItemData.name}</h2>
                    <p className="font-serif mt-1.5 text-[1.02rem] italic text-terracotta">{activeItemData.regionLabel}</p>
                    
                    {/* Rich text formatting */}
                    <div className="prose prose-sm prose-slate max-w-none text-ink-soft leading-relaxed mt-6">
                        {activeItemData.story.split('\n').map((paragraph: string, idx: number) => {
                            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                return <h3 key={idx} className="font-bold text-ink text-sm mt-4 mb-2 uppercase">{paragraph.replace(/\*\*/g, '')}</h3>;
                            }
                            if (paragraph.trim() === '') return null;
                            return <p key={idx} className="mb-3">{paragraph}</p>;
                        })}
                    </div>

                    {activeItemData.verses && activeItemData.verses.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-line-warm">
                            <h3 className="font-bold text-ink text-xs uppercase mb-3">{isNl ? "Genoemd in o.a." : "Mentioned in"}</h3>
                            <div className="flex flex-wrap gap-2">
                                {activeItemData.verses.slice(0, 15).map((v: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-surface text-slateblue border border-line-warm text-[10px] rounded shadow-sm">{v}</span>
                                ))}
                                {activeItemData.verses.length > 15 && (
                                    <span className="px-2 py-1 bg-surface text-slateblue border border-line-warm text-[10px] rounded shadow-sm">+{activeItemData.verses.length - 15} more...</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Fixed bottom action for 3D Structures */}
                {activeItemData.isStructure && (
                    <div className="p-4 border-t border-line-warm bg-surface mt-auto sticky bottom-0">
                        <button 
                            onClick={() => {
                                onSelectStructure(activeItemData.id);
                                onClose();
                            }}
                            className="btn-primary w-full !py-3 !rounded-xl !text-[0.95rem] !font-bold uppercase"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 4 L19 8 L19 15 L12 19 L5 15 L5 8 Z" />
                                <path d="M12 11.5 L19 8" />
                                <path d="M12 11.5 L5 8" />
                                <path d="M12 11.5 L12 19" />
                                <path d="M4 18 C 8 23 16 23 20 18" />
                                <path d="M16 18 L20 18 L20 22" />
                            </svg>
                            {isNl ? "Open 3D Model" : "Open 3D Model"}
                        </button>
                    </div>
                )}
              </div>
            )}
        </div>

        {/* RIGHT PANE */}
        <div className="h-full min-h-[400px] bg-paper relative z-0">
            <div ref={mapRef} className="absolute inset-0" />
        </div>

      </div>
      <div className="hidden custom-map-tooltip custom-bible-pin historical-map-label"></div>
    </ModalShell>
  );
}
