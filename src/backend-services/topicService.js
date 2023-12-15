const cafeteriaTopics = [
  "LocalEvents",
  "Sports",
  "TVMovies",
  "Gossip",
  "Food",
  "Gadgets",
  "Music",
  "Travel",
  "Hobbies",
  "Politics",
];

export const topicAffinityScores = {
  "Chaotic Good": {
    LocalEvents: 4,
    Sports: 3,
    TVMovies: 5,
    Gossip: 2,
    Food: 4,
    Gadgets: 3,
    Music: 5,
    Travel: 5,
    Hobbies: 4,
    Politics: 3,
  },
  "Lawful Good": {
    LocalEvents: 4,
    Sports: 4,
    TVMovies: 3,
    Gossip: 1,
    Food: 3,
    Gadgets: 2,
    Music: 3,
    Travel: 4,
    Hobbies: 3,
    Politics: 4,
  },
  "Neutral Good": {
    LocalEvents: 5,
    Sports: 3,
    TVMovies: 4,
    Gossip: 2,
    Food: 4,
    Gadgets: 3,
    Music: 4,
    Travel: 4,
    Hobbies: 4,
    Politics: 3,
  },
  "Chaotic Evil": {
    LocalEvents: 2,
    Sports: 4,
    TVMovies: 5,
    Gossip: 5,
    Food: 3,
    Gadgets: 4,
    Music: 5,
    Travel: 3,
    Hobbies: 4,
    Politics: 2,
  },
  "Lawful Evil": {
    LocalEvents: 3,
    Sports: 3,
    TVMovies: 2,
    Gossip: 4,
    Food: 2,
    Gadgets: 3,
    Music: 2,
    Travel: 3,
    Hobbies: 2,
    Politics: 5,
  },
  "Neutral Evil": {
    LocalEvents: 3,
    Sports: 3,
    TVMovies: 4,
    Gossip: 5,
    Food: 3,
    Gadgets: 4,
    Music: 4,
    Travel: 2,
    Hobbies: 3,
    Politics: 4,
  },
  "Chaotic Neutral": {
    LocalEvents: 3,
    Sports: 5,
    TVMovies: 5,
    Gossip: 3,
    Food: 4,
    Gadgets: 5,
    Music: 5,
    Travel: 4,
    Hobbies: 5,
  },
  "Lawful Neutral": {
    LocalEvents: 4,
    Sports: 3,
    TVMovies: 3,
    Gossip: 2,
    Food: 3,
    Gadgets: 4,
    Music: 3,
    Travel: 4,
    Hobbies: 3,
    Politics: 4,
  },
  "True Neutral": {
    LocalEvents: 3,
    Sports: 3,
    TVMovies: 3,
    Gossip: 3,
    Food: 3,
    Gadgets: 3,
    Music: 3,
    Travel: 3,
    Hobbies: 3,
    Politics: 3,
  },
};

// called for a table of characters
export function getConversationTopicAndAffinities(alignments) {
  const topic = generateTopicForAlignments(alignments);
  const affinities = {};

  alignments.forEach((alignment) => {
    affinities[alignment] = getTopicAffinityScore(alignment, topic);
  });

  return { topic, affinities };
}

export function getTopicAffinityScore(alignment, topic) {
  return topicAffinityScores[alignment][topic];
}

export function generateTopicForAlignments(alignments) {
  const topicScores = cafeteriaTopics.reduce((obj, topic) => {
    obj[topic] = 0;
    return obj;
  }, {});

  alignments.forEach((alignment) => {
    const scores = topicAffinityScores[alignment];
    for (const topic in scores) {
      topicScores[topic] += scores[topic];
    }
  });

  let topTopic = "";
  let highestScore = 0;
  for (const [topic, score] of Object.entries(topicScores)) {
    if (score > highestScore) {
      highestScore = score;
      topTopic = topic;
    }
  }
  return topTopic;
}
