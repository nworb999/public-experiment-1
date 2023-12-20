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

    let weightedScore = 5; // defaults to 5

    if (
      this.content &&
      this.relationship &&
      this.content[this.targetName] &&
      this.relationship[this.targetName]
    ) {
      const contentScore = this.content[this.targetName] || 5;

      const relationshipArray = this.relationship[this.targetName] || [];

      // console.log(this.relationship);
      // console.log(this.targetName);
      // console.log(relationshipArray);

      const relationshipAverage =
        relationshipArray.length > 0
          ? relationshipArray.reduce((sum, value) => sum + parseInt(value), 0) /
            relationshipArray.length
          : 1;

      weightedScore = contentScore * relationshipAverage;
      // console.log({ weightedScore });
      // console.log({ contentScore });
      // console.log({ relationshipAverage });
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
