import { Conversation } from "./conversation.js";

// really need to reconsider the variable names between conversation and content ... next time map out models FIRST

const stepSize = 5;

export class Character {
  constructor(alignment, startOrder, x, y) {
    this.alignment = alignment;
    this.seat = null;
    this.startOrder = startOrder;
    this.position = { x, y };
  }

  update() {
    if (this.seat) {
      this.moveTo(this.seat.position);
    }
  }

  chooseSeat(tables) {
    // choose table and then seat
  }

  hasReachedSeat() {
    const tolerance = stepSize;
    return (
      this.seat &&
      Math.abs(this.position.x - this.seat.position.x) <= tolerance &&
      Math.abs(this.position.y - this.seat.position.y) <= tolerance
    );
  }

  moveTo(targetPosition) {
    if (Math.abs(this.position.x - targetPosition.x) > stepSize) {
      this.position.x +=
        this.position.x < targetPosition.x ? stepSize : -stepSize;
    }
    if (Math.abs(this.position.y - targetPosition.y) > stepSize) {
      this.position.y +=
        this.position.y < targetPosition.y ? stepSize : -stepSize;
    }
  }

  getState() {
    return { position: this.position, alignment: this.alignment };
  }

  interactWith(otherCharacter, relationship, content) {
    const conversation = new Conversation(
      this,
      otherCharacter.alignment.name,
      relationship,
      content
    );

    const outcome = conversation.start();

    return outcome;
  }
}
