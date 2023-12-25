export class Conversation {
  constructor(character, targetName, relationship, content) {
    this.character = character;
    this.targetName = targetName;
    this.relationship = relationship;
    this.content = content;
    this.outcome = null;
  }

  start() {
    let weightedScore = 5; // defaults to 5
    this.outcome = weightedScore;
    if (this.content && this.content[this.targetName]) {
      const contentScore = this.content[this.targetName] || 5;

      const relationshipArray = this.relationship
        ? this.relationship[this.targetName] || []
        : [];

      const relationshipAverage =
        relationshipArray.length > 0
          ? relationshipArray.reduce((sum, value) => sum + parseInt(value), 0) /
            relationshipArray.length
          : 1;

      weightedScore = contentScore * relationshipAverage;

      this.outcome = 1 + (weightedScore % 10);

      console.log(
        `${new Date().toISOString()} :: Character ${
          this.character.alignment.name
        } interacted with ${this.targetName} and achieved a weighted score of ${
          this.outcome
        }.\n`
      );
    }
    return this.outcome;
  }
}
