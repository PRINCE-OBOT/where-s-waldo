export function Spinner({ text }: { text: string }) {
  return (
    <div className="flex gap-2 text-parchment-dark">
      <div
        className="w-7 h-7 rounded-full border-2 border-border border-t-ink animate-spin"
        aria-label="Loading"
        role="status"
      ></div>
      {text}
    </div>
  );
}
