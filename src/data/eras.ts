export interface MapEra {
    id: number;
    name: {
        nl: string;
        en: string;
    };
    dates: string;
}

export const MAP_ERAS: MapEra[] = [
    { id: 1, name: { nl: "Schepping & Zondvloed", en: "Creation & Flood" }, dates: "Genesis 1-11" },
    { id: 2, name: { nl: "De Aartsvaders", en: "The Patriarchs" }, dates: "± 2000–1500 v.Chr." },
    { id: 3, name: { nl: "Uittocht & Beloofde Land", en: "Exodus & Promised Land" }, dates: "± 1500–1050 v.Chr." },
    { id: 4, name: { nl: "Koningen & Profeten", en: "Kings & Prophets" }, dates: "± 1050–586 v.Chr." },
    { id: 5, name: { nl: "Ballingschap & Terugkeer", en: "Exile & Return" }, dates: "586–4 v.Chr." },
    { id: 6, name: { nl: "Jezus & De Vroege Kerk", en: "Jesus & Early Church" }, dates: "Nieuwe Testament" },
    { id: 7, name: { nl: "Toekomst", en: "Future" }, dates: "Openbaring" }
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
    "herods_temple": [5, 6],
    "golgotha": [6],
    "mount_of_olives": [6],
    "new_jerusalem": [7]
};
