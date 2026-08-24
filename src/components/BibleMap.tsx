import { useEffect, useRef, useState, useMemo } from "react";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";
import L from "leaflet";
import { MAP_ERAS, STRUCTURE_ERAS } from '../data/eras';
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

const IMPORTANT_PLACES = [
  'babylon', 'rome', 'susa', 'alexandria', 'memphis', 'tyrus', 'mount_sinai',
  'nazareth', 'bethlehem', 'capernaum', 'sea_of_galilee', 'damascus', 'antioch',
  'ephesus', 'corinth', 'athens', 'megiddo', 'carmel', 'hebron', 'beersheba',
  'sichem', 'bethel', 'goshen', 'ur', 'haran', 'nineveh', 'patmos', 'caesarea', 
  'caesarea_philippi', 'jerusalem', 'joppa', 'ararat', 'tabor'
];

function createCustomIcon(markerType: '3d' | 'important' | 'other', isSelected: boolean = false, offset: [number, number] = [0, 0]) {
  let bgColor = '#ffffff';
  let borderColor = '#3C5E70';
  let sizePx = isSelected ? 16 : 10;
  let hasPulse = false;

  if (markerType === '3d') {
      bgColor = '#FFD700';
      borderColor = '#ffffff';
      sizePx = isSelected ? 22 : 16;
      hasPulse = true;
  } else if (markerType === 'important') {
      bgColor = '#3C5E70';
      borderColor = '#ffffff';
      sizePx = isSelected ? 18 : 12;
  }

  const anchor = sizePx / 2;

  return L.divIcon({
    className: 'custom-bible-pin',
    html: `
      <div style="
        width: ${sizePx}px; 
        height: ${sizePx}px; 
        background: ${bgColor}; 
        border: 2px solid ${borderColor}; 
        border-radius: 50%; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transform: translate(${offset[0]}px, ${offset[1]}px);
        transition: all 0.2s ease-in-out;
      ">
        ${hasPulse ? `<div style="position:absolute; inset:-6px; border: 1px solid #FFD700; border-radius:50%; animation: pulse 2s infinite;"></div>` : ''}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [anchor, anchor]
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
  const [activeEra, setActiveEra] = useState<number | null>(null);

  const [activeMapId, setActiveMapId] = useState<string | null>(null);
  const [isSidebarDetailOpen, setIsSidebarDetailOpen] = useState(false);
  const leafletMapInstance = useRef<L.Map | null>(null);

  const allListItems = useMemo(() => [
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
          verses: [] as string[],
          eras: STRUCTURE_ERAS[pin.id] || []
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
        verses: cp.verses || [],
        eras: cp.eras || []
    }))
  ], [structures, isNl]);

  const filteredList = useMemo(() => allListItems.filter((item: any) => {
      if (activeEra !== null) {
          if (!item.eras.includes(activeEra)) return false;
      }
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.regionLabel.toLowerCase().includes(q);
  }).sort((a: any, b: any) => {
      const eraA = Math.min(...(a.eras.length ? a.eras : [99]));
      const eraB = Math.min(...(b.eras.length ? b.eras : [99]));
      return eraA - eraB;
  }), [allListItems, activeEra, searchQuery]);

  const activeItemData = allListItems.find((item: any) => item.id === activeMapId);

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
      attributionControl: true,
      zoomSnap: 0.5
    });
    
    // Set exact overview as requested (fits Egypt up to Turkey, and Mediterranean to Iran)
    // Start with a strict bounding box that perfectly aligns with the requested view
    // Focus heavily on the core biblical theater (Israel/Sinai) where 90% of the points are
    const viewBounds = L.latLngBounds([
        [28.0, 32.0], // Deep Sinai/Egypt
        [34.0, 36.5]  // North Israel/Lebanon
    ]);
    map.fitBounds(viewBounds, { padding: [30, 30] });
    
    leafletMapInstance.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { subdomains: 'abcd', maxZoom: 19, attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> | Place data &copy; <a href="https://www.openbible.info/" target="_blank">OpenBible.info</a>, CC BY 4.0' }).addTo(map);

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



  useEffect(() => {
    const handlePopupClick = (e: any) => {
      const id = e.detail;
      const mainPin = PINS.find(p => p.id === id);
      const ctxPin = CONTEXT_PLACES.find(p => p.id === id);
      const coords = mainPin ? mainPin.coords : (ctxPin ? ctxPin.coords : null);
      if (coords) {
        handleMapPinClick(id, coords as [number, number]);
      }
    };
    window.addEventListener('mapPopupClick', handlePopupClick);
    return () => window.removeEventListener('mapPopupClick', handlePopupClick);
  }, [handleMapPinClick]);

  // Render map markers
  useEffect(() => {
      const map = leafletMapInstance.current;
      if (!map) return;
      const markers: L.Marker[] = [];

      filteredList.forEach((item: any) => {
        if (item.hideOnMap) return;
        
        const isSelected = activeMapId === item.id;
        const pinDef = PINS.find(p => p.id === item.id);
        const offset = pinDef ? pinDef.offset : [0,0];

        const marker = L.marker(item.coords as [number, number], { 
            icon: createCustomIcon(item.isStructure ? '3d' : (IMPORTANT_PLACES.includes(item.id) ? 'important' : 'other'), isSelected, offset as [number, number]) 
        }).addTo(map);
        
        const tooltipHtml = `
          <div onclick="window.dispatchEvent(new CustomEvent('mapPopupClick', {detail: '${item.id}'}))" style="cursor:pointer; display:flex; gap:12px; align-items:center; padding:6px; min-width: 220px; white-space: normal;">
            <img src="${base}img/${item.id}/thumbnail.webp" alt="" style="height:48px; width:48px; object-fit:cover; border-radius:4px; border:1px solid #ddd;" onerror="this.style.display='none'"/>
            <div style="flex:1;">
              <p style="margin:0; font-weight:bold; font-size:13px; color:#222; text-transform:uppercase; line-height: 1.2;">${item.name}</p>
              <p style="margin:2px 0 0 0; font-size:10px; font-style:italic; color:#666;">${item.regionLabel}</p>
              <p style="margin:4px 0 0 0; font-size:10px; font-weight:bold; color:#3C5E70;">${locale === "nl" ? "Lees het verhaal →" : "Read the story →"}</p>
            </div>
          </div>
        `;
        
        marker.bindPopup(tooltipHtml, { offset: [offset?.[0] || 0, (offset?.[1] || 0) - (isSelected ? 14 : 10)], className: 'custom-map-popup', closeButton: false, autoPan: false });
        marker.on('mouseover', (e: any) => { e.target.openPopup(); });
        
        marker.on('click', () => handleMapPinClick(item.id, item.coords as [number, number]));
        markers.push(marker);
      });

      return () => {
          markers.forEach(m => m.remove());
      };
  }, [base, locale, structures, activeMapId, isSidebarDetailOpen, filteredList]);

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
        className="mx-auto w-full h-[75vh] min-h-[600px] flex-1 grid grid-cols-1 md:grid-cols-[400px_1fr] overflow-hidden bg-paper rounded-xl border border-line-strong shadow-inner"
      >
        
        {/* LEFT PANE - Dynamic Layout */}
        <div className="h-full flex flex-col min-h-0 border-b md:border-b-0 md:border-r border-line-warm bg-surface relative">
            
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
                
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-2">
                    <p className="px-2 text-xs font-bold text-ink-muted mb-2 uppercase">
                        {filteredList.length} {locale === "nl" ? "locaties gevonden" : "locations found"}
                    </p>
                    {filteredList.map((item: any) => {
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSidebarClick(item)}
                                className={`w-full text-left px-3 py-3 rounded-xl mb-1 flex items-center gap-4 transition-colors hover:bg-paper border border-transparent`}
                            >
                                <img 
                                    src={`${base}img/${item.id}/thumbnail.webp`} 
                                    alt="" 
                                    className="w-14 h-14 object-cover rounded-md flex-none border border-line-warm shadow-sm bg-paper-deep" 
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        if (e.currentTarget.nextElementSibling) {
                                            (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                                        }
                                    }}
                                />
                                <div style={{display: 'none'}} className="w-14 h-14 rounded-md items-center justify-center bg-paper-deep flex-none border border-line-warm shadow-sm">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-muted"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
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
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col bg-paper absolute inset-0 z-10 animate-in fade-in slide-in-from-right-4 duration-300">
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
                    <img 
                        src={`${base}img/${activeItemData.id}/thumbnail.webp`} 
                        alt="" 
                        className="w-full h-auto max-h-[250px] object-contain rounded-xl mb-4 border border-line-warm shadow-sm bg-paper-deep" 
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    
                    <h2 className="font-display text-[1.5rem] font-bold leading-none text-ink">{activeItemData.name}</h2>
                    <p className="font-serif mt-0.5 mb-4 text-[1rem] italic text-terracotta">{activeItemData.regionLabel}</p>
                    
                    {/* Rich text formatting */}
                    <div className="prose text-[0.85rem] prose-slate max-w-none text-ink-soft leading-relaxed mt-4">
                        {activeItemData.story.split('\n').map((paragraph: string, idx: number) => {
                            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                return <h3 key={idx} className="font-bold text-ink text-sm mt-4 mb-2 uppercase">{paragraph.replace(/\*\*/g, '')}</h3>;
                            }
                            if (paragraph.trim() === '') return null;
                            
                            // Parse quotes if present so they render as blue/italic without visible arrows
                            const parts = [];
                            let lastIndex = 0;
                            const quoteRegex = /«(.*?)»/g;
                            let match;
                            while ((match = quoteRegex.exec(paragraph)) !== null) {
                                if (match.index > lastIndex) {
                                    parts.push(paragraph.slice(lastIndex, match.index));
                                }
                                parts.push(
                                    <span key={match.index} className="italic text-slateblue font-serif">
                                        {match[1]}
                                    </span>
                                );
                                lastIndex = match.index + match[0].length;
                            }
                            if (lastIndex < paragraph.length) {
                                parts.push(paragraph.slice(lastIndex));
                            }
                            
                            return <p key={idx} className="mb-3">{parts.length > 0 ? parts : paragraph}</p>;
                        })}
                    </div>

                    {activeItemData.verses && activeItemData.verses.length > 0 && (
                        <div className="mt-4 pt-6 border-t border-line-warm">
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
            {/* Timeline Filter UI */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] w-[95%] max-w-4xl pointer-events-none">
                <div className="flex overflow-x-auto hide-scrollbar gap-2 p-2 bg-surface/95 backdrop-blur-sm rounded-2xl shadow-xl border border-line-warm items-center pointer-events-auto">
                    <button 
                        onClick={() => setActiveEra(null)} 
                        className={`flex-none px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all ${activeEra === null ? 'bg-terracotta text-paper shadow-md' : 'hover:bg-paper-deep text-ink-soft'}`}
                    >
                        {isNl ? 'Alle Tijden' : 'All Eras'}
                    </button>
                    <div className="w-px h-8 bg-line-warm flex-none mx-1"></div>
                    {MAP_ERAS.map(era => (
                        <button 
                            key={era.id} 
                            onClick={() => setActiveEra(era.id === activeEra ? null : era.id)}
                            className={`flex-none px-4 py-1.5 flex flex-col items-start rounded-xl whitespace-nowrap transition-all ${activeEra === era.id ? 'bg-slate-700 text-white shadow-md scale-105' : 'hover:bg-paper-deep text-ink-soft opacity-80 hover:opacity-100'}`}
                        >
                            <span className="text-[13px] font-bold">{isNl ? era.name.nl : era.name.en}</span>
                            <span className="text-[10px] opacity-75">{era.dates}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

      </div>
      <div className="hidden custom-map-tooltip custom-bible-pin historical-map-label"></div>
    </ModalShell>
  );
}
