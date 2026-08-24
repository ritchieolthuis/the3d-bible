export interface MapEra {
    id: number;
    name: {
        nl: string;
        en: string;
    };
    dates: string;
}

export const MAP_ERAS: MapEra[] = [
    { id: 1, name: { nl: "Schepping", en: "Creation" }, dates: "± 4000–2000 v.Chr." },
    { id: 2, name: { nl: "Aartsvaders", en: "Patriarchs" }, dates: "± 2000–1700 v.Chr." },
    { id: 3, name: { nl: "Exodus", en: "Exodus" }, dates: "± 1700–1050 v.Chr." },
    { id: 4, name: { nl: "Koninkrijk", en: "Kingdom" }, dates: "± 1050–586 v.Chr." },
    { id: 5, name: { nl: "Ballingschap", en: "Exile" }, dates: "586–63 v.Chr." },
    { id: 6, name: { nl: "Rome & Jezus", en: "Rome & Jesus" }, dates: "63 v.Chr.–100 n.Chr." },
    { id: 7, name: { nl: "Toekomst", en: "Future" }, dates: "Nieuwe Jeruzalem" }
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
    "mount_of_olives": [6],
    "new_jerusalem": [7]
};
