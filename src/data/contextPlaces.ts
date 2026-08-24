export interface ContextPlace {
  id: string;
  name: { nl: string; en: string };
  region: { nl: string; en: string };
  coords: [number, number];
  eras: number[];
  verses?: string[];
  desc: { nl: string; en: string };
  story: { nl: string; en: string };
}

const CONTEXT_PLACES: ContextPlace[] = [
  {
    "id": "ararat",
    "coords": [39.701944, 44.297222],
    "name": { "nl": "Ararat Gebergte", "en": "Mount Ararat" },
    "region": { "nl": "Armenië", "en": "Armenia" },
    "desc": { "nl": "De rustplaats van de Ark van Noach.", "en": "The resting place of Noah's Ark." },
    "story": {
      "nl": "Na maanden op het allesvernietigende vloedwater te hebben gedreven, liep de Ark van Noach vast op het gebergte van Ararat (Genesis 8:4). Vanaf deze hoogvlakte begon de mensheid opnieuw. Noach bouwde hier een altaar en God sloot het verbond van de regenboog, met de belofte de aarde nooit meer door water te vernietigen.",
      "en": "After floating on the devastating floodwaters for months, Noah's Ark came to rest on the mountains of Ararat (Genesis 8:4). From this high plateau, humanity began anew. Noah built an altar here and God made the covenant of the rainbow, promising never to destroy the earth by water again."
    },
    "eras": [1]
  },
  {
    "id": "tabor",
    "coords": [32.686111, 35.39],
    "name": { "nl": "Berg Tabor", "en": "Mount Tabor" },
    "region": { "nl": "Galilea", "en": "Galilee" },
    "desc": { "nl": "De traditionele berg van Jezus' verheerlijking.", "en": "The traditional mount of Jesus' transfiguration." },
    "story": {
      "nl": "Berg Tabor verheft zich indrukwekkend uit de vlakte van Jizreël. Theologisch en traditioneel is dit de berg der Verheerlijking, waar Jezus voor de ogen van Petrus, Jakobus en Johannes straalde van goddelijk licht. Mozes en Elia verschenen hier om met Hem te spreken over Zijn naderende vertrek (kruisiging) in Jeruzalem, wat de Wet en de Profeten samenbracht in Christus (Mattheüs 17).",
      "en": "Mount Tabor rises impressively from the Jezreel Valley. Theologically and traditionally, this is the Mount of Transfiguration, where Jesus shone with divine light before the eyes of Peter, James, and John. Moses and Elijah appeared here to speak with Him about His upcoming departure (crucifixion) in Jerusalem, bringing the Law and the Prophets together in Christ (Matthew 17)."
    },
    "eras": [6]
  },
  {
    "id": "promised_land",
    "coords": [
      32.766667,
      35.333333
    ],
    "name": {
      "nl": "Het Beloofde Land",
      "en": "The Promised Land"
    },
    "region": {
      "nl": "Kanaän",
      "en": "Canaan"
    },
    "desc": {
      "nl": "Het land dat God aan Abraham en zijn nageslacht beloofde.",
      "en": "The land promised by God to Abraham and his descendants."
    },
    "story": {
      "nl": "**Geografische en historische context**\nHet kerngebied van het Beloofde Land ligt geografisch strategisch tussen de Middellandse Zee (westen) en de Jordaanvallei, begrensd door de Syrische woestijn in het oosten, het Libanongebergte in het noorden en de Negev-woestijn in het zuiden. Historisch en geografisch omvat dit gebied het huidige Israël, de Palestijnse gebieden, en grote delen van Jordanië, Libanon en Syrië. Omdat het fungeerde als enige landbrug tussen de twee grootmachten van de oudheid (Egypte en Mesopotamië), had het een immense economische en militaire waarde.\n\n**De grenzen van de belofte**\nDe exacte geografische grenzen van het land verschillen per bijbelboek en periode. In Genesis 15:18 krijgt Abraham de \"brede definitie\" (de landbelofte) toegezegd: een enorm uitgestrekt gebied vanaf de \"Rivier van Egypte\" (waarschijnlijk de Wadi El-Arish in het Sinaï-schiereiland) tot aan de Eufraat (in het huidige Syrië/Irak). Later, in Numeri 34, wanneer het volk Kanaän daadwerkelijk gaat verdelen, krijgen zij de \"specifieke grenzen\" toegewezen: een compacter gebied met in het zuiden de Zin-woestijn, in het westen de Middellandse Zee, in het noorden de berg Hor, en in het oosten de rivier de Jordaan (hoewel er later gebieden ten oosten van de Jordaan aan werden toegevoegd).\n\n**Theologische betekenis**\nHet Beloofde Land is veel meer dan een stuk geografisch onroerend goed; het is het tastbare bewijs van Gods onwankelbare verbondstrouw aan Abraham, Isaäk en Jakob. God gaf dit specifieke, kwetsbare land (volledig afhankelijk van regen, in tegenstelling tot Egypte) zodat Zijn volk in dagelijkse afhankelijkheid van Hem zou leven. Het is bedoeld als een 'licht voor de volken' en wijst in het Nieuwe Testament (bijv. Hebreeën 4) vooruit naar de eeuwige rust en de herstelde schepping.",
      "en": "**Archaeological and historical significance**\nThe Promised Land sits strategically between the Mediterranean Sea and the vast deserts to the east. It forms the primary land bridge connecting Africa, Asia, and Europe, making it one of the most contested and historically rich regions in antiquity.\n\n**Cultural and geographical context**\nKnown variously as Canaan, Israel, and Palestine, it is a land of immense geographical diversity, featuring fertile plains, rugged mountains, and the lowest point on earth (the Dead Sea). It was described by God as a land \"flowing with milk and honey\", indicating rich agricultural potential and divine provision.\n\n**Theological significance**\nThe Promised Land is the geographic center of biblical theology. It was sworn by covenant to Abraham, Isaac, and Jacob as an everlasting inheritance. Theologically, it represents rest, divine inheritance, and the kingdom of God on earth. Its possession was strictly tied to Israel's faithfulness to the covenant; disobedience led to exile, while repentance promised return. Ultimately, it foreshadows the new creation and the eternal rest promised to all believers in Christ."
    },
    "verses": [
      "Genesis 15:18",
      "Numeri 34:1",
      "Jozua 1:4"
    ],
    "eras": [2, 3]
  },
  {
    "id": "jerusalem",
    "coords": [
      31.776667,
      35.234167
    ],
    "name": {
      "nl": "Jeruzalem",
      "en": "Jerusalem"
    },
    "region": {
      "nl": "Juda",
      "en": "Judah"
    },
    "desc": {
      "nl": "De heilige stad en hoofdstad van Israël.",
      "en": "The holy city and capital of Israel."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nJeruzalem ligt op een verdedigbare heuvelrug in het Judese hoogland, met archeologische bewijzen van bewoning die dateren uit de vroege bronstijd, hoewel de stad pas echt tot bloei kwam tijdens de IJzertijd II (10e-8e eeuw v.Chr.). De Gihonbron zorgde voor essentiële watervoorziening, waardoor de locatie strategisch waardevol was; opgravingen hebben vestingwerken en administratieve structuren uit de tijd van David en de latere monarchie aan het licht gebracht, wat de rol van Jeruzalem als belangrijk administratief centrum in het oude Juda bevestigt.\n\n**Culturele en geografische context**\nJeruzalem, gelegen op een hoogte van ongeveer 760 meter in het centrale heuvelland, beheerste cruciale handelsroutes tussen de kustgebieden en de Jordaanvallei, waardoor het gedurende de Bijbelse periode economisch en militair van groot belang was. De natuurlijke verdedigingskracht van de stad door valleien aan drie zijden (de Kidronvallei, de Hinnomvallei en de Tyropoeonvallei) maakte haar vrijwel onneembaar voor een directe aanval. Dit verklaart waarom het een Jebusitisch bolwerk bleef tot de verovering door David en waarom het de gekozen hoofdstad werd van de verenigde monarchie.\n\n**Theologische betekenis**\nJeruzalem komt in het boek Jozua naar voren als een van de vijf Amorietische koningen die in de zuidelijke veldtocht werden verslagen, waarmee het wordt gevestigd als een veroverde, maar aanvankelijk niet-veroverde stad binnen Israëls territoriale aanspraken. De theologische betekenis van de stad neemt toe wanneer David haar verovert en vestigt als Israëls politieke en religieuze hoofdstad. Het wordt uiteindelijk de locatie van Salomo's Tempel en het middelpunt van de verbondsaanbidding – een status die Jeruzalem in de hele Schrift verheft tot de woonplaats van Gods aanwezigheid en het symbool van Zijn koninkrijk op aarde.",
      "en": "**Archaeological and historical significance**\nJerusalem sits on a defensible ridge in the Judean highlands. Since King David captured it from the Jebusites around 1000 BC, it has been the political and religious epicenter of Israel. Archaeological digs continually reveal its massive ancient walls, water systems, and temple foundations.\n\n**Cultural and geographical context**\nPositioned off the main international trade routes, Jerusalem's significance was entirely theological and political rather than economic. It is surrounded by deep valleys (Kidron and Hinnom), making it a natural fortress. Mount Moriah, where Abraham bound Isaac, became the site of Solomon's magnificent Temple.\n\n**Theological significance**\nJerusalem is the \"City of the Great King\" and the earthly dwelling place of God's name. It is the site of the crucifixion, resurrection, and ascension of Jesus Christ, and the birthplace of the Church at Pentecost. Prophetically, it is the focal point of end-time events and the namesake of the eternal New Jerusalem, representing the ultimate dwelling of God with His people."
    },
    "verses": [
      "Jozua 10:1",
      "2 Samuël 5:6",
      "1 Koningen 8:1",
      "Psalm 122:1",
      "Zacharia 8:3",
      "Mattheüs 23:37",
      "Openbaring 21:2"
    ],
    "eras": [4, 6]
  },
  {
    "id": "rephidim",
    "coords": [
      28.623056,
      33.880278
    ],
    "name": {
      "nl": "Rafidim",
      "en": "Rephidim"
    },
    "region": {
      "nl": "Sinaï",
      "en": "Sinai"
    },
    "desc": {
      "nl": "De rustplaats waar water uit de rots stroomde en Amalek werd verslagen.",
      "en": "The resting place where water flowed from the rock and Amalek was defeated."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nDe exacte locatie van Rafidim is niet met zekerheid vastgesteld, maar historisch wordt het vaak geïdentificeerd met Wadi Feiran, een weelderige oase in het zuidwesten van het Sinaï-schiereiland. Archeologische vondsten tonen aan dat dit gebied al vroeg bewoond werd en diende als een belangrijke doorgangsroute. Het was een logische rustplaats voor nomaden en reizigers, wat verklaart waarom de Amalekieten, een lokaal nomadenvolk, dit gebied fel verdedigden tegen de doortrekkende Israëlieten.\n\n**Culturele en geografische context**\nGeografisch was Rafidim de laatste grote rustplaats voordat het volk Israël de berg Sinaï bereikte. De afwezigheid van water bij hun aankomst zorgde voor een crisis in het genadeloze woestijnklimaat. Cultureel markeert dit moment de eerste georganiseerde militaire strijd van het pas bevrijde volk; Jozua leidde de troepen in het dal, terwijl Mozes, Aäron en Hur de strijd vanaf de heuvel geestelijk ondersteunden.\n\n**Theologische betekenis**\nTheologisch is Rafidim zeer rijk. Ten eerste het water uit de rots: toen het volk murmureerde, beval God Mozes om op de rots (Horeb) te slaan. De apostel Paulus identificeert deze geslagen rots later met Christus (1 Korinthe 10:4), die levend water geeft nadat Hij geslagen is. Ten tweede de strijd tegen Amalek: dit illustreert de voortdurende geestelijke strijd. De overwinning werd niet behaald door eigen kracht of militaire genialiteit, maar door de opgeheven handen van Mozes, een beeld van aanhoudend gebed en Christus' onophoudelijke voorspraak. Als gedenkteken bouwde Mozes daar een altaar: \"De HEERE is mijn Banier\" (Jehova-Nissi).",
      "en": "**Archaeological and historical significance**\nRephidim's exact location is debated, but it was a crucial encampment in the Sinai Peninsula during the Israelites' exodus journey toward Mount Sinai.\n\n**Cultural and geographical context**\nIt was a harsh, arid desert location where the Israelites found no water to drink, leading to severe murmuring and rebellion against Moses and God. It was also the site of the first unprovoked military attack on Israel by the Amalekites.\n\n**Theological significance**\nRephidim stands as a profound testament to divine provision and intercession. God instructed Moses to strike the rock at Horeb, from which life-giving water flowed—a rock that the Apostle Paul identifies spiritually as Christ, who was struck for our salvation (1 Cor. 10:4). During the battle with Amalek, victory was secured only as long as Moses' hands were held up in prayer, illustrating the necessity of spiritual intercession in the warfare of faith."
    },
    "verses": [
      "Exodus 17:1",
      "Exodus 17:8",
      "Numeri 33:14",
      "1 Korinthe 10:4"
    ],
    "eras": [3]
  },
  {
    "id": "rameses",
    "coords": [
      30.79937,
      31.834217
    ],
    "name": {
      "nl": "Rameses (Gosen)",
      "en": "Rameses (Goshen)"
    },
    "region": {
      "nl": "Egypte",
      "en": "Egypt"
    },
    "desc": {
      "nl": "Startpunt van de Exodus.",
      "en": "Starting point of the Exodus."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nRameses (of Pi-Ramesse) was een van de belangrijkste voorraadsteden die door de Israëlitische slaven voor de farao werd gebouwd. Archeologische opgravingen in de oostelijke Nijldelta hebben de restanten van deze enorme stad blootgelegd, wat de enorme bouwprojecten van Farao Ramses II bevestigt.\n\n**Culturele en geografische context**\nGelegen in het vruchtbare land Gosen, was dit de plek waar de Israëlieten zich tijdens de hongersnood onder Jozef hadden gevestigd. Het fungeerde als het verzamelpunt voor de honderdduizenden Israëlieten op de nacht van de uittocht, net na de tiende plaag.\n\n**Theologische betekenis**\nRameses staat symbool voor de ultieme onderdrukking door de wereld (Egypte) en het vertrekpunt van Gods verlossing. Het herinnert eraan dat God Zijn volk uitleidt uit het huis der dienstbaarheid om hen te brengen naar de beloofde rust.",
      "en": "**Archaeological and historical significance**\nRameses was a major store city built by the forced labor of the Israelite slaves. It is widely identified with Pi-Ramesses (Qantir), the grand capital built by Pharaoh Ramesses II in the fertile eastern Nile Delta.\n\n**Cultural and geographical context**\nLocated in the land of Goshen, this region was given to Joseph's family centuries earlier because its rich pastureland was ideal for shepherds (an occupation despised by the Egyptians). Here, the Israelites multiplied greatly, transitioning from a small family clan into a mighty nation.\n\n**Theological significance**\nRameses represents the house of bondage and the starting point of divine redemption. The Exodus began here on the morning after the first Passover. The preservation of the Israelites in Goshen during the plagues vividly demonstrated God's ability to distinguish and protect His chosen people amidst global judgment."
    },
    "verses": [
      "Exodus 1:11",
      "Exodus 12:37",
      "Numeri 33:3"
    ],
    "eras": [3]
  },
  {
    "id": "succoth",
    "coords": [
      30.559,
      31.996
    ],
    "name": {
      "nl": "Sukkoth",
      "en": "Succoth"
    },
    "region": {
      "nl": "Egypte",
      "en": "Egypt"
    },
    "desc": {
      "nl": "De eerste pleisterplaats na Rameses.",
      "en": "The first encampment after Rameses."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nSukkoth was waarschijnlijk een Egyptische grensstad of militaire buitenpost aan de rand van de Wadi Tumilat. Historici geloven dat het diende als een verzamelplaats voor reizigers die Egypte verlieten of binnenkwamen.\n\n**Culturele en geografische context**\nDe naam Sukkoth betekent \"loofhutten\" of \"tenten\". Het was de allereerste pleisterplaats voor de Israëlieten na hun haastige vertrek uit Rameses. Hier sloegen zij voor het eerst als een bevrijd volk, en niet als slaven, hun tenten op.\n\n**Theologische betekenis**\nSukkoth herinnert theologisch aan de pelgrimsreis van de gelovige. God stelde later het Loofhuttenfeest (Sukkot) in om het volk er jaarlijks aan te herinneren dat Hij hen in hutten liet wonen toen Hij hen uit Egypte leidde (Leviticus 23:42-43).",
      "en": "**Archaeological and historical significance**\nSuccoth was likely an Egyptian border town or a military staging area just outside the main population centers of the Nile Delta. It served as the very first encampment for the Israelites after departing Rameses.\n\n**Cultural and geographical context**\nThe name Succoth means \"booths\" or \"tents,\" highlighting the sudden transition of the Israelites from settled slaves in stone cities to wandering pilgrims living in temporary shelters.\n\n**Theological significance**\nSuccoth marks the definitive break from Egyptian slavery and the beginning of the wilderness journey. It is here that God instituted the command to commemorate the Exodus and consecrate the firstborn (Exodus 13). It symbolizes the believer's departure from the bondage of sin into a life of faith, dependent entirely on God's guidance, visibly manifested for the first time here as the pillar of cloud and fire."
    },
    "verses": [
      "Exodus 12:37",
      "Exodus 13:20",
      "Numeri 33:5"
    ],
    "eras": [3]
  },
  {
    "id": "etham",
    "coords": [
      30.5475,
      31.963611
    ],
    "name": {
      "nl": "Etham",
      "en": "Etham"
    },
    "region": {
      "nl": "Woestijn",
      "en": "Wilderness"
    },
    "desc": {
      "nl": "Aan de rand van de woestijn.",
      "en": "On the edge of the wilderness."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nEtham markeerde de uiterste grens van de bewoonde wereld aan de Egyptische grens, vlakbij de vestingwerken die Egypte beschermden tegen indringers uit de woestijn.\n\n**Culturele en geografische context**\nEtham lag \"aan de rand van de woestijn\". Vanaf hier betrad het volk de onherbergzame wildernis waar overleving zonder goddelijke ingreep onmogelijk was.\n\n**Theologische betekenis**\nBij Etham ging God voor het eerst expliciet voor hen uit in een wolkkolom overdag en een vuurkolom 's nachts. Dit benadrukt dat wanneer we de grens van de 'veilige' wereld passeren en de wildernis betreden, Gods zichtbare leiding en aanwezigheid ons leiden en beschermen.",
      "en": "**Archaeological and historical significance**\nEtham marked the absolute edge of the inhabited world and the boundary of the Egyptian wilderness. Its exact location is lost, but it represented the point of no return for the fleeing Israelites.\n\n**Cultural and geographical context**\nSituated \"on the edge of the wilderness,\" Etham was where the harsh, unforgiving desert truly began. Under normal circumstances, travelers would follow established, guarded trade routes, but God deliberately led them off the beaten path.\n\n**Theological significance**\nAt Etham, God commanded a seemingly illogical maneuver: to turn back and camp before Pi-hahiroth, trapping themselves against the sea. This divine detour was purposefully designed to harden Pharaoh's heart and to create an inescapable crisis where Israel's only hope would be the miraculous deliverance of the Lord, proving that salvation is entirely of God and not of human strategy."
    },
    "verses": [
      "Exodus 13:20",
      "Numeri 33:6"
    ],
    "eras": [3]
  },
  {
    "id": "baal_zephon",
    "coords": [
      30.860556,
      32.171389
    ],
    "name": {
      "nl": "Baäl-Zefon",
      "en": "Baal-Zephon"
    },
    "region": {
      "nl": "Egypte",
      "en": "Egypt"
    },
    "desc": {
      "nl": "Plaats aan de overkant van Pi-Hachiroth.",
      "en": "Place opposite Pi-Hahiroth."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nBaäl-Zefon wordt geassocieerd met een heiligdom voor een Kanaänitische of Fenicische weergod (Baäl van het Noorden). Het diende waarschijnlijk als een baken voor zeevaarders nabij het huidige Suezkanaal of het Bardawil-meer.\n\n**Culturele en geografische context**\nGod beval Israël om \"om te keren\" en zich te legeren tegenover Baäl-Zefon, direct aan zee. Dit was strategisch gezien een valstrik: ze zaten klem tussen de zee, de wildernis en het heiligdom van de Egyptische/Kanaänitische god.\n\n**Theologische betekenis**\nDe keuze voor deze specifieke locatie was een goddelijke uitdaging. God toonde niet alleen Zijn heerschappij over Farao, maar ook dat de afgod Baäl-Zefon machteloos was. Hier spleet God de Rode Zee, wat Zijn absolute soevereiniteit over de natuurmachten (die aan Baäl werden toegeschreven) bewijst.",
      "en": "**Archaeological and historical significance**\nBaal-Zephon is associated with a sanctuary dedicated to a Canaanite or Egyptian deity, likely located near the northern end of the Gulf of Suez or the Bitter Lakes.\n\n**Cultural and geographical context**\nIt was a prominent landmark near the Red Sea crossing. By commanding Israel to camp opposite a pagan shrine, the ensuing miracle served as a direct affront to the regional gods of Egypt, demonstrating their absolute powerlessness.\n\n**Theological significance**\nTrapped between the impassable sea, the mountains, and Pharaoh's advancing chariots at Baal-Zephon, Israel experienced the ultimate test of faith. The resulting parting of the Red Sea is the paramount redemptive event of the Old Testament. It prefigures Christian baptism (1 Cor. 10:2) and stands as the eternal proof that God makes a way where there is no way, utterly destroying the enemies of His people."
    },
    "verses": [
      "Exodus 14:2",
      "Exodus 14:9",
      "Numeri 33:7"
    ],
    "eras": [3]
  },
  {
    "id": "marah",
    "coords": [
      29.34604,
      32.94284
    ],
    "name": {
      "nl": "Mara",
      "en": "Marah"
    },
    "region": {
      "nl": "Sinaï",
      "en": "Sinai"
    },
    "desc": {
      "nl": "Plaats van het bittere water.",
      "en": "Place of bitter water."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nMara bevindt zich vermoedelijk bij Ain Hawarah, een bron op de route langs de oostkust van de Golf van Suez, die berucht is om zijn zware mineralen en bittere smaak.\n\n**Culturele en geografische context**\nDrie dagen lang hadden de Israëlieten door de gloeiend hete Sur-woestijn getrokken zonder water. Toen ze eindelijk water vonden, was het ondrinkbaar. De teleurstelling leidde tot het eerste grote gemurmureer tegen Mozes na de verlossing.\n\n**Theologische betekenis**\nGod toonde Mozes een stuk hout (\"boom\") dat in het water geworpen moest worden, waardoor het zoet werd. Theologisch wijst dit hout vooruit naar het kruishout van Christus, dat de bitterheid van de zonde, het lijden en de dood transformeert tot levend en zoet water voor de gelovige. Hier openbaarde God Zich als \"Jehova-Rapha\" (De HEERE Uw Heelmeester).",
      "en": "**Archaeological and historical significance**\nMarah is likely located at Ain Hawarah, a spring in the Sinai Peninsula known even today for its highly mineralized, bitter water that is unfit for human consumption.\n\n**Cultural and geographical context**\nAfter experiencing the euphoria of deliverance at the Red Sea, the Israelites marched for three agonizing days into the desert of Shur without finding water. When they finally found water at Marah, it was too bitter to drink, leading to immediate despair and grumbling.\n\n**Theological significance**\nMarah (meaning \"Bitter\") was a deliberate test of Israel's heart. God instructed Moses to throw a specific piece of wood into the water, which miraculously made it sweet. Theologically, this points to the cross of Christ (the wood/tree) which absorbs the bitterness of life and divine judgment, transforming the believer's bitter trials into the sweetness of grace and healing."
    },
    "verses": [
      "Exodus 15:23",
      "Numeri 33:8"
    ],
    "eras": [3]
  },
  {
    "id": "elim",
    "coords": [
      29.254722,
      32.915833
    ],
    "name": {
      "nl": "Elim",
      "en": "Elim"
    },
    "region": {
      "nl": "Sinaï",
      "en": "Sinai"
    },
    "desc": {
      "nl": "Oase met 12 waterbronnen en 70 palmbomen.",
      "en": "Oasis with 12 springs and 70 palm trees."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nElim wordt door vroege christelijke pelgrims en historici vaak geïdentificeerd met Wadi Gharandel, een plek die tot op de dag van vandaag bekend staat om zijn overvloedige zoetwaterbronnen en weelderige palmbomen.\n\n**Culturele en geografische context**\nNa de bittere ervaring bij Mara kwam het volk bij Elim, een ware woestijnoase. De twaalf waterbronnen en zeventig palmbomen boden fysiek herstel en schaduw aan de miljoenen Israëlieten.\n\n**Theologische betekenis**\nElim is het bijbelse beeld van Gods voorbereide rust en overvloed na een periode van beproeving. De getallen (12 en 70) zijn niet toevallig: 12 verwijst naar de stammen van Israël en 70 naar het getal van de volkeren of de oudsten. Het symboliseert Gods volmaakte voorziening voor heel Zijn volk.",
      "en": "**Archaeological and historical significance**\nElim is often identified by early pilgrims with Wadi Garandel, a beautiful oasis located a short journey south of the bitter waters of Marah.\n\n**Cultural and geographical context**\nUnlike the harsh desert surrounding it, Elim was a lush sanctuary boasting twelve wells of fresh water and seventy palm trees, providing abundant shade and rest for the exhausted multitude.\n\n**Theological significance**\nElim represents God's gracious provision and seasons of rest following periods of bitter testing. The specific numbers—twelve wells (corresponding to the twelve tribes of Israel) and seventy palm trees (corresponding to the seventy elders)—symbolize divine perfection, completeness, and God's abundant sufficiency for His covenant people during their earthly pilgrimage."
    },
    "verses": [
      "Exodus 15:27",
      "Numeri 33:9"
    ],
    "eras": [3]
  },
  {
    "id": "ur",
    "coords": [
      30.962222,
      46.104444
    ],
    "name": {
      "nl": "Ur der Chaldeeën",
      "en": "Ur of the Chaldeans"
    },
    "region": {
      "nl": "Mesopotamië",
      "en": "Mesopotamia"
    },
    "desc": {
      "nl": "De geboorteplaats van Abraham.",
      "en": "The birthplace of Abraham."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nUr der Chaldeeën (huidige Tell el-Muqayyar in Irak) was een van de machtigste en meest geavanceerde Sumerische stadstaten in het oude Mesopotamië. Opgravingen in de jaren 1920 toonden een hoogontwikkelde cultuur met monumentale ziggurats, wiskunde, en uitgebreide handel.\n\n**Culturele en geografische context**\nUr was een rijk handelscentrum nabij de monding van de rivieren Eufraat en Tigris. De stad was diep doordrenkt van afgoderij, met name de aanbidding van de maangod Nanna (Sin). Terach, Abrahams vader, leefde midden in deze heidense context.\n\n**Theologische betekenis**\nGods roeping van Abraham uit Ur toont Zijn soevereine genade: Hij koos een man uit een afgodisch bolwerk en riep hem om alles achter te laten (cultuur, zekerheid, en familie). Het versterkt het principe dat de roeping van de gelovige betekent dat men een pelgrim en vreemdeling op aarde wordt, op zoek naar de stad waarvan God de Bouwmeester is (Hebreeën 11).",
      "en": "**Archaeological and historical significance**\nUr of the Chaldeans (modern Tell el-Muqayyar in Iraq) was one of the most powerful and advanced Sumerian city-states in ancient Mesopotamia. Excavations in the 1920s revealed a highly developed culture with monumental ziggurats, advanced mathematics, and extensive trade.\n\n**Cultural and geographical context**\nUr was a wealthy commercial hub near the mouth of the Euphrates and Tigris rivers. The city was deeply steeped in idolatry, specifically the worship of the moon god Nanna (Sin). Terah, Abraham's father, lived amidst this pagan context.\n\n**Theological significance**\nGod's calling of Abraham out of Ur demonstrates His sovereign grace: He chose a man from an idolatrous stronghold and called him to leave everything behind (culture, security, and family). It reinforces the principle that the calling of the believer means becoming a pilgrim and stranger on earth, seeking the city whose architect and builder is God (Hebrews 11)."
    },
    "verses": [
      "Genesis 11:28",
      "Genesis 11:31",
      "Nehemia 9:7"
    ],
    "eras": [2]
  },
  {
    "id": "haran",
    "coords": [
      36.864444,
      39.032778
    ],
    "name": {
      "nl": "Haran",
      "en": "Haran"
    },
    "region": {
      "nl": "Mesopotamië",
      "en": "Mesopotamia"
    },
    "desc": {
      "nl": "Waar Abraham verbleef voordat hij naar Kanaän ging.",
      "en": "Where Abraham stayed before entering Canaan."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nHaran was een prominente oude handelsstad in het noorden van Mesopotamië (huidig Turkije). Net als Ur was Haran een belangrijk centrum voor de verering van de maangod Sin.\n\n**Culturele en geografische context**\nGelegen aan de belangrijke karavaanroutes tussen Ninevé en Damascus, was het een natuurlijke tussenstop voor Terach en Abraham. Toen Terach zich hier vestigde, pauzeerde de reis naar Kanaän totdat Terach op 205-jarige leeftijd stierf.\n\n**Theologische betekenis**\nHaran staat symbool voor het halve werk: de roeping werd gedeeltelijk beantwoord, maar de reis stagneerde door aardse of familiebanden. Pas na de dood van zijn vader verliet Abraham Haran definitief op 75-jarige leeftijd om volledig in gehoorzaamheid Kanaän binnen te trekken, wat de noodzaak van radicale toewijding illustreert.",
      "en": "**Archaeological and historical significance**\nHaran was a prominent ancient commercial city in northern Mesopotamia (modern Turkey). Like Ur, Haran was a major center for the worship of the moon god Sin.\n\n**Cultural and geographical context**\nSituated on the vital caravan routes between Nineveh and Damascus, it was a natural stopping point for Terah and Abraham. When Terah settled here, the journey to Canaan paused until Terah died at the age of 205.\n\n**Theological significance**\nHaran symbolizes half-measures: the calling was partially answered, but the journey stagnated due to earthly or family ties. Only after the death of his father did Abraham definitively leave Haran at age 75 to step fully into obedience and enter Canaan, illustrating the necessity of radical devotion to God's call."
    },
    "verses": [
      "Genesis 11:31",
      "Genesis 12:4",
      "Handelingen 7:2"
    ],
    "eras": [2]
  },
  {
    "id": "beersheba",
    "coords": [
      31.244722,
      34.840833
    ],
    "name": {
      "nl": "Beër-Sjeba",
      "en": "Beersheba"
    },
    "region": {
      "nl": "Kanaän",
      "en": "Canaan"
    },
    "desc": {
      "nl": "Zuidelijke grens van Israël, put van de eed.",
      "en": "Southern border of Israel, well of the oath."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nBeër-Sjeba is de belangrijkste stad in de Negev-woestijn. Opgravingen bij Tel Beër-Sjeba hebben restanten onthuld van een versterkte Israëlitische stad met een geavanceerd watersysteem, wat essentieel was voor bewoning in dit droge gebied.\n\n**Culturele en geografische context**\nDe naam betekent \"Put van de Eed\" of \"Put van Zeven\". Het markeerde de diepste zuidelijke grens van het vruchtbare land van Israël. Het bekende spreekwoord \"van Dan tot Beër-Sjeba\" werd in de Bijbel gebruikt om het gehele grondgebied van de natie aan te duiden.\n\n**Theologische betekenis**\nBeër-Sjeba was een heilige plaats voor de aartsvaders. Abraham sloot hier een vredesverbond met Abimelech, Izak ontving hier een verschijning van God en bouwde een altaar, en Jakob bracht hier offers voordat hij naar Egypte trok. Het is de plek van verbondsvernieuwing en de verzekering van Gods blijvende beloften aan het nageslacht.",
      "en": "**Archaeological and historical significance**\nBeersheba is the most important city in the Negev desert. Excavations at Tel Beersheba have revealed remains of a fortified Israelite city with a sophisticated water system, essential for survival in this arid region.\n\n**Cultural and geographical context**\nThe name means \"Well of the Oath\" or \"Well of Seven.\" It marked the southernmost boundary of the fertile land of Israel. The famous idiom \"from Dan to Beersheba\" was used in the Bible to denote the entire territory of the nation.\n\n**Theological significance**\nBeersheba was a sacred site for the patriarchs. Abraham made a covenant of peace with Abimelech here, Isaac received a manifestation of God and built an altar, and Jacob offered sacrifices before journeying down to Egypt. It is a place of covenant renewal and the assurance of God's enduring promises to their offspring."
    },
    "verses": [
      "Genesis 21:31",
      "Genesis 26:33",
      "Richteren 20:1"
    ],
    "eras": [2]
  },
  {
    "id": "nineveh",
    "coords": [
      36.3594,
      43.1528
    ],
    "name": {
      "nl": "Ninevé",
      "en": "Nineveh"
    },
    "region": {
      "nl": "Assyrië",
      "en": "Assyria"
    },
    "desc": {
      "nl": "Hoofdstad van Assyrië, bezocht door Jona.",
      "en": "Capital of Assyria, visited by Jonah."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nNinevé, gelegen aan de oostelijke oever van de Tigris in het huidige Irak, was een van de oudste en machtigste steden ter wereld en werd later de glorieuze hoofdstad van het wrede Assyrische rijk onder Sanherib.\n\n**Culturele en geografische context**\nIn haar bloeitijd was Ninevé een metropool met enorme muren en paleizen. De Assyriërs stonden in de hele antieke wereld bekend om hun ongekende wreedheid en militaire terreur, wat verklaart waarom de profeet Jona weigerde hen tot bekering op te roepen.\n\n**Theologische betekenis**\nDe stad vormt het decor voor een van de grootste theologische ommekeren in de Bijbel: het boek Jona. Het illustreert dat Gods ontzagwekkende genade zich uitstrekt tot over de grenzen van Israël, zelfs tot de meest verdorven en vijandige heidense naties, mits zij zich in zak en as bekeren. Uiteindelijk, toen de stad later weer in wreedheid verviel, werd zij conform de profetie van Nahum verwoest (612 v.Chr.).",
      "en": "**Archaeological and historical significance**\nNineveh, located on the eastern bank of the Tigris River in modern-day Iraq, was one of the oldest and most powerful cities in the world and later became the glorious capital of the brutal Assyrian Empire under Sennacherib.\n\n**Cultural and geographical context**\nIn its prime, Nineveh was a massive metropolis with enormous walls and palaces. The Assyrians were notorious throughout the ancient world for their unprecedented cruelty and military terror, which explains why the prophet Jonah refused to call them to repentance.\n\n**Theological significance**\nThe city forms the backdrop for one of the greatest theological turnarounds in the Bible: the book of Jonah. It illustrates that God's awe-inspiring grace extends beyond the borders of Israel, even to the most depraved and hostile pagan nations, provided they repent in sackcloth and ashes. Ultimately, when the city later reverted to cruelty, it was destroyed in fulfillment of Nahum's prophecy (612 BC)."
    },
    "verses": [
      "Genesis 10:11",
      "Jona 1:2",
      "Jona 3:2",
      "Nahum 1:1"
    ],
    "eras": [4]
  },
  {
    "id": "nazareth",
    "coords": [
      32.70214,
      35.29769
    ],
    "name": {
      "nl": "Nazareth",
      "en": "Nazareth"
    },
    "region": {
      "nl": "Galilea",
      "en": "Galilee"
    },
    "desc": {
      "nl": "De woonplaats van Jezus waar Hij opgroeide.",
      "en": "The hometown where Jesus grew up."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nNazareth was in de eerste eeuw een onbeduidend, klein agrarisch dorpje in het heuvelland van Beneden-Galilea. Archeologisch materiaal uit de tijd van Jezus toont een nederzetting van hooguit enkele honderden bewoners, levend in grote armoede.\n\n**Culturele en geografische context**\nNazareth lag in het noorden, ver weg van de theologische en politieke elite in Jeruzalem. De uitdrukking van Nathanaël, \"Kan uit Nazareth iets goeds komen?\" weerspiegelt het destijds heersende vooroordeel dat Galilea (en zeker Nazareth) geestelijk en cultureel inferieur was.\n\n**Theologische betekenis**\nDit was de woonplaats waar de Zoon van God opgroeide ('de Nazarener'). Theologisch onderstreept Nazareth de vernedering en menswording van Christus. De Koning der koningen verkoos niet te groeien in een paleis in Jeruzalem, maar verbleef bijna dertig jaar in de obscuriteit van een eenvoudige timmermanswerkplaats. Het toont dat Gods majesteit zich vaak openbaart in wat voor de wereld veracht en gering is.",
      "en": "**Archaeological and historical significance**\nNazareth was an insignificant, small agricultural village in the hill country of Lower Galilee during the first century. Archaeological evidence from the time of Jesus shows a settlement of at most a few hundred inhabitants, living in deep poverty.\n\n**Cultural and geographical context**\nNazareth was located in the north, far from the theological and political elite in Jerusalem. Nathanael's expression, \"Can anything good come out of Nazareth?\" reflects the prevailing prejudice of the time that Galilee (and certainly Nazareth) was spiritually and culturally inferior.\n\n**Theological significance**\nThis was the hometown where the Son of God grew up ('the Nazarene'). Theologically, Nazareth underscores the humiliation and incarnation of Christ. The King of kings chose not to grow up in a palace in Jerusalem, but spent nearly thirty years in the obscurity of a simple carpenter's workshop. It demonstrates that God's majesty often reveals itself in what the world despises and considers lowly."
    },
    "verses": [
      "Mattheüs 2:23",
      "Lukas 1:26",
      "Lukas 4:16",
      "Johannes 1:46"
    ],
    "eras": [6]
  },
  {
    "id": "capernaum",
    "coords": [
      32.881111,
      35.575
    ],
    "name": {
      "nl": "Kafarnaüm",
      "en": "Capernaum"
    },
    "region": {
      "nl": "Galilea",
      "en": "Galilee"
    },
    "desc": {
      "nl": "Het centrum van Jezus' bediening rondom het meer.",
      "en": "The center of Jesus' ministry around the sea."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nKafarnaüm (Kfar Nachoem, \"Dorp van Troost\") was een welvarend vissersdorp aan de noordwestelijke oever van het Meer van Galilea. Opgravingen hebben indrukwekkende vondsten opgeleverd, waaronder een prachtige witte kalkstenen synagoge en het huis van Petrus.\n\n**Culturele en geografische context**\nKafarnaüm lag aan de Via Maris, een grote internationale handelsroute. Er was een belastingkantoor (waar Mattheüs werd geroepen) en een Romeins garnizoen. Het meer was rijk aan vis, wat verklaart waarom veel van Jezus' discipelen lokale vissers waren.\n\n**Theologische betekenis**\nNadat Jezus uit Nazareth werd verdreven, maakte Hij Kafarnaüm tot Zijn uitvalsbasis en het \"hoofdkwartier\" van Zijn Galileese bediening. Nergens ter wereld deed Jezus zoveel wonderen (genezingen, demonen uitdrijven, de prediking van het Brood des Levens) als hier. Ondanks dit grote licht weigerde de stad zich te bekeren, wat leidde tot Jezus' oordeel dat de stad tot in het dodenrijk zou worden neergestoten (Mattheüs 11:23).",
      "en": "**Archaeological and historical significance**\nCapernaum (Kfar Nahum, \"Village of Comfort\") was a prosperous fishing village on the northwestern shore of the Sea of Galilee. Excavations have yielded impressive finds, including a beautiful white limestone synagogue and the house of Peter.\n\n**Cultural and geographical context**\nCapernaum was located on the Via Maris, a major international trade route. It had a tax office (where Matthew was called) and a Roman garrison. The sea was rich in fish, explaining why many of Jesus' disciples were local fishermen.\n\n**Theological significance**\nAfter being driven out of Nazareth, Jesus made Capernaum His home base and the \"headquarters\" of His Galilean ministry. Nowhere in the world did Jesus perform as many miracles (healings, casting out demons, preaching the Bread of Life) as here. Despite this great light, the city refused to repent, leading to Jesus' judgment that the city would be brought down to Hades (Matthew 11:23)."
    },
    "verses": [
      "Mattheüs 4:13",
      "Markus 1:21",
      "Lukas 4:31",
      "Johannes 6:59"
    ],
    "eras": [6]
  },
  {
    "id": "hebron",
    "coords": [
      31.525087,
      35.10222
    ],
    "name": {
      "nl": "Hebron",
      "en": "Hebron"
    },
    "region": {
      "nl": "Juda",
      "en": "Judah"
    },
    "desc": {
      "nl": "Rustplaats van Abraham, Isaäk en Jakob.",
      "en": "Resting place of Abraham, Isaac, and Jacob."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nHebron, gelegen op ruim 900 meter hoogte in het Judese heuvelland, is een van de oudste continu bewoonde steden ter wereld. Koning Herodes bouwde later een kolossaal heiligdom over de Machpela-grot, welk gebouw er vandaag nog steeds staat.\n\n**Culturele en geografische context**\nHebron was een vruchtbaar gebied vol wijngaarden (Dal van Eskol). Abraham kocht hier van Efron de Hethiet een akker en een spelonk als familiebegraafplaats. Hier liggen Abraham en Sara, Izak en Rebekka, en Jakob en Lea begraven.\n\n**Theologische betekenis**\nHebron (\"Vriendschap\" of \"Verbondschap\") is theologisch de plek van diep gewortelde verbondstrouw. Abraham kreeg de belofte van het land en ontving dit kleine stukje als een onderpand. Eeuwen later werd David in Hebron door God geleid om eerst over Juda (voor 7,5 jaar) en later over heel Israël tot koning te worden gezalfd. Het is de bodem waaruit het messiaanse koningschap ontkiemde.",
      "en": "**Archaeological and historical significance**\nHebron, located at over 900 meters altitude in the Judean hill country, is one of the oldest continuously inhabited cities in the world. King Herod later built a colossal sanctuary over the Cave of Machpelah, a building that still stands today.\n\n**Cultural and geographical context**\nHebron was a fertile area full of vineyards (Valley of Eshcol). Abraham bought a field and a cave from Ephron the Hittite here as a family burial ground. Abraham and Sarah, Isaac and Rebekah, and Jacob and Leah are buried here.\n\n**Theological significance**\nHebron (\"Friendship\" or \"Alliance\") is theologically the place of deeply rooted covenant faithfulness. Abraham received the promise of the land and received this small piece as a down payment. Centuries later, David was guided by God to be anointed king in Hebron, first over Judah (for 7.5 years) and later over all Israel. It is the soil from which the messianic kingship sprouted."
    },
    "verses": [
      "Genesis 13:18",
      "Genesis 23:2",
      "2 Samuël 2:1",
      "2 Samuël 5:3"
    ],
    "eras": [2, 4]
  },
  {
    "id": "sodom",
    "coords": [
      31.20849,
      35.449223
    ],
    "name": {
      "nl": "Sodom en Gomorra",
      "en": "Sodom and Gomorrah"
    },
    "region": {
      "nl": "Vlakte van de Jordaan",
      "en": "Plain of the Jordan"
    },
    "desc": {
      "nl": "Verwoest door vuur en zwavel vanwege hun zonde.",
      "en": "Destroyed by fire and brimstone due to their sin."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nHoewel de exacte locatie vaak debatteerd wordt, plaatsen veel historici en archeologen de steden van de vlakte onder of nabij de ondiepe zuidelijke wateren van de huidige Dode Zee.\n\n**Culturele en geografische context**\nDe steden Sodom en Gomorra lagen in een vruchtbare vallei, die in de dagen van Abraham \"waterrijk was als de hof des Heeren\" (Genesis 13:10). Lot koos ervoor hier zijn tenten op te slaan vanwege de rijkdom van het land, hoewel de mannen van Sodom zeer slecht waren.\n\n**Theologische betekenis**\nVanwege de hemeltergende en onbekeerlijke verdorvenheid liet de Heere vuur en zwavel regenen op deze steden. Sodom en Gomorra dienen in de hele Schrift als een waarschuwingsbeeld van Gods heilige toorn en Zijn onafwendbare eindgericht over de zonde, en als contrast voor de reddende genade die Lot uit het verderf trok.",
      "en": "**Archaeological and historical significance**\nThe exact location is debated..."
    },
    "verses": [
      "Genesis 13:10",
      "Genesis 19:24",
      "Lukas 17:29",
      "Judas 1:7"
    ],
    "eras": [2]
  },
  {
    "id": "bethlehem",
    "coords": [
      31.704306,
      35.207639
    ],
    "name": {
      "nl": "Bethlehem",
      "en": "Bethlehem"
    },
    "region": {
      "nl": "Juda",
      "en": "Judah"
    },
    "desc": {
      "nl": "Geboorteplaats van koning David en de Heere Jezus.",
      "en": "Birthplace of King David and the Lord Jesus."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nBethlehem (Huis van het Brood) is een kleine, eeuwenoude stad in het bergland van Juda, zo'n tien kilometer ten zuiden van Jeruzalem.\n\n**Culturele en geografische context**\nEerder heette het Efratha; in haar nabijheid werd Rachel begraven. In de velden van Bethlehem las de Moabitische Ruth aren op het land van Boaz. Later werd hier David, de herdersjongen en achterkleinzoon van Ruth, geboren en door Samuël tot koning gezalfd.\n\n**Theologische betekenis**\nDe profeet Micha profeteerde dat uit deze ogenschijnlijk onbeduidende stad de Heerser van Israël zou voortkomen, Wiens uitgangen zijn van ouds, van de dagen der eeuwigheid (Micha 5:1). Dit werd heerlijk vervuld toen God in het vlees kwam en Jezus Christus, het ware Brood des levens, in Bethlehem in een kribbe werd geboren om Zijn volk te verlossen.",
      "en": "**Archaeological and historical significance**\nBethlehem (House of Bread) is a small ancient town..."
    },
    "verses": [
      "Genesis 35:19",
      "Ruth 4:11",
      "1 Samuël 16:1",
      "Micha 5:1",
      "Lukas 2:4"
    ],
    "eras": [4, 6]
  },
  {
    "id": "mount_sinai",
    "coords": [
      28.539722,
      33.973333
    ],
    "name": {
      "nl": "De Berg Sinaï (Horeb)",
      "en": "Mount Sinai (Horeb)"
    },
    "region": {
      "nl": "Sinaïwoestijn",
      "en": "Sinai Desert"
    },
    "desc": {
      "nl": "De berg waar God de wet aan Mozes gaf.",
      "en": "The mountain where God gave the Law to Moses."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nDe berg Sinaï (vaak geïdentificeerd met Jebel Musa in het zuiden van het Sinaï-schiereiland) is de formidabele granieten berg in de wildernis waar het volk Israël maandenlang verbleef na de uittocht uit Egypte.\n\n**Culturele en geografische context**\nHet is een dor en woest gebied, ook Horeb genoemd (\"De berg Gods\"). Hier verscheen de Heere voor het eerst aan Mozes in de brandende doornstruik die niet verteerde.\n\n**Theologische betekenis**\nTheologisch markeert Sinaï het moment waarop het Oude Verbond werd gesloten. Onder donder, bliksem, dikke rook en bazuingeschal daalde de Heere Zelf neer in vuur en openbaarde Zijn absolute, onkreukbare heiligheid. Hij gaf de Tien Geboden en de gedetailleerde blauwdrukken voor de tabernakel en het priesterschap. Het toont de majesteit van Gods wet, die door haar strengheid (waar de berg niet eens aangeraakt mocht worden) het volk deed uitzien naar de genade die in Christus zou komen.",
      "en": "**Archaeological and historical significance**\nMount Sinai is the formidable granite mountain..."
    },
    "verses": [
      "Exodus 3:1",
      "Exodus 19:18",
      "Deuteronomium 4:11",
      "Hebreeën 12:18"
    ],
    "eras": [3]
  },
  {
    "id": "babylon",
    "coords": [
      32.543333,
      44.422222
    ],
    "name": {
      "nl": "Babel (Babylon)",
      "en": "Babylon"
    },
    "region": {
      "nl": "Mesopotamië",
      "en": "Mesopotamia"
    },
    "desc": {
      "nl": "Zinnebeeld van de wereld, plaats van ballingschap.",
      "en": "Symbol of the world, place of exile."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nBabel, gebouwd langs de Eufraat, vindt haar vroegste oorsprong bij de torenbouw in Sinear (Gen. 11). Eeuwen later bouwde koning Nebukadnezar het uit tot de absolute grootmacht en prachtstad van het Nabije Oosten, compleet met gigantische muren en hangende tuinen.\n\n**Culturele en geografische context**\nToen Juda hardnekkig Gods wetten bleef overtreden, gebruikte God Babylon als een 'gouden beker in Zijn hand' om Zijn oordeel te voltrekken. In 586 v.Chr. verwoestte Nebukadnezar Jeruzalem en de Tempel, en voerde hij het volk Juda als ballingen mee naar Babylon.\n\n**Theologische betekenis**\nBabylon is in de theologie het ultieme, profetische archetype van de heidense, hoogmoedige mens die zich tegen God verheft. Waar Jeruzalem de stad van God is, vertegenwoordigt Babylon de goddeloze wereld. De Psalmen getuigen van het verdriet van het volk: \"Aan de rivieren van Babel, daar zaten wij, ook weenden wij\" (Ps. 137). Uiteindelijk profeteert Openbaring over de definitieve en vernietigende ondergang van het geestelijke Babylon.",
      "en": "**Archaeological and historical significance**\nBabylon finds its earliest roots in the tower of Shinar..."
    },
    "verses": [
      "Genesis 11:9",
      "2 Koningen 25:1",
      "Psalm 137:1",
      "Openbaring 18:2"
    ],
    "eras": [1, 5]
  },
  {
    "id": "sea_of_galilee",
    "coords": [
      32.818906,
      35.590033
    ],
    "name": {
      "nl": "Meer van Galilea",
      "en": "Sea of Galilee"
    },
    "region": {
      "nl": "Galilea",
      "en": "Galilee"
    },
    "desc": {
      "nl": "Het toneel van vele wonderen van Jezus.",
      "en": "The scene of many miracles by Jesus."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nHet Meer van Galilea (ook wel Meer van Tiberias of Meer Gennesareth) is een groot zoetwatermeer in het noorden van Israël, gelegen op ruim 200 meter onder zeeniveau. In de oudheid werd het omringd door bloeiende visserijsteden.\n\n**Culturele en geografische context**\nVanwege de unieke ligging in de vallei is het meer berucht om plotselinge, zeer zware en levensgevaarlijke stormen die vanaf de omliggende heuvels neerstorten.\n\n**Theologische betekenis**\nDit meer is het kloppend hart van Jezus' bediening. Hier riep Hij Zijn eerste discipelen (vissers) om vissers van mensen te worden. Op dit water wandelde Hij in de nacht, en met één enkel machtswoord (\"Zwijg, wees stil!\") kalmeerde Hij de elementen, wat Zijn goddelijke heerschappij over de schepping demonstreert. Ook na Zijn opstanding verscheen Hij hier aan Zijn discipelen bij de wonderbaarlijke visvangst.",
      "en": "**Archaeological and historical significance**\nThe Sea of Galilee (also known as the Sea of Tiberias or Lake Gennesaret) is a large freshwater lake in northern Israel, situated over 200 meters below sea level. In ancient times, it was surrounded by thriving fishing towns.\n\n**Cultural and geographical context**\nDue to its unique position in the valley, the lake is notorious for sudden, very severe and life-threatening storms that sweep down from the surrounding hills.\n\n**Theological significance**\nThis lake is the beating heart of Jesus' ministry. Here He called His first disciples (fishermen) to become fishers of men. He walked on this water in the dead of night, and with a single word of power (\"Peace, be still!\"), He calmed the raging elements, demonstrating His divine lordship over creation. After His resurrection, He also appeared here to His disciples during the miraculous catch of fish."
    },
    "verses": [
      "Mattheüs 4:18",
      "Markus 4:39",
      "Mattheüs 14:25",
      "Johannes 21:1"
    ],
    "eras": [6]
  },
  {
    "id": "jordan_river",
    "coords": [
      31.761389,
      35.558333
    ],
    "name": {
      "nl": "Rivier de Jordaan",
      "en": "Jordan River"
    },
    "region": {
      "nl": "Kanaän",
      "en": "Canaan"
    },
    "desc": {
      "nl": "De grensrivier en plaats van Jezus' doop.",
      "en": "The border river and place of Jesus' baptism."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nDe Jordaan is de belangrijkste rivier in de regio. Hij stroomt vanuit de berg Hermon, door het Meer van Galilea, diep door de Riftvallei naar het laagste punt op aarde: de Dode Zee.\n\n**Culturele en geografische context**\nDe rivier vormde een zware natuurlijke grens voor iedereen die vanuit het oosten het Beloofde Land wilde binnentrekken.\n\n**Theologische betekenis**\nDe Jordaan staat in de Bijbel symbool voor overgang en geestelijke doorbraak. Jozua leidde het volk dwars door het wonderbaarlijk drooggevallen rivierbed het Beloofde Land in. Eeuwen later preekte Johannes de Doper hier een doop van bekering. De theologische climax vond plaats toen Jezus Zelf in dit water werd gedoopt, de hemel scheurde en de Drie-eenheid zich onthulde: de stem van de Vader, de Zoon in het water, en de Geest als een duif.",
      "en": "**Archaeological and historical significance**\nThe Jordan is the most important river in the region. It flows from Mount Hermon, through the Sea of Galilee, deep down the Rift Valley to the lowest point on earth: the Dead Sea.\n\n**Cultural and geographical context**\nThe river formed a formidable natural border for anyone seeking to enter the Promised Land from the east.\n\n**Theological significance**\nIn the Bible, the Jordan is a symbol of transition and spiritual breakthrough. Joshua led the people right through the miraculously dried riverbed into the Promised Land. Centuries later, John the Baptist preached a baptism of repentance here. The theological climax occurred when Jesus Himself was baptized in this water; the heavens tore open and the Trinity was revealed: the voice of the Father, the Son in the water, and the Spirit descending like a dove."
    },
    "verses": [
      "Jozua 3:17",
      "2 Koningen 5:14",
      "Mattheüs 3:13",
      "Markus 1:9"
    ],
    "eras": [3, 6]
  },
  {
    "id": "damascus",
    "coords": [
      33.511112,
      36.30639
    ],
    "name": {
      "nl": "Damascus",
      "en": "Damascus"
    },
    "region": {
      "nl": "Syrië",
      "en": "Syria"
    },
    "desc": {
      "nl": "Plaats van Paulus' radicale bekering.",
      "en": "Place of Paul's radical conversion."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nDamascus is een van de oudste continu bewoonde steden ter wereld, gelegen in een oase die gevoed wordt door de rivier Barada. In de Romeinse tijd was het een zeer welvarende en cruciale handelsstad (Decapolis-regio).\n\n**Culturele en geografische context**\nGelegen ten noorden van Israël, herbergde de stad een aanzienlijke Joodse populatie met meerdere synagogen. Na de marteldood van Stefanus vluchtten veel christenen hierheen.\n\n**Theologische betekenis**\nDamascus is de plek van misschien wel de meest onverwachte en theologische invloedrijke bekering uit de wereldgeschiedenis. Saulus van Tarsus, ademend van dreiging en moord tegen de kerk, werd net buiten de stadspoorten verblind door het hemelse licht van de verheerlijkte Christus. Van de felste vervolger werd hij de grootste zendeling (de apostel Paulus). Dit illustreert de absolute en onweerstaanbare soevereiniteit van Gods reddende genade.",
      "en": "**Archaeological and historical significance**\nDamascus is one of the oldest continuously inhabited cities in the world, situated in an oasis fed by the Barada River. During the Roman era, it was a highly prosperous and crucial commercial center.\n\n**Cultural and geographical context**\nLocated north of Israel, the city housed a significant Jewish population with multiple synagogues. After the martyrdom of Stephen, many Christians fled here.\n\n**Theological significance**\nDamascus is the site of perhaps the most unexpected and theologically influential conversion in world history. Saul of Tarsus, breathing threats and murder against the church, was blinded just outside the city gates by the heavenly light of the glorified Christ. From the fiercest persecutor, he was transformed into the greatest missionary (the Apostle Paul). This powerfully illustrates the absolute and irresistible sovereignty of God's saving grace."
    },
    "verses": [
      "Genesis 15:2",
      "Handelingen 9:3",
      "Handelingen 22:6",
      "Galaten 1:17"
    ],
    "eras": [4, 7]
  },
  {
    "id": "antioch",
    "coords": [
      36.226691,
      36.171743
    ],
    "name": {
      "nl": "Antiochië",
      "en": "Antioch"
    },
    "region": {
      "nl": "Syrië",
      "en": "Syria"
    },
    "desc": {
      "nl": "Waar volgelingen voor het eerst Christenen werden genoemd.",
      "en": "Where followers were first called Christians."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nAntiochië aan de Orontes was na Rome en Alexandrië de derde grootste en belangrijkste metropool van het Romeinse Rijk. Het was een knooppunt van handel, cultuur en diverse filosofieën.\n\n**Culturele en geografische context**\nDe stad kende een bruisende smeltkroes van culturen. Tot op dat moment werd het evangelie voornamelijk aan Joden verkondigd, maar in Antiochië braken Hellenistische (Griekse) gelovigen door die barrière en plantten de eerste grote, multiculturele gemeente.\n\n**Theologische betekenis**\nAntiochië is theologically het bruggenhoofd voor de wereldwijde zending. Hier werden de discipelen voor het allereerst \"Christenen\" genoemd (Hand. 11:26). De gemeente van Antiochië zond, onder leiding van de Heilige Geest, Paulus en Barnabas uit op hun baanbrekende zendingsreizen naar de heidense wereld. Het representeert de overgang van een lokale Joodse beweging naar een universele, wereldwijde Kerk.",
      "en": "**Archaeological and historical significance**\nAntioch on the Orontes was the third largest and most important metropolis of the Roman Empire, after Rome and Alexandria. It was a major hub of commerce, culture, and diverse philosophies.\n\n**Cultural and geographical context**\nThe city was a vibrant melting pot of cultures. Until that point, the gospel had primarily been preached to Jews, but in Antioch, Hellenistic (Greek) believers broke through that barrier and planted the first major multicultural church.\n\n**Theological significance**\nTheologically, Antioch is the bridgehead for global missions. It was here that the disciples were first called \"Christians\" (Acts 11:26). Driven by the Holy Spirit, the church of Antioch commissioned and sent out Paul and Barnabas on their groundbreaking missionary journeys to the Gentile world. It represents the crucial transition of Christianity from a localized Jewish movement to a universal, worldwide Church."
    },
    "verses": [
      "Handelingen 11:26",
      "Handelingen 13:1",
      "Galaten 2:11"
    ],
    "eras": [7]
  },
  {
    "id": "rome",
    "coords": [
      41.8922,
      12.4852
    ],
    "name": {
      "nl": "Rome",
      "en": "Rome"
    },
    "region": {
      "nl": "Italië",
      "en": "Italy"
    },
    "desc": {
      "nl": "Hoofdstad van het Rijk, bloedbad der martelaren.",
      "en": "Capital of the Empire, bloodshed of martyrs."
    },
    "story": {
      "nl": "**Archeologische en historische betekenis**\nRome, de Stad op de Zeven Heuvelen, was het kloppend hart en de onbetwiste supermacht van de antieke wereld. Keizerlijke fora, het Colosseum en machtige tempels domineerden de horizon.\n\n**Culturele en geografische context**\nAls hoofdstad trok het mensen van over de hele bekende wereld. Ondanks wrede vervolgingen door keizers als Nero, die christenen als levende fakkels gebruikte, groeide de ondergrondse huisgemeente in Rome exponentieel.\n\n**Theologische betekenis**\nRome is de climax van het boek Handelingen. Paulus schreef zijn absolute theologische meesterwerk (de Romeinenbrief) aan deze gemeente. Paulus (als staatsburger onthoofd) en Petrus (ondersteboven gekruisigd) stierven hier allebei de marteldood voor hun Verlosser. Het toont hoe het Koninkrijk van God onstuitbaar is: het kruipt uit de catacomben en overwint uiteindelijk zelfs het bloeddorstige hart van het Romeinse rijk door het bloed van het Lam.",
      "en": "**Archaeological and historical significance**\nRome, the City on Seven Hills, was the beating heart and undisputed superpower of the ancient world. Imperial forums, the Colosseum, and mighty temples dominated its skyline.\n\n**Cultural and geographical context**\nAs the capital, it attracted people from all over the known world. Despite horrific persecutions by emperors like Nero, who used Christians as living torches, the underground house churches in Rome grew exponentially.\n\n**Theological significance**\nRome serves as the dramatic climax to the book of Acts. Paul wrote his absolute theological masterpiece (the Epistle to the Romans) to this church. Both Paul (beheaded as a citizen) and Peter (crucified upside down) died their martyr's death for their Savior here. It stands as the ultimate proof that the Kingdom of God is unstoppable: creeping out from the catacombs, it ultimately conquered even the bloodthirsty heart of the Roman Empire through the blood of the Lamb."
    },
    "verses": [
      "Handelingen 28:14",
      "Romeinen 1:7",
      "Romeinen 1:15",
      "2 Timotheüs 1:17"
    ],
    "eras": [7]
  },
  {
    "id": "sichem",
    "name": {
      "nl": "Sichem",
      "en": "Shechem"
    },
    "region": {
      "nl": "Kanaän",
      "en": "Canaan"
    },
    "coords": [
      32.213611,
      35.281944
    ],
    "eras": [2, 4],
    "desc": {
      "nl": "De plek waar God aan Abraham het land beloofde en waar hij zijn eerste altaar bouwde.",
      "en": "The place where God promised the land to Abraham and where he built his first altar."
    },
    "story": {
      "nl": "Toen Abraham in Kanaän aankwam, was Sichem zijn eerste rustplaats. Hier verscheen de HEER aan hem en zei: 'Aan jouw nageslacht zal Ik dit land geven'. Abraham bouwde er direct een altaar (Gen 12:6-7). Later kocht Jakob hier een stuk land, en de botten van Jozef werden hier uiteindelijk begraven (Jozua 24:32). Nadat Salomo stierf, werd het koninkrijk Israël in Sichem in tweeën gescheurd, waarna het kort diende als de eerste hoofdstad van het noordelijke rijk.",
      "en": "When Abraham arrived in Canaan, Shechem was his first resting place. Here the LORD appeared to him and said, 'To your offspring I will give this land'. Abraham immediately built an altar there (Gen 12:6-7). Later, Jacob bought a plot of land here, and the bones of Joseph were eventually buried here (Joshua 24:32). After Solomon's death, the kingdom of Israel was divided in Shechem, and it briefly served as the first capital of the northern kingdom."
    }
  },
  {
    "id": "bethel",
    "name": {
      "nl": "Bethel",
      "en": "Bethel"
    },
    "region": {
      "nl": "Kanaän",
      "en": "Canaan"
    },
    "coords": [
      31.922778,
      35.241389
    ],
    "eras": [2],
    "desc": {
      "nl": "Huis van God; de plek waar Jakob droomde over de ladder naar de hemel.",
      "en": "House of God; the place where Jacob dreamed of the stairway to heaven."
    },
    "story": {
      "nl": "Op de vlucht voor zijn broer Esau, overnachtte Jakob in de open lucht met een steen als kussen. Hij droomde van een ladder die tot in de hemel reikte, met engelen die op en neer gingen. God beloofde hem daar Zijn zegen. Toen Jakob wakker werd, noemde hij de plek Bethel ('Huis van God') (Gen 28). Eeuwen later, toen het rijk scheurde, plaatste koning Jerobeam hier echter een gouden kalf, wat Bethel een centrum van afgoderij maakte.",
      "en": "Fleeing from his brother Esau, Jacob slept outdoors with a stone for a pillow. He dreamed of a ladder reaching to heaven, with angels ascending and descending. God promised him His blessing there. When Jacob awoke, he named the place Bethel ('House of God') (Gen 28). Centuries later, when the kingdom split, King Jeroboam placed a golden calf here, making Bethel a center of idolatry."
    }
  },
  {
    "id": "pniel",
    "name": {
      "nl": "Pniël",
      "en": "Peniel"
    },
    "region": {
      "nl": "Gilead",
      "en": "Gilead"
    },
    "coords": [
      32.186,
      35.632
    ],
    "eras": [2],
    "desc": {
      "nl": "De doorwaadbare plaats aan de Jabbok waar Jakob worstelde met God.",
      "en": "The ford of the Jabbok where Jacob wrestled with God."
    },
    "story": {
      "nl": "Vlak voordat Jakob na jarenlange ballingschap zijn broer Esau weer zou ontmoeten, bleef hij alleen achter bij de rivier de Jabbok. Een onbekende Man worstelde daar de hele nacht met hem. Jakob liet de Man niet los totdat hij hem zegende. De Man veranderde Jakobs naam in Israël ('hij worstelt met God'). Jakob noemde de plaats Pniël ('Gezicht van God'), want, zei hij, 'ik heb God van aangezicht tot aangezicht gezien en ik heb het overleefd' (Gen 32).",
      "en": "Just before Jacob was to meet his brother Esau after years of exile, he stayed alone at the Jabbok River. An unknown Man wrestled with him there all night. Jacob refused to let the Man go unless He blessed him. The Man changed Jacob's name to Israel ('he struggles with God'). Jacob named the place Peniel ('Face of God'), saying, 'It is because I saw God face to face, and yet my life was spared' (Gen 32)."
    }
  },
  {
    "id": "goshen",
    "name": {
      "nl": "Gosjen",
      "en": "Goshen"
    },
    "region": {
      "nl": "Egypte",
      "en": "Egypt"
    },
    "coords": [
       30.65, 31.75
    ],
    "eras": [2, 3],
    "desc": {
      "nl": "De vruchtbare regio in Egypte waar de Israëlieten eeuwenlang woonden en vermenigvuldigden.",
      "en": "The fertile region in Egypt where the Israelites lived and multiplied for centuries."
    },
    "story": {
      "nl": "Tijdens een wereldwijde hongersnood nodigde Jozef, destijds onderkoning van Egypte, zijn vader Jakob en zijn broers uit om in Egypte te komen wonen. De farao wees hen de regio Gosjen toe, het beste deel van het land in de Nijldelta. Hier leefden zij als schaapherdrs en groeiden uit tot een enorm volk (Gen 47). Toen God later de tien plagen over Egypte bracht, bleef Gosjen vaak gespaard, als bewijs dat God Zijn eigen volk afzonderde en beschermde (Exodus 8:22).",
      "en": "During a global famine, Joseph, then vizier of Egypt, invited his father Jacob and his brothers to live in Egypt. The pharaoh assigned them the region of Goshen, the best part of the land in the Nile delta. Here they lived as shepherds and grew into an enormous nation (Gen 47). When God later brought the ten plagues upon Egypt, Goshen was often spared, demonstrating that God set apart and protected His own people (Exodus 8:22)."
    }
  },
  {
    "id": "kadesh_barnea",
    "name": {
      "nl": "Kades-Barnea",
      "en": "Kadesh-barnea"
    },
    "region": {
      "nl": "Woestijn Paran",
      "en": "Wilderness of Paran"
    },
    "coords": [
      30.648333,
      34.422222
    ],
    "eras": [3],
    "desc": {
      "nl": "De oase waar de twaalf verspieders terugkeerden en Israël weigerde Kanaän in te trekken.",
      "en": "The oasis where the twelve spies returned and Israel refused to enter Canaan."
    },
    "story": {
      "nl": "Kades-Barnea was een enorm belangrijke locatie tijdens de Exodus. Vanaf hier stuurde Mozes twaalf verspieders om het Beloofde Land te verkennen. Tien kwamen terug met een ontmoedigend rapport over reuzen en onneembare steden. Alleen Jozua en Kaleb vertrouwden op God. Omdat het volk in opstand kwam en weigerde het land binnen te trekken, veroordeelde God hen tot 40 jaar zwerven in de woestijn. Kades bleef in die tijd lange tijd hun basiskamp (Numeri 13-14).",
      "en": "Kadesh-barnea was a hugely important location during the Exodus. From here Moses sent twelve spies to explore the Promised Land. Ten returned with a discouraging report about giants and impregnable cities. Only Joshua and Caleb trusted God. Because the people rebelled and refused to enter the land, God condemned them to 40 years of wandering in the wilderness. Kadesh remained their base camp for a long time during those years (Numbers 13-14)."
    }
  },
  {
    "id": "gilgal",
    "name": {
      "nl": "Gilgal",
      "en": "Gilgal"
    },
    "region": {
      "nl": "Kanaän",
      "en": "Canaan"
    },
    "coords": [
      31.881883,
      35.459969
    ],
    "eras": [3],
    "desc": {
      "nl": "Het eerste basiskamp van Jozua na het wonderbaarlijk oversteken van de rivier de Jordaan.",
      "en": "Joshua's first base camp after miraculously crossing the Jordan River."
    },
    "story": {
      "nl": "Na 40 jaar in de woestijn trok een nieuwe generatie Israëlieten eindelijk het Beloofde Land binnen door de Jordaan, die door God werd drooggelegd. Ze sloegen direct hun kamp op in Gilgal. Hier richtte Jozua een monument op van twaalf stenen uit het midden van de rivier, als blijvende herinnering. Ook werden hier alle mannen besneden (de schande van Egypte werd 'afgewenteld') en vierden ze voor het eerst in Kanaän het Pascha (Jozua 4-5).",
      "en": "After 40 years in the desert, a new generation of Israelites finally entered the Promised Land through the Jordan River, which was dried up by God. They immediately set up camp in Gilgal. Here Joshua set up a monument of twelve stones taken from the middle of the river as a lasting memorial. All the men were also circumcised here (the reproach of Egypt was 'rolled away') and they celebrated the Passover for the first time in Canaan (Joshua 4-5)."
    }
  },
  {
    "id": "ai",
    "name": {
      "nl": "Ai",
      "en": "Ai"
    },
    "region": {
      "nl": "Kanaän",
      "en": "Canaan"
    },
    "coords": [
      31.916944,
      35.261111
    ],
    "eras": [3],
    "desc": {
      "nl": "De kleine stad waar Israël een dramatische nederlaag leed vanwege de zonde van Achan.",
      "en": "The small city where Israel suffered a dramatic defeat due to Achan's sin."
    },
    "story": {
      "nl": "Na de miraculeuze overwinning op het machtige Jericho, leek de kleine stad Ai een makkelijke prooi. Maar Israëls aanval liep uit op een pijnlijke en dodelijke nederlaag. De reden was dat een man genaamd Achan heimelijk spullen uit Jericho had buitgemaakt, wat streng verboden was. Pas nadat de zonde werd blootgelegd en weggedaan, hielp God Jozua om Ai via een slimme hinderlaag alsnog in te nemen (Jozua 7-8).",
      "en": "After the miraculous victory over the mighty Jericho, the small city of Ai seemed an easy target. But Israel's attack resulted in a painful and deadly defeat. The reason was that a man named Achan had secretly taken plunder from Jericho, which was strictly forbidden. Only after the sin was exposed and dealt with, did God help Joshua take Ai through a clever ambush (Joshua 7-8)."
    }
  },
  {
    "id": "silo",
    "name": {
      "nl": "Silo",
      "en": "Shiloh"
    },
    "region": {
      "nl": "Efraïm",
      "en": "Ephraim"
    },
    "coords": [
      32.055703,
      35.289536
    ],
    "eras": [3],
    "desc": {
      "nl": "De belangrijkste rustplaats van de Tabernakel en de Ark van het Verbond tijdens de tijd van de Richteren.",
      "en": "The main resting place of the Tabernacle and the Ark of the Covenant during the time of the Judges."
    },
    "story": {
      "nl": "Toen de verovering van Kanaän ver genoeg gevorderd was, werd de Tabernakel met de Ark van het Verbond opgezet in Silo (Jozua 18:1). Eeuwenlang was dit het spirituele centrum van Israël, lang voordat Jeruzalem die rol overnam. Hier bad Hanna om een zoon (Samuël), en hier diende Samuël onder de hogepriester Eli. Uiteindelijk werd de Ark door de Filistijnen buitgemaakt in een veldslag, waarna Silo in verval raakte (1 Sam 1-4).",
      "en": "When the conquest of Canaan was sufficiently advanced, the Tabernacle with the Ark of the Covenant was set up in Shiloh (Joshua 18:1). For centuries this was the spiritual center of Israel, long before Jerusalem took over that role. Here Hannah prayed for a son (Samuel), and here Samuel served under the high priest Eli. Eventually, the Ark was captured by the Philistines in a battle, after which Shiloh fell into decline (1 Sam 1-4)."
    }
  },
  {
    "id": "samaria",
    "name": {
      "nl": "Samaria",
      "en": "Samaria"
    },
    "region": {
      "nl": "Israël (Noord)",
      "en": "Israel (North)"
    },
    "coords": [
      32.276111,
      35.195
    ],
    "eras": [4],
    "desc": {
      "nl": "De machtige maar vaak goddeloze hoofdstad van het Noordelijke tienstammenrijk Israël.",
      "en": "The powerful but often godless capital of the Northern ten-tribe kingdom of Israel."
    },
    "story": {
      "nl": "Nadat het koninkrijk onder Salomo's zoon uiteenviel, werd Samaria uiteindelijk gebouwd als de hoofdstad van het noordelijke rijk (Israël) door koning Omri. Zijn zoon, de beruchte koning Achab, bouwde er een tempel voor Baäl samen met zijn Fenicische vrouw Izebel (1 Koningen 16). Samaria was een rijke, sterk gefortificeerde stad die door profeten als Amos en Hosea hevig werd bekritiseerd vanwege haar afgoderij en sociale onrecht. In 722 v.Chr. werd de stad verwoest door de Assyriërs.",
      "en": "After the kingdom split under Solomon's son, Samaria was eventually built as the capital of the northern kingdom (Israel) by King Omri. His son, the infamous King Ahab, built a temple for Baal there with his Phoenician wife Jezebel (1 Kings 16). Samaria was a wealthy, highly fortified city that was heavily criticized by prophets like Amos and Hosea for its idolatry and social injustice. In 722 BC, the city was destroyed by the Assyrians."
    }
  },
  {
    "id": "carmel",
    "name": {
      "nl": "Karmelberg",
      "en": "Mount Carmel"
    },
    "region": {
      "nl": "Israël",
      "en": "Israel"
    },
    "coords": [
      32.6725,
      35.023333
    ],
    "eras": [4],
    "desc": {
      "nl": "De bergketen waar de profeet Elia de beslissende vuurproef aanging tegen de Baäl-priesters.",
      "en": "The mountain range where the prophet Elijah had the decisive showdown by fire against the prophets of Baal."
    },
    "story": {
      "nl": "Toen koning Achab en Izebel het land hadden overspoeld met afgoderij en droogte, daagde de profeet Elia 450 priesters van Baäl uit op de Karmelberg. Wie met vuur uit de hemel op een altaar zou antwoorden, is de ware God. De Baäl-priesters schreeuwden een halve dag, maar er gebeurde niets. Daarna bad Elia één kort gebed, en vuur van de HERE verteerde niet alleen zijn offer, maar zelfs de stenen en het water in de greppel. Het volk viel op zijn gezicht en riep: 'De HERE is God!' (1 Koningen 18).",
      "en": "When King Ahab and Jezebel had flooded the land with idolatry and drought, the prophet Elijah challenged 450 prophets of Baal on Mount Carmel. The God who answered by fire from heaven on an altar would be the true God. The Baal prophets shouted for half a day, but nothing happened. Then Elijah prayed one short prayer, and fire from the LORD consumed not only his sacrifice, but even the stones and the water in the trench. The people fell prostrate and cried: 'The LORD, He is God!' (1 Kings 18)."
    }
  },
  {
    "id": "megiddo",
    "name": {
      "nl": "Megiddo",
      "en": "Megiddo"
    },
    "region": {
      "nl": "Israël",
      "en": "Israel"
    },
    "coords": [
      32.585278,
      35.184444
    ],
    "eras": [4, 8],
    "desc": {
      "nl": "Een uiterst strategische vestingstad; de Hebreeuwse naam (Har-Megiddo) leidde tot het woord 'Armageddon'.",
      "en": "An extremely strategic fortress city; its Hebrew name (Har-Megiddo) led to the word 'Armageddon'."
    },
    "story": {
      "nl": "Megiddo lag op het belangrijkste kruispunt van internationale handelsroutes in de antieke wereld. Wie Megiddo had, beheerste de vallei. Salomo bouwde het uit tot een indrukwekkende vestingstad en stalde er zijn strijdwagens (1 Koningen 9:15). Vele bloedige veldslagen werden hier uitgevochten, waaronder die waarbij de goede koning Josia tragisch sneuvelde. Vanwege dit verleden van beslissende oorlogen, gebruikt het boek Openbaring de naam Harmagedon (Berg Megiddo) als symbool voor de eindstrijd (Openbaring 16:16).",
      "en": "Megiddo was located at the most important crossroads of international trade routes in the ancient world. Whoever held Megiddo controlled the valley. Solomon expanded it into an impressive fortress city and stationed his chariots there (1 Kings 9:15). Many bloody battles were fought here, including the one where the good King Josiah tragically died. Because of this history of decisive wars, the book of Revelation uses the name Armageddon (Mount Megiddo) as a symbol for the final battle (Revelation 16:16)."
    }
  },
  {
    "id": "dan",
    "name": {
      "nl": "Dan",
      "en": "Dan"
    },
    "region": {
      "nl": "Israël (Noord)",
      "en": "Israel (North)"
    },
    "coords": [
      33.249,
      35.652
    ],
    "eras": [4],
    "desc": {
      "nl": "De noordelijkste grensplaats van Israël, berucht vanwege het gouden kalf van koning Jerobeam.",
      "en": "The northernmost border town of Israel, infamous for King Jeroboam's golden calf."
    },
    "story": {
      "nl": "Dan fungeerde altijd als de uiterste noordgrens (vandaar de uitdrukking 'van Dan tot Berseba'). Na de scheuring van het koninkrijk was koning Jerobeam van het noordelijke rijk bang dat zijn volk naar Jeruzalem (in het zuiden) zou blijven gaan om te aanbidden. Om dit te stoppen, maakte hij twee gouden kalveren en plaatste er één in Bethel en één hier, in Dan. Dit leidde het noordelijke rijk direct in diepe en aanhoudende afgoderij (1 Koningen 12).",
      "en": "Dan always served as the extreme northern border (hence the phrase 'from Dan to Beersheba'). After the split of the kingdom, King Jeroboam of the northern realm feared his people would keep going to Jerusalem (in the south) to worship. To stop this, he made two golden calves and placed one in Bethel and one here, in Dan. This immediately led the northern kingdom into deep and continuous idolatry (1 Kings 12)."
    }
  },
  {
    "id": "joppa",
    "name": {
      "nl": "Joppa (Jaffa)",
      "en": "Joppa (Jaffa)"
    },
    "region": {
      "nl": "Kustvlakte",
      "en": "Coastal Plain"
    },
    "coords": [
      32.054481,
      34.753039
    ],
    "eras": [4, 7],
    "desc": {
      "nl": "De belangrijke havenstad van waaruit Jona vluchtte, en waar Petrus Tabitha uit de dood opwekte.",
      "en": "The important port city from which Jonah fled, and where Peter raised Tabitha from the dead."
    },
    "story": {
      "nl": "Joppa (het moderne Jaffa) was in Bijbelse tijden de belangrijkste zeehaven van Israël. Hier werden de grote cederbomen uit Libanon aangevoerd voor de bouw van Salomo's Tempel. Jaren later was dit de stad waar de profeet Jona op een schip naar Tarsis vluchtte toen God hem naar Ninevé stuurde. In het Nieuwe Testament was Joppa de plek waar de apostel Petrus het meisje Tabitha opwekte uit de dood en een visioen op het dak kreeg over 'onreine' dieren, wat de zending naar de heidenen opende (Handelingen 9-10).",
      "en": "Joppa (modern Jaffa) was Israel's main seaport in biblical times. Here the great cedar trees from Lebanon were brought in for the construction of Solomon's Temple. Years later, this was the city where the prophet Jonah fled onto a ship to Tarshish when God sent him to Nineveh. In the New Testament, Joppa was where the apostle Peter raised the girl Tabitha from the dead and received a vision on a rooftop about 'unclean' animals, opening missions to the Gentiles (Acts 9-10)."
    }
  },
  {
    "id": "susa",
    "name": {
      "nl": "Susan (Susa)",
      "en": "Susa"
    },
    "region": {
      "nl": "Perzië (Elam)",
      "en": "Persia (Elam)"
    },
    "coords": [
      32.18922,
      48.25778
    ],
    "eras": [5, 6],
    "desc": {
      "nl": "De schitterende Perzische hoofdstad en het toneel van de boeken Esther, Nehemia en Daniël.",
      "en": "The magnificent Persian capital and the setting of the books of Esther, Nehemiah, and Daniel."
    },
    "story": {
      "nl": "Na de val van Babylon werd Susan de imposante winterhoofdstad van het gigantische Perzische Rijk. Het Bijbelboek Esther speelt zich volledig af in de citadel van Susan, waar het Joodse weesmeisje Esther koningin werd en haar volk redde van genocide. Ook Nehemia diende hier als schenker van de koning voordat hij terugkeerde om de muren van Jeruzalem te herbouwen. Daniël ontving een van zijn belangrijke profetische visioenen nabij deze vestingstad (Daniël 8:2).",
      "en": "After the fall of Babylon, Susa became the imposing winter capital of the massive Persian Empire. The biblical book of Esther is set entirely in the citadel of Susa, where the Jewish orphan girl Esther became queen and saved her people from genocide. Nehemiah also served here as cupbearer to the king before returning to rebuild the walls of Jerusalem. Daniel received one of his major prophetic visions near this fortress city (Daniel 8:2)."
    }
  },
  {
    "id": "cana",
    "name": {
      "nl": "Kana",
      "en": "Cana"
    },
    "region": {
      "nl": "Galilea",
      "en": "Galilee"
    },
    "coords": [
      32.8222,
      35.30269
    ],
    "eras": [6],
    "desc": {
      "nl": "Een dorp in Galilea waar Jezus Zijn eerste grote wonder deed tijdens een bruiloftsfeest.",
      "en": "A village in Galilee where Jesus performed His first great miracle during a wedding feast."
    },
    "story": {
      "nl": "Tijdens een bruiloftsfeest in Kana, waar ook Maria, de moeder van Jezus, te gast was, raakte de wijn op - een enorme sociale blamage. Op aandringen van zijn moeder deed Jezus hier Zijn allereerste publieke wonder. Hij veranderde meer dan 600 liter water dat in reinigingsvaten zat in wijn van absolute topkwaliteit. De Bijbel zegt: 'Dit heeft Jezus gedaan als begin van zijn tekenen... en zijn leerlingen gingen in hem geloven' (Johannes 2).",
      "en": "During a wedding feast in Cana, where Mary, the mother of Jesus, was also a guest, the wine ran out - a massive social disgrace. At his mother's prompting, Jesus performed His very first public miracle here. He turned over 150 gallons of water stored in purification jars into wine of absolute top quality. The Bible says: 'What Jesus did here... was the first of the signs through which he revealed his glory; and his disciples believed in him' (John 2)."
    }
  },
  {
    "id": "caesarea_philippi",
    "name": {
      "nl": "Caesarea Filippi",
      "en": "Caesarea Philippi"
    },
    "region": {
      "nl": "Hermon",
      "en": "Hermon"
    },
    "coords": [
      33.246111,
      35.693333
    ],
    "eras": [6],
    "desc": {
      "nl": "De noordelijke stad aan de voet van de Hermon, gedomineerd door heidense tempels, waar Petrus Jezus erkende als de Christus.",
      "en": "The northern city at the foot of Hermon, dominated by pagan temples, where Peter confessed Jesus as the Christ."
    },
    "story": {
      "nl": "Caesarea Filippi was een centrum van afgoderij. Er stond een enorme tempel voor de Griekse god Pan, gebouwd voor een diepe, donkere grot die men de 'Poort van de Onderwereld' noemde. Juist op deze heidense plek vroeg Jezus aan zijn discipelen: 'Wie zeggen jullie dat Ik ben?'. Petrus antwoordde: 'U bent de Christus, de Zoon van de levende God'. Jezus beloofde daarop Zijn kerk te bouwen op die rots, en dat de 'poorten van het dodenrijk' haar niet zouden overweldigen (Mattheüs 16).",
      "en": "Caesarea Philippi was a center of idolatry. There was a massive temple to the Greek god Pan, built in front of a deep, dark cave that people called the 'Gate of Hades'. Right in this pagan place, Jesus asked his disciples, 'Who do you say I am?'. Peter answered, 'You are the Messiah, the Son of the living God'. Jesus then promised to build His church on that rock, and that the 'gates of Hades' would not overcome it (Matthew 16)."
    }
  },
  {
    "id": "bethany",
    "name": {
      "nl": "Bethanië",
      "en": "Bethany"
    },
    "region": {
      "nl": "Judea",
      "en": "Judea"
    },
    "coords": [
      31.771661,
      35.255903
    ],
    "eras": [6],
    "desc": {
      "nl": "Het dorp net buiten Jeruzalem waar Jezus' vrienden Maria, Martha en Lazarus woonden.",
      "en": "The village just outside Jerusalem where Jesus' friends Mary, Martha, and Lazarus lived."
    },
    "story": {
      "nl": "Bethanië was een vertrouwde uitvalsbasis voor Jezus wanneer Hij in de buurt van Jeruzalem was. Het was de woonplaats van Maria, Martha en hun broer Lazarus. Toen Lazarus ziek werd en stierf, kwam Jezus pas vier dagen later aan, en weende met de zussen (de kortste tekst in de Bijbel: 'Jezus weende'). Vervolgens riep Hij Lazarus levend uit het rotsgraf, een wonder dat het Sanhedrin ertoe dreef om de doodstraf over Jezus te eisen (Johannes 11). Vanaf de Olijfberg vlakbij Bethanië voer Jezus later op naar de hemel.",
      "en": "Bethany was a familiar base for Jesus whenever He was near Jerusalem. It was the hometown of Mary, Martha, and their brother Lazarus. When Lazarus fell ill and died, Jesus arrived four days later, weeping with the sisters (the shortest verse in the Bible: 'Jesus wept'). He then called Lazarus alive out of the rock tomb, a miracle that drove the Sanhedrin to demand the death penalty for Jesus (John 11). Later, from the Mount of Olives near Bethany, Jesus ascended into heaven."
    }
  },
  {
    "id": "caesarea",
    "name": {
      "nl": "Caesarea",
      "en": "Caesarea Maritima"
    },
    "region": {
      "nl": "Judea (Kust)",
      "en": "Judea (Coast)"
    },
    "coords": [
      32.5,
      34.891667
    ],
    "eras": [6, 7],
    "desc": {
      "nl": "De machtige Romeinse hoofdstad van Judea, gebouwd door Herodes de Grote.",
      "en": "The mighty Roman capital of Judea, built by Herod the Great."
    },
    "story": {
      "nl": "Caesarea was het bestuurlijke en militaire centrum van de Romeinen in Israël; hier woonde ook Pontius Pilatus. Een Romeinse centurio in deze stad, Cornelius, kreeg een visioen om Petrus te laten halen. Toen Petrus het evangelie bracht, viel de Heilige Geest op de Romeinen – het beslissende moment waarop het christendom officieel voor de heidenen openging (Handelingen 10). Jaren later zat de apostel Paulus hier twee jaar lang als politiek gevangene opgesloten voordat hij zich op de keizer in Rome beriep.",
      "en": "Caesarea was the administrative and military center for the Romans in Israel; Pontius Pilate also resided here. A Roman centurion in this city, Cornelius, received a vision to send for Peter. When Peter preached the gospel, the Holy Spirit fell upon the Romans - the decisive moment when Christianity officially opened to the Gentiles (Acts 10). Years later, the apostle Paul was imprisoned here as a political prisoner for two years before appealing to Caesar in Rome."
    }
  },
  {
    "id": "ephesus",
    "name": {
      "nl": "Efeze",
      "en": "Ephesus"
    },
    "region": {
      "nl": "Klein-Azië",
      "en": "Asia Minor"
    },
    "coords": [
      37.939125,
      27.3407
    ],
    "eras": [7],
    "desc": {
      "nl": "Een gigantische Romeinse metropool, beroemd om haar Artemistempel, waar Paulus jarenlang met succes preekte.",
      "en": "A massive Roman metropolis, famous for its Temple of Artemis, where Paul preached successfully for years."
    },
    "story": {
      "nl": "Efeze was een van de grootste steden in de oudheid en huisvestte de Tempel van Artemis (een van de zeven wereldwonderen). Paulus verbleef hier bijna drie jaar; zijn zending was zó succesvol dat het evangelie zich door heel Klein-Azië verspreidde en de magie-industrie in elkaar stortte. Dit leidde tot een massale en gewelddadige opstand van zilversmeden in het grote amfitheater (Handelingen 19). Paulus schreef later de 'Efezebrief' aan deze sterk gegroeide kerk.",
      "en": "Ephesus was one of the largest cities in antiquity and housed the Temple of Artemis (one of the seven wonders of the world). Paul stayed here for nearly three years; his mission was so successful that the gospel spread throughout Asia Minor and the magic industry collapsed. This led to a massive and violent riot by silversmiths in the great amphitheater (Acts 19). Paul later wrote the 'Epistle to the Ephesians' to this rapidly growing church."
    }
  },
  {
    "id": "corinth",
    "name": {
      "nl": "Korinthe",
      "en": "Corinth"
    },
    "region": {
      "nl": "Achaia (Griekenland)",
      "en": "Achaea (Greece)"
    },
    "coords": [
      37.905785,
      22.878741
    ],
    "eras": [7],
    "desc": {
      "nl": "Een welvarende, zedeloze handelsstad waar Paulus een van zijn belangrijkste, maar meest complexe gemeentes stichtte.",
      "en": "A wealthy, immoral trade city where Paul founded one of his most important but most complex churches."
    },
    "story": {
      "nl": "Korinthe was een knooppunt van wereldhandel, berucht om haar extreme rijkdom, heidense tempels en losbandigheid. Paulus verbleef er maar liefst anderhalf jaar, verdiende er zijn brood als tentenmaker samen met Priscilla en Aquila, en zag een grote kerk ontstaan ondanks zware oppositie (Handelingen 18). De gemeente in Korinthe worstelde echter met veel problemen (zoals verdeeldheid en zedeloosheid), wat Paulus ertoe bracht de zeer persoonlijke en theologische 1e en 2e Korinthe-brieven te schrijven.",
      "en": "Corinth was a hub of world trade, notorious for its extreme wealth, pagan temples, and debauchery. Paul stayed there for a full year and a half, working as a tentmaker with Priscilla and Aquila, and saw a large church emerge despite heavy opposition (Acts 18). The church in Corinth struggled with many problems, however (such as division and immorality), which prompted Paul to write the highly personal and theological 1st and 2nd Corinthian epistles."
    }
  },
  {
    "id": "athens",
    "name": {
      "nl": "Athene",
      "en": "Athens"
    },
    "region": {
      "nl": "Achaia (Griekenland)",
      "en": "Achaea (Greece)"
    },
    "coords": [
      37.971851,
      23.726738
    ],
    "eras": [7],
    "desc": {
      "nl": "Het centrum van de Griekse filosofie, waar Paulus een meesterlijke toespraak hield over de 'Onbekende God'.",
      "en": "The center of Greek philosophy, where Paul delivered a masterful speech about the 'Unknown God'."
    },
    "story": {
      "nl": "Toen Paulus wachtte op zijn medewerkers in Athene, ergerde hij zich kapot aan de stad, die letterlijk vol stond met afgodsbeelden. Hij raakte in debat met Stoïcijnse en Epicurische filosofen. Ze brachten hem naar de Areopagus (de rots van Ares), het intellectuele hart van de stad. Daar hield Paulus een briljante redevoering waarin hij inspeelde op een lokaal altaar voor 'Een Onbekende God'. Hij legde de opstanding van Jezus uit; sommigen spotten, maar anderen kwamen tot geloof (Handelingen 17).",
      "en": "While waiting for his companions in Athens, Paul was greatly distressed to see that the city was full of idols. He engaged in debate with Stoic and Epicurean philosophers. They brought him to the Areopagus, the intellectual heart of the city. There Paul delivered a brilliant speech, using a local altar to 'An Unknown God' as his starting point. He explained the resurrection of Jesus; some sneered, but others believed (Acts 17)."
    }
  },
  {
    "id": "patmos",
    "name": {
      "nl": "Patmos",
      "en": "Patmos"
    },
    "region": {
      "nl": "Egeïsche Zee",
      "en": "Aegean Sea"
    },
    "coords": [
      37.325,
      26.541667
    ],
    "eras": [7],
    "desc": {
      "nl": "Het ruwe gevangeniseiland waar de apostel Johannes verbleef en het boek Openbaring ontving.",
      "en": "The rugged prison island where the apostle John stayed and received the book of Revelation."
    },
    "story": {
      "nl": "Aan het einde van de eerste eeuw, vermoedelijk onder de vervolgingen van de Romeinse keizer Domitianus, werd de oude apostel Johannes als gevangene verbannen naar het eiland Patmos. 'Op de dag van de Heer' raakte hij in vervoering door de Geest en ontving hij visioenen van de opgestane, verheerlijkte Jezus. Hij kreeg de opdracht deze profetische beelden over de eindtijd en de terugkeer van Christus op te schrijven voor zeven gemeenten. Dit indrukwekkende verslag kennen we nu als het laatste boek van de Bijbel: de Openbaring van Johannes.",
      "en": "At the end of the first century, presumably under the persecutions of the Roman emperor Domitian, the elderly apostle John was exiled as a prisoner to the island of Patmos. 'On the Lord's Day' he was caught up in the Spirit and received visions of the resurrected, glorified Jesus. He was instructed to write down these prophetic images about the end times and the return of Christ for seven churches. This impressive account is now known as the final book of the Bible: the Revelation to John."
    }
  }
];

export default CONTEXT_PLACES;
