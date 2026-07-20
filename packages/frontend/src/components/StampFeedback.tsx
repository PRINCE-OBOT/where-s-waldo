interface Props {
  x: number;
  y: number;
  kind: "hit" | "miss";
  label: string;
}

export default function StampFeedback({ x, y, kind, label }: Props) {
  return (
    <div
      className="absolute pointer-events-none animate-stamp select-none"
      style={{ left: x, top: y, transform: "translate(-50%, -50%) rotate(-8deg)" }}
    >
      <span
        className={[
          "block font-display text-sm md:text-base uppercase tracking-wider px-3 py-1 border-4 rounded-sm",
          kind === "hit"
            ? "border-moss text-moss bg-parchment/90"
            : "border-stamp text-stamp bg-parchment/90"
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}
