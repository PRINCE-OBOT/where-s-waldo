import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CASE_FILES } from "../data/caseFiles";
import { startGame, hitCoordinate } from "../lib/api";
import { loadSession, saveSession, clearSession } from "../lib/storage";
import type { ImgDim, RosterEntry, SetSession, StartGameRes } from "../types";
import CharacterRoster from "../components/CharacterRoster";
import GameImageBoard, { Stamp } from "../components/GameImageBoard";
import VictoryModal from "../components/VictoryModal";
import { Spinner } from "../components/Spinner";

let stampCounter = 0;

export default function GamePage() {
  const { caseId } = useParams<{ caseId: string }>();
  const caseFile = CASE_FILES.find((c) => c.id === caseId);

  const [loading, setLoading] = useState<boolean>(true);
  const [hitCoordLoading, setHitCoordLoading] = useState<boolean>(false);
  const [gameSessionId, setGameSessionId] = useState<string | null>(null);
  const [roster, setRoster] = useState<RosterEntry[]>([]);
  const [activeCharacter, setActiveCharacter] = useState<string | null>(null);
  const [imgDim, setImgDim] = useState<ImgDim>({
    clientWidth: 0,
    clientHeight: 0
  });
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [allFound, setAllFound] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [hint, setHint] = useState<string | null>(null);
  const [restarting, setRestarting] = useState(false);

  const initializedRef = useRef(false);

  const setSession = (stored: SetSession) => {
    setGameSessionId(stored.gameSessionId);
    setImgDim(stored.imgDim);
    setRoster(stored.roster);
    setTimeStamp(stored.timeStamp);
    setAllFound(stored.allFound);
    initializedRef.current = true;
    setStatus("ready");
  };

  if (!caseFile) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="font-display text-2xl mb-3">File not found</p>
        <Link to="/" className="font-mono text-sm text-brass underline">
          Back to the archive
        </Link>
      </div>
    );
  }

  const handleImageReady = async (
    clientWidth: number,
    clientHeight: number
  ) => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (!caseId) return;
    const stored = loadSession(caseId);
    if (stored) {
      setSession(stored);
    } else {
      try {
        const res: StartGameRes = await startGame({
          caseId,
          clientWidth,
          clientHeight
        });

        setGameSessionId(res.gameSessionId);
        setRoster(res.roster);
        setStatus("ready");
        setImgDim({ clientWidth, clientHeight });

        saveSession({
          gameSessionId: res.gameSessionId,
          caseId,
          roster,
          timeStamp,
          imgDim,
          allFound: false
        });
      } catch {
        setStatus("error");
      }
    }
    setLoading(false);
  };

  const handleBoardClick = async (offsetX: number, offsetY: number) => {
    if (!gameSessionId || allFound) return;
    if (!activeCharacter) {
      setHint("Pick a name from the roster first.");
      window.setTimeout(() => setHint(null), 1800);
      return;
    }
    setHitCoordLoading(true);

    const character_name = activeCharacter;

    try {
      const res = await hitCoordinate({
        gameSessionId,
        offsetX,
        offsetY,
        character_name
      });

      const id = `stamp-${stampCounter++}`;
      const isHit = Boolean(res.hitCharacter);

      setHitCoordLoading(false);
      setStamps((prev) => [
        ...prev,
        {
          id,
          offsetX,
          offsetY,
          kind: isHit ? "hit" : "miss",
          label: isHit ? `FOUND: ${character_name}` : "MISS"
        }
      ]);

      window.setTimeout(() => {
        setStamps((prev) => prev.filter((s) => s.id !== id));
      }, 1400);

      if (isHit) {
        setTimeStamp(res.timeStamp);
        setRoster((prev) => {
          const nextRoster = prev.map((r) =>
            r.character_name === character_name ? { ...r, found: true } : r
          );
          if (caseId) {
            saveSession({
              gameSessionId,
              caseId,
              imgDim,
              timeStamp: res.timeStamp,
              roster: nextRoster,
              allFound: res.allCharacterFound
            });
          }

          return nextRoster;
        });

        setActiveCharacter(null);
      }

      if (res.allCharacterFound) setAllFound(true);
    } catch {
      setHint("Couldn't reach the server — try again.");
      setHitCoordLoading(false);

      window.setTimeout(() => setHint(null), 2200);
    }
  };

  const handlePlayAgain = async () => {
    if (!caseId) return;
    setRestarting(true);

    const { clientWidth, clientHeight } = imgDim as ImgDim;
    try {
      const res: StartGameRes = await startGame({
        caseId,
        clientWidth,
        clientHeight
      });

      clearSession(caseId);
      setGameSessionId(res.gameSessionId);
      setRoster(res.roster);
      setAllFound(false);
      setActiveCharacter(null);
      setLoading(false);
      setStamps([]);

      saveSession({
        gameSessionId: res.gameSessionId,
        caseId,
        roster: res.roster,
        imgDim,
        timeStamp,
        allFound: false
      });
    } finally {
      setRestarting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to="/"
            className="font-mono text-xs text-brass/80 hover:text-brass"
          >
            ← back to archive
          </Link>
          <h1 className="font-display text-2xl md:text-3xl mt-1">
            {caseFile.title}
          </h1>
        </div>
        {hint && (
          <p className="font-mono text-xs text-stamp bg-stamp/10 border border-stamp/40 px-3 py-1.5 rounded-sm">
            {hint}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="font-mono text-sm text-stamp mb-4">
          Couldn't start a session — confirm the backend is running and
          VITE_API_URL is correct.
        </p>
      )}

      <div className="flex flex-col gap-6 items-start">
        <div className="flex">
          {loading ? (
            <Spinner text={"Loading characters board"} />
          ) : (
            roster.length > 0 && (
              <CharacterRoster
                roster={roster}
                activeCharacter={activeCharacter}
                hitCoordLoading={hitCoordLoading}
                onSelect={setActiveCharacter}
              />
            )
          )}
        </div>
        <div className="flex-1">
          <GameImageBoard
            src={caseFile.src}
            alt={caseFile.title}
            stamps={stamps}
            disabled={allFound || status !== "ready"}
            onImageReady={handleImageReady}
            onBoardClick={handleBoardClick}
          />
        </div>
      </div>

      {allFound && (
        <VictoryModal
          caseTitle={caseFile.title}
          onPlayAgain={handlePlayAgain}
          timeStamp={timeStamp}
          restarting={restarting}
        />
      )}
    </div>
  );
}
