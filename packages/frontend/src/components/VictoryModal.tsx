interface Props {
  caseTitle: string;
  onPlayAgain: () => void;
  timeStamp: number;
  restarting: boolean;
}

export default function VictoryModal({
  caseTitle,
  onPlayAgain,
  timeStamp,
  restarting
}: Props) {
  return (
    <div className="fixed inset-0 bg-ink-dark/80 flex items-center justify-center z-50 px-4">
      <div className="bg-parchment text-ink rounded-sm border-4 border-brass max-w-sm w-full p-8 text-center shadow-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-stamp mb-2">
          Case closed
        </p>
        <h2 className="font-display text-2xl mb-3">All persons located</h2>
        <p className="font-mono text-sm text-ink/60 mb-6">
          Every person of interest in “{caseTitle}” has been found and logged.
        </p>

        <h3>
          It took you {Math.floor(timeStamp / (1000 * 60))} minutes{" "}
          {Math.floor((timeStamp % (1000 * 60)) / 1000)} seconds to find all
          characters.
        </h3>
        <button
          onClick={onPlayAgain}
          disabled={restarting}
          className="font-mono text-sm uppercase tracking-wider bg-ink text-parchment px-5 py-2 rounded-sm hover:bg-ink-light transition-colors disabled:opacity-50"
        >
          {restarting ? "Reopening file…" : "Start a new search"}
        </button>
      </div>
    </div>
  );
}
