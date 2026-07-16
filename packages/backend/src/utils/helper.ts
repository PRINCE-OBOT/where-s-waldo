interface Coordinate {
  character_name: string;
  found: boolean;
}

export const getCharacterNames = () => ["waldo", "wodlaw", "wenda"];

export const getCharacterData = (coordinates: Coordinate[]) => {
  const characterNames = getCharacterNames();

  return coordinates.map((coordinate, i) => ({
    found: coordinate.found,
    characterName: characterNames[i]
  }));
};
