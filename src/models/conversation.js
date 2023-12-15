export class Conversation {
  constructor(character, targetName, relationship, content) {
    this.character = character;
    this.targetName = targetName;
    this.relationship = relationship;
    this.content = content;
    this.outcome = null;
  }

  start() {
    // rename to `converse`
    // const topic = "the weather"; eventually pass through the actual topic

    let weightedScore = 5; // defaults to 5

    if (
      this.content &&
      this.relationship &&
      this.content[this.targetName] &&
      this.relationship[this.targetName]
    ) {
      const contentScore = this.content[this.targetName] || 5;

      const relationshipArray = this.relationship[this.targetName] || [];

      const relationshipAverage =
        relationshipArray.length > 0
          ? relationshipArray.reduce((sum, value) => sum + parseInt(value), 0) /
            relationshipArray.length
          : 0;

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
