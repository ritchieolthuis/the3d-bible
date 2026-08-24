export interface MapEra {
    id: number;
    name: {
        nl: string;
        en: string;
    };
    dates: string;
}

export const MAP_ERAS: MapEra[] = [
    { id: 1, name: { nl: "Oertijd", en: "Primeval History" }, dates: "Voor 2000 v.Chr." },
    { id: 2, name: { nl: "Aartsvaders", en: "Patriarchs" }, dates: "± 2000–1500 v.Chr." },
    { id: 3, name: { nl: "Exodus & Intocht", en: "Exodus & Conquest" }, dates: "± 1500–1350 v.Chr." },
    { id: 4, name: { nl: "Richteren", en: "Judges" }, dates: "± 1350–1050 v.Chr." },
    { id: 5, name: { nl: "Koningen & Profeten", en: "Kings & Prophets" }, dates: "± 1050–586 v.Chr." },
    { id: 6, name: { nl: "Ballingschap & Terugkeer", en: "Exile & Return" }, dates: "586–332 v.Chr." },
    { id: 7, name: { nl: "Tweede Tempel & Jezus", en: "Second Temple & Jesus" }, dates: "332 v.Chr.–33 n.Chr." },
    { id: 8, name: { nl: "De Vroege Kerk", en: "The Early Church" }, dates: "33 n.Chr.–100 n.Chr." },
    { id: 9, name: { nl: "Toekomst", en: "Future" }, dates: "Eschatologie" }
];

export const STRUCTURE_ERAS: Record<string, number[]> = {
    "eden_fall": [1],
    "noahs_ark": [1],
    "tower_babel": [1],
    "parting_sea": [3],
    "tabernacle": [3, 4],
    "walls_jericho": [3],
    "solomon_temple": [5],
    "ezekiel_temple": [6],
    "herods_temple": [6, 7, 8],
    "golgotha": [7],
    "mount_of_olives": [7, 8],
    "new_jerusalem": [9]
};
