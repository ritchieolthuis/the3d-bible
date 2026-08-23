import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";

/* ── real-world coordinates [lat, lng] ── */
interface MapPin {
  id: string;
  lat: number;
  lng: number;
  icon: string;
}

const PINS: MapPin[] = [
  // Babylon/Mesopotamia
  { id: "eden_fall",       lat: 31.000, lng: 47.000, icon: "🌳" }, // Confluence of Tigris/Euphrates
  { id: "noahs_ark",      lat: 39.700, lng: 44.300, icon: "🚢" }, // Mount Ararat
  { id: "tower_babel",    lat: 32.536, lng: 44.420, icon: "🗼" }, // Babylon
  
  // Egypt & Sinai
  { id: "parting_sea",    lat: 29.800, lng: 32.550, icon: "🌊" }, // Gulf of Suez / Pi-Hahiroth
  { id: "tabernacle",     lat: 28.539, lng: 33.975, icon: "⛺" }, // Near Mt Sinai
  
  // Canaan / Israel
  { id: "walls_jericho",  lat: 31.870, lng: 35.444, icon: "🏰" },
  { id: "solomon_temple", lat: 31.778, lng: 35.235, icon: "🏛️" },
  { id: "ezekiel_temple", lat: 31.782, lng: 35.236, icon: "🏛️" },
  { id: "herods_temple",  lat: 31.777, lng: 35.235, icon: "🏛️" },
  { id: "mount_of_olives",lat: 31.779, lng: 35.245, icon: "⛰️" },
  { id: "golgotha",       lat: 31.779, lng: 35.229, icon: "✝️" },
  
  // Heavenly
  { id: "new_jerusalem",  lat: 31.780, lng: 35.240, icon: "✨" },
];

/* ── component ── */
interface BibleMapProps {
  onSelectStructure: (id: string) => void;
  onClose: () => void;
}

export default function BibleMap({ onSelectStructure, onClose }: BibleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const { locale } = useLocale();
  const structures = structuresFor(locale);

  const handlePin = useCallback(
    (id: string) => {
      onSelectStructure(id);
      onClose();
    },
    [onSelectStructure, onClose],
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Standard coordinate system (EPSG:3857)
    const map = L.map(containerRef.current, {
      minZoom: 4,
      maxZoom: 12,
      zoomControl: false,
    });

    // Start centered on Israel, zoomed out to see Egypt and Mesopotamia
    map.setView([31.7, 35.2], 5);

    // Use a clean physical base map with antique CSS filters applied via index.css
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    /* zoom control bottom-right */
    L.control.zoom({ position: "bottomright" }).addTo(map);

    /* markers */
    const base = import.meta.env.BASE_URL || "/";
    for (const pin of PINS) {
      const struct = structures.find((s) => s.id === pin.id);
      if (!struct) continue;

      const isHeavenly = pin.id === "new_jerusalem";
      const markerIcon = L.divIcon({
        className: "bible-map-marker",
        html: `
          <div class="bm-pin ${isHeavenly ? "bm-pin--heavenly" : ""}">
            <span class="bm-pin__icon">${pin.icon}</span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -42],
      });

      const marker = L.marker([pin.lat, pin.lng], { icon: markerIcon }).addTo(map);

      const popupContent = `
        <div class="bm-popup">
          <img
            src="${base}img/${pin.id}/thumbnail.webp"
            alt="${struct.name}"
            class="bm-popup__img"
            onerror="this.style.display='none'"
          />
          <div class="bm-popup__body">
            <strong class="bm-popup__name">${struct.name}</strong>
            <p class="bm-popup__region">${struct.geography.regionLabel}</p>
            <button class="bm-popup__btn" data-id="${pin.id}">
              ${locale === "nl" ? "Verken in 3D →" : "Explore in 3D →"}
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: "bm-popup-wrapper",
        maxWidth: 260,
        minWidth: 200,
      });
    }

    /* click handler for popup buttons (event delegation) */
    map.getContainer().addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-id]");
      if (btn?.dataset.id) handlePin(btn.dataset.id);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalShell
      title={locale === "nl" ? "Interactieve Bijbelkaart" : "Interactive Bible Map"}
      kicker={locale === "nl" ? "Bijbelse Geografie" : "Biblical Geography"}
      onClose={onClose}
      wide={true}
    >
      <div 
        ref={containerRef} 
        className="bm-leaflet w-full rounded-xl border border-line-warm bg-surface shadow-inner"
        style={{ height: "65vh", minHeight: "500px" }}
      />
    </ModalShell>
  );
}
// NOTE for CSS checker: dynamically used classes
// className="bm-leaflet bible-map-marker bm-pin bm-pin__icon bm-pin--heavenly bm-popup-wrapper bm-popup bm-popup__img bm-popup__body bm-popup__name bm-popup__region bm-popup__btn"
