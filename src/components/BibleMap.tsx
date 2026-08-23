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
  hideOnMap?: boolean;
}

// 1. Existing 3D Structures
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
  { id: "new_jerusalem",   coords: [31.778, 35.235], hideOnMap: true }, // In index, but invisible on physical Earth map
];

// 2. Map-Only Context Places (No 3D models, just map pins & info)
interface ContextPlace {
    id: string;
    coords: [number, number];
    name: { nl: string; en: string };
    desc: { nl: string; en: string };
    region: { nl: string; en: string };
}

const CONTEXT_PLACES: ContextPlace[] = [
    { id: "rameses", coords: [30.800, 31.830], name: { nl: "Rameses (Gosen)", en: "Rameses (Goshen)" }, region: { nl: "Egypte", en: "Egypt" }, desc: { nl: "Startpunt van de Exodus.", en: "Starting point of the Exodus." } },
    { id: "succoth", coords: [30.550, 32.100], name: { nl: "Sukkoth", en: "Succoth" }, region: { nl: "Egypte", en: "Egypt" }, desc: { nl: "De eerste pleisterplaats na Rameses.", en: "The first encampment after Rameses." } },
    { id: "etham", coords: [30.450, 32.350], name: { nl: "Etham", en: "Etham" }, region: { nl: "Woestijn", en: "Wilderness" }, desc: { nl: "Aan de rand van de woestijn.", en: "On the edge of the wilderness." } },
    { id: "pi_hahiroth", coords: [29.800, 32.400], name: { nl: "Pi-Hachiroth", en: "Pi-Hahiroth" }, region: { nl: "Rode Zee", en: "Red Sea" }, desc: { nl: "Kampement voor de doortocht.", en: "Encampment before the crossing." } },
    { id: "migdol", coords: [30.850, 32.350], name: { nl: "Migdol", en: "Migdol" }, region: { nl: "Egypte", en: "Egypt" }, desc: { nl: "Egyptisch fort / wachttoren.", en: "Egyptian fort / watchtower." } },
    { id: "baal_zephon", coords: [31.100, 32.500], name: { nl: "Baäl-Zefon", en: "Baal-Zephon" }, region: { nl: "Egypte", en: "Egypt" }, desc: { nl: "Plaats aan de overkant van Pi-Hachiroth.", en: "Place opposite Pi-Hahiroth." } },
    { id: "marah", coords: [29.350, 32.950], name: { nl: "Mara", en: "Marah" }, region: { nl: "Sinaï", en: "Sinai" }, desc: { nl: "Plaats van het bittere water.", en: "Place of bitter water." } },
    { id: "elim", coords: [29.100, 33.100], name: { nl: "Elim", en: "Elim" }, region: { nl: "Sinaï", en: "Sinai" }, desc: { nl: "Oase met 12 waterbronnen en 70 palmbomen.", en: "Oasis with 12 springs and 70 palm trees." } },
    { id: "rephidim", coords: [28.700, 33.700], name: { nl: "Rafidim", en: "Rephidim" }, region: { nl: "Sinaï", en: "Sinai" }, desc: { nl: "Water uit de rots; strijd tegen Amalek.", en: "Water from the rock; battle with Amalek." } },
    { id: "ur", coords: [30.960, 46.100], name: { nl: "Ur der Chaldeeën", en: "Ur of the Chaldeans" }, region: { nl: "Mesopotamië", en: "Mesopotamia" }, desc: { nl: "De geboorteplaats van Abraham.", en: "The birthplace of Abraham." } },
    { id: "haran", coords: [36.860, 39.030], name: { nl: "Haran", en: "Haran" }, region: { nl: "Mesopotamië", en: "Mesopotamia" }, desc: { nl: "Waar Abraham verbleef voordat hij naar Kanaän ging.", en: "Where Abraham stayed before entering Canaan." } },
    { id: "shechem", coords: [32.213, 35.282], name: { nl: "Sichem", en: "Shechem" }, region: { nl: "Kanaän", en: "Canaan" }, desc: { nl: "God beloofde hier het land aan Abrahams nageslacht.", en: "God promised the land to Abraham's offspring here." } },
    { id: "hebron", coords: [31.532, 35.099], name: { nl: "Hebron", en: "Hebron" }, region: { nl: "Juda", en: "Judah" }, desc: { nl: "Rustplaats van Abraham, Isaäk en Jakob.", en: "Resting place of Abraham, Isaac, and Jacob." } },
    { id: "beersheba", coords: [31.250, 34.790], name: { nl: "Beër-Sjeba", en: "Beersheba" }, region: { nl: "Kanaän", en: "Canaan" }, desc: { nl: "Zuidelijke grens van Israël, put van de eed.", en: "Southern border of Israel, well of the oath." } },
    { id: "damascus", coords: [33.513, 36.292], name: { nl: "Damascus", en: "Damascus" }, region: { nl: "Aram", en: "Aram" }, desc: { nl: "Oude stad; Paulus kwam hier tot bekering.", en: "Ancient city; Paul was converted here." } },
    { id: "nineveh", coords: [36.360, 43.150], name: { nl: "Ninevé", en: "Nineveh" }, region: { nl: "Assyrië", en: "Assyria" }, desc: { nl: "Hoofdstad van Assyrië, bezocht door Jona.", en: "Capital of Assyria, visited by Jonah." } },
    { id: "nazareth", coords: [32.700, 35.297], name: { nl: "Nazareth", en: "Nazareth" }, region: { nl: "Galilea", en: "Galilee" }, desc: { nl: "De woonplaats van Jezus waar Hij opgroeide.", en: "The hometown where Jesus grew up." } },
    { id: "capernaum", coords: [32.880, 35.575], name: { nl: "Kafarnaüm", en: "Capernaum" }, region: { nl: "Galilea", en: "Galilee" }, desc: { nl: "Het centrum van Jezus' bediening rondom het meer.", en: "The center of Jesus' ministry around the sea." } },
];

const EXODUS_ROUTE: [number, number][] = [
    [30.800, 31.830], // Rameses
    [30.550, 32.100], // Succoth
    [30.450, 32.350], // Etham
    [29.800, 32.400], // Pi-Hahiroth
    [29.800, 32.550], // Parting of the Sea
    [29.350, 32.950], // Marah
    [29.100, 33.100], // Elim
    [28.700, 33.700], // Rephidim
    [28.539, 33.975], // Mount Sinai
];

function createCustomIcon(isHeavenly: boolean, isSelected: boolean = false, offset: [number, number] = [0, 0], isMapOnly: boolean = false) {
  // Use brand consistent colors (Slate Blue / Gold / Ivory)
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMapId, setActiveMapId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const leafletMapInstance = useRef<L.Map | null>(null);

  // Combine structures and map-only places for search and rendering
  const allListItems = [
    ...PINS.map(pin => {
      const s = structures.find(x => x.id === pin.id);
      return {
          id: pin.id,
          coords: pin.coords,
          name: s ? s.name : pin.id,
          regionLabel: s ? s.geography.regionLabel : "",
          isStructure: true,
          hideOnMap: pin.hideOnMap
      };
    }).filter(p => structures.some(s => s.id === p.id)),
    ...CONTEXT_PLACES.map(cp => ({
        id: cp.id,
        coords: cp.coords,
        name: isNl ? cp.name.nl : cp.name.en,
        regionLabel: isNl ? cp.region.nl : cp.region.en,
        isStructure: false,
        hideOnMap: false
    }))
  ];

  const filteredList = allListItems.filter(item => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.regionLabel.toLowerCase().includes(q);
  });

  const handleSidebarClick = (item: typeof allListItems[0]) => {
      setActiveMapId(item.id);
      
      if (item.hideOnMap) {
          // If the item (like New Jerusalem) does not physically exist on the Earth map,
          // simply bypass map flight and load the 3D model directly!
          if (item.isStructure) {
              onSelectStructure(item.id);
              onClose();
          }
      } else if (leafletMapInstance.current) {
          leafletMapInstance.current.flyTo(item.coords, 10, { duration: 1.5 });
      }
  };

  const toggleFullscreen = () => {
      if (!containerRef.current) return;
      if (!document.fullscreenElement) {
          containerRef.current.requestFullscreen().catch(err => console.error(err));
      } else {
          document.exitFullscreen();
      }
  };

  useEffect(() => {
      const handleFullscreenChange = () => {
          setIsFullscreen(!!document.fullscreenElement);
          setTimeout(() => {
              leafletMapInstance.current?.invalidateSize();
          }, 100);
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    
    const map = L.map(mapRef.current, {
      minZoom: 3,
      maxZoom: 12,
      attributionControl: false,
      zoomSnap: 0.5
    });
    
    // Bounds calculations must ignore hidden items (New Jerusalem) to prevent broken views
    const allCoords = [
        ...PINS.filter(p => !p.hideOnMap).map(p => p.coords), 
        ...CONTEXT_PLACES.map(p => p.coords)
    ];
    const bounds = L.latLngBounds(allCoords as [number, number][]);
    map.fitBounds(bounds, { padding: [40, 40] });
    
    leafletMapInstance.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

    L.polyline(EXODUS_ROUTE, {
        color: '#3C5E70', // Brand Slate Blue
        weight: 3,
        opacity: 0.6,
        dashArray: '5, 10',
        lineCap: 'round',
    }).addTo(map);

    return () => {
      map.remove();
      leafletMapInstance.current = null;
    };
  }, [base, locale]);

  // Render all markers dynamically
  useEffect(() => {
      const map = leafletMapInstance.current;
      if (!map) return;
      const markers: L.Marker[] = [];

      // 1. Render Structures (3D models)
      PINS.forEach(pin => {
        if (pin.hideOnMap) return; // Do not render New Jerusalem on the Earth map!
        
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
              <p style="margin:4px 0 0 0; font-size:10px; font-weight:bold; color:#3C5E70;">${isNl ? "Klik om model te openen →" : "Click to open model →"}</p>
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
              map.flyTo(pin.coords as [number, number], 10, { duration: 1.0 });
          }
        });
        markers.push(marker);
      });

      // 2. Render Context Places (Map-only)
      CONTEXT_PLACES.forEach(cp => {
          const isSelected = activeMapId === cp.id;
          const marker = L.marker(cp.coords as [number, number], {
              icon: createCustomIcon(false, isSelected, [0,0], true)
          }).addTo(map);

          const tooltipHtml = `
            <div style="padding:6px; min-width: 180px; white-space: normal;">
              <p style="margin:0 0 4px 0; font-weight:bold; font-size:13px; color:#222; text-transform:uppercase; line-height: 1.2;">${isNl ? cp.name.nl : cp.name.en}</p>
              <p style="margin:0; font-size:11px; color:#444;">${isNl ? cp.desc.nl : cp.desc.en}</p>
            </div>
          `;

          marker.bindTooltip(tooltipHtml, { direction: 'top', offset: [0, isSelected ? -10 : -6], className: 'custom-map-tooltip' });

          marker.on('click', () => {
             setActiveMapId(cp.id);
             map.flyTo(cp.coords as [number, number], 10, { duration: 1.0 });
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
      <div 
        ref={containerRef}
        className={`mx-auto w-full flex flex-col md:flex-row overflow-hidden bg-paper ${isFullscreen ? '' : 'max-w-[1200px] rounded-xl border border-line-strong shadow-inner'}`} 
        style={isFullscreen ? { height: "100vh", width: "100vw" } : { height: "75vh", minHeight: "550px" }}
      >
        
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
                    {filteredList.length} {locale === "nl" ? "locaties gevonden" : "locations found"}
                </p>
                {filteredList.map(item => {
                    const isActive = activeMapId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSidebarClick(item)}
                            className={`w-full text-left px-3 py-3 rounded-lg mb-1 flex items-center gap-3 transition-colors ${isActive ? 'bg-paper shadow-sm border border-line-warm' : 'hover:bg-paper border border-transparent'}`}
                        >
                            {item.isStructure ? (
                                <img src={`${base}img/${item.id}/thumbnail.webp`} alt="" className="w-8 h-8 object-cover rounded flex-none" />
                            ) : (
                                <div className="w-8 h-8 rounded flex items-center justify-center bg-surface flex-none border-2 border-slate">
                                    <span className="text-slate font-bold text-xs">P</span>
                                </div>
                            )}
                            <div className="flex-1 overflow-hidden">
                                <p className={`truncate text-sm font-bold ${isActive ? 'text-ink' : 'text-ink-muted'}`}>{item.name}</p>
                                <p className="truncate text-[10px] text-ink-light">{item.regionLabel}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>

        {/* RIGHT PANE */}
        <div className="relative flex-1 h-full bg-paper">
            <div ref={mapRef} style={{ width: "100%", height: "100%", zIndex: 1 }} />
            
            <button 
                onClick={toggleFullscreen}
                className="absolute bottom-4 right-4 z-[400] bg-surface text-ink hover:text-gold p-2.5 rounded shadow-lg border border-line flex items-center justify-center transition-colors"
                title={locale === "nl" ? "Volledig Scherm" : "Fullscreen"}
            >
                {isFullscreen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                )}
            </button>
        </div>

      </div>
      <div className="hidden custom-map-tooltip custom-bible-pin historical-map-label"></div>
    </ModalShell>
  );
}
