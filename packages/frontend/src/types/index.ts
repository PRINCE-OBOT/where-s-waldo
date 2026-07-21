export interface Coordinate {
  id: string;
  x: number;
  y: number;
  character_name: string;
  found: boolean;
  gameSessionId: string;
}

export interface HitCoordinateResponse {
  hitCharacter: Coordinate | null;
  allCharacterFound: boolean;
  timeStamp: number;
}

export interface CaseFile {
  id: string;
  title: string;
  description: string;
  src: string;
}

export interface ImgDim {
  clientWidth: number;
  clientHeight: number;
}

export interface StoredSession {
  gameSessionId: string;
  caseId: string;
  imgDim: ImgDim;
  timeStamp: number;
  roster: RosterEntry[];
  allFound: boolean;
}

export interface RosterEntry {
  character_name: string;
  found: boolean;
}

interface Roster {
  character_name: string;
  found: boolean;
}

export interface StartGameRes {
  gameSessionId: string;
  roster: Roster[];
}

export interface SetSession {
  gameSessionId: string;
  imgDim: ImgDim;
  roster: Roster[];
  timeStamp: number;
  allFound: boolean;
}
