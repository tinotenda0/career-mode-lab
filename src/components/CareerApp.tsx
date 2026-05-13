"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  ArrowsClockwise,
  Binoculars,
  BookmarkSimple,
  CheckCircle,
  DiceFive,
  Funnel,
  MagnifyingGlass,
  NotePencil,
  ShieldCheck,
  SoccerBall,
  Target,
  Trophy,
  WarningCircle,
  X
} from "@phosphor-icons/react";
import {
  academyRules,
  boardPromises,
  challengeDeck,
  saveHooks,
  tacticalRules,
  transferRules,
  type Challenge
} from "@/src/data/challenges";

type Club = {
  id: string;
  name: string;
  shortName: string;
  abbreviation: string;
  country: string;
  countryCode: string;
  region: "Europe" | "North America" | "South America" | "Asia";
  league: string;
  leagueId: string;
  tier: number;
  crestUrl: string | null;
  crestKind: "actual" | "generated";
  primaryColor: string | null;
  alternateColor: string | null;
  source: "espn" | "manual";
  isMajor: boolean;
  tags: string[];
};

type League = {
  id: string;
  country: string;
  countryCode: string;
  region: Club["region"];
  tier: number;
  name: string;
  expectedTeams: number;
  actualTeams: number;
  actualCrests: number;
  sourceStatus: "live" | "manual" | "fallback" | "empty";
};

type CountrySummary = {
  country: string;
  countryCode: string;
  leagues: number;
  clubs: number;
  actualCrests: number;
};

type ClubsPayload = {
  generatedAt: string;
  clubs: Club[];
  leagues: League[];
  countries: CountrySummary[];
  totals: {
    clubs: number;
    leagues: number;
    countries: number;
    actualCrests: number;
    liveLeagues: number;
  };
  sourceNotes: Array<{
    leagueId: string;
    league: string;
    country: string;
    status: string;
    note: string;
  }>;
};

type CareerPlan = {
  id: string;
  club: Club;
  hook: string;
  boardPromise: string;
  transferRule: string;
  tacticalRule: string;
  academyRule: string;
  firstSeasonTarget: string;
  saveCode: string;
  challenge: Challenge;
};

const tabs = ["Start", "Clubs", "Challenges", "History"] as const;
type Tab = (typeof tabs)[number];

const difficultyProfiles = ["Balanced", "Underdog", "Chaos"] as const;
type Difficulty = (typeof difficultyProfiles)[number];

const seasonTargets = [
  "Name three untouchable players before kickoff and build around them for one season.",
  "Let the first bad run create a squad consequence: sell, bench, or change captain.",
  "Keep a transfer ledger and explain every signing with one football reason.",
  "Choose one cult hero candidate and give them a real role, even if they are not optimal.",
  "No save restarts for injuries, red cards, or ugly away losses.",
  "Every window must leave one obvious weakness unresolved."
];

const MEMORY_KEY = "career-mode-lab:memory:v2";
const LEGACY_SAVES_KEY = "career-mode-lab:saves";

type BrowserMemory = {
  activeTab: Tab;
  selectedCountries: string[];
  selectedTiers: number[];
  difficulty: Difficulty;
  query: string;
  currentCareer: CareerPlan | null;
  drawnChallengeId: string;
  savedCareers: CareerPlan[];
  careerHistory: CareerPlan[];
};

function randomIndex(length: number) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % length;
}

function pick<T>(items: T[]) {
  return items[randomIndex(items.length)];
}

function makeSaveCode(club: Club, difficulty: Difficulty) {
  const core = `${club.countryCode}-${club.abbreviation}-${difficulty.slice(0, 3)}`.toUpperCase();
  const suffix = Math.floor(140 + Math.random() * 760);
  return `${core}-${suffix}`;
}

function createCareerPlan(club: Club, difficulty: Difficulty): CareerPlan {
  return {
    id: `${club.id}-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    club,
    hook: pick(saveHooks),
    boardPromise: pick(boardPromises),
    transferRule: pick(transferRules),
    tacticalRule: pick(tacticalRules),
    academyRule: pick(academyRules),
    firstSeasonTarget: difficulty === "Chaos" ? pick(seasonTargets.slice(0, 4)) : pick(seasonTargets),
    saveCode: makeSaveCode(club, difficulty),
    challenge: pick(challengeDeck)
  };
}

function isTab(value: unknown): value is Tab {
  return typeof value === "string" && tabs.includes(value as Tab);
}

function isDifficulty(value: unknown): value is Difficulty {
  return typeof value === "string" && difficultyProfiles.includes(value as Difficulty);
}

function normalizeChallenge(id: unknown) {
  if (typeof id !== "string") {
    return challengeDeck[0];
  }

  return challengeDeck.find((challenge) => challenge.id === id) ?? challengeDeck[0];
}

function normalizeCareerPlan(value: unknown): CareerPlan | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<CareerPlan>;

  if (!candidate.club?.name || !candidate.saveCode) {
    return null;
  }

  return {
    ...(candidate as CareerPlan),
    challenge: normalizeChallenge(candidate.challenge?.id)
  };
}

function normalizeCareerList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => normalizeCareerPlan(item)).filter((item): item is CareerPlan => Boolean(item));
}

function readBrowserMemory(): Partial<BrowserMemory> | null {
  try {
    const stored = window.localStorage.getItem(MEMORY_KEY);

    if (stored) {
      return JSON.parse(stored) as Partial<BrowserMemory>;
    }

    const legacySaves = window.localStorage.getItem(LEGACY_SAVES_KEY);

    if (legacySaves) {
      return {
        savedCareers: normalizeCareerList(JSON.parse(legacySaves))
      };
    }

    return null;
  } catch {
    return null;
  }
}

function writeBrowserMemory(memory: BrowserMemory) {
  window.localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

function getTierLabel(tier: number) {
  if (tier === 1) return "Top tier";
  if (tier === 2) return "Second tier";
  if (tier === 3) return "Third tier";
  return `Tier ${tier}`;
}

function getMonogram(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function Crest({ club, size = "md" }: { club: Club; size?: "sm" | "md" | "lg" }) {
  const [failed, setFailed] = useState(false);
  const sizeClass = size === "lg" ? "h-24 w-24" : size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const textClass = size === "lg" ? "text-2xl" : "text-sm";

  if (club.crestUrl && !failed) {
    return (
      <span className={`${sizeClass} crest-shell bg-[color-mix(in_oklch,var(--ink)_92%,var(--surface))]`}>
        <img
          src={club.crestUrl}
          alt={`${club.name} crest`}
          className="h-[76%] w-[76%] object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      className={`${sizeClass} crest-shell generated-crest ${textClass}`}
      style={{
        "--crest-a": club.primaryColor ?? "oklch(54% 0.16 28)",
        "--crest-b": club.alternateColor ?? "oklch(24% 0.018 70)"
      } as CSSProperties}
      aria-label={`${club.name} generated crest`}
    >
      {getMonogram(club.shortName)}
    </span>
  );
}

function SkeletonApp() {
  return (
    <div className="grid gap-4">
      <div className="skeleton h-[360px] rounded-[1.5rem]" />
      <div className="grid gap-4">
        <div className="skeleton h-48 rounded-[1.5rem]" />
        <div className="skeleton h-48 rounded-[1.5rem]" />
      </div>
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-t border-[var(--border)] py-3">
      <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{label}</dt>
      <dd className="mt-1 font-mono text-xl text-[var(--ink)]">{value}</dd>
    </div>
  );
}

export default function CareerApp() {
  const [payload, setPayload] = useState<ClubsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Start");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<number[]>([1, 2, 3]);
  const [difficulty, setDifficulty] = useState<Difficulty>("Balanced");
  const [query, setQuery] = useState("");
  const [career, setCareer] = useState<CareerPlan | null>(null);
  const [drawnChallenge, setDrawnChallenge] = useState<Challenge>(challengeDeck[0]);
  const [savedCareers, setSavedCareers] = useState<CareerPlan[]>([]);
  const [careerHistory, setCareerHistory] = useState<CareerPlan[]>([]);
  const [memoryReady, setMemoryReady] = useState(false);
  const [pendingReroll, setPendingReroll] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadClubs() {
      try {
        setLoading(true);
        const response = await fetch("/api/clubs");

        if (!response.ok) {
          throw new Error(`Club source returned ${response.status}`);
        }

        const data = (await response.json()) as ClubsPayload;

        if (!mounted) return;
        const memory = readBrowserMemory();
        const countryNames = data.countries.map((country) => country.country);
        const restoredCountries =
          Array.isArray(memory?.selectedCountries) && memory.selectedCountries.length
            ? memory.selectedCountries.filter((country) => countryNames.includes(country))
            : countryNames;
        const restoredTiers =
          Array.isArray(memory?.selectedTiers) && memory.selectedTiers.length
            ? memory.selectedTiers.filter((tier) => Number.isInteger(tier) && tier >= 1 && tier <= 5)
            : [1, 2, 3];
        const restoredDifficulty = isDifficulty(memory?.difficulty) ? memory.difficulty : "Balanced";
        const restoredCareer = normalizeCareerPlan(memory?.currentCareer);
        const restoredSavedCareers = normalizeCareerList(memory?.savedCareers);
        const restoredHistory = normalizeCareerList(memory?.careerHistory);
        const initialCareer = restoredCareer ?? createCareerPlan(data.clubs[randomIndex(data.clubs.length)], restoredDifficulty);
        const initialHistory = restoredHistory.length
          ? restoredCareer
            ? restoredHistory
            : [initialCareer, ...restoredHistory]
          : [initialCareer];

        setPayload(data);
        setSelectedCountries(restoredCountries.length ? restoredCountries : countryNames);
        setSelectedTiers(restoredTiers.length ? restoredTiers : [1, 2, 3]);
        setDifficulty(restoredDifficulty);
        setQuery(typeof memory?.query === "string" ? memory.query : "");
        setActiveTab(isTab(memory?.activeTab) ? memory.activeTab : "Start");
        setCareer(initialCareer);
        setDrawnChallenge(normalizeChallenge(memory?.drawnChallengeId));
        setSavedCareers(restoredSavedCareers);
        setCareerHistory(initialHistory);
        setMemoryReady(true);
      } catch (loadError) {
        if (!mounted) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load clubs.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadClubs();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!memoryReady) {
      return;
    }

    writeBrowserMemory({
      activeTab,
      selectedCountries,
      selectedTiers,
      difficulty,
      query,
      currentCareer: career,
      drawnChallengeId: drawnChallenge.id,
      savedCareers,
      careerHistory
    });
  }, [activeTab, career, careerHistory, difficulty, drawnChallenge.id, memoryReady, query, savedCareers, selectedCountries, selectedTiers]);

  const countries = payload?.countries ?? [];
  const allClubs = payload?.clubs ?? [];

  const filteredClubs = useMemo(() => {
    return allClubs.filter((club) => {
      const countryMatch = selectedCountries.includes(club.country);
      const tierMatch = selectedTiers.includes(club.tier);
      const difficultyMatch = difficulty === "Underdog" ? !club.isMajor && club.tier >= 2 : true;
      return countryMatch && tierMatch && difficultyMatch;
    });
  }, [allClubs, difficulty, selectedCountries, selectedTiers]);

  const searchableClubs = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return filteredClubs;
    }

    return filteredClubs.filter((club) =>
      [club.name, club.country, club.league, club.abbreviation].some((value) => value.toLowerCase().includes(term))
    );
  }, [filteredClubs, query]);

  const groupedClubs = useMemo(() => {
    return searchableClubs.reduce<Record<string, Club[]>>((acc, club) => {
      acc[club.country] ??= [];
      acc[club.country].push(club);
      return acc;
    }, {});
  }, [searchableClubs]);

  function toggleCountry(country: string) {
    setSelectedCountries((current) =>
      current.includes(country) ? current.filter((item) => item !== country) : [...current, country]
    );
  }

  function toggleTier(tier: number) {
    setSelectedTiers((current) =>
      current.includes(tier) ? current.filter((item) => item !== tier) : [...current, tier].sort((a, b) => a - b)
    );
  }

  function commitCareerPlan(plan: CareerPlan) {
    setCareer(plan);
    setCareerHistory((current) => [plan, ...current]);
  }

  function generateCareerFromPool() {
    if (!filteredClubs.length) {
      return;
    }

    const weightedPool = filteredClubs.flatMap((club) => {
      const baseWeight = difficulty === "Chaos" ? 1 : Math.max(1, 5 - club.tier);
      const majorPenalty = difficulty === "Underdog" && club.isMajor ? 0 : 1;
      return Array.from({ length: baseWeight * majorPenalty }, () => club);
    });

    const pool = weightedPool.length ? weightedPool : filteredClubs;
    commitCareerPlan(createCareerPlan(pick(pool), difficulty));
  }

  function requestReroll() {
    if (!filteredClubs.length || loading) {
      return;
    }

    if (career) {
      setPendingReroll(true);
      return;
    }

    generateCareerFromPool();
  }

  function confirmReroll() {
    setPendingReroll(false);
    generateCareerFromPool();
  }

  function drawChallenge() {
    const next = pick(challengeDeck.filter((challenge) => challenge.id !== drawnChallenge.id));
    setDrawnChallenge(next);
  }

  function saveCareer() {
    if (!career) return;
    setSavedCareers((current) => [career, ...current.filter((item) => item.id !== career.id)]);
  }

  function removeSaved(id: string) {
    setSavedCareers((current) => current.filter((careerItem) => careerItem.id !== id));
  }

  const crestCoverage = payload?.totals.actualCrests ?? 0;

  return (
    <main className="min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[var(--phone-stage)] text-[var(--ink)]">
      <div className="fixed inset-0 pointer-events-none grain" />
      <div className="mobile-shell relative mx-auto min-h-[100dvh] w-full max-w-[430px] overflow-x-hidden bg-[var(--background)] pb-28 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_90px_rgba(18,16,14,0.35)]">

      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color-mix(in_oklch,var(--background)_88%,transparent)] backdrop-blur-xl">
        <nav className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            className="group flex items-center gap-3 rounded-full pr-3 text-left transition-transform active:scale-[0.98]"
            onClick={() => setActiveTab("Start")}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-[var(--surface)]">
              <SoccerBall size={20} weight="duotone" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">Career Mode Lab</span>
              <span className="block text-xs text-[var(--muted)]">Mobile save builder</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={requestReroll}
              disabled={!filteredClubs.length || loading}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--surface)] transition hover:brightness-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <DiceFive size={18} weight="bold" />
              Reroll
            </button>
          </div>
        </nav>
      </header>

      <section className="px-4 pb-7 pt-8">
        <div className="grid gap-7">
          <div className="max-w-6xl">
            <h1 className="text-pretty font-display text-[clamp(2.35rem,13vw,3.35rem)] font-black leading-[0.88] tracking-[-0.04em]">
              Career mode, but with teeth.
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              Pull from hundreds of clubs across the leagues you listed, then turn the pick into a rulebook, a board promise, and a season-one story.
            </p>
            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={requestReroll}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-sm font-semibold text-[var(--surface)] transition hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Start a save
                <ArrowRight size={18} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("Clubs")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Browse clubs
                <Binoculars size={18} weight="bold" />
              </button>
            </div>
          </div>

          <div className="media-reveal overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--ink)] p-3 shadow-[0_34px_80px_-54px_rgba(50,35,18,0.55)]">
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.2rem] bg-[var(--ink-soft)] p-5 text-[var(--surface)]">
              <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_0%,oklch(62%_0.15_28),transparent_34%),radial-gradient(circle_at_90%_70%,oklch(70%_0.08_145),transparent_28%)]" />
              <div className="relative flex h-full min-h-[240px] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color-mix(in_oklch,var(--surface)_72%,transparent)]">
                    Save brief
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-[color-mix(in_oklch,var(--surface)_78%,transparent)]">
                    {difficulty}
                  </span>
                </div>
                {career ? (
                  <div className="mt-12">
                    <Crest club={career.club} size="lg" />
                    <h2 className="mt-5 text-4xl font-black tracking-[-0.04em]">{career.club.shortName}</h2>
                    <p className="mt-2 text-sm text-[color-mix(in_oklch,var(--surface)_72%,transparent)]">
                      {career.club.league}, {career.club.country}. {career.hook}
                    </p>
                  </div>
                ) : (
                  <div className="mt-12 max-w-sm">
                    <h2 className="text-3xl font-black tracking-[-0.04em]">Waiting for clubs</h2>
                    <p className="mt-2 text-sm text-[color-mix(in_oklch,var(--surface)_72%,transparent)]">
                      The source layer is loading current teams and crests.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 px-4 py-5">
        {loading ? (
          <div>
            <SkeletonApp />
          </div>
        ) : error ? (
          <div className="rounded-[1.5rem] border border-[var(--error)] bg-[color-mix(in_oklch,var(--error)_9%,var(--surface))] p-5">
            <div className="flex items-start gap-3">
              <WarningCircle size={24} weight="duotone" className="text-[var(--error)]" />
              <div>
                <h2 className="text-xl font-black tracking-tight">Club data did not load</h2>
                <p className="mt-2 max-w-[60ch] text-sm leading-6 text-[var(--muted)]">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "Start" && (
              <>
                <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_54px_-42px_rgba(50,35,18,0.55)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black tracking-[-0.03em]">Career setup</h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        Pick the save pool, choose the mood, then let the app produce a club and rules.
                      </p>
                    </div>
                    <Funnel size={24} weight="duotone" className="text-[var(--accent)]" />
                  </div>

                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Difficulty mood</label>
                      <div className="grid grid-cols-3 gap-2">
                        {difficultyProfiles.map((profile) => (
                          <button
                            key={profile}
                            type="button"
                            onClick={() => setDifficulty(profile)}
                            className={`rounded-full border px-3 py-3 text-sm font-semibold transition active:scale-[0.98] ${
                              difficulty === profile
                                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]"
                                : "border-[var(--border)] bg-[var(--background)] text-[var(--ink)] hover:border-[var(--ink)]"
                            }`}
                          >
                            {profile}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Countries</label>
                        <button
                          type="button"
                          onClick={() => setSelectedCountries(selectedCountries.length === countries.length ? [] : countries.map((country) => country.country))}
                          className="text-xs font-semibold text-[var(--accent)]"
                        >
                          {selectedCountries.length === countries.length ? "Clear" : "All"}
                        </button>
                      </div>
                      <div className="country-strip -mx-5 flex max-w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 pb-2">
                        {countries.map((country) => {
                          const active = selectedCountries.includes(country.country);
                          return (
                            <button
                              key={country.country}
                              type="button"
                              onClick={() => toggleCountry(country.country)}
                              className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold transition active:scale-[0.98] ${
                                active
                                  ? "border-[var(--accent)] bg-[color-mix(in_oklch,var(--accent)_11%,var(--surface))] text-[var(--ink)]"
                                  : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)]"
                              }`}
                            >
                              {country.country}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">League tiers</label>
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => toggleTier(tier)}
                            className={`rounded-xl border py-3 font-mono text-sm transition active:scale-[0.98] ${
                              selectedTiers.includes(tier)
                                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]"
                                : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)]"
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs leading-5 text-[var(--muted)]">
                        England includes five major divisions. Spain and Germany include three tiers. Most other countries include the top two.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={requestReroll}
                      disabled={!filteredClubs.length}
                      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-black text-[var(--surface)] transition hover:brightness-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ArrowsClockwise size={20} weight="bold" />
                      Randomize from {filteredClubs.length} clubs
                    </button>
                  </div>
                </section>

                <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_54px_-42px_rgba(50,35,18,0.55)]">
                  {career ? (
                    <div className="flex h-full flex-col">
                      <div className="flex items-start gap-4">
                        <Crest club={career.club} size="md" />
                        <div className="min-w-0">
                          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{career.saveCode}</p>
                          <h2 className="mt-1 break-words text-3xl font-black tracking-[-0.04em]">{career.club.name}</h2>
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {career.club.league}, {career.club.country}. {getTierLabel(career.club.tier)}.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3">
                        {[
                          ["Story", career.hook],
                          ["Board promise", career.boardPromise],
                          ["Transfer rule", career.transferRule],
                          ["Tactical rule", career.tacticalRule],
                          ["Academy rule", career.academyRule],
                          ["House rule", career.firstSeasonTarget]
                        ].map(([label, value]) => (
                          <div key={label} className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
                            <p className="mt-1 break-words text-sm leading-6 text-[var(--ink)]">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 grid gap-3">
                        <button
                          type="button"
                          onClick={saveCareer}
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 text-sm font-bold text-[var(--surface)] transition active:scale-[0.98]"
                        >
                          <BookmarkSimple size={18} weight="bold" />
                          Save brief
                        </button>
                        <button
                          type="button"
                          onClick={() => setDrawnChallenge(career.challenge)}
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-bold text-[var(--ink)] transition active:scale-[0.98]"
                        >
                          <Target size={18} weight="bold" />
                          Use challenge
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid min-h-[360px] place-items-center text-center">
                      <div>
                        <ShieldCheck size={36} weight="duotone" className="mx-auto text-[var(--accent)]" />
                        <h2 className="mt-3 text-2xl font-black tracking-tight">No club selected</h2>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
                          Adjust the filters or bring at least one country and tier back into the pool.
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <h2 className="text-xl font-black tracking-tight">Source coverage</h2>
                  <dl className="mt-4">
                    <StatLine label="Countries" value={payload?.totals.countries ?? 0} />
                    <StatLine label="Leagues" value={payload?.totals.leagues ?? 0} />
                    <StatLine label="Clubs" value={payload?.totals.clubs ?? 0} />
                    <StatLine label="Actual crests loaded" value={crestCoverage} />
                  </dl>
                </section>

                <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--ink)] p-5 text-[var(--surface)]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black tracking-tight">Challenge draw</h2>
                    <button
                      type="button"
                      onClick={drawChallenge}
                      className="rounded-full border border-white/15 p-2 transition active:scale-[0.94]"
                      aria-label="Draw another challenge"
                    >
                      <ArrowsClockwise size={18} weight="bold" />
                    </button>
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[color-mix(in_oklch,var(--surface)_58%,transparent)]">
                    {drawnChallenge.category} / {drawnChallenge.intensity}
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">{drawnChallenge.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color-mix(in_oklch,var(--surface)_72%,transparent)]">{drawnChallenge.summary}</p>
                </section>

                <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <h2 className="text-xl font-black tracking-tight">Live leagues</h2>
                  <div className="mt-4 space-y-3">
                    {payload?.leagues.slice(0, 6).map((league) => (
                      <div key={league.id} className="flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
                        <div>
                          <p className="text-sm font-bold">{league.name}</p>
                          <p className="text-xs text-[var(--muted)]">{league.country}</p>
                        </div>
                        <span className="font-mono text-sm text-[var(--muted)]">{league.actualTeams}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === "Clubs" && (
              <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="grid gap-5">
                  <div>
                    <h2 className="text-3xl font-black tracking-[-0.04em]">Club collection</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      Search all loaded clubs. ESPN-backed teams display actual crest images, while manual pools use generated shields when no open crest is available.
                    </p>
                  </div>
                  <label className="relative block">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                      <MagnifyingGlass size={18} weight="bold" />
                    </span>
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search club, country, league"
                      className="h-14 w-full rounded-full border border-[var(--border)] bg-[var(--background)] pl-12 pr-4 text-base outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[color-mix(in_oklch,var(--accent)_18%,transparent)]"
                    />
                  </label>
                </div>

                <div className="mt-6 max-h-[68vh] overflow-y-auto pr-1">
                  {Object.entries(groupedClubs).length ? (
                    Object.entries(groupedClubs).map(([country, clubs]) => (
                      <div key={country} className="border-t border-[var(--border)] py-4">
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-lg font-black tracking-tight">{country}</h3>
                          <span className="font-mono text-xs text-[var(--muted)]">{clubs.length} clubs</span>
                        </div>
                        <div className="grid gap-2">
                          {clubs.map((club) => (
                            <button
                              key={club.id}
                              type="button"
                              onClick={() => {
                                commitCareerPlan(createCareerPlan(club, difficulty));
                                setActiveTab("Start");
                              }}
                              className="group flex min-h-20 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3 text-left transition hover:-translate-y-0.5 hover:border-[var(--ink)] active:scale-[0.98]"
                            >
                              <Crest club={club} size="sm" />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-bold">{club.name}</span>
                                <span className="mt-1 block truncate text-xs text-[var(--muted)]">
                                  {club.league}, {getTierLabel(club.tier)}
                                </span>
                              </span>
                              {club.crestKind === "actual" ? (
                                <CheckCircle size={18} weight="fill" className="text-[var(--success)]" />
                              ) : (
                                <ShieldCheck size={18} weight="duotone" className="text-[var(--muted)]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="grid min-h-80 place-items-center rounded-[1.5rem] border border-dashed border-[var(--border)] bg-[var(--background)] text-center">
                      <div className="max-w-sm p-6">
                        <MagnifyingGlass size={34} weight="duotone" className="mx-auto text-[var(--accent)]" />
                        <h3 className="mt-3 text-2xl font-black tracking-tight">No clubs found</h3>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                          Clear the search or bring more countries and tiers back into the setup pool.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeTab === "Challenges" && (
              <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="grid gap-5">
                  <div>
                    <h2 className="text-3xl font-black tracking-[-0.04em]">Challenge room</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      Pick from 20 player-made save formats built around recruitment limits, roleplay, academy paths, and squad rules.
                    </p>
                    <button
                      type="button"
                      onClick={drawChallenge}
                      className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--ink)] px-5 text-sm font-bold text-[var(--surface)] transition active:scale-[0.98]"
                    >
                      <DiceFive size={18} weight="bold" />
                      Draw challenge
                    </button>
                  </div>
                  <article className="rounded-[1.5rem] bg-[var(--ink)] p-5 text-[var(--surface)]">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[color-mix(in_oklch,var(--surface)_58%,transparent)]">
                      {drawnChallenge.category} / {drawnChallenge.intensity}
                    </p>
                    <h3 className="mt-2 text-4xl font-black tracking-[-0.05em]">{drawnChallenge.title}</h3>
                    <p className="mt-3 max-w-[58ch] text-sm leading-6 text-[color-mix(in_oklch,var(--surface)_76%,transparent)]">
                      {drawnChallenge.summary}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {drawnChallenge.rules.map((rule) => (
                        <li key={rule} className="flex gap-3 text-sm leading-6">
                          <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-[var(--accent-soft)]" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>

                <div className="mt-8 grid gap-3">
                  {challengeDeck.map((challenge) => (
                    <button
                      key={challenge.id}
                      type="button"
                      onClick={() => setDrawnChallenge(challenge)}
                      className={`group rounded-[1.25rem] border p-4 text-left transition hover:-translate-y-0.5 active:scale-[0.98] ${
                        drawnChallenge.id === challenge.id
                          ? "border-[var(--accent)] bg-[color-mix(in_oklch,var(--accent)_10%,var(--surface))]"
                          : "border-[var(--border)] bg-[var(--background)]"
                      }`}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{challenge.category}</p>
                      <h3 className="mt-2 text-lg font-black tracking-tight">{challenge.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{challenge.summary}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "History" && (
              <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-black tracking-[-0.04em]">Save history</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      Every generated setup is stored in this browser. Pin the ones you might actually start.
                    </p>
                  </div>
                  <NotePencil size={26} weight="duotone" className="text-[var(--accent)]" />
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5">
                  <h3 className="text-xl font-black tracking-tight">Pinned saves</h3>
                  <span className="font-mono text-xs text-[var(--muted)]">{savedCareers.length}</span>
                </div>

                <div className="mt-3 grid gap-3">
                  {savedCareers.length ? (
                    savedCareers.map((item) => (
                      <article key={item.id} className="flex gap-4 rounded-[1.25rem] border border-[var(--border)] bg-[var(--background)] p-4">
                        <Crest club={item.club} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{item.saveCode}</p>
                              <h3 className="mt-1 text-lg font-black tracking-tight">{item.club.name}</h3>
                            </div>
                            <div className="flex shrink-0 gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setCareer(item);
                                  setDrawnChallenge(item.challenge);
                                  setActiveTab("Start");
                                }}
                                className="rounded-full border border-[var(--border)] px-3 py-2 text-xs font-black text-[var(--ink)] transition active:scale-[0.94]"
                              >
                                Load
                              </button>
                              <button
                                type="button"
                                onClick={() => removeSaved(item.id)}
                                className="rounded-full border border-[var(--border)] p-2 text-[var(--muted)] transition hover:text-[var(--ink)] active:scale-[0.94]"
                                aria-label={`Remove ${item.club.name}`}
                              >
                                <X size={16} weight="bold" />
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.hook}</p>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="grid place-items-center rounded-[1.5rem] border border-dashed border-[var(--border)] bg-[var(--background)] text-center">
                      <div className="max-w-sm p-5">
                        <BookmarkSimple size={34} weight="duotone" className="mx-auto text-[var(--accent)]" />
                        <h3 className="mt-3 text-2xl font-black tracking-tight">No saved briefs yet</h3>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                          Tap Save brief on a setup when it feels like a contender.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-5">
                  <h3 className="text-xl font-black tracking-tight">Generated history</h3>
                  <span className="font-mono text-xs text-[var(--muted)]">{careerHistory.length}</span>
                </div>

                <div className="mt-3 grid gap-3">
                  {careerHistory.map((item, index) => (
                    <article key={`${item.id}-${index}`} className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--background)] p-4">
                      <div className="flex gap-3">
                        <Crest club={item.club} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{item.saveCode}</p>
                          <h3 className="mt-1 truncate text-lg font-black tracking-tight">{item.club.name}</h3>
                          <p className="mt-1 truncate text-xs text-[var(--muted)]">
                            {item.club.league}, {item.club.country}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Challenge</p>
                        <p className="mt-1 text-sm font-bold text-[var(--ink)]">{item.challenge.title}</p>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCareer(item);
                            setDrawnChallenge(item.challenge);
                            setActiveTab("Start");
                          }}
                          className="min-h-11 rounded-full bg-[var(--ink)] px-4 text-sm font-black text-[var(--surface)] transition active:scale-[0.96]"
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => setSavedCareers((current) => [item, ...current.filter((saved) => saved.id !== item.id)])}
                          className="min-h-11 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-black text-[var(--ink)] transition active:scale-[0.96]"
                        >
                          Pin
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </section>

      <section className="px-4 py-16">
        <div className="grid gap-8">
          <div className="media-reveal overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_24px_60px_-44px_rgba(50,35,18,0.5)]">
            <div className="min-h-[280px] rounded-[1.25rem] bg-[url('https://picsum.photos/seed/career-mode-touchline/1200/900')] bg-cover bg-center grayscale contrast-125" />
          </div>

          <div>
            <h2 className="text-4xl font-black leading-none tracking-[-0.05em]">
              {"A good save needs a little friction and a better reason to care."
                .split(" ")
                .map((word, index) => (
                  <span key={`${word}-${index}`} className="reveal-word inline-block pr-2">
                    {word}
                  </span>
                ))}
            </h2>
            <p className="mt-6 max-w-[62ch] text-base leading-7 text-[var(--muted)]">
              The app adds constraints where career mode usually gets too easy: who you can buy, who must play, when the board loses patience, and why a random club becomes your club.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--ink)] py-6 text-[var(--surface)]">
        <div className="marquee-track flex gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.18em] text-[color-mix(in_oklch,var(--surface)_70%,transparent)]">
          {[...countries, ...countries].map((country, index) => (
            <span key={`${country.country}-${index}`}>{country.country}</span>
          ))}
        </div>
      </section>

      <footer className="px-4 py-12">
        <div className="grid gap-8 rounded-[1.75rem] bg-[var(--ink)] p-6 text-[var(--surface)]">
          <div>
            <h2 className="text-4xl font-black leading-none tracking-[-0.05em]">
              Build the save, then play the first match.
            </h2>
            <p className="mt-4 max-w-[58ch] text-sm leading-6 text-[color-mix(in_oklch,var(--surface)_72%,transparent)]">
              The saved brief gives you a club, a rule set, a real challenge, and a code you can restore from browser history.
            </p>
          </div>
          <button
            type="button"
            onClick={requestReroll}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[var(--surface)] px-6 text-sm font-black text-[var(--ink)] transition hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Trophy size={18} weight="bold" />
            Generate another
          </button>
        </div>
      </footer>
      {pendingReroll ? (
        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] px-4 pb-4">
          <div className="rounded-[1.75rem] border border-[color-mix(in_oklch,var(--border)_70%,transparent)] bg-[var(--surface)] p-5 shadow-[0_24px_80px_-28px_rgba(18,16,14,0.55)]" role="dialog" aria-modal="true" aria-labelledby="reroll-title">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Confirm reroll</p>
            <h2 id="reroll-title" className="mt-2 text-2xl font-black tracking-[-0.04em]">
              Reroll this career?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              This setup stays in generated history. The next roll will replace the current screen.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPendingReroll(false)}
                className="min-h-12 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 text-sm font-black text-[var(--ink)] transition active:scale-[0.96]"
              >
                Keep it
              </button>
              <button
                type="button"
                onClick={confirmReroll}
                className="min-h-12 rounded-full bg-[var(--accent)] px-4 text-sm font-black text-[var(--surface)] transition active:scale-[0.96]"
              >
                Reroll
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <nav className="fixed bottom-3 left-1/2 z-30 grid w-[calc(100%-1.5rem)] max-w-[398px] -translate-x-1/2 grid-cols-4 rounded-full border border-[color-mix(in_oklch,var(--border)_80%,transparent)] bg-[color-mix(in_oklch,var(--surface)_92%,transparent)] p-1 shadow-[0_18px_50px_-28px_rgba(18,16,14,0.7)] backdrop-blur-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`min-h-11 rounded-full text-xs font-black transition active:scale-[0.96] ${
              activeTab === tab ? "bg-[var(--ink)] text-[var(--surface)]" : "text-[var(--muted)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
      </div>
    </main>
  );
}
