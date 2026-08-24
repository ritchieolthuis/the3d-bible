export interface MapEra {
    id: number;
    name: { nl: string; en: string };
    dates: string;
}

export const MAP_ERAS: MapEra[] = [
    { id: 1, name: { nl: "Schepping & Zondvloed", en: "Creation & Flood" }, dates: "Genesis (Voor 2000 v.Chr.)" },
    { id: 2, name: { nl: "De Aartsvaders", en: "The Patriarchs" }, dates: "± 2000–1500 v.Chr." },
    { id: 3, name: { nl: "Uittocht & Richteren", en: "Exodus & Judges" }, dates: "± 1500–1050 v.Chr." },
    { id: 4, name: { nl: "Eerste Tempelperiode", en: "First Temple Period" }, dates: "1050–586 v.Chr." },
    { id: 5, name: { nl: "Babylonische Ballingschap", en: "Babylonian Exile" }, dates: "586–516 v.Chr." },
    { id: 6, name: { nl: "Tweede Tempelperiode", en: "Second Temple Period" }, dates: "516 v.Chr.–70 n.Chr." },
    { id: 7, name: { nl: "De Vroege Kerk", en: "The Early Church" }, dates: "33 n.Chr.–100 n.Chr." },
    { id: 8, name: { nl: "Toekomst", en: "Future" }, dates: "Openbaring (Eschatologie)" }
];

export const STRUCTURE_ERAS: Record<string, number[]> = {
    "eden_fall": [1],
    "noahs_ark": [1],
    "tower_babel": [1],
    "parting_sea": [3],
    "tabernacle": [3],
    "walls_jericho": [3],
    "solomon_temple": [4],
    "ezekiel_temple": [5],
    "herods_temple": [6],
    "golgotha": [6],
    "mount_of_olives": [6, 7],
    "new_jerusalem": [8]
};
