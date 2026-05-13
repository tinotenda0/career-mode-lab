export type MascotIconKey =
  | "anchor"
  | "bird"
  | "bug"
  | "butterfly"
  | "cat"
  | "cow"
  | "crown"
  | "dog"
  | "fish"
  | "flame"
  | "horse"
  | "lightning"
  | "paw"
  | "rabbit"
  | "rocket"
  | "shield"
  | "star"
  | "sword"
  | "tree"
  | "waves";

export type Mascot = {
  id: string;
  name: string;
  icon: MascotIconKey;
  trait: string;
};

export type KitColors = {
  primary: string;
  secondary: string;
  trim: string;
};

export type KitPalette = {
  id: string;
  name: string;
  colors: KitColors;
};

export type CreatedClub = {
  id: string;
  name: string;
  mascotId: string;
  country: string;
  leagueTier: number;
  motto: string;
  culture: string;
  stadiumName: string;
  academyFocus: string;
  boardStyle: string;
  rivalryHook: string;
  fanRitual: string;
  mainColors: {
    primary: string;
    secondary: string;
  };
  homeKitMode: "main" | "custom";
  homeKit: KitColors;
  awayKit: KitColors;
  thirdKit: KitColors;
  createdAt: number;
};

export const creatorCountries = [
  "England",
  "Spain",
  "Germany",
  "France",
  "Portugal",
  "Austria",
  "Italy",
  "Ireland",
  "Scotland",
  "Belgium",
  "Poland",
  "Sweden",
  "Denmark",
  "Netherlands",
  "Hungary",
  "Argentina",
  "Turkiye",
  "Saudi Arabia",
  "Romania",
  "United States"
];

export const mascots: Mascot[] = [
  { id: "falcons", name: "Falcons", icon: "bird", trait: "Fast wing play and loud away ends" },
  { id: "stallions", name: "Stallions", icon: "horse", trait: "Direct runners and old-school grit" },
  { id: "bulls", name: "Bulls", icon: "cow", trait: "Physical duels and set-piece menace" },
  { id: "wolves", name: "Wolves", icon: "paw", trait: "Pack pressing and academy loyalty" },
  { id: "mariners", name: "Mariners", icon: "anchor", trait: "Port-city edge and disciplined defence" },
  { id: "wildcats", name: "Wildcats", icon: "cat", trait: "Agile forwards and late winners" },
  { id: "hounds", name: "Hounds", icon: "dog", trait: "Relentless pressing and cult captains" },
  { id: "wasps", name: "Wasps", icon: "bug", trait: "Narrow pitch energy and sharp counters" },
  { id: "monarchs", name: "Monarchs", icon: "butterfly", trait: "Elegant football and a rebuilt identity" },
  { id: "tridents", name: "Tridents", icon: "waves", trait: "Fluid rotations and coastal pride" },
  { id: "phoenix", name: "Phoenix", icon: "flame", trait: "Rebirth story after financial chaos" },
  { id: "rangers", name: "Rangers", icon: "tree", trait: "Local scouting and rugged full-backs" },
  { id: "meteors", name: "Meteors", icon: "star", trait: "Young stars, high tempo, no fear" },
  { id: "rockets", name: "Rockets", icon: "rocket", trait: "Explosive transitions and risky signings" },
  { id: "knights", name: "Knights", icon: "sword", trait: "Defensive honour and hard tackles" },
  { id: "guardians", name: "Guardians", icon: "shield", trait: "Clean sheets and local heroes" },
  { id: "vipers", name: "Vipers", icon: "lightning", trait: "Quick strikes and hostile derbies" },
  { id: "lions", name: "Lions", icon: "crown", trait: "Big-club ambition from nowhere" },
  { id: "carp", name: "Carp", icon: "fish", trait: "Patient build-up and river-town ritual" },
  { id: "hares", name: "Hares", icon: "rabbit", trait: "Speed, chaos, and upset wins" }
];

export const kitPalettes: KitPalette[] = [
  { id: "civic-red", name: "Civic Red", colors: { primary: "#c84036", secondary: "#181511", trim: "#f4f1ec" } },
  { id: "royal-night", name: "Royal Night", colors: { primary: "#172554", secondary: "#facc15", trim: "#f8fafc" } },
  { id: "forest-gold", name: "Forest Gold", colors: { primary: "#166534", secondary: "#f2b705", trim: "#fff7ed" } },
  { id: "river-blue", name: "River Blue", colors: { primary: "#0f766e", secondary: "#ccfbf1", trim: "#111827" } },
  { id: "white-sash", name: "White Sash", colors: { primary: "#f8fafc", secondary: "#111827", trim: "#dc2626" } },
  { id: "blackout", name: "Blackout", colors: { primary: "#111111", secondary: "#3f3f46", trim: "#eab308" } },
  { id: "sky-town", name: "Sky Town", colors: { primary: "#7dd3fc", secondary: "#0f172a", trim: "#ffffff" } },
  { id: "amber-road", name: "Amber Road", colors: { primary: "#d97706", secondary: "#1f2937", trim: "#fff7ed" } },
  { id: "claret-cream", name: "Claret Cream", colors: { primary: "#7f1d1d", secondary: "#fde68a", trim: "#111827" } },
  { id: "mint-graphite", name: "Mint Graphite", colors: { primary: "#5eead4", secondary: "#27272a", trim: "#f8fafc" } },
  { id: "violet-wire", name: "Violet Wire", colors: { primary: "#6d28d9", secondary: "#f5f3ff", trim: "#22c55e" } },
  { id: "orange-slate", name: "Orange Slate", colors: { primary: "#f97316", secondary: "#334155", trim: "#ffedd5" } },
  { id: "cerise-navy", name: "Cerise Navy", colors: { primary: "#be185d", secondary: "#0f172a", trim: "#fdf2f8" } },
  { id: "ice-lime", name: "Ice Lime", colors: { primary: "#e0f2fe", secondary: "#65a30d", trim: "#0f172a" } },
  { id: "sandstorm", name: "Sandstorm", colors: { primary: "#d6ad60", secondary: "#3b2f2f", trim: "#fef3c7" } },
  { id: "neon-rail", name: "Neon Rail", colors: { primary: "#111827", secondary: "#a3e635", trim: "#38bdf8" } },
  { id: "rose-steel", name: "Rose Steel", colors: { primary: "#f43f5e", secondary: "#475569", trim: "#fff1f2" } },
  { id: "ocean-coral", name: "Ocean Coral", colors: { primary: "#0369a1", secondary: "#fb7185", trim: "#ecfeff" } },
  { id: "emerald-white", name: "Emerald White", colors: { primary: "#047857", secondary: "#f8fafc", trim: "#111827" } },
  { id: "purple-gold", name: "Purple Gold", colors: { primary: "#581c87", secondary: "#f59e0b", trim: "#faf5ff" } },
  { id: "steel-red", name: "Steel Red", colors: { primary: "#374151", secondary: "#ef4444", trim: "#f9fafb" } },
  { id: "teal-maroon", name: "Teal Maroon", colors: { primary: "#0f766e", secondary: "#881337", trim: "#f0fdfa" } },
  { id: "gold-black", name: "Gold Black", colors: { primary: "#fbbf24", secondary: "#111827", trim: "#ffffff" } },
  { id: "blue-white", name: "Blue White", colors: { primary: "#2563eb", secondary: "#f8fafc", trim: "#111827" } },
  { id: "green-black", name: "Green Black", colors: { primary: "#16a34a", secondary: "#020617", trim: "#dcfce7" } },
  { id: "pink-charcoal", name: "Pink Charcoal", colors: { primary: "#ec4899", secondary: "#27272a", trim: "#fce7f3" } },
  { id: "crimson-sky", name: "Crimson Sky", colors: { primary: "#991b1b", secondary: "#bae6fd", trim: "#ffffff" } },
  { id: "navy-copper", name: "Navy Copper", colors: { primary: "#0f172a", secondary: "#b45309", trim: "#f8fafc" } },
  { id: "alpine-white", name: "Alpine White", colors: { primary: "#ffffff", secondary: "#0f766e", trim: "#ef4444" } },
  { id: "midnight-lilac", name: "Midnight Lilac", colors: { primary: "#1e1b4b", secondary: "#c4b5fd", trim: "#f8fafc" } }
];

export const clubCultures = [
  "Academy first",
  "Pressing collective",
  "Selling club",
  "Local identity",
  "Veteran leaders",
  "Data recruitment",
  "Cup specialists",
  "Ultra defensive",
  "Free-scoring chaos",
  "Underdog community club",
  "Global talent hub",
  "One-nation project",
  "Hard-nosed rebuild",
  "Technical possession",
  "Loan-to-buy factory",
  "Derby obsessed"
];

export const mottoes = [
  "Earn the shirt.",
  "Built by the city.",
  "No easy away days.",
  "Rise after the whistle.",
  "More than ninety minutes.",
  "From the streets to the stand.",
  "Pride travels.",
  "Win it the hard way.",
  "Every tackle tells.",
  "The next one matters.",
  "Local heart, global nerve.",
  "Pressure makes the badge.",
  "Hold the line.",
  "Run for the crest.",
  "Small club, sharp teeth.",
  "Our ground, our rules.",
  "Make the noise count.",
  "Turn doubt into points.",
  "Play brave, stay humble.",
  "Nobody gets gifted a place."
];

export const academyFocuses = [
  "Explosive wingers",
  "Ball-playing centre-backs",
  "Press-resistant midfielders",
  "Tall target forwards",
  "Homegrown goalkeepers",
  "Two-footed full-backs",
  "Set-piece specialists",
  "Late-blooming local players",
  "High stamina runners",
  "Technical number tens"
];

export const boardStyles = [
  "Patient but strict on wages",
  "Ambitious and transfer-hungry",
  "Obsessed with academy minutes",
  "Data-led and resale focused",
  "Romantic about club legends",
  "Demanding after derby losses",
  "Low budget, high expectation",
  "Global brand dreamers"
];

export const rivalryHooks = [
  "A nearby club keeps stealing your best prospects.",
  "The old city club thinks your new badge is a joke.",
  "Your main rival plays the opposite football identity.",
  "A fallen giant refuses to accept you as a real threat.",
  "The derby winner gets first choice on local youth signings.",
  "Your first promotion race is against a club with twice the budget."
];

export const fanRituals = [
  "Scarves raised in silence before kickoff",
  "A drum line behind the home goal",
  "A one-word chant after every tackle",
  "Supporters wear the secondary colour on derby day",
  "The captain salutes the academy stand after wins",
  "A floodlight clap in the 76th minute"
];

const cityRoots = [
  "Northbridge",
  "Harbour",
  "Ironvale",
  "Stoneford",
  "Kingsport",
  "Redwick",
  "Lakeside",
  "Eastmere",
  "Briar",
  "Riverton",
  "Union Bay",
  "Blackwater",
  "Newbridge",
  "Silvermoor",
  "Oldmarket",
  "Hillcrest",
  "Westhaven",
  "Southgate",
  "Cinderford",
  "Highbury Park"
];

const clubSuffixes = [
  "FC",
  "Athletic",
  "United",
  "City",
  "Rovers",
  "Sporting",
  "Union",
  "Wanderers",
  "County",
  "Republic",
  "Academy",
  "Town"
];

const stadiumRoots = [
  "Foundry",
  "Harbour",
  "Civic",
  "Railway",
  "Riverside",
  "Market Road",
  "North Stand",
  "Copper Lane",
  "Old Gate",
  "Red Wall",
  "Summit",
  "Dockside"
];

function randomIndex(length: number) {
  if (length <= 0) return 0;

  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % length;
  }

  return Math.floor(Math.random() * length);
}

export function randomItem<T>(items: readonly T[]) {
  return items[randomIndex(items.length)];
}

export function createRandomClubName() {
  return `${randomItem(cityRoots)} ${randomItem(clubSuffixes)}`;
}

export function createRandomStadiumName() {
  const suffix = randomItem(["Ground", "Park", "Arena", "Stadium", "Field"]);
  return `${randomItem(stadiumRoots)} ${suffix}`;
}

export function resolveHomeKit(club: CreatedClub): KitColors {
  if (club.homeKitMode === "custom") {
    return club.homeKit;
  }

  return {
    primary: club.mainColors.primary,
    secondary: club.mainColors.secondary,
    trim: "#f4f1ec"
  };
}

export function createRandomClubBlueprint(countries: readonly string[] = creatorCountries): CreatedClub {
  const mainPalette = randomItem(kitPalettes);
  const awayPalette = randomItem(kitPalettes.filter((palette) => palette.id !== mainPalette.id));
  const thirdPalette = randomItem(kitPalettes.filter((palette) => palette.id !== mainPalette.id && palette.id !== awayPalette.id));

  return {
    id: `created-${Date.now()}-${randomIndex(100000)}`,
    name: createRandomClubName(),
    mascotId: randomItem(mascots).id,
    country: randomItem(countries.length ? countries : creatorCountries),
    leagueTier: randomItem([1, 2, 3, 4, 5]),
    motto: randomItem(mottoes),
    culture: randomItem(clubCultures),
    stadiumName: createRandomStadiumName(),
    academyFocus: randomItem(academyFocuses),
    boardStyle: randomItem(boardStyles),
    rivalryHook: randomItem(rivalryHooks),
    fanRitual: randomItem(fanRituals),
    mainColors: {
      primary: mainPalette.colors.primary,
      secondary: mainPalette.colors.secondary
    },
    homeKitMode: "main",
    homeKit: mainPalette.colors,
    awayKit: awayPalette.colors,
    thirdKit: thirdPalette.colors,
    createdAt: Date.now()
  };
}

function normalizeHex(value: unknown, fallback: string) {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function normalizeKit(value: unknown, fallback: KitColors): KitColors {
  const candidate = value && typeof value === "object" ? (value as Partial<KitColors>) : {};

  return {
    primary: normalizeHex(candidate.primary, fallback.primary),
    secondary: normalizeHex(candidate.secondary, fallback.secondary),
    trim: normalizeHex(candidate.trim, fallback.trim)
  };
}

export function normalizeCreatedClub(value: unknown): CreatedClub | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const fallback = createRandomClubBlueprint();
  const candidate = value as Partial<CreatedClub>;
  const mascotId = typeof candidate.mascotId === "string" && mascots.some((mascot) => mascot.id === candidate.mascotId) ? candidate.mascotId : fallback.mascotId;
  const country = typeof candidate.country === "string" && candidate.country.trim() ? candidate.country : fallback.country;
  const leagueTier = Number.isInteger(candidate.leagueTier) && candidate.leagueTier! >= 1 && candidate.leagueTier! <= 5 ? candidate.leagueTier! : fallback.leagueTier;

  return {
    id: typeof candidate.id === "string" ? candidate.id : fallback.id,
    name: typeof candidate.name === "string" && candidate.name.trim() ? candidate.name : fallback.name,
    mascotId,
    country,
    leagueTier,
    motto: typeof candidate.motto === "string" && candidate.motto.trim() ? candidate.motto : fallback.motto,
    culture: typeof candidate.culture === "string" && candidate.culture.trim() ? candidate.culture : fallback.culture,
    stadiumName: typeof candidate.stadiumName === "string" && candidate.stadiumName.trim() ? candidate.stadiumName : fallback.stadiumName,
    academyFocus: typeof candidate.academyFocus === "string" && candidate.academyFocus.trim() ? candidate.academyFocus : fallback.academyFocus,
    boardStyle: typeof candidate.boardStyle === "string" && candidate.boardStyle.trim() ? candidate.boardStyle : fallback.boardStyle,
    rivalryHook: typeof candidate.rivalryHook === "string" && candidate.rivalryHook.trim() ? candidate.rivalryHook : fallback.rivalryHook,
    fanRitual: typeof candidate.fanRitual === "string" && candidate.fanRitual.trim() ? candidate.fanRitual : fallback.fanRitual,
    mainColors: {
      primary: normalizeHex(candidate.mainColors?.primary, fallback.mainColors.primary),
      secondary: normalizeHex(candidate.mainColors?.secondary, fallback.mainColors.secondary)
    },
    homeKitMode: candidate.homeKitMode === "custom" ? "custom" : "main",
    homeKit: normalizeKit(candidate.homeKit, fallback.homeKit),
    awayKit: normalizeKit(candidate.awayKit, fallback.awayKit),
    thirdKit: normalizeKit(candidate.thirdKit, fallback.thirdKit),
    createdAt: typeof candidate.createdAt === "number" ? candidate.createdAt : Date.now()
  };
}

export function normalizeCreatedClubList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => normalizeCreatedClub(item)).filter((item): item is CreatedClub => Boolean(item));
}
