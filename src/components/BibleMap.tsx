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

interface ContextPlace {
    id: string;
    coords: [number, number];
    name: { nl: string; en: string };
    desc: { nl: string; en: string };
    region: { nl: string; en: string };
    story: { nl: string; en: string };
    verses: string[];
}

const CONTEXT_PLACES: ContextPlace[] = [
    { 
      id: "jerusalem", 
      coords: [31.7767, 35.2342], 
      name: { nl: "Jeruzalem", en: "Jerusalem" }, 
      region: { nl: "Juda", en: "Judah" }, 
      desc: { nl: "De heilige stad en hoofdstad van Israël.", en: "The holy city and capital of Israel." },
      story: {
        nl: `**Archeologische en historische betekenis**
Jeruzalem ligt op een verdedigbare heuvelrug in het Judese hoogland, met archeologische bewijzen van bewoning die dateren uit de vroege bronstijd, hoewel de stad pas echt tot bloei kwam tijdens de IJzertijd II (10e-8e eeuw v.Chr.). De Gihonbron zorgde voor essentiële watervoorziening, waardoor de locatie strategisch waardevol was; opgravingen hebben vestingwerken en administratieve structuren uit de tijd van David en de latere monarchie aan het licht gebracht, wat de rol van Jeruzalem als belangrijk administratief centrum in het oude Juda bevestigt.

**Culturele en geografische context**
Jeruzalem, gelegen op een hoogte van ongeveer 760 meter in het centrale heuvelland, beheerste cruciale handelsroutes tussen de kustgebieden en de Jordaanvallei, waardoor het gedurende de Bijbelse periode economisch en militair van groot belang was. De natuurlijke verdedigingskracht van de stad door valleien aan drie zijden (de Kidronvallei, de Hinnomvallei en de Tyropoeonvallei) maakte haar vrijwel onneembaar voor een directe aanval. Dit verklaart waarom het een Jebusitisch bolwerk bleef tot de verovering door David en waarom het de gekozen hoofdstad werd van de verenigde monarchie.

**Theologische betekenis**
Jeruzalem komt in het boek Jozua naar voren als een van de vijf Amorietische koningen die in de zuidelijke veldtocht werden verslagen, waarmee het wordt gevestigd als een veroverde, maar aanvankelijk niet-veroverde stad binnen Israëls territoriale aanspraken. De theologische betekenis van de stad neemt toe wanneer David haar verovert en vestigt als Israëls politieke en religieuze hoofdstad. Het wordt uiteindelijk de locatie van Salomo's Tempel en het middelpunt van de verbondsaanbidding – een status die Jeruzalem in de hele Schrift verheft tot de woonplaats van Gods aanwezigheid en het symbool van Zijn koninkrijk op aarde.`,
        en: `**Archaeological and historical significance**
Jerusalem sits on a defensible ridge in the Judean highlands...`
      },
      verses: ["Jozua 10:1", "2 Samuël 5:6", "1 Koningen 8:1", "Psalm 122:1", "Zacharia 8:3", "Mattheüs 23:37", "Openbaring 21:2"]
    },
    
    { 
      id: "migdol", 
      coords: [30.850, 32.350], 
      name: { nl: "Migdol", en: "Migdol" }, 
      region: { nl: "Egypte", en: "Egypt" }, 
      desc: { nl: "Egyptisch fort of wachttoren nabij de Rode Zee.", en: "Egyptian fort or watchtower near the Red Sea." },
      story: {
        nl: "**Archeologische & Historische Betekenis**\nHet woord 'Migdol' is een leenwoord uit het Kanaänitisch en betekent 'toren' of 'fort'. Archeologen hebben in dit grensgebied (de oostelijke Nijldelta) restanten van een keten van indrukwekkende militaire forten gevonden (de zogenaamde 'Muurs of the Ruler'). Deze dienden om de oostgrens van Egypte te bewaken tegen binnendringende nomaden en ontsnappende slaven.\n\n**Culturele & Geografische Context**\nGelegen aan de rand van de woestijn fungeerde Migdol als een duidelijk baken en grensstation. Toen Israël de opdracht kreeg om 'om te keren en zich te legeren voor Pi-Hachiroth, tussen Migdol en de zee' (Exodus 14:2), was dit militair gezien een extreem onlogische zet: het plaatste hen ingesloten tussen de zee en de zwaarbewapende Egyptische grensposten.\n\n**Theologische Betekenis**\nGod leidde het volk bewust in een fysieke 'valstrik' om Zijn ultieme verlossingskracht te tonen. Migdol (de toren/menselijke macht) stond machteloos toen God voor Zijn volk streed en de zee spleet.",
        en: "**Archaeological & Historical Significance**\nMigdol means 'tower' or 'fort'. It represents the Egyptian military border defenses that Israel was trapped against before the crossing of the sea, highlighting God's ultimate deliverance."
      },
      verses: ["Exodus 14:2", "Numeri 33:7", "Jeremia 44:1", "Jeremia 46:14"]
    },
    { 
      id: "pi_hahiroth", 
      coords: [29.800, 32.400], 
      name: { nl: "Pi-Hachiroth", en: "Pi-Hahiroth" }, 
      region: { nl: "Rode Zee", en: "Red Sea" }, 
      desc: { nl: "Kampement vlak voor de doortocht.", en: "Encampment before the crossing." },
      story: {
        nl: "**Geografische Context**\nPi-Hachiroth (wat in het Hebreeuws mogelijk klinkt als 'monding van de kloven', maar vermoedelijk een Egyptische naam is die 'Huis van de godin Hathor' betekent) was de exacte locatie waar Mozes en de Israëlieten hun kamp opsloegen voordat de Rode Zee spleet. Het lag ten oosten van Baäl-Zefon.\n\n**Theologische Betekenis**\nHier bereikte de wanhoop van het volk een kookpunt toen de farao naderde. Het is de plek waar Mozes de beroemde woorden sprak: 'Wees niet bevreesd, houd stand, zie het heil van de HEERE' (Exod. 14:13).",
        en: "**Geographical Context**\nThe encampment where the Israelites were trapped between the sea and Pharaoh's army, leading to the miraculous parting of the waters."
      },
      verses: ["Exodus 14:2", "Exodus 14:9", "Numeri 33:7", "Numeri 33:8"]
    },
    { 
      id: "damascus", 
      coords: [33.513, 36.292], 
      name: { nl: "Damascus", en: "Damascus" }, 
      region: { nl: "Aram", en: "Aram" }, 
      desc: { nl: "Oude stad; Paulus kwam hier tot bekering.", en: "Ancient city; Paul was converted here." },
      story: {
        nl: "**Archeologische & Historische Betekenis**\nDamascus is een van de oudste continu bewoonde steden ter wereld. Al in Genesis wordt de stad genoemd als de woonplaats van Eliëzer, Abrahams dienaar. Tijdens de koningentijd was Damascus de machtige hoofdstad van het Aramese rijk.\n\n**Theologische Betekenis**\nIn het Nieuwe Testament krijgt Damascus een enorme betekenis. Het was op de weg naar Damascus dat de felle christenvervolger Saulus een verblindende ontmoeting had met de opgestane Jezus. Deze gebeurtenis in Damascus veranderde hem in Paulus, de grootste apostel voor de heidenen.",
        en: "**Archaeological & Historical Significance**\nOne of the oldest continuously inhabited cities. Famous in the New Testament as the location of Paul's dramatic conversion on the road to Damascus."
      },
      verses: ["Genesis 15:2", "1 Koningen 11:24", "Handelingen 9:2", "Handelingen 9:27", "2 Korinthe 11:32"]
    },
    { 
      id: "shechem", 
      coords: [32.213, 35.282], 
      name: { nl: "Sichem", en: "Shechem" }, 
      region: { nl: "Kanaän", en: "Canaan" }, 
      desc: { nl: "God beloofde hier het land aan Abrahams nageslacht.", en: "God promised the land to Abraham's offspring here." },
      story: {
        nl: "**Archeologische & Historische Betekenis**\nSichem ligt strategisch in een vallei tussen de berg Ebal en de berg Gerizim. Het is de eerste stad in Kanaän die Abraham bezocht. Jozua vernieuwde later precies in deze vallei het verbond met God, waarbij het volk zegeningen en vervloekingen uitsprak vanaf de twee bergen.\n\n**Nieuwe Testament Context**\nVlakbij Sichem lag Sichar, waar Jezus de Samaritaanse vrouw ontmoette bij de put van Jakob (Johannes 4).",
        en: "**Archaeological & Historical Significance**\nThe first city Abraham visited in Canaan, and later the site where Joshua renewed the covenant between the mountains of Ebal and Gerizim."
      },
      verses: ["Genesis 12:6", "Jozua 24:1", "1 Koningen 12:1", "Johannes 4:5"]
    },
    { 
      id: "hebron", 
      coords: [31.532, 35.099], 
      name: { nl: "Hebron", en: "Hebron" }, 
      region: { nl: "Juda", en: "Judah" }, 
      desc: { nl: "Rustplaats van Abraham, Isaäk en Jakob.", en: "Resting place of Abraham, Isaac, and Jacob." },
      story: {
        nl: "**Historische Context**\nHebron is een belangrijke patriarchale stad in de hooglanden van Juda. Abraham kocht hier de grot van Machpela om Sara te begraven. Later werden Abraham zelf, Isaäk, Rebekka, Jakob en Lea hier bijgezet.\n\n**Theologische Betekenis**\nDavid werd in Hebron tot koning gezalfd en regeerde de eerste zeven jaar van zijn koningschap vanuit deze stad, voordat Jeruzalem veroverd werd. Het is een symbool van Gods trouw aan de aartsvaders.",
        en: "**Historical Context**\nA major patriarchal city where Abraham, Isaac, and Jacob are buried. David ruled here for seven years before conquering Jerusalem."
      },
      verses: ["Genesis 13:18", "Genesis 23:2", "2 Samuël 2:1", "2 Samuël 5:3"]
    },
    { id: "rameses", coords: [30.800, 31.830], name: { nl: "Rameses (Gosen)", en: "Rameses (Goshen)" }, region: { nl: "Egypte", en: "Egypt" }, desc: { nl: "Startpunt van de Exodus.", en: "Starting point of the Exodus." }, story: { nl: "De voorraadstad die door de Israëlitische slaven werd gebouwd voor de farao. Het diende als het vertrekpunt van de enorme uittocht uit Egypte.", en: "The store city built by Israelite slaves, serving as the starting point of the Exodus." }, verses: ["Exodus 1:11", "Exodus 12:37", "Numeri 33:3"] },
    { id: "succoth", coords: [30.550, 32.100], name: { nl: "Sukkoth", en: "Succoth" }, region: { nl: "Egypte", en: "Egypt" }, desc: { nl: "De eerste pleisterplaats na Rameses.", en: "The first encampment after Rameses." }, story: { nl: "De naam betekent 'loofhutten'. Hier legerden de Israëlieten zich voor het eerst nadat ze Rameses hadden verlaten, voordat ze de woestijn in trokken.", en: "Meaning 'booths', this was the first encampment of the Israelites after leaving Rameses." }, verses: ["Exodus 12:37", "Exodus 13:20", "Numeri 33:5"] },
    { id: "etham", coords: [30.450, 32.350], name: { nl: "Etham", en: "Etham" }, region: { nl: "Woestijn", en: "Wilderness" }, desc: { nl: "Aan de rand van de woestijn.", en: "On the edge of the wilderness." }, story: { nl: "Een legerplaats aan de rand van de woestijn. Vanaf hier wees de wolkkolom overdag en de vuurkolom 's nachts hen de weg.", en: "An encampment on the edge of the wilderness where the pillar of cloud and fire began to guide them." }, verses: ["Exodus 13:20", "Numeri 33:6"] },
    { id: "baal_zephon", coords: [31.100, 32.500], name: { nl: "Baäl-Zefon", en: "Baal-Zephon" }, region: { nl: "Egypte", en: "Egypt" }, desc: { nl: "Plaats aan de overkant van Pi-Hachiroth.", en: "Place opposite Pi-Hahiroth." }, story: { nl: "Gelegen tegenover Pi-Hachiroth. De naam verwijst waarschijnlijk naar een lokaal heiligdom van een Kanaänitische of Fenicische godheid.", en: "Located opposite Pi-Hahiroth, likely named after a local Canaanite deity's shrine." }, verses: ["Exodus 14:2", "Exodus 14:9", "Numeri 33:7"] },
    { id: "marah", coords: [29.350, 32.950], name: { nl: "Mara", en: "Marah" }, region: { nl: "Sinaï", en: "Sinai" }, desc: { nl: "Plaats van het bittere water.", en: "Place of bitter water." }, story: { nl: "Na drie dagen in de woestijn vonden ze hier water, maar het was te bitter om te drinken. Mozes wierp een door God aangewezen stuk hout in het water, waardoor het zoet werd.", en: "The place where the bitter water was miraculously made sweet by Moses." }, verses: ["Exodus 15:23", "Numeri 33:8"] },
    { id: "elim", coords: [29.100, 33.100], name: { nl: "Elim", en: "Elim" }, region: { nl: "Sinaï", en: "Sinai" }, desc: { nl: "Oase met 12 waterbronnen en 70 palmbomen.", en: "Oasis with 12 springs and 70 palm trees." }, story: { nl: "Een oase van rust in de woestijn, met twaalf waterbronnen en zeventig palmbomen. Hier kon het volk fysiek en geestelijk herstellen.", en: "An oasis of rest with twelve springs and seventy palm trees." }, verses: ["Exodus 15:27", "Numeri 33:9"] },
    { id: "rephidim", coords: [28.700, 33.700], name: { nl: "Rafidim", en: "Rephidim" }, region: { nl: "Sinaï", en: "Sinai" }, desc: { nl: "Water uit de rots; strijd tegen Amalek.", en: "Water from the rock; battle with Amalek." }, story: { nl: "Hier murmureerde het volk wegens watertekort en sloeg Mozes op de rots. Ook bond Jozua hier de strijd aan met de Amalekieten terwijl Mozes met geheven armen op de heuvel stond.", en: "Where water flowed from the rock and Joshua fought Amalek while Moses held up his hands." }, verses: ["Exodus 17:1", "Exodus 17:8", "Numeri 33:14"] },
    { id: "ur", coords: [30.960, 46.100], name: { nl: "Ur der Chaldeeën", en: "Ur of the Chaldeans" }, region: { nl: "Mesopotamië", en: "Mesopotamia" }, desc: { nl: "De geboorteplaats van Abraham.", en: "The birthplace of Abraham." }, story: { nl: "Een machtige en welvarende Sumerische stad. Abraham werd door God geroepen om deze hoogontwikkelde (maar afgodische) stad te verlaten.", en: "The birthplace of Abraham, from which God called him to leave." }, verses: ["Genesis 11:28", "Genesis 11:31", "Nehemia 9:7"] },
    { id: "haran", coords: [36.860, 39.030], name: { nl: "Haran", en: "Haran" }, region: { nl: "Mesopotamië", en: "Mesopotamia" }, desc: { nl: "Waar Abraham verbleef voordat hij naar Kanaän ging.", en: "Where Abraham stayed before entering Canaan." }, story: { nl: "De stad waar Abrahams vader Terach stierf, en waar Abraham bleef totdat hij op 75-jarige leeftijd verder reisde naar het beloofde land.", en: "Where Abraham lived until his father died, before journeying to Canaan." }, verses: ["Genesis 11:31", "Genesis 12:4", "Handelingen 7:2"] },
    { id: "beersheba", coords: [31.250, 34.790], name: { nl: "Beër-Sjeba", en: "Beersheba" }, region: { nl: "Kanaän", en: "Canaan" }, desc: { nl: "Zuidelijke grens van Israël, put van de eed.", en: "Southern border of Israel, well of the oath." }, story: { nl: "Bekend als de 'put van de eed' na een verbond tussen Abraham en Abimelech. Het stond later symbool voor de zuidelijke grens van het koninkrijk ('van Dan tot Beër-Sjeba').", en: "Known as the 'well of the oath' and marking the traditional southern boundary of Israel." }, verses: ["Genesis 21:31", "Genesis 26:33", "Richteren 20:1"] },
    { id: "nineveh", coords: [36.360, 43.150], name: { nl: "Ninevé", en: "Nineveh" }, region: { nl: "Assyrië", en: "Assyria" }, desc: { nl: "Hoofdstad van Assyrië, bezocht door Jona.", en: "Capital of Assyria, visited by Jonah." }, story: { nl: "Een van de oudste en grootste steden in de oudheid. God stuurde de profeet Jona naar deze bloeddorstige stad met een waarschuwing van oordeel, waarop de stad zich massaal bekeerde.", en: "The ancient capital of Assyria, to which God sent Jonah with a message of judgment." }, verses: ["Genesis 10:11", "Jona 1:2", "Jona 3:2", "Nahum 1:1"] },
    { id: "nazareth", coords: [32.700, 35.297], name: { nl: "Nazareth", en: "Nazareth" }, region: { nl: "Galilea", en: "Galilee" }, desc: { nl: "De woonplaats van Jezus waar Hij opgroeide.", en: "The hometown where Jesus grew up." }, story: { nl: "Een klein, onbeduidend dorp in Galilea waar Jezus opgroeide in het timmermansgezin van Jozef en Maria. 'Kan uit Nazareth iets goeds komen?' (Joh 1:47).", en: "The small Galilean village where Jesus spent His childhood and youth." }, verses: ["Mattheüs 2:23", "Lukas 1:26", "Lukas 4:16", "Johannes 1:46"] },
    { id: "capernaum", coords: [32.880, 35.575], name: { nl: "Kafarnaüm", en: "Capernaum" }, region: { nl: "Galilea", en: "Galilee" }, desc: { nl: "Het centrum van Jezus' bediening rondom het meer.", en: "The center of Jesus' ministry around the sea." }, story: { nl: "Een levendig vissersdorp aan het Meer van Galilea. Jezus maakte dit tot Zijn hoofdkwartier voor Zijn bediening. Hij verrichtte hier talloze wonderen en riep hier discipelen zoals Petrus en Mattheüs.", en: "A bustling fishing village on the Sea of Galilee that served as the headquarters of Jesus' ministry." }, verses: ["Mattheüs 4:13", "Markus 1:21", "Lukas 4:31", "Johannes 6:59"] },
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
    
    const allCoords = [
        ...PINS.filter(p => !p.hideOnMap).map(p => p.coords), 
        ...CONTEXT_PLACES.map(p => p.coords)
    ];
    const bounds = L.latLngBounds(allCoords as [number, number][]);
    map.fitBounds(bounds, { padding: [40, 40] });
    
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
        className="mx-auto w-full flex-1 min-h-[550px] flex flex-col md:flex-row overflow-hidden bg-paper rounded-xl border border-line-strong shadow-inner"
      >
        
        {/* LEFT PANE - Dynamic Layout */}
        <div className="w-full md:w-80 h-full flex flex-col border-b md:border-b-0 md:border-r border-line-warm bg-surface relative">
            
            {/* 1. LIST VIEW */}
            {!isSidebarDetailOpen && (
              <>
                <div className="p-4 border-b border-line-warm">
                    <input 
                        type="text" 
                        placeholder={locale === "nl" ? "Zoek plaatsen..." : "Search places..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 text-sm border border-line-warm rounded bg-paper focus:outline-none focus:border-gold"
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
                                className={`w-full text-left px-3 py-3 rounded-lg mb-1 flex items-center gap-3 transition-colors hover:bg-paper border border-transparent`}
                            >
                                {item.isStructure ? (
                                    <img src={`${base}img/${item.id}/thumbnail.webp`} alt="" className="w-8 h-8 object-cover rounded flex-none" />
                                ) : (
                                    <div className="w-8 h-8 rounded flex items-center justify-center bg-[#3C5E70] bg-opacity-10 flex-none border border-[#3C5E70]/30">
                                        <span className="text-[#3C5E70] font-bold text-xs">P</span>
                                    </div>
                                )}
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-sm font-bold text-ink">{item.name}</p>
                                    <p className="truncate text-[10px] text-ink-light">{item.regionLabel}</p>
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
                <div className="p-4 border-b border-line-warm bg-surface sticky top-0 z-20 flex justify-between items-center shadow-sm">
                    <button 
                        onClick={() => setIsSidebarDetailOpen(false)}
                        className="text-sm text-slateblueblue hover:text-gold flex items-center gap-1 font-bold transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        {isNl ? "Terug naar overzicht" : "Back to list"}
                    </button>
                </div>
                
                <div className="p-5 flex-1">
                    {activeItemData.isStructure && (
                        <img src={`${base}img/${activeItemData.id}/thumbnail.webp`} alt="" className="w-full h-32 object-cover rounded-lg mb-4 border border-line-warm shadow-sm" />
                    )}
                    
                    <h2 className="text-xl font-bold text-ink uppercase mb-1 font-serif">{activeItemData.name}</h2>
                    <p className="text-xs font-bold text-gold uppercase tracking-wider mb-6">{activeItemData.regionLabel}</p>
                    
                    {/* Rich text formatting */}
                    <div className="prose prose-sm prose-slate max-w-none text-ink-muted leading-relaxed">
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
                                    <span key={i} className="px-2 py-1 bg-surface text-slateblueblue border border-line-warm text-[10px] rounded shadow-sm">{v}</span>
                                ))}
                                {activeItemData.verses.length > 15 && (
                                    <span className="px-2 py-1 bg-surface text-slateblueblue border border-line-warm text-[10px] rounded shadow-sm">+{activeItemData.verses.length - 15} more...</span>
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
                            className="w-full py-3 bg-slateblueblue text-white hover:bg-gold transition-colors rounded shadow font-bold text-sm uppercase flex items-center justify-center gap-2"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                            {isNl ? "Open 3D Model" : "Open 3D Model"}
                        </button>
                    </div>
                )}
              </div>
            )}
        </div>

        {/* RIGHT PANE */}
        <div className="flex-1 flex flex-col min-h-[400px] bg-paper relative z-0">
            <div ref={mapRef} className="flex-1 w-full" />
        </div>

      </div>
      <div className="hidden custom-map-tooltip custom-bible-pin historical-map-label"></div>
    </ModalShell>
  );
}
