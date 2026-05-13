"use client";

import { useState, type CSSProperties, type Dispatch, type SetStateAction } from "react";
import {
  Anchor,
  Bird,
  BugBeetle,
  Butterfly,
  Cat,
  Cow,
  Crown,
  DiceFive,
  Dog,
  Fish,
  Flame,
  Horse,
  Lightning,
  PawPrint,
  Rabbit,
  Rocket,
  ShieldChevron,
  Sparkle,
  Star,
  Sword,
  Tree,
  TShirt,
  Waves
} from "@phosphor-icons/react";
import {
  academyFocuses,
  boardStyles,
  clubCultures,
  createRandomClubBlueprint,
  createRandomClubName,
  createRandomStadiumName,
  fanRituals,
  kitPalettes,
  mascots,
  mottoes,
  randomItem,
  rivalryHooks,
  resolveHomeKit,
  type CreatedClub,
  type KitColors,
  type KitPalette,
  type MascotIconKey
} from "@/src/data/club-creator";

type CreateClubStudioProps = {
  countries: string[];
  club: CreatedClub;
  recentClubs: CreatedClub[];
  setClub: Dispatch<SetStateAction<CreatedClub>>;
  onGenerate: (club: CreatedClub) => void;
  onSaveSnapshot: () => void;
  onStartCareer: () => void;
};

const mascotIconMap = {
  anchor: Anchor,
  bird: Bird,
  bug: BugBeetle,
  butterfly: Butterfly,
  cat: Cat,
  cow: Cow,
  crown: Crown,
  dog: Dog,
  fish: Fish,
  flame: Flame,
  horse: Horse,
  lightning: Lightning,
  paw: PawPrint,
  rabbit: Rabbit,
  rocket: Rocket,
  shield: ShieldChevron,
  star: Star,
  sword: Sword,
  tree: Tree,
  waves: Waves
} satisfies Record<MascotIconKey, typeof Bird>;

function SwatchStack({ colors, compact = false }: { colors: KitColors; compact?: boolean }) {
  return (
    <span className={`grid ${compact ? "h-7 w-12" : "h-12 w-full"} grid-cols-3 overflow-hidden rounded-xl border border-black/10`}>
      <span style={{ backgroundColor: colors.primary }} />
      <span style={{ backgroundColor: colors.secondary }} />
      <span style={{ backgroundColor: colors.trim }} />
    </span>
  );
}

function KitPreview({
  title,
  colors,
  active,
  onClick
}: {
  title: string;
  colors: KitColors;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-0 rounded-[1.15rem] border p-3 text-left transition active:scale-[0.98] ${
        active
          ? "border-[var(--accent)] bg-[color-mix(in_oklch,var(--accent)_9%,var(--surface))]"
          : "border-[var(--border)] bg-[var(--background)]"
      }`}
    >
      <SwatchStack colors={colors} />
      <span className="mt-2 block text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">{title}</span>
    </button>
  );
}

function FieldButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-black text-[var(--ink)] transition active:scale-[0.96]"
    >
      <DiceFive size={15} weight="bold" />
      {label}
    </button>
  );
}

function ColourInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3">
      <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-12 cursor-pointer rounded-full border-0 bg-transparent p-0"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm font-bold text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CreateClubStudio({
  countries,
  club,
  recentClubs,
  setClub,
  onGenerate,
  onSaveSnapshot,
  onStartCareer
}: CreateClubStudioProps) {
  const [kitTarget, setKitTarget] = useState<"home" | "away" | "third">("away");
  const selectedMascot = mascots.find((mascot) => mascot.id === club.mascotId) ?? mascots[0];
  const MascotIcon = mascotIconMap[selectedMascot.icon];
  const resolvedHomeKit = resolveHomeKit(club);
  const activeKit = kitTarget === "home" ? resolvedHomeKit : kitTarget === "away" ? club.awayKit : club.thirdKit;
  const countryOptions = countries.length ? countries : [club.country];

  function patchClub(patch: Partial<CreatedClub>) {
    setClub((current) => ({ ...current, ...patch }));
  }

  function patchKit(target: "home" | "away" | "third", colors: KitColors) {
    setClub((current) => {
      if (target === "home") {
        return {
          ...current,
          homeKitMode: "custom",
          homeKit: colors
        };
      }

      if (target === "away") {
        return {
          ...current,
          awayKit: colors
        };
      }

      return {
        ...current,
        thirdKit: colors
      };
    });
  }

  function updateActiveKitColor(key: keyof KitColors, value: string) {
    if (kitTarget === "home") {
      setClub((current) => ({
        ...current,
        homeKitMode: "custom",
        homeKit: {
          ...resolveHomeKit(current),
          [key]: value
        }
      }));
      return;
    }

    setClub((current) => ({
      ...current,
      [kitTarget === "away" ? "awayKit" : "thirdKit"]: {
        ...(kitTarget === "away" ? current.awayKit : current.thirdKit),
        [key]: value
      }
    }));
  }

  function applyPalette(palette: KitPalette) {
    patchKit(kitTarget, palette.colors);
  }

  function randomizeKits() {
    const home = randomItem(kitPalettes);
    const away = randomItem(kitPalettes.filter((palette) => palette.id !== home.id));
    const third = randomItem(kitPalettes.filter((palette) => palette.id !== home.id && palette.id !== away.id));

    setClub((current) => ({
      ...current,
      homeKitMode: "main",
      mainColors: {
        primary: home.colors.primary,
        secondary: home.colors.secondary
      },
      homeKit: home.colors,
      awayKit: away.colors,
      thirdKit: third.colors
    }));
  }

  function generateEverything() {
    const next = createRandomClubBlueprint(countryOptions);
    setClub(next);
    onGenerate(next);
    setKitTarget("away");
  }

  return (
    <section className="grid gap-4">
      <article className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--ink)] p-4 text-[var(--surface)]">
        <div
          className="relative min-h-[300px] overflow-hidden rounded-[1.25rem] p-5"
          style={
            {
              "--creator-primary": club.mainColors.primary,
              "--creator-secondary": club.mainColors.secondary
            } as CSSProperties
          }
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,var(--creator-primary),transparent_32%),linear-gradient(135deg,var(--creator-secondary),var(--ink)_62%)] opacity-95" />
          <div className="absolute -right-20 top-8 h-48 w-48 rounded-full border border-white/10" />
          <div className="relative flex min-h-[260px] flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/65">Create-a-club</span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/78">
                Tier {club.leagueTier}
              </span>
            </div>
            <div>
              <span className="grid h-24 w-24 place-items-center rounded-[1.35rem] border border-white/15 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                <MascotIcon size={48} weight="duotone" />
              </span>
              <h2 className="mt-5 break-words text-4xl font-black leading-none tracking-[-0.05em]">{club.name}</h2>
              <p className="mt-2 text-sm leading-6 text-white/72">
                {club.country}. {selectedMascot.name}. {club.motto}
              </p>
            </div>
          </div>
        </div>
      </article>

      <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.04em]">Create a club</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Build an invented badge, identity, league entry, and kit set.</p>
          </div>
          <button
            type="button"
            onClick={generateEverything}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--surface)] transition active:scale-[0.94]"
            aria-label="Randomize created club"
          >
            <Sparkle size={20} weight="fill" />
          </button>
        </div>

        <div className="mt-6 grid gap-3">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">Club name</span>
            <input
              value={club.name}
              onChange={(event) => patchClub({ name: event.target.value })}
              className="h-14 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 text-base font-black text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <FieldButton label="Name" onClick={() => patchClub({ name: createRandomClubName() })} />
            <FieldButton label="All" onClick={generateEverything} />
          </div>
        </div>
      </article>

      <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black tracking-tight">Mascot</h2>
          <p className="truncate text-xs font-bold text-[var(--muted)]">{selectedMascot.trait}</p>
        </div>
        <div className="country-strip -mx-5 mt-4 flex max-w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 pb-2">
          {mascots.map((mascot) => {
            const Icon = mascotIconMap[mascot.icon];
            const selected = club.mascotId === mascot.id;

            return (
              <button
                key={mascot.id}
                type="button"
                onClick={() => patchClub({ mascotId: mascot.id })}
                className={`grid min-h-24 w-24 shrink-0 place-items-center rounded-[1.15rem] border p-2 text-center transition active:scale-[0.98] ${
                  selected
                    ? "border-[var(--accent)] bg-[color-mix(in_oklch,var(--accent)_9%,var(--surface))] text-[var(--ink)]"
                    : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)]"
                }`}
              >
                <Icon size={26} weight={selected ? "duotone" : "bold"} />
                <span className="text-xs font-black">{mascot.name}</span>
              </button>
            );
          })}
        </div>
        <FieldButton label="Mascot" onClick={() => patchClub({ mascotId: randomItem(mascots).id })} />
      </article>

      <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black tracking-tight">Club colours</h2>
          <FieldButton
            label="Colours"
            onClick={() => {
              const palette = randomItem(kitPalettes);
              patchClub({
                mainColors: {
                  primary: palette.colors.primary,
                  secondary: palette.colors.secondary
                }
              });
            }}
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ColourInput
            label="Primary"
            value={club.mainColors.primary}
            onChange={(value) => patchClub({ mainColors: { ...club.mainColors, primary: value } })}
          />
          <ColourInput
            label="Second"
            value={club.mainColors.secondary}
            onChange={(value) => patchClub({ mainColors: { ...club.mainColors, secondary: value } })}
          />
        </div>
      </article>

      <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black tracking-tight">Kit colours</h2>
          <FieldButton label="Kits" onClick={randomizeKits} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <KitPreview title="Home" colors={resolvedHomeKit} active={kitTarget === "home"} onClick={() => setKitTarget("home")} />
          <KitPreview title="Away" colors={club.awayKit} active={kitTarget === "away"} onClick={() => setKitTarget("away")} />
          <KitPreview title="Third" colors={club.thirdKit} active={kitTarget === "third"} onClick={() => setKitTarget("third")} />
        </div>

        {kitTarget === "home" ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {(["main", "custom"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => patchClub({ homeKitMode: mode })}
                className={`min-h-11 rounded-full border px-3 text-sm font-black capitalize transition active:scale-[0.96] ${
                  club.homeKitMode === mode
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]"
                    : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)]"
                }`}
              >
                {mode === "main" ? "Club colours" : "Custom"}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-4 grid grid-cols-3 gap-2">
          <ColourInput label="Base" value={activeKit.primary} onChange={(value) => updateActiveKitColor("primary", value)} />
          <ColourInput label="Alt" value={activeKit.secondary} onChange={(value) => updateActiveKitColor("secondary", value)} />
          <ColourInput label="Trim" value={activeKit.trim} onChange={(value) => updateActiveKitColor("trim", value)} />
        </div>

        <div className="country-strip -mx-5 mt-4 flex max-w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 pb-2">
          {kitPalettes.map((palette) => (
            <button
              key={palette.id}
              type="button"
              onClick={() => applyPalette(palette)}
              className="w-28 shrink-0 rounded-[1rem] border border-[var(--border)] bg-[var(--background)] p-2 text-left transition active:scale-[0.98]"
            >
              <SwatchStack colors={palette.colors} compact />
              <span className="mt-2 block truncate text-xs font-black text-[var(--ink)]">{palette.name}</span>
            </button>
          ))}
        </div>
      </article>

      <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-black tracking-tight">Identity</h2>
        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <SelectField label="Country" value={club.country} options={countryOptions} onChange={(country) => patchClub({ country })} />
            <div className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">League tier</span>
              <div className="grid grid-cols-5 gap-1">
                {[1, 2, 3, 4, 5].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => patchClub({ leagueTier: tier })}
                    className={`h-12 rounded-xl border font-mono text-sm font-black transition active:scale-[0.96] ${
                      club.leagueTier === tier
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)]"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">Motto</span>
            <input
              value={club.motto}
              onChange={(event) => patchClub({ motto: event.target.value })}
              className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm font-bold text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
            />
          </label>

          <SelectField label="Club culture" value={club.culture} options={clubCultures} onChange={(culture) => patchClub({ culture })} />
          <SelectField label="Academy focus" value={club.academyFocus} options={academyFocuses} onChange={(academyFocus) => patchClub({ academyFocus })} />
          <SelectField label="Board style" value={club.boardStyle} options={boardStyles} onChange={(boardStyle) => patchClub({ boardStyle })} />

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">Stadium</span>
            <input
              value={club.stadiumName}
              onChange={(event) => patchClub({ stadiumName: event.target.value })}
              className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm font-bold text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <FieldButton label="Motto" onClick={() => patchClub({ motto: randomItem(mottoes) })} />
            <FieldButton label="Culture" onClick={() => patchClub({ culture: randomItem(clubCultures) })} />
            <FieldButton label="Stadium" onClick={() => patchClub({ stadiumName: createRandomStadiumName() })} />
          </div>
        </div>
      </article>

      <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-black tracking-tight">Save flavour</h2>
        <div className="mt-4 grid gap-3">
          {[
            ["Rivalry", club.rivalryHook],
            ["Fan ritual", club.fanRitual],
            ["Academy", club.academyFocus],
            ["Board", club.boardStyle]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--ink)]">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <FieldButton label="Rivalry" onClick={() => patchClub({ rivalryHook: randomItem(rivalryHooks) })} />
          <FieldButton label="Ritual" onClick={() => patchClub({ fanRitual: randomItem(fanRituals) })} />
        </div>
      </article>

      <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--ink)] p-5 text-[var(--surface)]">
        <div className="flex items-center gap-3">
          <TShirt size={26} weight="duotone" className="text-[var(--accent-soft)]" />
          <div>
            <h2 className="text-2xl font-black tracking-[-0.04em]">Club blueprint ready</h2>
            <p className="mt-1 text-sm leading-6 text-white/70">{club.stadiumName}. {club.culture}. Tier {club.leagueTier}.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-2">
          <button
            type="button"
            onClick={onStartCareer}
            className="min-h-13 rounded-full bg-[var(--surface)] px-5 text-sm font-black text-[var(--ink)] transition active:scale-[0.96]"
          >
            Start career with this club
          </button>
          <button
            type="button"
            onClick={onSaveSnapshot}
            className="min-h-13 rounded-full border border-white/15 px-5 text-sm font-black text-[var(--surface)] transition active:scale-[0.96]"
          >
            Save club design
          </button>
        </div>
      </article>

      {recentClubs.length ? (
        <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-black tracking-tight">Recent designs</h2>
          <div className="mt-4 grid gap-2">
            {recentClubs.slice(0, 3).map((recent) => {
              const mascot = mascots.find((item) => item.id === recent.mascotId) ?? mascots[0];
              const Icon = mascotIconMap[mascot.icon];

              return (
                <button
                  key={recent.id}
                  type="button"
                  onClick={() => setClub(recent)}
                  className="flex min-h-16 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3 text-left transition active:scale-[0.98]"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
                    style={{ background: `linear-gradient(135deg, ${recent.mainColors.primary}, ${recent.mainColors.secondary})` }}
                  >
                    <Icon size={20} weight="duotone" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-black text-[var(--ink)]">{recent.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-[var(--muted)]">
                      {recent.country}, Tier {recent.leagueTier}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </article>
      ) : null}
    </section>
  );
}
