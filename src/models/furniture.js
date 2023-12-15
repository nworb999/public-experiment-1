const seatProportion = 0.3;

export class Table {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.seats = this.createSeats();
  }

  createSeats() {
    const halfSize = this.size / 2;
    const seatDiameter = this.size * seatProportion;
    const offset = seatDiameter / 2;
    return [
      { x: this.position.x + halfSize, y: this.position.y - offset },
      {
        x: this.position.x + halfSize,
        y: this.position.y + this.size + offset,
      },
      { x: this.position.x - offset, y: this.position.y + halfSize },
      {
        x: this.position.x + this.size + offset,
        y: this.position.y + halfSize,
      },
    ].map((seat) => ({ ...seat, occupied: false, character: null }));
  }

  isFull() {
    return this.seats.every((seat) => seat.occupied);
  }

  getNextSeat(character) {
    const seat = this.seats.find((seat) => !seat.occupied);
    if (seat) {
      seat.occupied = true;
      seat.character = character;
      return { position: { x: seat.x, y: seat.y } };
    }
    return null;
  }

  getState() {
    return {
      position: this.position,
      size: this.size,
      seats: this.seats.map((seat) => ({
        position: { x: seat.x, y: seat.y },
        character: seat.character,
      })),
    };
  }
}

export class Toilet {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.character = null;
  }

  addCharacter(character) {
    this.character = character;
  }

  getState() {
    return { position: this.position, size: this.size };
  }
}
