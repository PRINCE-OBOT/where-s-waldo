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

/**
 * Starts a new game session.
 *
 * NOTE: the current backend's /game-start controller only reads
 * `clientX` / `clientY` (the natural pixel dimensions of the image, used
 * to convert each character's stored fractional position into an absolute
 * coordinate) and does not accept an image/case identifier -- it always
 * builds coordinates from the same hardcoded `getCharacterOtherData()`
 * list. We pass `imageId` along anyway so it's a no-op today and a
 * one-line backend change away from working once the controller reads it.
 */
interface StartGameParams {
  imageId: string;
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
  imageId,
  clientWidth,
  clientHeight
}: StartGameParams): Promise<StartGameRes> {
  return request<StartGameRes>("/game-start", {
    clientWidth,
    clientHeight,
    imageId
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
