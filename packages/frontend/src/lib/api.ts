import type { StartGameRes, HitCoordinateResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

interface StartGameParams {
  caseId: string;
  clientWidth: number;
  clientHeight: number;
}

interface HitCoordinateParams {
  gameSessionId: string;
  offsetX: number;
  offsetY: number;
  character_name: string;
}

export function startGame({
  caseId,
  clientWidth,
  clientHeight
}: StartGameParams): Promise<StartGameRes> {
  return request<StartGameRes>("/game-start", {
    clientWidth,
    clientHeight,
    caseId
  });
}

export function hitCoordinate({
  gameSessionId,
  offsetX,
  offsetY,
  character_name
}: HitCoordinateParams): Promise<HitCoordinateResponse> {
  return request<HitCoordinateResponse>("/hit-coordinate", {
    gameSessionId,
    offsetX,
    offsetY,
    character_name
  });
}
