/** Interactive Bible Map — antique-style map with clickable structure pins.
 *  Uses Leaflet CRS.Simple with a custom image overlay (no external tiles). */
import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocale } from "@/i18n/locale";
import { structuresFor } from "@/data";
import { ModalShell } from "./ModalShell";

/* ── image dimensions ── */
const W = 627;
const H = 1024;
const BOUNDS: L.LatLngBoundsLiteral = [[0, 0], [H, W]];

/* ── pin positions on bible-map.png [y, x] where [0,0]=bottom-left ── */
interface MapPin {
  id: string;
  y: number;
  x: number;
  icon: string;
}

const PINS: MapPin[] = [
  // Babylon/Mesopotamia locations placed at the eastern/northern edges
  { id: "eden_fall",       y: 800, x: 580, icon: "🌳" },
  { id: "noahs_ark",      y: 950, x: 550,  icon: "🚢" },
  { id: "tower_babel",    y: 700, x: 580, icon: "🗼" },
  
  // Egypt & Sinai
  { id: "parting_sea",    y: 300, x: 250,  icon: "🌊" },
  { id: "tabernacle",     y: 250, x: 300,  icon: "⛺" },
  
  // Canaan / Israel
  { id: "walls_jericho",  y: 440, x: 410,  icon: "🏰" },
  { id: "solomon_temple", y: 420, x: 400,  icon: "🏛️" },
  { id: "ezekiel_temple", y: 410, x: 390,  icon: "🏛️" },
  { id: "herods_temple",  y: 425, x: 410,  icon: "🏛️" },
  { id: "mount_of_olives",y: 428, x: 420,  icon: "⛰️" },
  { id: "golgotha",       y: 415, x: 395,  icon: "✝️" },
  
  // Heavenly
  { id: "new_jerusalem",  y: 480, x: 400,  icon: "✨" },
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

    const map = L.map(containerRef.current, {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 3,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      attributionControl: false,
      zoomControl: false,
    });

    /* fit the image */
    map.fitBounds(BOUNDS);
    map.setMaxBounds(L.latLngBounds([-50, -50], [H + 50, W + 50]));

    /* image overlay */
    const base = import.meta.env.BASE_URL || "/";
    L.imageOverlay(`${base}img/bible-map.png`, BOUNDS).addTo(map);

    /* zoom control bottom-right */
    L.control.zoom({ position: "bottomright" }).addTo(map);

    /* markers */
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

      const marker = L.marker([pin.y, pin.x], { icon: markerIcon }).addTo(map);

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
        className="w-full rounded-xl border border-line-warm bg-surface shadow-inner"
        style={{ height: "65vh", minHeight: "500px", background: "#dcd1b6" }}
      />
    </ModalShell>
  );
}

// NOTE for CSS checker: dynamically used classes
// className="bm-leaflet bible-map-marker bm-pin bm-pin__icon bm-pin--heavenly bm-popup-wrapper bm-popup bm-popup__img bm-popup__body bm-popup__name bm-popup__region bm-popup__btn"
