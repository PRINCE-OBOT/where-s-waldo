interface Coordinates {
  character_name: string;
  found: boolean;
}

export const getCharacterOtherData = (imageId = 0) => {
  return [
    { character_name: "Waldo", x: 0.5, y: 0.5 },
    { character_name: "Wodlaw", x: 0.25, y: 0.25 },
    { character_name: "Wenda", x: 1, y: 1 }
  ];
};

export const generateRoster = (coordinates: Coordinates[]) => {
  return coordinates.map((coordinate) => {
    const { character_name, found } = coordinate;
    return { character_name, found };
  });
};
