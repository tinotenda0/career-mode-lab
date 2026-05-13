import { NextResponse } from "next/server";
import {
  crestOverrides,
  isMajorClub,
  leagueSources,
  manualClubNames,
  normalizeClubName,
  type LeagueSource
} from "@/src/data/league-sources";

export const revalidate = 86400;

type EspnLogo = {
  href?: string;
  rel?: string[];
};

type EspnTeam = {
  team?: {
    id?: string;
    uid?: string;
    displayName?: string;
    shortDisplayName?: string;
    abbreviation?: string;
    color?: string;
    alternateColor?: string;
    logos?: EspnLogo[];
  };
};

export type Club = {
  id: string;
  name: string;
  shortName: string;
  abbreviation: string;
  country: string;
  countryCode: string;
  region: LeagueSource["region"];
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

type LeaguePayload = LeagueSource & {
  actualTeams: number;
  actualCrests: number;
  sourceStatus: "live" | "manual" | "fallback" | "empty";
};

function slugify(value: string) {
  return normalizeClubName(value).replace(/\s+/g, "-");
}

function colorFromEspn(value?: string) {
  if (!value || value.length < 3) {
    return null;
  }

  return value.startsWith("#") ? value : `#${value}`;
}

function chooseLogo(logos?: EspnLogo[]) {
  if (!logos?.length) {
    return null;
  }

  const preferred = logos.find((logo) => logo.href?.includes("/500/")) ?? logos[0];
  return preferred.href ?? null;
}

function getTags(source: LeagueSource, name: string, isMajor: boolean) {
  const tags = [`Tier ${source.tier}`, source.country, source.region];

  if (isMajor) {
    tags.push("Major crest");
  }

  if (source.tier >= 3) {
    tags.push("Deep save");
  }

  if (name.toLowerCase().includes("b ") || name.toLowerCase().endsWith(" b")) {
    tags.push("Reserve path");
  }

  return tags;
}

function buildManualClub(source: LeagueSource, name: string, index: number): Club {
  const normalized = normalizeClubName(name);
  const crestUrl = crestOverrides[normalized] ?? null;
  const major = isMajorClub(name, source.tier);

  return {
    id: `${source.id}-${slugify(name)}-${index}`,
    name,
    shortName: name,
    abbreviation: name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 4)
      .toUpperCase(),
    country: source.country,
    countryCode: source.countryCode,
    region: source.region,
    league: source.name,
    leagueId: source.id,
    tier: source.tier,
    crestUrl,
    crestKind: crestUrl ? "actual" : "generated",
    primaryColor: null,
    alternateColor: null,
    source: "manual",
    isMajor: major,
    tags: getTags(source, name, major)
  };
}

function buildEspnClub(source: LeagueSource, item: EspnTeam, index: number): Club | null {
  const team = item.team;
  const name = team?.displayName ?? team?.shortDisplayName;

  if (!team || !name) {
    return null;
  }

  const major = isMajorClub(name, source.tier);
  const crestUrl = chooseLogo(team.logos);

  return {
    id: `${source.id}-${team.id ?? slugify(name)}-${index}`,
    name,
    shortName: team.shortDisplayName ?? name,
    abbreviation: team.abbreviation ?? name.slice(0, 3).toUpperCase(),
    country: source.country,
    countryCode: source.countryCode,
    region: source.region,
    league: source.name,
    leagueId: source.id,
    tier: source.tier,
    crestUrl,
    crestKind: crestUrl ? "actual" : "generated",
    primaryColor: colorFromEspn(team.color),
    alternateColor: colorFromEspn(team.alternateColor),
    source: "espn",
    isMajor: major,
    tags: getTags(source, name, major)
  };
}

async function fetchEspnClubs(source: LeagueSource) {
  if (!source.espnCode) {
    return [];
  }

  const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${source.espnCode}/teams`, {
    headers: {
      accept: "application/json"
    },
    next: {
      revalidate: 86400
    }
  });

  if (!response.ok) {
    throw new Error(`${source.espnCode} returned ${response.status}`);
  }

  const payload = await response.json();
  const teams = (payload?.sports?.[0]?.leagues?.[0]?.teams ?? []) as EspnTeam[];
  return teams.map((team, index) => buildEspnClub(source, team, index)).filter(Boolean) as Club[];
}

async function resolveLeague(source: LeagueSource) {
  const manual = (manualClubNames[source.id] ?? []).map((name, index) => buildManualClub(source, name, index));

  if (source.manualOnly) {
    return {
      source,
      clubs: manual,
      status: manual.length ? ("manual" as const) : ("empty" as const),
      note: source.note ?? "Manual league pool"
    };
  }

  try {
    const live = await fetchEspnClubs(source);

    if (live.length) {
      return {
        source,
        clubs: live,
        status: "live" as const,
        note: "Live ESPN teams endpoint"
      };
    }

    return {
      source,
      clubs: manual,
      status: manual.length ? ("fallback" as const) : ("empty" as const),
      note: "ESPN endpoint returned no teams"
    };
  } catch (error) {
    return {
      source,
      clubs: manual,
      status: manual.length ? ("fallback" as const) : ("empty" as const),
      note: error instanceof Error ? error.message : "Unknown source error"
    };
  }
}

export async function GET() {
  const resolved = await Promise.all(leagueSources.map((source) => resolveLeague(source)));
  const clubs = resolved.flatMap((league) => league.clubs);
  const leagues: LeaguePayload[] = resolved.map((league) => ({
    ...league.source,
    actualTeams: league.clubs.length,
    actualCrests: league.clubs.filter((club) => club.crestKind === "actual").length,
    sourceStatus: league.status
  }));

  const countries = Array.from(new Set(leagueSources.map((source) => source.country))).map((country) => {
    const countryClubs = clubs.filter((club) => club.country === country);
    return {
      country,
      countryCode: leagueSources.find((source) => source.country === country)?.countryCode ?? "",
      leagues: leagues.filter((league) => league.country === country).length,
      clubs: countryClubs.length,
      actualCrests: countryClubs.filter((club) => club.crestKind === "actual").length
    };
  });

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    clubs,
    leagues,
    countries,
    totals: {
      clubs: clubs.length,
      leagues: leagues.length,
      countries: countries.length,
      actualCrests: clubs.filter((club) => club.crestKind === "actual").length,
      liveLeagues: leagues.filter((league) => league.sourceStatus === "live").length
    },
    sourceNotes: resolved
      .filter((league) => league.note)
      .map((league) => ({
        leagueId: league.source.id,
        league: league.source.name,
        country: league.source.country,
        status: league.status,
        note: league.note
      }))
  });
}
