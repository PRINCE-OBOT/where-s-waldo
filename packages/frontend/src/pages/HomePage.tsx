import { useNavigate } from "react-router-dom";
import { CASE_FILES } from "../data/caseFiles";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-xs text-brass tracking-[0.3em] uppercase mb-2">
        Open Investigations
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-parchment mb-3">
        Select a case file
      </h1>
      <p className="text-parchment/60 max-w-xl mb-10">
        Each file conceals a set of persons of interest. Open one to begin
        the search — every hit is logged the moment you tap the page.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CASE_FILES.map((caseFile, i) => (
          <button
            key={caseFile.id}
            onClick={() => navigate(`/case/${caseFile.id}`)}
            className="group text-left bg-parchment text-ink rounded-sm border border-brass/40 shadow-lg shadow-black/30 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            <div className="relative aspect-[4/3] bg-ink-light overflow-hidden">
              <img
                src={caseFile.src}
                alt={caseFile.title}
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute top-2 right-2 font-mono text-[10px] bg-stamp text-parchment px-2 py-0.5 rotate-3 rounded-sm border border-parchment/40">
                FILE {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-4 border-t border-ink/10">
              <h2 className="font-display text-lg leading-snug">{caseFile.title}</h2>
              <p className="font-mono text-xs text-ink/60 mt-1">{caseFile.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
