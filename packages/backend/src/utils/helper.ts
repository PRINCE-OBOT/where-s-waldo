interface Coordinates {
  character_name: string;
  found: boolean;
}

export const getCharacterOtherData = (caseId: string) => {
  return {
    "case-01": [
      { character_name: "Waldo", x: 0.5, y: 0.5 },
      { character_name: "Wodlaw", x: 0.25, y: 0.25 },
      { character_name: "Wenda", x: 1, y: 1 }
    ],
    "case-02": [
      { character_name: "Wodlaw", x: 0.25, y: 0.25 },
      { character_name: "Wenda", x: 1, y: 1 },
      { character_name: "Waldo", x: 0.5, y: 0.5 },
    ],
    "case-03": [
      { character_name: "Wenda", x: 1, y: 1 },
      { character_name: "Waldo", x: 0.5, y: 0.5 },
      { character_name: "Wodlaw", x: 0.25, y: 0.25 },
    ],
    "case-04": [
      { character_name: "Wenda", x: 1, y: 1 },
      { character_name: "Wodlaw", x: 0.25, y: 0.25 },
      { character_name: "Waldo", x: 0.5, y: 0.5 },
    ],
  }[caseId] ?? [];
};

export const generateRoster = (coordinates: Coordinates[]) => {
  return coordinates.map((coordinate) => {
    const { character_name, found } = coordinate;
    return { character_name, found };
  });
};
