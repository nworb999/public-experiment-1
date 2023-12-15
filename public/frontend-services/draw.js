const seatProportion = 0.3; // This value should be consistent with the server-side definition

const colorMapping = {
  "Chaotic Good": [173, 216, 230], // Light blue
  "Lawful Good": [144, 238, 144], // Light green
  "Neutral Good": [255, 250, 205], // Light yellow
  "Chaotic Evil": [255, 99, 71], // Tomato
  "Lawful Evil": [220, 20, 60], // Crimson
  "Neutral Evil": [255, 165, 0], // Orange
  "Chaotic Neutral": [255, 218, 185], // Peach Puff
  "Lawful Neutral": [218, 165, 32], // Golden rod
  "True Neutral": [189, 183, 107], // Dark khaki
};

export default class Draw {
  constructor(p) {
    this.p = p; // p5 instance
  }

  table(tableState) {
    const p = this.p;
    p.fill(200);
    p.rect(
      tableState.position.x,
      tableState.position.y,
      tableState.size,
      tableState.size
    );
    tableState.seats.forEach((seat) => {
      p.fill(160);
      p.ellipse(
        seat.position.x,
        seat.position.y,
        tableState.size * seatProportion
      );
    });
  }

  toilet(toiletState) {
    const p = this.p;
    p.fill(100);
    p.rect(
      toiletState.position.x - toiletState.size / 2,
      toiletState.position.y - toiletState.size / 2,
      toiletState.size,
      toiletState.size
    );

    let toiletRadius = toiletState.size * seatProportion;
    let toiletRectWidth = toiletRadius * 1.7;
    let toiletRectHeight = toiletRadius;

    p.fill(255);
    p.ellipse(toiletState.position.x, toiletState.position.y, toiletRadius * 2);
    p.fill(255);
    p.rect(
      toiletState.position.x - toiletRectWidth / 2,
      toiletState.position.y - toiletRadius - toiletRectHeight / 2,
      toiletRectWidth,
      toiletRectHeight
    );
  }

  character(characterState) {
    const p = this.p;
    const color = colorMapping[characterState.alignment.name] || [
      144, 238, 144,
    ];
    p.fill(...color); // Light green color
    p.ellipse(characterState.position.x, characterState.position.y, 20, 20); // Radius of 20
  }

  furniture(gameState) {
    this.table(gameState.leftTable);
    this.table(gameState.rightTable);
    this.toilet(gameState.toilet);
  }

  characters(charactersState) {
    charactersState.forEach((characterState) => {
      this.character(characterState);
    });
  }
}
