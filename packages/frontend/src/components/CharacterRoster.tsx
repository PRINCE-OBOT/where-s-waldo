import type { RosterEntry } from "../types";
import { Spinner } from "./Spinner";

interface Props {
  roster: RosterEntry[];
  activeCharacter: string | null;
  hitCoordLoading: boolean;
  onSelect: (name: string) => void;
}

export default function CharacterRoster({
  roster,
  activeCharacter,
  hitCoordLoading,
  onSelect
}: Props) {
  return (
    <aside className="w-full md:w-56 shrink-0 bg-roster text-ink rounded-sm border border-brass/40 p-4 h-fit">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 mb-3">
        Persons of interest
      </p>
      <ul className="space-y-2">
        {roster.map((entry) => {
          const isActive = entry.character_name === activeCharacter;
          return (
            <li key={entry.character_name}>
              <button
                disabled={entry.found}
                onClick={() => onSelect(entry.character_name)}
                className={[
                  "w-full text-left px-3 py-2 rounded-sm font-mono text-sm border transition-colors",
                  entry.found
                    ? "border-moss/40 bg-moss/10 text-moss line-through decoration-2"
                    : isActive
                      ? "border-stamp bg-stamp/10 text-stamp"
                      : "border-ink/15 hover:border-brass hover:bg-brass/10"
                ].join(" ")}
              >
                {entry.found ? "✓ " : isActive ? "› " : ""}
                {entry.character_name}
              </button>
            </li>
          );
        })}
      </ul>
      {roster.every((r) => r.found) ? null : (
        <p className="font-mono text-[11px] text-ink/50 mt-4 leading-relaxed">
          Tap a name, then tap them in the scene.
        </p>
      )}

      {hitCoordLoading && <Spinner text={"Verifying search result"} />}
    </aside>
  );
}
