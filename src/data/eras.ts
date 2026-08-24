export interface MapEra {
    id: number;
    name: {
        nl: string;
        en: string;
    };
    dates: string;
}

export const MAP_ERAS: MapEra[] = [
    { id: 1, name: { nl: "Oertijd", en: "Primeval History" }, dates: "± 4000–2000 v.Chr." },
    { id: 2, name: { nl: "Aartsvaders", en: "Patriarchs" }, dates: "± 2000–1600 v.Chr." },
    { id: 3, name: { nl: "Exodus & Richteren", en: "Exodus & Judges" }, dates: "± 1600–1050 v.Chr." },
    { id: 4, name: { nl: "Koninkrijk Israël", en: "Kingdom of Israel" }, dates: "± 1050–586 v.Chr." },
    { id: 5, name: { nl: "Ballingschap", en: "Exile & Return" }, dates: "586–332 v.Chr." },
    { id: 6, name: { nl: "Romeinse Tijd", en: "Roman Era & Jesus" }, dates: "63 v.Chr.–100 n.Chr." },
    { id: 7, name: { nl: "Eindtijd", en: "End Times" }, dates: "Toekomst / Future" }
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
