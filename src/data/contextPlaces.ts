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
      id: "promised_land",
      coords: [32.766667, 35.333333],
      name: { nl: "Het Beloofde Land", en: "The Promised Land" },
      region: { nl: "Kanaän", en: "Canaan" },
      desc: { nl: "Het land dat God aan Abraham en zijn nageslacht beloofde.", en: "The land promised by God to Abraham and his descendants." },
      story: {
        nl: `**Geografische en historische context**
Het kerngebied van het Beloofde Land ligt geografisch strategisch tussen de Middellandse Zee (westen) en de Jordaanvallei, begrensd door de Syrische woestijn in het oosten, het Libanongebergte in het noorden en de Negev-woestijn in het zuiden. Historisch en geografisch omvat dit gebied het huidige Israël, de Palestijnse gebieden, en grote delen van Jordanië, Libanon en Syrië. Omdat het fungeerde als enige landbrug tussen de twee grootmachten van de oudheid (Egypte en Mesopotamië), had het een immense economische en militaire waarde.

**De grenzen van de belofte**
De exacte geografische grenzen van het land verschillen per bijbelboek en periode. In Genesis 15:18 krijgt Abraham de "brede definitie" (de landbelofte) toegezegd: een enorm uitgestrekt gebied vanaf de "Rivier van Egypte" (waarschijnlijk de Wadi El-Arish in het Sinaï-schiereiland) tot aan de Eufraat (in het huidige Syrië/Irak). Later, in Numeri 34, wanneer het volk Kanaän daadwerkelijk gaat verdelen, krijgen zij de "specifieke grenzen" toegewezen: een compacter gebied met in het zuiden de Zin-woestijn, in het westen de Middellandse Zee, in het noorden de berg Hor, en in het oosten de rivier de Jordaan (hoewel er later gebieden ten oosten van de Jordaan aan werden toegevoegd).

**Theologische betekenis**
Het Beloofde Land is veel meer dan een stuk geografisch onroerend goed; het is het tastbare bewijs van Gods onwankelbare verbondstrouw aan Abraham, Isaäk en Jakob. God gaf dit specifieke, kwetsbare land (volledig afhankelijk van regen, in tegenstelling tot Egypte) zodat Zijn volk in dagelijkse afhankelijkheid van Hem zou leven. Het is bedoeld als een 'licht voor de volken' en wijst in het Nieuwe Testament (bijv. Hebreeën 4) vooruit naar de eeuwige rust en de herstelde schepping.`,
        en: `**Archaeological and historical significance**
The Promised Land sits strategically between the Mediterranean Sea and the vast deserts to the east. It forms the primary land bridge connecting Africa, Asia, and Europe, making it one of the most contested and historically rich regions in antiquity.

**Cultural and geographical context**
Known variously as Canaan, Israel, and Palestine, it is a land of immense geographical diversity, featuring fertile plains, rugged mountains, and the lowest point on earth (the Dead Sea). It was described by God as a land "flowing with milk and honey", indicating rich agricultural potential and divine provision.

**Theological significance**
The Promised Land is the geographic center of biblical theology. It was sworn by covenant to Abraham, Isaac, and Jacob as an everlasting inheritance. Theologically, it represents rest, divine inheritance, and the kingdom of God on earth. Its possession was strictly tied to Israel's faithfulness to the covenant; disobedience led to exile, while repentance promised return. Ultimately, it foreshadows the new creation and the eternal rest promised to all believers in Christ.`
      },
      verses: ["Genesis 15:18", "Numeri 34:1", "Jozua 1:4"]
    },
    { 
      id: "jerusalem", 
      coords: [31.776667, 35.234167], 
      name: { nl: "Jeruzalem", en: "Jerusalem" }, 
      region: { nl: "Juda", en: "Judah" }, 
      desc: { nl: "De heilige stad en hoofdstad van Israël.", en: "The holy city and capital of Israel." },
      story: {
        nl: `**Archeologische en historische betekenis**\nJeruzalem ligt op een verdedigbare heuvelrug in het Judese hoogland, met archeologische bewijzen van bewoning die dateren uit de vroege bronstijd, hoewel de stad pas echt tot bloei kwam tijdens de IJzertijd II (10e-8e eeuw v.Chr.). De Gihonbron zorgde voor essentiële watervoorziening, waardoor de locatie strategisch waardevol was; opgravingen hebben vestingwerken en administratieve structuren uit de tijd van David en de latere monarchie aan het licht gebracht, wat de rol van Jeruzalem als belangrijk administratief centrum in het oude Juda bevestigt.\n\n**Culturele en geografische context**\nJeruzalem, gelegen op een hoogte van ongeveer 760 meter in het centrale heuvelland, beheerste cruciale handelsroutes tussen de kustgebieden en de Jordaanvallei, waardoor het gedurende de Bijbelse periode economisch en militair van groot belang was. De natuurlijke verdedigingskracht van de stad door valleien aan drie zijden (de Kidronvallei, de Hinnomvallei en de Tyropoeonvallei) maakte haar vrijwel onneembaar voor een directe aanval. Dit verklaart waarom het een Jebusitisch bolwerk bleef tot de verovering door David en waarom het de gekozen hoofdstad werd van de verenigde monarchie.\n\n**Theologische betekenis**\nJeruzalem komt in het boek Jozua naar voren als een van de vijf Amorietische koningen die in de zuidelijke veldtocht werden verslagen, waarmee het wordt gevestigd als een veroverde, maar aanvankelijk niet-veroverde stad binnen Israëls territoriale aanspraken. De theologische betekenis van de stad neemt toe wanneer David haar verovert en vestigt als Israëls politieke en religieuze hoofdstad. Het wordt uiteindelijk de locatie van Salomo's Tempel en het middelpunt van de verbondsaanbidding – een status die Jeruzalem in de hele Schrift verheft tot de woonplaats van Gods aanwezigheid en het symbool van Zijn koninkrijk op aarde.`,
        en: `**Archaeological and historical significance**
Jerusalem sits on a defensible ridge in the Judean highlands. Since King David captured it from the Jebusites around 1000 BC, it has been the political and religious epicenter of Israel. Archaeological digs continually reveal its massive ancient walls, water systems, and temple foundations.

**Cultural and geographical context**
Positioned off the main international trade routes, Jerusalem's significance was entirely theological and political rather than economic. It is surrounded by deep valleys (Kidron and Hinnom), making it a natural fortress. Mount Moriah, where Abraham bound Isaac, became the site of Solomon's magnificent Temple.

**Theological significance**
Jerusalem is the "City of the Great King" and the earthly dwelling place of God's name. It is the site of the crucifixion, resurrection, and ascension of Jesus Christ, and the birthplace of the Church at Pentecost. Prophetically, it is the focal point of end-time events and the namesake of the eternal New Jerusalem, representing the ultimate dwelling of God with His people.`
      },
      verses: ["Jozua 10:1", "2 Samuël 5:6", "1 Koningen 8:1", "Psalm 122:1", "Zacharia 8:3", "Mattheüs 23:37", "Openbaring 21:2"]
    },
    {
      id: "rephidim",
      coords: [28.623056, 33.880278],
      name: { nl: "Rafidim", en: "Rephidim" },
      region: { nl: "Sinaï", en: "Sinai" },
      desc: { nl: "De rustplaats waar water uit de rots stroomde en Amalek werd verslagen.", en: "The resting place where water flowed from the rock and Amalek was defeated." },
      story: {
        nl: `**Archeologische en historische betekenis**\nDe exacte locatie van Rafidim is niet met zekerheid vastgesteld, maar historisch wordt het vaak geïdentificeerd met Wadi Feiran, een weelderige oase in het zuidwesten van het Sinaï-schiereiland. Archeologische vondsten tonen aan dat dit gebied al vroeg bewoond werd en diende als een belangrijke doorgangsroute. Het was een logische rustplaats voor nomaden en reizigers, wat verklaart waarom de Amalekieten, een lokaal nomadenvolk, dit gebied fel verdedigden tegen de doortrekkende Israëlieten.\n\n**Culturele en geografische context**\nGeografisch was Rafidim de laatste grote rustplaats voordat het volk Israël de berg Sinaï bereikte. De afwezigheid van water bij hun aankomst zorgde voor een crisis in het genadeloze woestijnklimaat. Cultureel markeert dit moment de eerste georganiseerde militaire strijd van het pas bevrijde volk; Jozua leidde de troepen in het dal, terwijl Mozes, Aäron en Hur de strijd vanaf de heuvel geestelijk ondersteunden.\n\n**Theologische betekenis**\nTheologisch is Rafidim zeer rijk. Ten eerste het water uit de rots: toen het volk murmureerde, beval God Mozes om op de rots (Horeb) te slaan. De apostel Paulus identificeert deze geslagen rots later met Christus (1 Korinthe 10:4), die levend water geeft nadat Hij geslagen is. Ten tweede de strijd tegen Amalek: dit illustreert de voortdurende geestelijke strijd. De overwinning werd niet behaald door eigen kracht of militaire genialiteit, maar door de opgeheven handen van Mozes, een beeld van aanhoudend gebed en Christus' onophoudelijke voorspraak. Als gedenkteken bouwde Mozes daar een altaar: "De HEERE is mijn Banier" (Jehova-Nissi).`,
        en: `**Archaeological and historical significance**
Rephidim's exact location is debated, but it was a crucial encampment in the Sinai Peninsula during the Israelites' exodus journey toward Mount Sinai.

**Cultural and geographical context**
It was a harsh, arid desert location where the Israelites found no water to drink, leading to severe murmuring and rebellion against Moses and God. It was also the site of the first unprovoked military attack on Israel by the Amalekites.

**Theological significance**
Rephidim stands as a profound testament to divine provision and intercession. God instructed Moses to strike the rock at Horeb, from which life-giving water flowed—a rock that the Apostle Paul identifies spiritually as Christ, who was struck for our salvation (1 Cor. 10:4). During the battle with Amalek, victory was secured only as long as Moses' hands were held up in prayer, illustrating the necessity of spiritual intercession in the warfare of faith.`
      },
      verses: ["Exodus 17:1", "Exodus 17:8", "Numeri 33:14", "1 Korinthe 10:4"]
    },
    {
      id: "rameses",
      coords: [30.79937, 31.834217],
      name: { nl: "Rameses (Gosen)", en: "Rameses (Goshen)" },
      region: { nl: "Egypte", en: "Egypt" },
      desc: { nl: "Startpunt van de Exodus.", en: "Starting point of the Exodus." },
      story: {
        nl: `**Archeologische en historische betekenis**\nRameses (of Pi-Ramesse) was een van de belangrijkste voorraadsteden die door de Israëlitische slaven voor de farao werd gebouwd. Archeologische opgravingen in de oostelijke Nijldelta hebben de restanten van deze enorme stad blootgelegd, wat de enorme bouwprojecten van Farao Ramses II bevestigt.\n\n**Culturele en geografische context**\nGelegen in het vruchtbare land Gosen, was dit de plek waar de Israëlieten zich tijdens de hongersnood onder Jozef hadden gevestigd. Het fungeerde als het verzamelpunt voor de honderdduizenden Israëlieten op de nacht van de uittocht, net na de tiende plaag.\n\n**Theologische betekenis**\nRameses staat symbool voor de ultieme onderdrukking door de wereld (Egypte) en het vertrekpunt van Gods verlossing. Het herinnert eraan dat God Zijn volk uitleidt uit het huis der dienstbaarheid om hen te brengen naar de beloofde rust.`,
        en: `**Archaeological and historical significance**
Rameses was a major store city built by the forced labor of the Israelite slaves. It is widely identified with Pi-Ramesses (Qantir), the grand capital built by Pharaoh Ramesses II in the fertile eastern Nile Delta.

**Cultural and geographical context**
Located in the land of Goshen, this region was given to Joseph's family centuries earlier because its rich pastureland was ideal for shepherds (an occupation despised by the Egyptians). Here, the Israelites multiplied greatly, transitioning from a small family clan into a mighty nation.

**Theological significance**
Rameses represents the house of bondage and the starting point of divine redemption. The Exodus began here on the morning after the first Passover. The preservation of the Israelites in Goshen during the plagues vividly demonstrated God's ability to distinguish and protect His chosen people amidst global judgment.`
      },
      verses: ["Exodus 1:11", "Exodus 12:37", "Numeri 33:3"]
    },
    {
      id: "succoth",
      coords: [32.1966, 35.62118],
      name: { nl: "Sukkoth", en: "Succoth" },
      region: { nl: "Egypte", en: "Egypt" },
      desc: { nl: "De eerste pleisterplaats na Rameses.", en: "The first encampment after Rameses." },
      story: {
        nl: `**Archeologische en historische betekenis**\nSukkoth was waarschijnlijk een Egyptische grensstad of militaire buitenpost aan de rand van de Wadi Tumilat. Historici geloven dat het diende als een verzamelplaats voor reizigers die Egypte verlieten of binnenkwamen.\n\n**Culturele en geografische context**\nDe naam Sukkoth betekent "loofhutten" of "tenten". Het was de allereerste pleisterplaats voor de Israëlieten na hun haastige vertrek uit Rameses. Hier sloegen zij voor het eerst als een bevrijd volk, en niet als slaven, hun tenten op.\n\n**Theologische betekenis**\nSukkoth herinnert theologisch aan de pelgrimsreis van de gelovige. God stelde later het Loofhuttenfeest (Sukkot) in om het volk er jaarlijks aan te herinneren dat Hij hen in hutten liet wonen toen Hij hen uit Egypte leidde (Leviticus 23:42-43).`,
        en: `**Archaeological and historical significance**
Succoth was likely an Egyptian border town or a military staging area just outside the main population centers of the Nile Delta. It served as the very first encampment for the Israelites after departing Rameses.

**Cultural and geographical context**
The name Succoth means "booths" or "tents," highlighting the sudden transition of the Israelites from settled slaves in stone cities to wandering pilgrims living in temporary shelters.

**Theological significance**
Succoth marks the definitive break from Egyptian slavery and the beginning of the wilderness journey. It is here that God instituted the command to commemorate the Exodus and consecrate the firstborn (Exodus 13). It symbolizes the believer's departure from the bondage of sin into a life of faith, dependent entirely on God's guidance, visibly manifested for the first time here as the pillar of cloud and fire.`
      },
      verses: ["Exodus 12:37", "Exodus 13:20", "Numeri 33:5"]
    },
    {
      id: "etham",
      coords: [30.5475, 31.963611],
      name: { nl: "Etham", en: "Etham" },
      region: { nl: "Woestijn", en: "Wilderness" },
      desc: { nl: "Aan de rand van de woestijn.", en: "On the edge of the wilderness." },
      story: {
        nl: `**Archeologische en historische betekenis**\nEtham markeerde de uiterste grens van de bewoonde wereld aan de Egyptische grens, vlakbij de vestingwerken die Egypte beschermden tegen indringers uit de woestijn.\n\n**Culturele en geografische context**\nEtham lag "aan de rand van de woestijn". Vanaf hier betrad het volk de onherbergzame wildernis waar overleving zonder goddelijke ingreep onmogelijk was.\n\n**Theologische betekenis**\nBij Etham ging God voor het eerst expliciet voor hen uit in een wolkkolom overdag en een vuurkolom 's nachts. Dit benadrukt dat wanneer we de grens van de 'veilige' wereld passeren en de wildernis betreden, Gods zichtbare leiding en aanwezigheid ons leiden en beschermen.`,
        en: `**Archaeological and historical significance**
Etham marked the absolute edge of the inhabited world and the boundary of the Egyptian wilderness. Its exact location is lost, but it represented the point of no return for the fleeing Israelites.

**Cultural and geographical context**
Situated "on the edge of the wilderness," Etham was where the harsh, unforgiving desert truly began. Under normal circumstances, travelers would follow established, guarded trade routes, but God deliberately led them off the beaten path.

**Theological significance**
At Etham, God commanded a seemingly illogical maneuver: to turn back and camp before Pi-hahiroth, trapping themselves against the sea. This divine detour was purposefully designed to harden Pharaoh's heart and to create an inescapable crisis where Israel's only hope would be the miraculous deliverance of the Lord, proving that salvation is entirely of God and not of human strategy.`
      },
      verses: ["Exodus 13:20", "Numeri 33:6"]
    },
    {
      id: "baal_zephon",
      coords: [30.860556, 32.171389],
      name: { nl: "Baäl-Zefon", en: "Baal-Zephon" },
      region: { nl: "Egypte", en: "Egypt" },
      desc: { nl: "Plaats aan de overkant van Pi-Hachiroth.", en: "Place opposite Pi-Hahiroth." },
      story: {
        nl: `**Archeologische en historische betekenis**\nBaäl-Zefon wordt geassocieerd met een heiligdom voor een Kanaänitische of Fenicische weergod (Baäl van het Noorden). Het diende waarschijnlijk als een baken voor zeevaarders nabij het huidige Suezkanaal of het Bardawil-meer.\n\n**Culturele en geografische context**\nGod beval Israël om "om te keren" en zich te legeren tegenover Baäl-Zefon, direct aan zee. Dit was strategisch gezien een valstrik: ze zaten klem tussen de zee, de wildernis en het heiligdom van de Egyptische/Kanaänitische god.\n\n**Theologische betekenis**\nDe keuze voor deze specifieke locatie was een goddelijke uitdaging. God toonde niet alleen Zijn heerschappij over Farao, maar ook dat de afgod Baäl-Zefon machteloos was. Hier spleet God de Rode Zee, wat Zijn absolute soevereiniteit over de natuurmachten (die aan Baäl werden toegeschreven) bewijst.`,
        en: `**Archaeological and historical significance**
Baal-Zephon is associated with a sanctuary dedicated to a Canaanite or Egyptian deity, likely located near the northern end of the Gulf of Suez or the Bitter Lakes.

**Cultural and geographical context**
It was a prominent landmark near the Red Sea crossing. By commanding Israel to camp opposite a pagan shrine, the ensuing miracle served as a direct affront to the regional gods of Egypt, demonstrating their absolute powerlessness.

**Theological significance**
Trapped between the impassable sea, the mountains, and Pharaoh's advancing chariots at Baal-Zephon, Israel experienced the ultimate test of faith. The resulting parting of the Red Sea is the paramount redemptive event of the Old Testament. It prefigures Christian baptism (1 Cor. 10:2) and stands as the eternal proof that God makes a way where there is no way, utterly destroying the enemies of His people.`
      },
      verses: ["Exodus 14:2", "Exodus 14:9", "Numeri 33:7"]
    },
    {
      id: "marah",
      coords: [29.34604, 32.94284],
      name: { nl: "Mara", en: "Marah" },
      region: { nl: "Sinaï", en: "Sinai" },
      desc: { nl: "Plaats van het bittere water.", en: "Place of bitter water." },
      story: {
        nl: `**Archeologische en historische betekenis**\nMara bevindt zich vermoedelijk bij Ain Hawarah, een bron op de route langs de oostkust van de Golf van Suez, die berucht is om zijn zware mineralen en bittere smaak.\n\n**Culturele en geografische context**\nDrie dagen lang hadden de Israëlieten door de gloeiend hete Sur-woestijn getrokken zonder water. Toen ze eindelijk water vonden, was het ondrinkbaar. De teleurstelling leidde tot het eerste grote gemurmureer tegen Mozes na de verlossing.\n\n**Theologische betekenis**\nGod toonde Mozes een stuk hout ("boom") dat in het water geworpen moest worden, waardoor het zoet werd. Theologisch wijst dit hout vooruit naar het kruishout van Christus, dat de bitterheid van de zonde, het lijden en de dood transformeert tot levend en zoet water voor de gelovige. Hier openbaarde God Zich als "Jehova-Rapha" (De HEERE Uw Heelmeester).`,
        en: `**Archaeological and historical significance**
Marah is likely located at Ain Hawarah, a spring in the Sinai Peninsula known even today for its highly mineralized, bitter water that is unfit for human consumption.

**Cultural and geographical context**
After experiencing the euphoria of deliverance at the Red Sea, the Israelites marched for three agonizing days into the desert of Shur without finding water. When they finally found water at Marah, it was too bitter to drink, leading to immediate despair and grumbling.

**Theological significance**
Marah (meaning "Bitter") was a deliberate test of Israel's heart. God instructed Moses to throw a specific piece of wood into the water, which miraculously made it sweet. Theologically, this points to the cross of Christ (the wood/tree) which absorbs the bitterness of life and divine judgment, transforming the believer's bitter trials into the sweetness of grace and healing.`
      },
      verses: ["Exodus 15:23", "Numeri 33:8"]
    },
    {
      id: "elim",
      coords: [29.254722, 32.915833],
      name: { nl: "Elim", en: "Elim" },
      region: { nl: "Sinaï", en: "Sinai" },
      desc: { nl: "Oase met 12 waterbronnen en 70 palmbomen.", en: "Oasis with 12 springs and 70 palm trees." },
      story: {
        nl: `**Archeologische en historische betekenis**\nElim wordt door vroege christelijke pelgrims en historici vaak geïdentificeerd met Wadi Gharandel, een plek die tot op de dag van vandaag bekend staat om zijn overvloedige zoetwaterbronnen en weelderige palmbomen.\n\n**Culturele en geografische context**\nNa de bittere ervaring bij Mara kwam het volk bij Elim, een ware woestijnoase. De twaalf waterbronnen en zeventig palmbomen boden fysiek herstel en schaduw aan de miljoenen Israëlieten.\n\n**Theologische betekenis**\nElim is het bijbelse beeld van Gods voorbereide rust en overvloed na een periode van beproeving. De getallen (12 en 70) zijn niet toevallig: 12 verwijst naar de stammen van Israël en 70 naar het getal van de volkeren of de oudsten. Het symboliseert Gods volmaakte voorziening voor heel Zijn volk.`,
        en: `**Archaeological and historical significance**
Elim is often identified by early pilgrims with Wadi Garandel, a beautiful oasis located a short journey south of the bitter waters of Marah.

**Cultural and geographical context**
Unlike the harsh desert surrounding it, Elim was a lush sanctuary boasting twelve wells of fresh water and seventy palm trees, providing abundant shade and rest for the exhausted multitude.

**Theological significance**
Elim represents God's gracious provision and seasons of rest following periods of bitter testing. The specific numbers—twelve wells (corresponding to the twelve tribes of Israel) and seventy palm trees (corresponding to the seventy elders)—symbolize divine perfection, completeness, and God's abundant sufficiency for His covenant people during their earthly pilgrimage.`
      },
      verses: ["Exodus 15:27", "Numeri 33:9"]
    },
    {
      id: "ur",
      coords: [30.962222, 46.104444],
      name: { nl: "Ur der Chaldeeën", en: "Ur of the Chaldeans" },
      region: { nl: "Mesopotamië", en: "Mesopotamia" },
      desc: { nl: "De geboorteplaats van Abraham.", en: "The birthplace of Abraham." },
      story: {
        nl: `**Archeologische en historische betekenis**\nUr der Chaldeeën (huidige Tell el-Muqayyar in Irak) was een van de machtigste en meest geavanceerde Sumerische stadstaten in het oude Mesopotamië. Opgravingen in de jaren 1920 toonden een hoogontwikkelde cultuur met monumentale ziggurats, wiskunde, en uitgebreide handel.\n\n**Culturele en geografische context**\nUr was een rijk handelscentrum nabij de monding van de rivieren Eufraat en Tigris. De stad was diep doordrenkt van afgoderij, met name de aanbidding van de maangod Nanna (Sin). Terach, Abrahams vader, leefde midden in deze heidense context.\n\n**Theologische betekenis**\nGods roeping van Abraham uit Ur toont Zijn soevereine genade: Hij koos een man uit een afgodisch bolwerk en riep hem om alles achter te laten (cultuur, zekerheid, en familie). Het versterkt het principe dat de roeping van de gelovige betekent dat men een pelgrim en vreemdeling op aarde wordt, op zoek naar de stad waarvan God de Bouwmeester is (Hebreeën 11).`,
        en: `**Archaeological and historical significance**
Ur of the Chaldeans (modern Tell el-Muqayyar in Iraq) was one of the most powerful and advanced Sumerian city-states in ancient Mesopotamia. Excavations in the 1920s revealed a highly developed culture with monumental ziggurats, advanced mathematics, and extensive trade.

**Cultural and geographical context**
Ur was a wealthy commercial hub near the mouth of the Euphrates and Tigris rivers. The city was deeply steeped in idolatry, specifically the worship of the moon god Nanna (Sin). Terah, Abraham's father, lived amidst this pagan context.

**Theological significance**
God's calling of Abraham out of Ur demonstrates His sovereign grace: He chose a man from an idolatrous stronghold and called him to leave everything behind (culture, security, and family). It reinforces the principle that the calling of the believer means becoming a pilgrim and stranger on earth, seeking the city whose architect and builder is God (Hebrews 11).`
      },
      verses: ["Genesis 11:28", "Genesis 11:31", "Nehemia 9:7"]
    },
    {
      id: "haran",
      coords: [36.864444, 39.032778],
      name: { nl: "Haran", en: "Haran" },
      region: { nl: "Mesopotamië", en: "Mesopotamia" },
      desc: { nl: "Waar Abraham verbleef voordat hij naar Kanaän ging.", en: "Where Abraham stayed before entering Canaan." },
      story: {
        nl: `**Archeologische en historische betekenis**\nHaran was een prominente oude handelsstad in het noorden van Mesopotamië (huidig Turkije). Net als Ur was Haran een belangrijk centrum voor de verering van de maangod Sin.\n\n**Culturele en geografische context**\nGelegen aan de belangrijke karavaanroutes tussen Ninevé en Damascus, was het een natuurlijke tussenstop voor Terach en Abraham. Toen Terach zich hier vestigde, pauzeerde de reis naar Kanaän totdat Terach op 205-jarige leeftijd stierf.\n\n**Theologische betekenis**\nHaran staat symbool voor het halve werk: de roeping werd gedeeltelijk beantwoord, maar de reis stagneerde door aardse of familiebanden. Pas na de dood van zijn vader verliet Abraham Haran definitief op 75-jarige leeftijd om volledig in gehoorzaamheid Kanaän binnen te trekken, wat de noodzaak van radicale toewijding illustreert.`,
        en: `**Archaeological and historical significance**
Haran was a prominent ancient commercial city in northern Mesopotamia (modern Turkey). Like Ur, Haran was a major center for the worship of the moon god Sin.

**Cultural and geographical context**
Situated on the vital caravan routes between Nineveh and Damascus, it was a natural stopping point for Terah and Abraham. When Terah settled here, the journey to Canaan paused until Terah died at the age of 205.

**Theological significance**
Haran symbolizes half-measures: the calling was partially answered, but the journey stagnated due to earthly or family ties. Only after the death of his father did Abraham definitively leave Haran at age 75 to step fully into obedience and enter Canaan, illustrating the necessity of radical devotion to God's call.`
      },
      verses: ["Genesis 11:31", "Genesis 12:4", "Handelingen 7:2"]
    },
    {
      id: "beersheba",
      coords: [31.244722, 34.840833],
      name: { nl: "Beër-Sjeba", en: "Beersheba" },
      region: { nl: "Kanaän", en: "Canaan" },
      desc: { nl: "Zuidelijke grens van Israël, put van de eed.", en: "Southern border of Israel, well of the oath." },
      story: {
        nl: `**Archeologische en historische betekenis**\nBeër-Sjeba is de belangrijkste stad in de Negev-woestijn. Opgravingen bij Tel Beër-Sjeba hebben restanten onthuld van een versterkte Israëlitische stad met een geavanceerd watersysteem, wat essentieel was voor bewoning in dit droge gebied.\n\n**Culturele en geografische context**\nDe naam betekent "Put van de Eed" of "Put van Zeven". Het markeerde de diepste zuidelijke grens van het vruchtbare land van Israël. Het bekende spreekwoord "van Dan tot Beër-Sjeba" werd in de Bijbel gebruikt om het gehele grondgebied van de natie aan te duiden.\n\n**Theologische betekenis**\nBeër-Sjeba was een heilige plaats voor de aartsvaders. Abraham sloot hier een vredesverbond met Abimelech, Izak ontving hier een verschijning van God en bouwde een altaar, en Jakob bracht hier offers voordat hij naar Egypte trok. Het is de plek van verbondsvernieuwing en de verzekering van Gods blijvende beloften aan het nageslacht.`,
        en: `**Archaeological and historical significance**
Beersheba is the most important city in the Negev desert. Excavations at Tel Beersheba have revealed remains of a fortified Israelite city with a sophisticated water system, essential for survival in this arid region.

**Cultural and geographical context**
The name means "Well of the Oath" or "Well of Seven." It marked the southernmost boundary of the fertile land of Israel. The famous idiom "from Dan to Beersheba" was used in the Bible to denote the entire territory of the nation.

**Theological significance**
Beersheba was a sacred site for the patriarchs. Abraham made a covenant of peace with Abimelech here, Isaac received a manifestation of God and built an altar, and Jacob offered sacrifices before journeying down to Egypt. It is a place of covenant renewal and the assurance of God's enduring promises to their offspring.`
      },
      verses: ["Genesis 21:31", "Genesis 26:33", "Richteren 20:1"]
    },
    {
      id: "nineveh",
      coords: [36.3594, 43.1528],
      name: { nl: "Ninevé", en: "Nineveh" },
      region: { nl: "Assyrië", en: "Assyria" },
      desc: { nl: "Hoofdstad van Assyrië, bezocht door Jona.", en: "Capital of Assyria, visited by Jonah." },
      story: {
        nl: `**Archeologische en historische betekenis**\nNinevé, gelegen aan de oostelijke oever van de Tigris in het huidige Irak, was een van de oudste en machtigste steden ter wereld en werd later de glorieuze hoofdstad van het wrede Assyrische rijk onder Sanherib.\n\n**Culturele en geografische context**\nIn haar bloeitijd was Ninevé een metropool met enorme muren en paleizen. De Assyriërs stonden in de hele antieke wereld bekend om hun ongekende wreedheid en militaire terreur, wat verklaart waarom de profeet Jona weigerde hen tot bekering op te roepen.\n\n**Theologische betekenis**\nDe stad vormt het decor voor een van de grootste theologische ommekeren in de Bijbel: het boek Jona. Het illustreert dat Gods ontzagwekkende genade zich uitstrekt tot over de grenzen van Israël, zelfs tot de meest verdorven en vijandige heidense naties, mits zij zich in zak en as bekeren. Uiteindelijk, toen de stad later weer in wreedheid verviel, werd zij conform de profetie van Nahum verwoest (612 v.Chr.).`,
        en: `**Archaeological and historical significance**
Nineveh, located on the eastern bank of the Tigris River in modern-day Iraq, was one of the oldest and most powerful cities in the world and later became the glorious capital of the brutal Assyrian Empire under Sennacherib.

**Cultural and geographical context**
In its prime, Nineveh was a massive metropolis with enormous walls and palaces. The Assyrians were notorious throughout the ancient world for their unprecedented cruelty and military terror, which explains why the prophet Jonah refused to call them to repentance.

**Theological significance**
The city forms the backdrop for one of the greatest theological turnarounds in the Bible: the book of Jonah. It illustrates that God's awe-inspiring grace extends beyond the borders of Israel, even to the most depraved and hostile pagan nations, provided they repent in sackcloth and ashes. Ultimately, when the city later reverted to cruelty, it was destroyed in fulfillment of Nahum's prophecy (612 BC).`
      },
      verses: ["Genesis 10:11", "Jona 1:2", "Jona 3:2", "Nahum 1:1"]
    },
    {
      id: "nazareth",
      coords: [32.70214, 35.29769],
      name: { nl: "Nazareth", en: "Nazareth" },
      region: { nl: "Galilea", en: "Galilee" },
      desc: { nl: "De woonplaats van Jezus waar Hij opgroeide.", en: "The hometown where Jesus grew up." },
      story: {
        nl: `**Archeologische en historische betekenis**\nNazareth was in de eerste eeuw een onbeduidend, klein agrarisch dorpje in het heuvelland van Beneden-Galilea. Archeologisch materiaal uit de tijd van Jezus toont een nederzetting van hooguit enkele honderden bewoners, levend in grote armoede.\n\n**Culturele en geografische context**\nNazareth lag in het noorden, ver weg van de theologische en politieke elite in Jeruzalem. De uitdrukking van Nathanaël, "Kan uit Nazareth iets goeds komen?" weerspiegelt het destijds heersende vooroordeel dat Galilea (en zeker Nazareth) geestelijk en cultureel inferieur was.\n\n**Theologische betekenis**\nDit was de woonplaats waar de Zoon van God opgroeide ('de Nazarener'). Theologisch onderstreept Nazareth de vernedering en menswording van Christus. De Koning der koningen verkoos niet te groeien in een paleis in Jeruzalem, maar verbleef bijna dertig jaar in de obscuriteit van een eenvoudige timmermanswerkplaats. Het toont dat Gods majesteit zich vaak openbaart in wat voor de wereld veracht en gering is.`,
        en: `**Archaeological and historical significance**
Nazareth was an insignificant, small agricultural village in the hill country of Lower Galilee during the first century. Archaeological evidence from the time of Jesus shows a settlement of at most a few hundred inhabitants, living in deep poverty.

**Cultural and geographical context**
Nazareth was located in the north, far from the theological and political elite in Jerusalem. Nathanael's expression, "Can anything good come out of Nazareth?" reflects the prevailing prejudice of the time that Galilee (and certainly Nazareth) was spiritually and culturally inferior.

**Theological significance**
This was the hometown where the Son of God grew up ('the Nazarene'). Theologically, Nazareth underscores the humiliation and incarnation of Christ. The King of kings chose not to grow up in a palace in Jerusalem, but spent nearly thirty years in the obscurity of a simple carpenter's workshop. It demonstrates that God's majesty often reveals itself in what the world despises and considers lowly.`
      },
      verses: ["Mattheüs 2:23", "Lukas 1:26", "Lukas 4:16", "Johannes 1:46"]
    },
    {
      id: "capernaum",
      coords: [32.881111, 35.575],
      name: { nl: "Kafarnaüm", en: "Capernaum" },
      region: { nl: "Galilea", en: "Galilee" },
      desc: { nl: "Het centrum van Jezus' bediening rondom het meer.", en: "The center of Jesus' ministry around the sea." },
      story: {
        nl: `**Archeologische en historische betekenis**\nKafarnaüm (Kfar Nachoem, "Dorp van Troost") was een welvarend vissersdorp aan de noordwestelijke oever van het Meer van Galilea. Opgravingen hebben indrukwekkende vondsten opgeleverd, waaronder een prachtige witte kalkstenen synagoge en het huis van Petrus.\n\n**Culturele en geografische context**\nKafarnaüm lag aan de Via Maris, een grote internationale handelsroute. Er was een belastingkantoor (waar Mattheüs werd geroepen) en een Romeins garnizoen. Het meer was rijk aan vis, wat verklaart waarom veel van Jezus' discipelen lokale vissers waren.\n\n**Theologische betekenis**\nNadat Jezus uit Nazareth werd verdreven, maakte Hij Kafarnaüm tot Zijn uitvalsbasis en het "hoofdkwartier" van Zijn Galileese bediening. Nergens ter wereld deed Jezus zoveel wonderen (genezingen, demonen uitdrijven, de prediking van het Brood des Levens) als hier. Ondanks dit grote licht weigerde de stad zich te bekeren, wat leidde tot Jezus' oordeel dat de stad tot in het dodenrijk zou worden neergestoten (Mattheüs 11:23).`,
        en: `**Archaeological and historical significance**
Capernaum (Kfar Nahum, "Village of Comfort") was a prosperous fishing village on the northwestern shore of the Sea of Galilee. Excavations have yielded impressive finds, including a beautiful white limestone synagogue and the house of Peter.

**Cultural and geographical context**
Capernaum was located on the Via Maris, a major international trade route. It had a tax office (where Matthew was called) and a Roman garrison. The sea was rich in fish, explaining why many of Jesus' disciples were local fishermen.

**Theological significance**
After being driven out of Nazareth, Jesus made Capernaum His home base and the "headquarters" of His Galilean ministry. Nowhere in the world did Jesus perform as many miracles (healings, casting out demons, preaching the Bread of Life) as here. Despite this great light, the city refused to repent, leading to Jesus' judgment that the city would be brought down to Hades (Matthew 11:23).`
      },
      verses: ["Mattheüs 4:13", "Markus 1:21", "Lukas 4:31", "Johannes 6:59"]
    },
    {
      id: "hebron",
      coords: [31.525087, 35.10222],
      name: { nl: "Hebron", en: "Hebron" },
      region: { nl: "Juda", en: "Judah" },
      desc: { nl: "Rustplaats van Abraham, Isaäk en Jakob.", en: "Resting place of Abraham, Isaac, and Jacob." },
      story: {
        nl: `**Archeologische en historische betekenis**\nHebron, gelegen op ruim 900 meter hoogte in het Judese heuvelland, is een van de oudste continu bewoonde steden ter wereld. Koning Herodes bouwde later een kolossaal heiligdom over de Machpela-grot, welk gebouw er vandaag nog steeds staat.\n\n**Culturele en geografische context**\nHebron was een vruchtbaar gebied vol wijngaarden (Dal van Eskol). Abraham kocht hier van Efron de Hethiet een akker en een spelonk als familiebegraafplaats. Hier liggen Abraham en Sara, Izak en Rebekka, en Jakob en Lea begraven.\n\n**Theologische betekenis**\nHebron ("Vriendschap" of "Verbondschap") is theologisch de plek van diep gewortelde verbondstrouw. Abraham kreeg de belofte van het land en ontving dit kleine stukje als een onderpand. Eeuwen later werd David in Hebron door God geleid om eerst over Juda (voor 7,5 jaar) en later over heel Israël tot koning te worden gezalfd. Het is de bodem waaruit het messiaanse koningschap ontkiemde.`,
        en: `**Archaeological and historical significance**
Hebron, located at over 900 meters altitude in the Judean hill country, is one of the oldest continuously inhabited cities in the world. King Herod later built a colossal sanctuary over the Cave of Machpelah, a building that still stands today.

**Cultural and geographical context**
Hebron was a fertile area full of vineyards (Valley of Eshcol). Abraham bought a field and a cave from Ephron the Hittite here as a family burial ground. Abraham and Sarah, Isaac and Rebekah, and Jacob and Leah are buried here.

**Theological significance**
Hebron ("Friendship" or "Alliance") is theologically the place of deeply rooted covenant faithfulness. Abraham received the promise of the land and received this small piece as a down payment. Centuries later, David was guided by God to be anointed king in Hebron, first over Judah (for 7.5 years) and later over all Israel. It is the soil from which the messianic kingship sprouted.`
      },
      verses: ["Genesis 13:18", "Genesis 23:2", "2 Samuël 2:1", "2 Samuël 5:3"]
    }

    ,
    {
      id: "sodom",
      coords: [31.20849, 35.449223],
      name: { nl: "Sodom en Gomorra", en: "Sodom and Gomorrah" },
      region: { nl: "Vlakte van de Jordaan", en: "Plain of the Jordan" },
      desc: { nl: "Verwoest door vuur en zwavel vanwege hun zonde.", en: "Destroyed by fire and brimstone due to their sin." },
      story: {
        nl: `**Archeologische en historische betekenis**\nHoewel de exacte locatie vaak debatteerd wordt, plaatsen veel historici en archeologen de steden van de vlakte onder of nabij de ondiepe zuidelijke wateren van de huidige Dode Zee.\n\n**Culturele en geografische context**\nDe steden Sodom en Gomorra lagen in een vruchtbare vallei, die in de dagen van Abraham "waterrijk was als de hof des Heeren" (Genesis 13:10). Lot koos ervoor hier zijn tenten op te slaan vanwege de rijkdom van het land, hoewel de mannen van Sodom zeer slecht waren.\n\n**Theologische betekenis**\nVanwege de hemeltergende en onbekeerlijke verdorvenheid liet de Heere vuur en zwavel regenen op deze steden. Sodom en Gomorra dienen in de hele Schrift als een waarschuwingsbeeld van Gods heilige toorn en Zijn onafwendbare eindgericht over de zonde, en als contrast voor de reddende genade die Lot uit het verderf trok.`,
        en: `**Archaeological and historical significance**\nThe exact location is debated...`
      },
      verses: ["Genesis 13:10", "Genesis 19:24", "Lukas 17:29", "Judas 1:7"]
    },
    {
      id: "bethlehem",
      coords: [31.704306, 35.207639],
      name: { nl: "Bethlehem", en: "Bethlehem" },
      region: { nl: "Juda", en: "Judah" },
      desc: { nl: "Geboorteplaats van koning David en de Heere Jezus.", en: "Birthplace of King David and the Lord Jesus." },
      story: {
        nl: `**Archeologische en historische betekenis**\nBethlehem (Huis van het Brood) is een kleine, eeuwenoude stad in het bergland van Juda, zo'n tien kilometer ten zuiden van Jeruzalem.\n\n**Culturele en geografische context**\nEerder heette het Efratha; in haar nabijheid werd Rachel begraven. In de velden van Bethlehem las de Moabitische Ruth aren op het land van Boaz. Later werd hier David, de herdersjongen en achterkleinzoon van Ruth, geboren en door Samuël tot koning gezalfd.\n\n**Theologische betekenis**\nDe profeet Micha profeteerde dat uit deze ogenschijnlijk onbeduidende stad de Heerser van Israël zou voortkomen, Wiens uitgangen zijn van ouds, van de dagen der eeuwigheid (Micha 5:1). Dit werd heerlijk vervuld toen God in het vlees kwam en Jezus Christus, het ware Brood des levens, in Bethlehem in een kribbe werd geboren om Zijn volk te verlossen.`,
        en: `**Archaeological and historical significance**\nBethlehem (House of Bread) is a small ancient town...`
      },
      verses: ["Genesis 35:19", "Ruth 4:11", "1 Samuël 16:1", "Micha 5:1", "Lukas 2:4"]
    },
    {
      id: "mount_sinai",
      coords: [28.539722, 33.973333],
      name: { nl: "De Berg Sinaï (Horeb)", en: "Mount Sinai (Horeb)" },
      region: { nl: "Sinaïwoestijn", en: "Sinai Desert" },
      desc: { nl: "De berg waar God de wet aan Mozes gaf.", en: "The mountain where God gave the Law to Moses." },
      story: {
        nl: `**Archeologische en historische betekenis**\nDe berg Sinaï (vaak geïdentificeerd met Jebel Musa in het zuiden van het Sinaï-schiereiland) is de formidabele granieten berg in de wildernis waar het volk Israël maandenlang verbleef na de uittocht uit Egypte.\n\n**Culturele en geografische context**\nHet is een dor en woest gebied, ook Horeb genoemd ("De berg Gods"). Hier verscheen de Heere voor het eerst aan Mozes in de brandende doornstruik die niet verteerde.\n\n**Theologische betekenis**\nTheologisch markeert Sinaï het moment waarop het Oude Verbond werd gesloten. Onder donder, bliksem, dikke rook en bazuingeschal daalde de Heere Zelf neer in vuur en openbaarde Zijn absolute, onkreukbare heiligheid. Hij gaf de Tien Geboden en de gedetailleerde blauwdrukken voor de tabernakel en het priesterschap. Het toont de majesteit van Gods wet, die door haar strengheid (waar de berg niet eens aangeraakt mocht worden) het volk deed uitzien naar de genade die in Christus zou komen.`,
        en: `**Archaeological and historical significance**\nMount Sinai is the formidable granite mountain...`
      },
      verses: ["Exodus 3:1", "Exodus 19:18", "Deuteronomium 4:11", "Hebreeën 12:18"]
    },
    {
      id: "babylon",
      coords: [32.543333, 44.422222],
      name: { nl: "Babel (Babylon)", en: "Babylon" },
      region: { nl: "Mesopotamië", en: "Mesopotamia" },
      desc: { nl: "Zinnebeeld van de wereld, plaats van ballingschap.", en: "Symbol of the world, place of exile." },
      story: {
        nl: `**Archeologische en historische betekenis**\nBabel, gebouwd langs de Eufraat, vindt haar vroegste oorsprong bij de torenbouw in Sinear (Gen. 11). Eeuwen later bouwde koning Nebukadnezar het uit tot de absolute grootmacht en prachtstad van het Nabije Oosten, compleet met gigantische muren en hangende tuinen.\n\n**Culturele en geografische context**\nToen Juda hardnekkig Gods wetten bleef overtreden, gebruikte God Babylon als een 'gouden beker in Zijn hand' om Zijn oordeel te voltrekken. In 586 v.Chr. verwoestte Nebukadnezar Jeruzalem en de Tempel, en voerde hij het volk Juda als ballingen mee naar Babylon.\n\n**Theologische betekenis**\nBabylon is in de theologie het ultieme, profetische archetype van de heidense, hoogmoedige mens die zich tegen God verheft. Waar Jeruzalem de stad van God is, vertegenwoordigt Babylon de goddeloze wereld. De Psalmen getuigen van het verdriet van het volk: "Aan de rivieren van Babel, daar zaten wij, ook weenden wij" (Ps. 137). Uiteindelijk profeteert Openbaring over de definitieve en vernietigende ondergang van het geestelijke Babylon.`,
        en: `**Archaeological and historical significance**\nBabylon finds its earliest roots in the tower of Shinar...`
      },
      verses: ["Genesis 11:9", "2 Koningen 25:1", "Psalm 137:1", "Openbaring 18:2"]
    }

    ,
    {
      id: "sea_of_galilee",
      coords: [32.818906, 35.590033],
      name: { nl: "Meer van Galilea", en: "Sea of Galilee" },
      region: { nl: "Galilea", en: "Galilee" },
      desc: { nl: "Het toneel van vele wonderen van Jezus.", en: "The scene of many miracles by Jesus." },
      story: {
        nl: `**Archeologische en historische betekenis**\nHet Meer van Galilea (ook wel Meer van Tiberias of Meer Gennesareth) is een groot zoetwatermeer in het noorden van Israël, gelegen op ruim 200 meter onder zeeniveau. In de oudheid werd het omringd door bloeiende visserijsteden.\n\n**Culturele en geografische context**\nVanwege de unieke ligging in de vallei is het meer berucht om plotselinge, zeer zware en levensgevaarlijke stormen die vanaf de omliggende heuvels neerstorten.\n\n**Theologische betekenis**\nDit meer is het kloppend hart van Jezus' bediening. Hier riep Hij Zijn eerste discipelen (vissers) om vissers van mensen te worden. Op dit water wandelde Hij in de nacht, en met één enkel machtswoord ("Zwijg, wees stil!") kalmeerde Hij de elementen, wat Zijn goddelijke heerschappij over de schepping demonstreert. Ook na Zijn opstanding verscheen Hij hier aan Zijn discipelen bij de wonderbaarlijke visvangst.`,
        en: `**Archaeological and historical significance**\nThe Sea of Galilee (also known as the Sea of Tiberias or Lake Gennesaret) is a large freshwater lake in northern Israel, situated over 200 meters below sea level. In ancient times, it was surrounded by thriving fishing towns.\n\n**Cultural and geographical context**\nDue to its unique position in the valley, the lake is notorious for sudden, very severe and life-threatening storms that sweep down from the surrounding hills.\n\n**Theological significance**\nThis lake is the beating heart of Jesus' ministry. Here He called His first disciples (fishermen) to become fishers of men. He walked on this water in the dead of night, and with a single word of power ("Peace, be still!"), He calmed the raging elements, demonstrating His divine lordship over creation. After His resurrection, He also appeared here to His disciples during the miraculous catch of fish.`
      },
      verses: ["Mattheüs 4:18", "Markus 4:39", "Mattheüs 14:25", "Johannes 21:1"]
    },
    {
      id: "jordan_river",
      coords: [31.761389, 35.558333],
      name: { nl: "Rivier de Jordaan", en: "Jordan River" },
      region: { nl: "Kanaän", en: "Canaan" },
      desc: { nl: "De grensrivier en plaats van Jezus' doop.", en: "The border river and place of Jesus' baptism." },
      story: {
        nl: `**Archeologische en historische betekenis**\nDe Jordaan is de belangrijkste rivier in de regio. Hij stroomt vanuit de berg Hermon, door het Meer van Galilea, diep door de Riftvallei naar het laagste punt op aarde: de Dode Zee.\n\n**Culturele en geografische context**\nDe rivier vormde een zware natuurlijke grens voor iedereen die vanuit het oosten het Beloofde Land wilde binnentrekken.\n\n**Theologische betekenis**\nDe Jordaan staat in de Bijbel symbool voor overgang en geestelijke doorbraak. Jozua leidde het volk dwars door het wonderbaarlijk drooggevallen rivierbed het Beloofde Land in. Eeuwen later preekte Johannes de Doper hier een doop van bekering. De theologische climax vond plaats toen Jezus Zelf in dit water werd gedoopt, de hemel scheurde en de Drie-eenheid zich onthulde: de stem van de Vader, de Zoon in het water, en de Geest als een duif.`,
        en: `**Archaeological and historical significance**\nThe Jordan is the most important river in the region. It flows from Mount Hermon, through the Sea of Galilee, deep down the Rift Valley to the lowest point on earth: the Dead Sea.\n\n**Cultural and geographical context**\nThe river formed a formidable natural border for anyone seeking to enter the Promised Land from the east.\n\n**Theological significance**\nIn the Bible, the Jordan is a symbol of transition and spiritual breakthrough. Joshua led the people right through the miraculously dried riverbed into the Promised Land. Centuries later, John the Baptist preached a baptism of repentance here. The theological climax occurred when Jesus Himself was baptized in this water; the heavens tore open and the Trinity was revealed: the voice of the Father, the Son in the water, and the Spirit descending like a dove.`
      },
      verses: ["Jozua 3:17", "2 Koningen 5:14", "Mattheüs 3:13", "Markus 1:9"]
    },
    {
      id: "damascus",
      coords: [33.511112, 36.30639],
      name: { nl: "Damascus", en: "Damascus" },
      region: { nl: "Syrië", en: "Syria" },
      desc: { nl: "Plaats van Paulus' radicale bekering.", en: "Place of Paul's radical conversion." },
      story: {
        nl: `**Archeologische en historische betekenis**\nDamascus is een van de oudste continu bewoonde steden ter wereld, gelegen in een oase die gevoed wordt door de rivier Barada. In de Romeinse tijd was het een zeer welvarende en cruciale handelsstad (Decapolis-regio).\n\n**Culturele en geografische context**\nGelegen ten noorden van Israël, herbergde de stad een aanzienlijke Joodse populatie met meerdere synagogen. Na de marteldood van Stefanus vluchtten veel christenen hierheen.\n\n**Theologische betekenis**\nDamascus is de plek van misschien wel de meest onverwachte en theologische invloedrijke bekering uit de wereldgeschiedenis. Saulus van Tarsus, ademend van dreiging en moord tegen de kerk, werd net buiten de stadspoorten verblind door het hemelse licht van de verheerlijkte Christus. Van de felste vervolger werd hij de grootste zendeling (de apostel Paulus). Dit illustreert de absolute en onweerstaanbare soevereiniteit van Gods reddende genade.`,
        en: `**Archaeological and historical significance**\nDamascus is one of the oldest continuously inhabited cities in the world, situated in an oasis fed by the Barada River. During the Roman era, it was a highly prosperous and crucial commercial center.\n\n**Cultural and geographical context**\nLocated north of Israel, the city housed a significant Jewish population with multiple synagogues. After the martyrdom of Stephen, many Christians fled here.\n\n**Theological significance**\nDamascus is the site of perhaps the most unexpected and theologically influential conversion in world history. Saul of Tarsus, breathing threats and murder against the church, was blinded just outside the city gates by the heavenly light of the glorified Christ. From the fiercest persecutor, he was transformed into the greatest missionary (the Apostle Paul). This powerfully illustrates the absolute and irresistible sovereignty of God's saving grace.`
      },
      verses: ["Genesis 15:2", "Handelingen 9:3", "Handelingen 22:6", "Galaten 1:17"]
    },
    {
      id: "antioch",
      coords: [36.226691, 36.171743],
      name: { nl: "Antiochië", en: "Antioch" },
      region: { nl: "Syrië", en: "Syria" },
      desc: { nl: "Waar volgelingen voor het eerst Christenen werden genoemd.", en: "Where followers were first called Christians." },
      story: {
        nl: `**Archeologische en historische betekenis**\nAntiochië aan de Orontes was na Rome en Alexandrië de derde grootste en belangrijkste metropool van het Romeinse Rijk. Het was een knooppunt van handel, cultuur en diverse filosofieën.\n\n**Culturele en geografische context**\nDe stad kende een bruisende smeltkroes van culturen. Tot op dat moment werd het evangelie voornamelijk aan Joden verkondigd, maar in Antiochië braken Hellenistische (Griekse) gelovigen door die barrière en plantten de eerste grote, multiculturele gemeente.\n\n**Theologische betekenis**\nAntiochië is theologically het bruggenhoofd voor de wereldwijde zending. Hier werden de discipelen voor het allereerst "Christenen" genoemd (Hand. 11:26). De gemeente van Antiochië zond, onder leiding van de Heilige Geest, Paulus en Barnabas uit op hun baanbrekende zendingsreizen naar de heidense wereld. Het representeert de overgang van een lokale Joodse beweging naar een universele, wereldwijde Kerk.`,
        en: `**Archaeological and historical significance**\nAntioch on the Orontes was the third largest and most important metropolis of the Roman Empire, after Rome and Alexandria. It was a major hub of commerce, culture, and diverse philosophies.\n\n**Cultural and geographical context**\nThe city was a vibrant melting pot of cultures. Until that point, the gospel had primarily been preached to Jews, but in Antioch, Hellenistic (Greek) believers broke through that barrier and planted the first major multicultural church.\n\n**Theological significance**\nTheologically, Antioch is the bridgehead for global missions. It was here that the disciples were first called "Christians" (Acts 11:26). Driven by the Holy Spirit, the church of Antioch commissioned and sent out Paul and Barnabas on their groundbreaking missionary journeys to the Gentile world. It represents the crucial transition of Christianity from a localized Jewish movement to a universal, worldwide Church.`
      },
      verses: ["Handelingen 11:26", "Handelingen 13:1", "Galaten 2:11"]
    },
    {
      id: "rome",
      coords: [41.8922, 12.4852],
      name: { nl: "Rome", en: "Rome" },
      region: { nl: "Italië", en: "Italy" },
      desc: { nl: "Hoofdstad van het Rijk, bloedbad der martelaren.", en: "Capital of the Empire, bloodshed of martyrs." },
      story: {
        nl: `**Archeologische en historische betekenis**\nRome, de Stad op de Zeven Heuvelen, was het kloppend hart en de onbetwiste supermacht van de antieke wereld. Keizerlijke fora, het Colosseum en machtige tempels domineerden de horizon.\n\n**Culturele en geografische context**\nAls hoofdstad trok het mensen van over de hele bekende wereld. Ondanks wrede vervolgingen door keizers als Nero, die christenen als levende fakkels gebruikte, groeide de ondergrondse huisgemeente in Rome exponentieel.\n\n**Theologische betekenis**\nRome is de climax van het boek Handelingen. Paulus schreef zijn absolute theologische meesterwerk (de Romeinenbrief) aan deze gemeente. Paulus (als staatsburger onthoofd) en Petrus (ondersteboven gekruisigd) stierven hier allebei de marteldood voor hun Verlosser. Het toont hoe het Koninkrijk van God onstuitbaar is: het kruipt uit de catacomben en overwint uiteindelijk zelfs het bloeddorstige hart van het Romeinse rijk door het bloed van het Lam.`,
        en: `**Archaeological and historical significance**\nRome, the City on Seven Hills, was the beating heart and undisputed superpower of the ancient world. Imperial forums, the Colosseum, and mighty temples dominated its skyline.\n\n**Cultural and geographical context**\nAs the capital, it attracted people from all over the known world. Despite horrific persecutions by emperors like Nero, who used Christians as living torches, the underground house churches in Rome grew exponentially.\n\n**Theological significance**\nRome serves as the dramatic climax to the book of Acts. Paul wrote his absolute theological masterpiece (the Epistle to the Romans) to this church. Both Paul (beheaded as a citizen) and Peter (crucified upside down) died their martyr's death for their Savior here. It stands as the ultimate proof that the Kingdom of God is unstoppable: creeping out from the catacombs, it ultimately conquered even the bloodthirsty heart of the Roman Empire through the blood of the Lamb.`
      },
      verses: ["Handelingen 28:14", "Romeinen 1:7", "Romeinen 1:15", "2 Timotheüs 1:17"]
    }

    
];

export default CONTEXT_PLACES;
