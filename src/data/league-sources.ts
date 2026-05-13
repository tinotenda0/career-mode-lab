export type Region = "Europe" | "North America" | "South America" | "Asia";

export type LeagueSource = {
  id: string;
  country: string;
  countryCode: string;
  region: Region;
  tier: number;
  name: string;
  expectedTeams: number;
  espnCode?: string;
  manualOnly?: boolean;
  note?: string;
};

export const leagueSources: LeagueSource[] = [
  { id: "eng-1", country: "England", countryCode: "ENG", region: "Europe", tier: 1, name: "Premier League", expectedTeams: 20, espnCode: "eng.1" },
  { id: "eng-2", country: "England", countryCode: "ENG", region: "Europe", tier: 2, name: "Championship", expectedTeams: 24, espnCode: "eng.2" },
  { id: "eng-3", country: "England", countryCode: "ENG", region: "Europe", tier: 3, name: "League One", expectedTeams: 24, espnCode: "eng.3" },
  { id: "eng-4", country: "England", countryCode: "ENG", region: "Europe", tier: 4, name: "League Two", expectedTeams: 24, espnCode: "eng.4" },
  { id: "eng-5", country: "England", countryCode: "ENG", region: "Europe", tier: 5, name: "National League", expectedTeams: 24, espnCode: "eng.5" },

  { id: "esp-1", country: "Spain", countryCode: "ESP", region: "Europe", tier: 1, name: "LaLiga", expectedTeams: 20, espnCode: "esp.1" },
  { id: "esp-2", country: "Spain", countryCode: "ESP", region: "Europe", tier: 2, name: "LaLiga 2", expectedTeams: 22, espnCode: "esp.2" },
  { id: "esp-3", country: "Spain", countryCode: "ESP", region: "Europe", tier: 3, name: "Primera Federacion", expectedTeams: 40, manualOnly: true, note: "ESPN does not expose this competition through the teams endpoint." },

  { id: "ger-1", country: "Germany", countryCode: "GER", region: "Europe", tier: 1, name: "Bundesliga", expectedTeams: 18, espnCode: "ger.1" },
  { id: "ger-2", country: "Germany", countryCode: "GER", region: "Europe", tier: 2, name: "2. Bundesliga", expectedTeams: 18, espnCode: "ger.2" },
  { id: "ger-3", country: "Germany", countryCode: "GER", region: "Europe", tier: 3, name: "3. Liga", expectedTeams: 20, manualOnly: true },

  { id: "fra-1", country: "France", countryCode: "FRA", region: "Europe", tier: 1, name: "Ligue 1", expectedTeams: 18, espnCode: "fra.1" },
  { id: "fra-2", country: "France", countryCode: "FRA", region: "Europe", tier: 2, name: "Ligue 2", expectedTeams: 18, espnCode: "fra.2" },

  { id: "por-1", country: "Portugal", countryCode: "POR", region: "Europe", tier: 1, name: "Primeira Liga", expectedTeams: 18, espnCode: "por.1" },
  { id: "por-2", country: "Portugal", countryCode: "POR", region: "Europe", tier: 2, name: "Liga Portugal 2", expectedTeams: 18, manualOnly: true },

  { id: "aut-1", country: "Austria", countryCode: "AUT", region: "Europe", tier: 1, name: "Bundesliga", expectedTeams: 12, espnCode: "aut.1" },
  { id: "aut-2", country: "Austria", countryCode: "AUT", region: "Europe", tier: 2, name: "2. Liga", expectedTeams: 16, manualOnly: true },

  { id: "ita-1", country: "Italy", countryCode: "ITA", region: "Europe", tier: 1, name: "Serie A", expectedTeams: 20, espnCode: "ita.1" },
  { id: "ita-2", country: "Italy", countryCode: "ITA", region: "Europe", tier: 2, name: "Serie B", expectedTeams: 20, espnCode: "ita.2" },

  { id: "irl-1", country: "Ireland", countryCode: "IRL", region: "Europe", tier: 1, name: "Premier Division", expectedTeams: 10, espnCode: "irl.1" },
  { id: "irl-2", country: "Ireland", countryCode: "IRL", region: "Europe", tier: 2, name: "First Division", expectedTeams: 10, manualOnly: true },

  { id: "sco-1", country: "Scotland", countryCode: "SCO", region: "Europe", tier: 1, name: "Premiership", expectedTeams: 12, espnCode: "sco.1" },
  { id: "sco-2", country: "Scotland", countryCode: "SCO", region: "Europe", tier: 2, name: "Championship", expectedTeams: 10, espnCode: "sco.2" },

  { id: "bel-1", country: "Belgium", countryCode: "BEL", region: "Europe", tier: 1, name: "Pro League", expectedTeams: 16, espnCode: "bel.1" },
  { id: "bel-2", country: "Belgium", countryCode: "BEL", region: "Europe", tier: 2, name: "Challenger Pro League", expectedTeams: 16, manualOnly: true },

  { id: "pol-1", country: "Poland", countryCode: "POL", region: "Europe", tier: 1, name: "Ekstraklasa", expectedTeams: 18, manualOnly: true },
  { id: "pol-2", country: "Poland", countryCode: "POL", region: "Europe", tier: 2, name: "I Liga", expectedTeams: 18, manualOnly: true },

  { id: "swe-1", country: "Sweden", countryCode: "SWE", region: "Europe", tier: 1, name: "Allsvenskan", expectedTeams: 16, espnCode: "swe.1" },
  { id: "swe-2", country: "Sweden", countryCode: "SWE", region: "Europe", tier: 2, name: "Superettan", expectedTeams: 16, manualOnly: true },

  { id: "den-1", country: "Denmark", countryCode: "DEN", region: "Europe", tier: 1, name: "Superliga", expectedTeams: 12, espnCode: "den.1" },
  { id: "den-2", country: "Denmark", countryCode: "DEN", region: "Europe", tier: 2, name: "1st Division", expectedTeams: 12, manualOnly: true },

  { id: "ned-1", country: "Netherlands", countryCode: "NED", region: "Europe", tier: 1, name: "Eredivisie", expectedTeams: 18, espnCode: "ned.1" },
  { id: "ned-2", country: "Netherlands", countryCode: "NED", region: "Europe", tier: 2, name: "Eerste Divisie", expectedTeams: 20, espnCode: "ned.2" },

  { id: "hun-1", country: "Hungary", countryCode: "HUN", region: "Europe", tier: 1, name: "NB I", expectedTeams: 12, manualOnly: true },
  { id: "hun-2", country: "Hungary", countryCode: "HUN", region: "Europe", tier: 2, name: "NB II", expectedTeams: 16, manualOnly: true },

  { id: "arg-1", country: "Argentina", countryCode: "ARG", region: "South America", tier: 1, name: "Primera Division", expectedTeams: 30, espnCode: "arg.1" },
  { id: "arg-2", country: "Argentina", countryCode: "ARG", region: "South America", tier: 2, name: "Primera Nacional", expectedTeams: 36, espnCode: "arg.2" },

  { id: "tur-1", country: "Turkiye", countryCode: "TUR", region: "Europe", tier: 1, name: "Super Lig", expectedTeams: 18, espnCode: "tur.1" },
  { id: "tur-2", country: "Turkiye", countryCode: "TUR", region: "Europe", tier: 2, name: "1. Lig", expectedTeams: 20, manualOnly: true },

  { id: "ksa-1", country: "Saudi Arabia", countryCode: "KSA", region: "Asia", tier: 1, name: "Saudi Pro League", expectedTeams: 18, espnCode: "ksa.1" },
  { id: "ksa-2", country: "Saudi Arabia", countryCode: "KSA", region: "Asia", tier: 2, name: "First Division League", expectedTeams: 18, manualOnly: true },

  { id: "rou-1", country: "Romania", countryCode: "ROU", region: "Europe", tier: 1, name: "Liga I", expectedTeams: 16, espnCode: "rou.1" },
  { id: "rou-2", country: "Romania", countryCode: "ROU", region: "Europe", tier: 2, name: "Liga II", expectedTeams: 20, manualOnly: true },

  { id: "usa-1", country: "United States", countryCode: "USA", region: "North America", tier: 1, name: "Major League Soccer", expectedTeams: 30, espnCode: "usa.1" },
  { id: "usa-2", country: "United States", countryCode: "USA", region: "North America", tier: 2, name: "USL Championship", expectedTeams: 24, manualOnly: true }
];

export const manualClubNames: Record<string, string[]> = {
  "esp-3": [
    "Real Madrid Castilla", "Barcelona Atletic", "Atletico Madrid B", "Villarreal B", "Sevilla Atletico",
    "Betis Deportivo", "Real Murcia", "Hercules", "Nastic de Tarragona", "Sabadell",
    "Cultural Leonesa", "Ponferradina", "Lugo", "Unionistas", "Ourense CF",
    "Zamora", "Celta Fortuna", "Arenteiro", "SD Tarazona", "Gimnastic Segoviana",
    "Ibiza", "Alcorcon", "Recreativo Huelva", "Antequera", "Merida",
    "Yeclano", "Ceuta", "Fuenlabrada", "Marbella", "Algeciras",
    "Intercity", "Alcoyano", "Sanluqueno", "Linares Deportivo", "Cordoba B",
    "Real Sociedad B", "Osasuna B", "Athletic Club B", "Eldense B", "Numancia"
  ],
  "ger-3": [
    "Alemannia Aachen", "TSV 1860 Munich", "1. FC Saarbrucken", "Energie Cottbus", "Hansa Rostock",
    "Rot-Weiss Essen", "MSV Duisburg", "Waldhof Mannheim", "Wehen Wiesbaden", "SC Verl",
    "VfL Osnabruck", "Erzgebirge Aue", "FC Ingolstadt", "Viktoria Koln", "SSV Ulm",
    "FC Schweinfurt", "TSV Havelse", "Jahn Regensburg", "TSG Hoffenheim II", "VfB Stuttgart II"
  ],
  "por-2": [
    "Maritimo", "Pacos de Ferreira", "Leixoes", "Penafiel", "Tondela", "Feirense",
    "Torreense", "Academico Viseu", "UD Oliveirense", "Mafra", "Portimonense", "Vizela",
    "Felgueiras", "Alverca", "Chaves", "Uniao de Leiria", "Benfica B", "Porto B"
  ],
  "aut-2": [
    "Admira Wacker", "SKN St. Polten", "SV Ried", "First Vienna", "Floridsdorfer AC", "Kapfenberger SV",
    "Austria Lustenau", "Rapid Wien II", "Sturm Graz II", "Liefering", "Amstetten", "Lafnitz",
    "Horn", "Stripfing", "Bregenz", "Voitsberg"
  ],
  "irl-2": [
    "Bray Wanderers", "Cobh Ramblers", "Treaty United", "Wexford", "Athlone Town",
    "Finn Harps", "Kerry FC", "Longford Town", "UCD", "Dundalk"
  ],
  "bel-2": [
    "Beerschot", "Beveren", "Lierse", "Lommel", "Patro Eisden", "RFC Liege",
    "Seraing", "Deinze", "Francs Borains", "Jong Genk", "Club NXT", "Anderlecht Futures",
    "SL16 FC", "RWDM", "Lokeren-Temse", "Eupen"
  ],
  "pol-1": [
    "Legia Warsaw", "Lech Poznan", "Rakow Czestochowa", "Jagiellonia Bialystok", "Widzew Lodz", "Gornik Zabrze",
    "Pogon Szczecin", "Cracovia", "Radomiak Radom", "Piast Gliwice", "Korona Kielce", "GKS Katowice",
    "Motor Lublin", "Lechia Gdansk", "Arka Gdynia", "Wisla Plock", "Zaglebie Lubin", "Bruk-Bet Termalica"
  ],
  "pol-2": [
    "Wisla Krakow", "Ruch Chorzow", "LKS Lodz", "Polonia Warsaw", "Miedz Legnica", "Stal Rzeszow",
    "GKS Tychy", "Odra Opole", "Chrobry Glogow", "Znicz Pruszkow", "Gornik Leczna", "Puszcza Niepolomice",
    "Kotwica Kolobrzeg", "Warta Poznan", "Resovia", "Pogon Siedlce", "Stal Stalowa Wola", "Chojniczanka"
  ],
  "swe-2": [
    "Osters IF", "Landskrona BoIS", "Helsingborg", "GIF Sundsvall", "Orgryte", "Trelleborgs FF",
    "Orebro SK", "IK Brage", "Utsiktens BK", "Ostersunds FK", "Varbergs BoIS", "Sandvikens IF",
    "Gefle IF", "Skovde AIK", "Oddevold", "Degerfors"
  ],
  "den-2": [
    "AC Horsens", "Esbjerg fB", "HB Koge", "Hillerod", "Hobro", "Kolding IF",
    "Hvidovre", "B 93", "Vendsyssel FF", "Fredericia", "Roskilde", "Nykobing FC"
  ],
  "hun-1": [
    "Ferencvaros", "Puskas Akademia", "Paksi FC", "Fehervar", "Ujpest", "Debrecen",
    "MTK Budapest", "Diosgyor", "Zalaegerszeg", "Kecskemeti TE", "Nyiregyhaza Spartacus", "Kisvarda"
  ],
  "hun-2": [
    "Vasas", "Honved", "Gyirmot", "Budafok", "Szeged-Csanad", "Ajka", "Kazincbarcika", "Siofok",
    "Soroksar", "Csakvar", "Mosonmagyarovar", "Tiszakecske", "Bvsc-Zuglo", "Kozarmisleny", "Haladas", "Bekescsaba"
  ],
  "tur-2": [
    "Sakaryaspor", "Kocaelispor", "Bandirmaspor", "Genclerbirligi", "Boluspor", "Erzurumspor",
    "Goztepe", "Bodrum FK", "Corum FK", "Umraniyespor", "Manisa FK", "Keciorengucu",
    "Adanaspor", "Altay", "Tuzlaspor", "Sanliurfaspor", "Amed SK", "Istanbulspor", "Pendikspor", "Erokspor"
  ],
  "ksa-2": [
    "Al Hazem", "Al Adalah", "Al Faisaly", "Al Jabalain", "Al Arabi", "Al Qaisumah",
    "Al Kholood", "Ohod", "Jeddah Club", "Al Qadsiah", "Al Orubah", "Al Riyadh",
    "Al Bukiryah", "Al Safa", "Al Najma", "Al Ain", "Al Qaisar", "Al Batin"
  ],
  "rou-2": [
    "CSA Steaua Bucuresti", "Corvinul Hunedoara", "FC Arges", "Voluntari", "Concordia Chiajna", "Ceahlaul Piatra Neamt",
    "Chindia Targoviste", "Metaloglobus Bucuresti", "CSM Resita", "Unirea Slobozia", "Gloria Buzau", "Mioveni",
    "Dumbravita", "Selimbar", "Viitorul Pandurii", "Progresul Spartac", "Tunari", "Slatina", "Afumati", "Bihor Oradea"
  ],
  "usa-2": [
    "Birmingham Legion", "Charleston Battery", "Colorado Springs Switchbacks", "Detroit City", "El Paso Locomotive", "Hartford Athletic",
    "Indy Eleven", "Las Vegas Lights", "Loudoun United", "Louisville City", "Miami FC", "Monterey Bay",
    "New Mexico United", "North Carolina FC", "Oakland Roots", "Orange County SC", "Phoenix Rising", "Pittsburgh Riverhounds",
    "Rhode Island FC", "Sacramento Republic", "San Antonio FC", "Tampa Bay Rowdies", "Tulsa FC", "Lexington SC"
  ]
};

export const crestOverrides: Record<string, string> = {
  "legia warsaw": "https://a.espncdn.com/i/teamlogos/soccer/500/555.png",
  "lech poznan": "https://a.espncdn.com/i/teamlogos/soccer/500/2990.png",
  "ferencvaros": "https://a.espncdn.com/i/teamlogos/soccer/500/622.png"
};

const majorTokens = [
  "arsenal", "chelsea", "liverpool", "manchester", "tottenham", "newcastle", "aston villa",
  "real madrid", "barcelona", "atletico", "sevilla", "valencia", "villarreal",
  "bayern", "dortmund", "leverkusen", "leipzig", "schalke", "hamburg",
  "psg", "marseille", "lyon", "monaco", "lille",
  "benfica", "porto", "sporting", "braga",
  "juventus", "milan", "inter", "napoli", "roma", "lazio", "fiorentina",
  "celtic", "rangers", "anderlecht", "brugge", "ajax", "psv", "feyenoord",
  "river plate", "boca", "racing club", "independiente", "san lorenzo",
  "galatasaray", "fenerbahce", "besiktas", "trabzonspor",
  "al nassr", "al hilal", "al ittihad", "al ahli",
  "la galaxy", "inter miami", "atlanta united", "seattle sounders", "lafc",
  "legia", "lech", "ferencvaros", "copenhagen", "malmo"
];

export function normalizeClubName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function isMajorClub(name: string, tier: number) {
  const normalized = normalizeClubName(name);
  return tier === 1 && majorTokens.some((token) => normalized.includes(token));
}
