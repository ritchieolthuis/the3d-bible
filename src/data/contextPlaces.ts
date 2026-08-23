export interface ContextPlace {
    id: string;
    coords: [number, number];
    name: { nl: string; en: string };
    region: { nl: string; en: string };
    desc: { nl: string; en: string };
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
        nl: `**Archeologische en historische betekenis**\nJeruzalem ligt op een verdedigbare heuvelrug in het Judese hoogland, met archeologische bewijzen van bewoning die dateren uit de vroege bronstijd, hoewel de stad pas echt tot bloei kwam tijdens de IJzertijd II (10e-8e eeuw v.Chr.). De Gihonbron zorgde voor essentiële watervoorziening, waardoor de locatie strategisch waardevol was; opgravingen hebben vestingwerken en administratieve structuren uit de tijd van David en de latere monarchie aan het licht gebracht, wat de rol van Jeruzalem als belangrijk administratief centrum in het oude Juda bevestigt.\n\n**Culturele en geografische context**\nJeruzalem, gelegen op een hoogte van ongeveer 760 meter in het centrale heuvelland, beheerste cruciale handelsroutes tussen de kustgebieden en de Jordaanvallei, waardoor het gedurende de Bijbelse periode economisch en militair van groot belang was. De natuurlijke verdedigingskracht van de stad door valleien aan drie zijden (de Kidronvallei, de Hinnomvallei en de Tyropoeonvallei) maakte haar vrijwel onneembaar voor een directe aanval. Dit verklaart waarom het een Jebusitisch bolwerk bleef tot de verovering door David en waarom het de gekozen hoofdstad werd van de verenigde monarchie.\n\n**Theologische betekenis**\nJeruzalem komt in het boek Jozua naar voren als een van de vijf Amorietische koningen die in de zuidelijke veldtocht werden verslagen, waarmee het wordt gevestigd als een veroverde, maar aanvankelijk niet-veroverde stad binnen Israëls territoriale aanspraken. De theologische betekenis van de stad neemt toe wanneer David haar verovert en vestigt als Israëls politieke en religieuze hoofdstad. Het wordt uiteindelijk de locatie van Salomo's Tempel en het middelpunt van de verbondsaanbidding – een status die Jeruzalem in de hele Schrift verheft tot de woonplaats van Gods aanwezigheid en het symbool van Zijn koninkrijk op aarde.`,
        en: `**Archaeological and historical significance**\nJerusalem sits on a defensible ridge in the Judean highlands...`
      },
      verses: ["Jozua 10:1", "2 Samuël 5:6", "1 Koningen 8:1", "Psalm 122:1", "Zacharia 8:3", "Mattheüs 23:37", "Openbaring 21:2"]
    },
    {
      id: "rephidim",
      coords: [28.7100, 33.6200],
      name: { nl: "Rafidim", en: "Rephidim" },
      region: { nl: "Sinaï", en: "Sinai" },
      desc: { nl: "De rustplaats waar water uit de rots stroomde en Amalek werd verslagen.", en: "The resting place where water flowed from the rock and Amalek was defeated." },
      story: {
        nl: `**Archeologische en historische betekenis**\nDe exacte locatie van Rafidim is niet met zekerheid vastgesteld, maar historisch wordt het vaak geïdentificeerd met Wadi Feiran, een weelderige oase in het zuidwesten van het Sinaï-schiereiland. Archeologische vondsten tonen aan dat dit gebied al vroeg bewoond werd en diende als een belangrijke doorgangsroute. Het was een logische rustplaats voor nomaden en reizigers, wat verklaart waarom de Amalekieten, een lokaal nomadenvolk, dit gebied fel verdedigden tegen de doortrekkende Israëlieten.\n\n**Culturele en geografische context**\nGeografisch was Rafidim de laatste grote rustplaats voordat het volk Israël de berg Sinaï bereikte. De afwezigheid van water bij hun aankomst zorgde voor een crisis in het genadeloze woestijnklimaat. Cultureel markeert dit moment de eerste georganiseerde militaire strijd van het pas bevrijde volk; Jozua leidde de troepen in het dal, terwijl Mozes, Aäron en Hur de strijd vanaf de heuvel geestelijk ondersteunden.\n\n**Theologische betekenis**\nTheologisch is Rafidim zeer rijk. Ten eerste het water uit de rots: toen het volk murmureerde, beval God Mozes om op de rots (Horeb) te slaan. De apostel Paulus identificeert deze geslagen rots later met Christus (1 Korinthe 10:4), die levend water geeft nadat Hij geslagen is. Ten tweede de strijd tegen Amalek: dit illustreert de voortdurende geestelijke strijd. De overwinning werd niet behaald door eigen kracht of militaire genialiteit, maar door de opgeheven handen van Mozes, een beeld van aanhoudend gebed en Christus' onophoudelijke voorspraak. Als gedenkteken bouwde Mozes daar een altaar: "De HEERE is mijn Banier" (Jehova-Nissi).`,
        en: `**Archaeological and historical significance**\nRephidim's exact location is debated...`
      },
      verses: ["Exodus 17:1", "Exodus 17:8", "Numeri 33:14", "1 Korinthe 10:4"]
    },
    {
      id: "rameses",
      coords: [30.800, 31.830],
      name: { nl: "Rameses (Gosen)", en: "Rameses (Goshen)" },
      region: { nl: "Egypte", en: "Egypt" },
      desc: { nl: "Startpunt van de Exodus.", en: "Starting point of the Exodus." },
      story: {
        nl: `**Archeologische en historische betekenis**\nRameses (of Pi-Ramesse) was een van de belangrijkste voorraadsteden die door de Israëlitische slaven voor de farao werd gebouwd. Archeologische opgravingen in de oostelijke Nijldelta hebben de restanten van deze enorme stad blootgelegd, wat de enorme bouwprojecten van Farao Ramses II bevestigt.\n\n**Culturele en geografische context**\nGelegen in het vruchtbare land Gosen, was dit de plek waar de Israëlieten zich tijdens de hongersnood onder Jozef hadden gevestigd. Het fungeerde als het verzamelpunt voor de honderdduizenden Israëlieten op de nacht van de uittocht, net na de tiende plaag.\n\n**Theologische betekenis**\nRameses staat symbool voor de ultieme onderdrukking door de wereld (Egypte) en het vertrekpunt van Gods verlossing. Het herinnert eraan dat God Zijn volk uitleidt uit het huis der dienstbaarheid om hen te brengen naar de beloofde rust.`,
        en: `**Archaeological and historical significance**\nRameses was a major store city...`
      },
      verses: ["Exodus 1:11", "Exodus 12:37", "Numeri 33:3"]
    },
    {
      id: "succoth",
      coords: [30.550, 32.100],
      name: { nl: "Sukkoth", en: "Succoth" },
      region: { nl: "Egypte", en: "Egypt" },
      desc: { nl: "De eerste pleisterplaats na Rameses.", en: "The first encampment after Rameses." },
      story: {
        nl: `**Archeologische en historische betekenis**\nSukkoth was waarschijnlijk een Egyptische grensstad of militaire buitenpost aan de rand van de Wadi Tumilat. Historici geloven dat het diende als een verzamelplaats voor reizigers die Egypte verlieten of binnenkwamen.\n\n**Culturele en geografische context**\nDe naam Sukkoth betekent "loofhutten" of "tenten". Het was de allereerste pleisterplaats voor de Israëlieten na hun haastige vertrek uit Rameses. Hier sloegen zij voor het eerst als een bevrijd volk, en niet als slaven, hun tenten op.\n\n**Theologische betekenis**\nSukkoth herinnert theologisch aan de pelgrimsreis van de gelovige. God stelde later het Loofhuttenfeest (Sukkot) in om het volk er jaarlijks aan te herinneren dat Hij hen in hutten liet wonen toen Hij hen uit Egypte leidde (Leviticus 23:42-43).`,
        en: `**Archaeological and historical significance**\nSuccoth was likely an Egyptian border town...`
      },
      verses: ["Exodus 12:37", "Exodus 13:20", "Numeri 33:5"]
    },
    {
      id: "etham",
      coords: [30.450, 32.350],
      name: { nl: "Etham", en: "Etham" },
      region: { nl: "Woestijn", en: "Wilderness" },
      desc: { nl: "Aan de rand van de woestijn.", en: "On the edge of the wilderness." },
      story: {
        nl: `**Archeologische en historische betekenis**\nEtham markeerde de uiterste grens van de bewoonde wereld aan de Egyptische grens, vlakbij de vestingwerken die Egypte beschermden tegen indringers uit de woestijn.\n\n**Culturele en geografische context**\nEtham lag "aan de rand van de woestijn". Vanaf hier betrad het volk de onherbergzame wildernis waar overleving zonder goddelijke ingreep onmogelijk was.\n\n**Theologische betekenis**\nBij Etham ging God voor het eerst expliciet voor hen uit in een wolkkolom overdag en een vuurkolom 's nachts. Dit benadrukt dat wanneer we de grens van de 'veilige' wereld passeren en de wildernis betreden, Gods zichtbare leiding en aanwezigheid ons leiden en beschermen.`,
        en: `**Archaeological and historical significance**\nEtham marked the absolute edge of the inhabited world...`
      },
      verses: ["Exodus 13:20", "Numeri 33:6"]
    },
    {
      id: "baal_zephon",
      coords: [31.100, 32.500],
      name: { nl: "Baäl-Zefon", en: "Baal-Zephon" },
      region: { nl: "Egypte", en: "Egypt" },
      desc: { nl: "Plaats aan de overkant van Pi-Hachiroth.", en: "Place opposite Pi-Hahiroth." },
      story: {
        nl: `**Archeologische en historische betekenis**\nBaäl-Zefon wordt geassocieerd met een heiligdom voor een Kanaänitische of Fenicische weergod (Baäl van het Noorden). Het diende waarschijnlijk als een baken voor zeevaarders nabij het huidige Suezkanaal of het Bardawil-meer.\n\n**Culturele en geografische context**\nGod beval Israël om "om te keren" en zich te legeren tegenover Baäl-Zefon, direct aan zee. Dit was strategisch gezien een valstrik: ze zaten klem tussen de zee, de wildernis en het heiligdom van de Egyptische/Kanaänitische god.\n\n**Theologische betekenis**\nDe keuze voor deze specifieke locatie was een goddelijke uitdaging. God toonde niet alleen Zijn heerschappij over Farao, maar ook dat de afgod Baäl-Zefon machteloos was. Hier spleet God de Rode Zee, wat Zijn absolute soevereiniteit over de natuurmachten (die aan Baäl werden toegeschreven) bewijst.`,
        en: `**Archaeological and historical significance**\nBaal-Zephon is associated with a sanctuary...`
      },
      verses: ["Exodus 14:2", "Exodus 14:9", "Numeri 33:7"]
    },
    {
      id: "marah",
      coords: [29.350, 32.950],
      name: { nl: "Mara", en: "Marah" },
      region: { nl: "Sinaï", en: "Sinai" },
      desc: { nl: "Plaats van het bittere water.", en: "Place of bitter water." },
      story: {
        nl: `**Archeologische en historische betekenis**\nMara bevindt zich vermoedelijk bij Ain Hawarah, een bron op de route langs de oostkust van de Golf van Suez, die berucht is om zijn zware mineralen en bittere smaak.\n\n**Culturele en geografische context**\nDrie dagen lang hadden de Israëlieten door de gloeiend hete Sur-woestijn getrokken zonder water. Toen ze eindelijk water vonden, was het ondrinkbaar. De teleurstelling leidde tot het eerste grote gemurmureer tegen Mozes na de verlossing.\n\n**Theologische betekenis**\nGod toonde Mozes een stuk hout ("boom") dat in het water geworpen moest worden, waardoor het zoet werd. Theologisch wijst dit hout vooruit naar het kruishout van Christus, dat de bitterheid van de zonde, het lijden en de dood transformeert tot levend en zoet water voor de gelovige. Hier openbaarde God Zich als "Jehova-Rapha" (De HEERE Uw Heelmeester).`,
        en: `**Archaeological and historical significance**\nMarah is likely located at Ain Hawarah...`
      },
      verses: ["Exodus 15:23", "Numeri 33:8"]
    },
    {
      id: "elim",
      coords: [29.100, 33.100],
      name: { nl: "Elim", en: "Elim" },
      region: { nl: "Sinaï", en: "Sinai" },
      desc: { nl: "Oase met 12 waterbronnen en 70 palmbomen.", en: "Oasis with 12 springs and 70 palm trees." },
      story: {
        nl: `**Archeologische en historische betekenis**\nElim wordt door vroege christelijke pelgrims en historici vaak geïdentificeerd met Wadi Gharandel, een plek die tot op de dag van vandaag bekend staat om zijn overvloedige zoetwaterbronnen en weelderige palmbomen.\n\n**Culturele en geografische context**\nNa de bittere ervaring bij Mara kwam het volk bij Elim, een ware woestijnoase. De twaalf waterbronnen en zeventig palmbomen boden fysiek herstel en schaduw aan de miljoenen Israëlieten.\n\n**Theologische betekenis**\nElim is het bijbelse beeld van Gods voorbereide rust en overvloed na een periode van beproeving. De getallen (12 en 70) zijn niet toevallig: 12 verwijst naar de stammen van Israël en 70 naar het getal van de volkeren of de oudsten. Het symboliseert Gods volmaakte voorziening voor heel Zijn volk.`,
        en: `**Archaeological and historical significance**\nElim is often identified by early pilgrims...`
      },
      verses: ["Exodus 15:27", "Numeri 33:9"]
    },
    {
      id: "ur",
      coords: [30.960, 46.100],
      name: { nl: "Ur der Chaldeeën", en: "Ur of the Chaldeans" },
      region: { nl: "Mesopotamië", en: "Mesopotamia" },
      desc: { nl: "De geboorteplaats van Abraham.", en: "The birthplace of Abraham." },
      story: {
        nl: `**Archeologische en historische betekenis**\nUr der Chaldeeën (huidige Tell el-Muqayyar in Irak) was een van de machtigste en meest geavanceerde Sumerische stadstaten in het oude Mesopotamië. Opgravingen in de jaren 1920 toonden een hoogontwikkelde cultuur met monumentale ziggurats, wiskunde, en uitgebreide handel.\n\n**Culturele en geografische context**\nUr was een rijk handelscentrum nabij de monding van de rivieren Eufraat en Tigris. De stad was diep doordrenkt van afgoderij, met name de aanbidding van de maangod Nanna (Sin). Terach, Abrahams vader, leefde midden in deze heidense context.\n\n**Theologische betekenis**\nGods roeping van Abraham uit Ur toont Zijn soevereine genade: Hij koos een man uit een afgodisch bolwerk en riep hem om alles achter te laten (cultuur, zekerheid, en familie). Het versterkt het principe dat de roeping van de gelovige betekent dat men een pelgrim en vreemdeling op aarde wordt, op zoek naar de stad waarvan God de Bouwmeester is (Hebreeën 11).`,
        en: `**Archaeological and historical significance**\nUr of the Chaldeans was one of the most powerful...`
      },
      verses: ["Genesis 11:28", "Genesis 11:31", "Nehemia 9:7"]
    },
    {
      id: "haran",
      coords: [36.860, 39.030],
      name: { nl: "Haran", en: "Haran" },
      region: { nl: "Mesopotamië", en: "Mesopotamia" },
      desc: { nl: "Waar Abraham verbleef voordat hij naar Kanaän ging.", en: "Where Abraham stayed before entering Canaan." },
      story: {
        nl: `**Archeologische en historische betekenis**\nHaran was een prominente oude handelsstad in het noorden van Mesopotamië (huidig Turkije). Net als Ur was Haran een belangrijk centrum voor de verering van de maangod Sin.\n\n**Culturele en geografische context**\nGelegen aan de belangrijke karavaanroutes tussen Ninevé en Damascus, was het een natuurlijke tussenstop voor Terach en Abraham. Toen Terach zich hier vestigde, pauzeerde de reis naar Kanaän totdat Terach op 205-jarige leeftijd stierf.\n\n**Theologische betekenis**\nHaran staat symbool voor het halve werk: de roeping werd gedeeltelijk beantwoord, maar de reis stagneerde door aardse of familiebanden. Pas na de dood van zijn vader verliet Abraham Haran definitief op 75-jarige leeftijd om volledig in gehoorzaamheid Kanaän binnen te trekken, wat de noodzaak van radicale toewijding illustreert.`,
        en: `**Archaeological and historical significance**\nHaran was a prominent ancient commercial city...`
      },
      verses: ["Genesis 11:31", "Genesis 12:4", "Handelingen 7:2"]
    },
    {
      id: "beersheba",
      coords: [31.250, 34.790],
      name: { nl: "Beër-Sjeba", en: "Beersheba" },
      region: { nl: "Kanaän", en: "Canaan" },
      desc: { nl: "Zuidelijke grens van Israël, put van de eed.", en: "Southern border of Israel, well of the oath." },
      story: {
        nl: `**Archeologische en historische betekenis**\nBeër-Sjeba is de belangrijkste stad in de Negev-woestijn. Opgravingen bij Tel Beër-Sjeba hebben restanten onthuld van een versterkte Israëlitische stad met een geavanceerd watersysteem, wat essentieel was voor bewoning in dit droge gebied.\n\n**Culturele en geografische context**\nDe naam betekent "Put van de Eed" of "Put van Zeven". Het markeerde de diepste zuidelijke grens van het vruchtbare land van Israël. Het bekende spreekwoord "van Dan tot Beër-Sjeba" werd in de Bijbel gebruikt om het gehele grondgebied van de natie aan te duiden.\n\n**Theologische betekenis**\nBeër-Sjeba was een heilige plaats voor de aartsvaders. Abraham sloot hier een vredesverbond met Abimelech, Izak ontving hier een verschijning van God en bouwde een altaar, en Jakob bracht hier offers voordat hij naar Egypte trok. Het is de plek van verbondsvernieuwing en de verzekering van Gods blijvende beloften aan het nageslacht.`,
        en: `**Archaeological and historical significance**\nBeersheba is the most important city in the Negev...`
      },
      verses: ["Genesis 21:31", "Genesis 26:33", "Richteren 20:1"]
    },
    {
      id: "nineveh",
      coords: [36.360, 43.150],
      name: { nl: "Ninevé", en: "Nineveh" },
      region: { nl: "Assyrië", en: "Assyria" },
      desc: { nl: "Hoofdstad van Assyrië, bezocht door Jona.", en: "Capital of Assyria, visited by Jonah." },
      story: {
        nl: `**Archeologische en historische betekenis**\nNinevé, gelegen aan de oostelijke oever van de Tigris in het huidige Irak, was een van de oudste en machtigste steden ter wereld en werd later de glorieuze hoofdstad van het wrede Assyrische rijk onder Sanherib.\n\n**Culturele en geografische context**\nIn haar bloeitijd was Ninevé een metropool met enorme muren en paleizen. De Assyriërs stonden in de hele antieke wereld bekend om hun ongekende wreedheid en militaire terreur, wat verklaart waarom de profeet Jona weigerde hen tot bekering op te roepen.\n\n**Theologische betekenis**\nDe stad vormt het decor voor een van de grootste theologische ommekeren in de Bijbel: het boek Jona. Het illustreert dat Gods ontzagwekkende genade zich uitstrekt tot over de grenzen van Israël, zelfs tot de meest verdorven en vijandige heidense naties, mits zij zich in zak en as bekeren. Uiteindelijk, toen de stad later weer in wreedheid verviel, werd zij conform de profetie van Nahum verwoest (612 v.Chr.).`,
        en: `**Archaeological and historical significance**\nNineveh was one of the oldest and most powerful cities...`
      },
      verses: ["Genesis 10:11", "Jona 1:2", "Jona 3:2", "Nahum 1:1"]
    },
    {
      id: "nazareth",
      coords: [32.700, 35.297],
      name: { nl: "Nazareth", en: "Nazareth" },
      region: { nl: "Galilea", en: "Galilee" },
      desc: { nl: "De woonplaats van Jezus waar Hij opgroeide.", en: "The hometown where Jesus grew up." },
      story: {
        nl: `**Archeologische en historische betekenis**\nNazareth was in de eerste eeuw een onbeduidend, klein agrarisch dorpje in het heuvelland van Beneden-Galilea. Archeologisch materiaal uit de tijd van Jezus toont een nederzetting van hooguit enkele honderden bewoners, levend in grote armoede.\n\n**Culturele en geografische context**\nNazareth lag in het noorden, ver weg van de theologische en politieke elite in Jeruzalem. De uitdrukking van Nathanaël, "Kan uit Nazareth iets goeds komen?" weerspiegelt het destijds heersende vooroordeel dat Galilea (en zeker Nazareth) geestelijk en cultureel inferieur was.\n\n**Theologische betekenis**\nDit was de woonplaats waar de Zoon van God opgroeide ('de Nazarener'). Theologisch onderstreept Nazareth de vernedering en menswording van Christus. De Koning der koningen verkoos niet te groeien in een paleis in Jeruzalem, maar verbleef bijna dertig jaar in de obscuriteit van een eenvoudige timmermanswerkplaats. Het toont dat Gods majesteit zich vaak openbaart in wat voor de wereld veracht en gering is.`,
        en: `**Archaeological and historical significance**\nNazareth was an insignificant, small agricultural village...`
      },
      verses: ["Mattheüs 2:23", "Lukas 1:26", "Lukas 4:16", "Johannes 1:46"]
    },
    {
      id: "capernaum",
      coords: [32.880, 35.575],
      name: { nl: "Kafarnaüm", en: "Capernaum" },
      region: { nl: "Galilea", en: "Galilee" },
      desc: { nl: "Het centrum van Jezus' bediening rondom het meer.", en: "The center of Jesus' ministry around the sea." },
      story: {
        nl: `**Archeologische en historische betekenis**\nKafarnaüm (Kfar Nachoem, "Dorp van Troost") was een welvarend vissersdorp aan de noordwestelijke oever van het Meer van Galilea. Opgravingen hebben indrukwekkende vondsten opgeleverd, waaronder een prachtige witte kalkstenen synagoge en het huis van Petrus.\n\n**Culturele en geografische context**\nKafarnaüm lag aan de Via Maris, een grote internationale handelsroute. Er was een belastingkantoor (waar Mattheüs werd geroepen) en een Romeins garnizoen. Het meer was rijk aan vis, wat verklaart waarom veel van Jezus' discipelen lokale vissers waren.\n\n**Theologische betekenis**\nNadat Jezus uit Nazareth werd verdreven, maakte Hij Kafarnaüm tot Zijn uitvalsbasis en het "hoofdkwartier" van Zijn Galileese bediening. Nergens ter wereld deed Jezus zoveel wonderen (genezingen, demonen uitdrijven, de prediking van het Brood des Levens) als hier. Ondanks dit grote licht weigerde de stad zich te bekeren, wat leidde tot Jezus' oordeel dat de stad tot in het dodenrijk zou worden neergestoten (Mattheüs 11:23).`,
        en: `**Archaeological and historical significance**\nCapernaum was a prosperous fishing village...`
      },
      verses: ["Mattheüs 4:13", "Markus 1:21", "Lukas 4:31", "Johannes 6:59"]
    },
    {
      id: "hebron",
      coords: [31.530, 35.090],
      name: { nl: "Hebron", en: "Hebron" },
      region: { nl: "Juda", en: "Judah" },
      desc: { nl: "Rustplaats van Abraham, Isaäk en Jakob.", en: "Resting place of Abraham, Isaac, and Jacob." },
      story: {
        nl: `**Archeologische en historische betekenis**\nHebron, gelegen op ruim 900 meter hoogte in het Judese heuvelland, is een van de oudste continu bewoonde steden ter wereld. Koning Herodes bouwde later een kolossaal heiligdom over de Machpela-grot, welk gebouw er vandaag nog steeds staat.\n\n**Culturele en geografische context**\nHebron was een vruchtbaar gebied vol wijngaarden (Dal van Eskol). Abraham kocht hier van Efron de Hethiet een akker en een spelonk als familiebegraafplaats. Hier liggen Abraham en Sara, Izak en Rebekka, en Jakob en Lea begraven.\n\n**Theologische betekenis**\nHebron ("Vriendschap" of "Verbondschap") is theologisch de plek van diep gewortelde verbondstrouw. Abraham kreeg de belofte van het land en ontving dit kleine stukje als een onderpand. Eeuwen later werd David in Hebron door God geleid om eerst over Juda (voor 7,5 jaar) en later over heel Israël tot koning te worden gezalfd. Het is de bodem waaruit het messiaanse koningschap ontkiemde.`,
        en: `**Archaeological and historical significance**\nHebron, located at over 900 meters altitude...`
      },
      verses: ["Genesis 13:18", "Genesis 23:2", "2 Samuël 2:1", "2 Samuël 5:3"]
    }
];

export default CONTEXT_PLACES;
