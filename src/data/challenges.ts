export type Challenge = {
  id: string;
  title: string;
  category:
    | "Identity"
    | "Recruitment"
    | "Academy"
    | "Tactics"
    | "Finance"
    | "Squad"
    | "Roleplay"
    | "Hardcore";
  intensity: "Calm" | "Strict" | "Brutal";
  summary: string;
  rules: string[];
};

export const challengeDeck: Challenge[] = [
  {
    id: "athletic-policy",
    title: "Athletic Policy",
    category: "Identity",
    intensity: "Brutal",
    summary: "Run the club with a hard regional identity, inspired by the most famous self-imposed recruitment rule in football.",
    rules: [
      "Only sign players born in your club country or from one chosen neighbouring region.",
      "Academy scouts must stay inside that same identity region.",
      "If the game already gives you an outsider, they can stay, but you cannot renew them after season two."
    ]
  },
  {
    id: "moneyball-ledger",
    title: "Moneyball Ledger",
    category: "Recruitment",
    intensity: "Strict",
    summary: "Recruit like a data department: value, role fit, and resale matter more than overall rating.",
    rules: [
      "Every paid signing must be cheaper than the average fee received from your last three sales.",
      "Do not sign a player unless they are replacing a specific role in your tactic.",
      "Sell any player whose market value doubles before they reach 25, unless they are club captain."
    ]
  },
  {
    id: "academy-only",
    title: "Academy Only",
    category: "Academy",
    intensity: "Brutal",
    summary: "The transfer market is shut. Your future comes from scouts, loans out, and patience.",
    rules: [
      "No permanent signings after the first day of the save.",
      "You may sign one emergency free agent only if you have no fit senior player in that position.",
      "At least half of every matchday squad must be club-grown by season three."
    ]
  },
  {
    id: "director-of-football",
    title: "Director Of Football",
    category: "Roleplay",
    intensity: "Strict",
    summary: "You are the head coach, not the recruitment department. The market gets decided by rules outside your control.",
    rules: [
      "Before each window, randomly choose three positions you are allowed to sign.",
      "For each position, shortlist the first five realistic players you find and sign from that list only.",
      "If an offer arrives for a player above your club reputation, the director accepts it."
    ]
  },
  {
    id: "one-nation-project",
    title: "One Nation Project",
    category: "Identity",
    intensity: "Strict",
    summary: "Turn the club into a national-team pipeline with a clear cultural spine.",
    rules: [
      "At least seven players in every starting XI must share one chosen nationality.",
      "Your captain and vice captain must both fit the nationality rule.",
      "Foreign signings must be under 23 and cannot be your highest earner."
    ]
  },
  {
    id: "selling-club",
    title: "Selling Club Dynasty",
    category: "Finance",
    intensity: "Brutal",
    summary: "You are allowed to become great, but never allowed to become comfortable.",
    rules: [
      "Accept the first bid from a club in a higher reputation bracket for your top-value player each summer.",
      "Spend no more than 70 percent of transfer income in the same window.",
      "Replace sold stars with two players: one immediate starter and one project player."
    ]
  },
  {
    id: "no-wonderkid-database",
    title: "No Wonderkid Database",
    category: "Recruitment",
    intensity: "Strict",
    summary: "Kill the usual search-meta. You can only sign players your save has actually revealed.",
    rules: [
      "No searching by name unless the player appears in your scout reports, match, shortlist, or news feed.",
      "Scout a player for at least 30 in-game days before making a bid.",
      "If you already know a famous hidden gem, you are banned from signing them for two seasons."
    ]
  },
  {
    id: "loan-army",
    category: "Squad",
    title: "Loan Army",
    intensity: "Strict",
    summary: "Build through temporary deals, prove players belong, then decide who earns a permanent place.",
    rules: [
      "At least three starting XI players must be loans in season one.",
      "You can only buy a loan player permanently after they hit 25 appearances.",
      "Any loan player who finishes as top scorer or top assister must be your first transfer target."
    ]
  },
  {
    id: "tactical-monastery",
    title: "Tactical Monastery",
    category: "Tactics",
    intensity: "Strict",
    summary: "One tactical idea must survive bad form. Recruitment adapts to the tactic, not the other way around.",
    rules: [
      "Choose one formation before the first league match and keep it for the full season.",
      "You may change roles and instructions, but never the base shape.",
      "Every signing must be clearly suited to one position in that system."
    ]
  },
  {
    id: "veterans-last-dance",
    title: "Veterans Last Dance",
    category: "Squad",
    intensity: "Calm",
    summary: "Build a romantic save around older players, short contracts, and one final push.",
    rules: [
      "At least four outfield starters must be 30 or older.",
      "You can sign only one player under 24 per season.",
      "If a veteran wins player of the season, renew them even if their overall drops."
    ]
  },
  {
    id: "relegation-scar",
    title: "Relegation Scar",
    category: "Hardcore",
    intensity: "Brutal",
    summary: "Pretend the club has just survived a financial scare and must rebuild without shortcuts.",
    rules: [
      "Sell two starters before making any signing.",
      "Your first three signings must come from free agents, loans, or lower divisions.",
      "No transfer fee above your largest outgoing fee for two full windows."
    ]
  },
  {
    id: "derby-law",
    title: "Derby Law",
    category: "Roleplay",
    intensity: "Strict",
    summary: "Rivalries have consequences. Big matches shape selection, transfers, and reputation.",
    rules: [
      "Lose a derby and your highest-paid player misses the next league match.",
      "Win a derby and you may make one rivalry-themed signing from the opponent country or region.",
      "You cannot sign directly from your main rival unless you beat them twice in a season."
    ]
  },
  {
    id: "wage-cap",
    title: "Wage Cap",
    category: "Finance",
    intensity: "Strict",
    summary: "Make the dressing room believable. Stars can exist, but the squad structure has to make sense.",
    rules: [
      "Your top earner cannot make more than three times the fifth-highest earner.",
      "Any new signing above the wage cap must trigger one sale in the same position group.",
      "Academy graduates who become starters must be renewed before you make a signing in their role."
    ]
  },
  {
    id: "continent-passport",
    title: "Continent Passport",
    category: "Recruitment",
    intensity: "Calm",
    summary: "Create a scouting network that evolves instead of signing from the same obvious places.",
    rules: [
      "Every transfer window must include a scout assignment in a new country.",
      "No more than two signings from the same nation in a single season.",
      "By season three, your squad must include players from at least five nations."
    ]
  },
  {
    id: "role-locked-xi",
    title: "Role-Locked XI",
    category: "Tactics",
    intensity: "Strict",
    summary: "Every starter has a defined job. You cannot stack generic all-rounders everywhere.",
    rules: [
      "Write down one role for each starting position before the season starts.",
      "A player can only start if their attributes or traits suit that role.",
      "If you change a role, you must give the previous role holder three matches to adapt."
    ]
  },
  {
    id: "homegrown-core",
    title: "Homegrown Core",
    category: "Academy",
    intensity: "Strict",
    summary: "A slower youth challenge that still lets you use the market when the squad needs realism.",
    rules: [
      "At least four matchday squad players must be academy graduates by season two.",
      "One academy player must be assigned a permanent squad number below 30 each season.",
      "You cannot buy a player in a position where you have an academy prospect within five overall."
    ]
  },
  {
    id: "captain-runs-the-club",
    title: "Captain Runs The Club",
    category: "Roleplay",
    intensity: "Calm",
    summary: "The captain becomes the save’s main character and influences squad decisions.",
    rules: [
      "Your captain must start every important match unless injured or suspended.",
      "Every summer signing must share either nationality, position group, or age profile with the captain.",
      "If the captain leaves, the next captain must be chosen from players already at the club."
    ]
  },
  {
    id: "no-repeat-window",
    title: "No Repeat Window",
    category: "Recruitment",
    intensity: "Strict",
    summary: "Stop repeating the same transfer habits window after window.",
    rules: [
      "If you sign a striker in one window, you cannot sign another striker in the next.",
      "You cannot use the same selling league twice in a row.",
      "At least one signing per season must be a player you had never heard of before the save."
    ]
  },
  {
    id: "release-clause-chaos",
    title: "Release Clause Chaos",
    category: "Finance",
    intensity: "Brutal",
    summary: "Add volatility to squad building by making contracts dangerous.",
    rules: [
      "Every important player under 26 must have a release clause.",
      "If a bid meets 85 percent of that clause, accept it as if the player is pushing to leave.",
      "You may remove one release clause per season as your loyalty exception."
    ]
  },
  {
    id: "first-xi-draft",
    title: "First XI Draft",
    category: "Hardcore",
    intensity: "Brutal",
    summary: "Randomness decides who matters. You have to build around an imperfect core.",
    rules: [
      "Randomly choose five current players before the first match. They are protected starters for season one.",
      "You cannot sell protected players unless a top-tier club bids for them.",
      "All transfers must support those five players rather than replacing them."
    ]
  }
];

export const boardPromises = [
  "Restore the club identity before chasing trophies.",
  "Cut the wage bill without killing ambition.",
  "Turn one overlooked player into the face of the save.",
  "Win the local argument before chasing Europe.",
  "Build a team that could still make sense in real life.",
  "Create a selling club that never feels like a feeder club."
];

export const transferRules = [
  "Maximum three permanent signings in the first summer.",
  "One incoming player must be from a lower division.",
  "No player over 26 unless they are a free transfer.",
  "Sell any player who receives a bid from a club two tiers above your reputation.",
  "Never sign from a direct league rival in season one.",
  "Every fee above the club average must be balanced by an academy promotion."
];

export const tacticalRules = [
  "Base shape must include two natural wide players.",
  "One midfielder must stay on balanced instructions all season.",
  "Change formation only after back-to-back defeats.",
  "Your captain must play in the central channel.",
  "At least one fullback must be converted to a new role.",
  "Pressing intensity starts low and can only rise after a clean-sheet run."
];

export const academyRules = [
  "Scout one domestic region first, then one wild-card country.",
  "Promote the first academy player above 62 overall, whatever their position.",
  "Give every academy graduate a cup debut within two months.",
  "Sell a veteran when an academy player reaches 15 senior appearances.",
  "Never loan out a youth player twice in a row.",
  "Name one academy player as the project player before kickoff."
];

export const saveHooks = [
  "A fan-owned revival with no appetite for shortcuts.",
  "A fallen name trying to remember what made it feared.",
  "A newly ambitious board with a dangerously short timeline.",
  "A tactical lab where one weird idea has to become a real identity.",
  "A regional pride save built around local players and hostile away days.",
  "A selling-club dynasty where every star eventually funds the next one."
];
