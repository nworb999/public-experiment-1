import path from "path";
import fs from "fs";

export const memoryDirectory = path.join(process.cwd(), "memory");

if (!fs.existsSync(memoryDirectory)) {
  fs.mkdirSync(memoryDirectory);
}

function readMemoryCSV() {
  const csvFilename = path.join(memoryDirectory, `memory.csv`);

  if (!fs.existsSync(csvFilename)) {
    return [];
  }

  const csvContent = fs.readFileSync(csvFilename, "utf8");
  const lines = csvContent.split("\n").slice(1);
  return lines
    .filter((line) => line.trim())
    .map((line) => {
      const [turn, character, otherCharacter, outcome] = line.split(",");
      return { turn, character, otherCharacter, outcome };
    });
}

function formatMemoryData(memoryData) {
  const formattedData = {};

  memoryData.forEach(({ character, otherCharacter, outcome }) => {
    if (!formattedData[character]) {
      formattedData[character] = {};
    }
    if (!formattedData[character][otherCharacter]) {
      formattedData[character][otherCharacter] = [];
    }
    formattedData[character][otherCharacter].push(outcome);
  });
  return formattedData;
}

const updateCSV = (filename, memories) => {
  let csvContent = "Turn,Character,OtherCharacter,Outcome\n";

  const resetFile = memories.some((memory) => memory.turn === 1);

  if (fs.existsSync(filename) && !resetFile) {
    csvContent = fs.readFileSync(filename, "utf8");
  }
  memories.forEach(({ turn, character, otherCharacter, outcome }) => {
    csvContent += `${turn},${character.alignment.name},${otherCharacter.alignment.name},${outcome}\n`;
  });

  fs.writeFileSync(filename, csvContent, "utf8");
};

export function retrieveMemories() {
  const allConversations = readMemoryCSV();
  return formatMemoryData(allConversations);
}

export function storeMemories(memories) {
  const csvFilename = path.join(memoryDirectory, `memory.csv`);

  updateCSV(csvFilename, memories);
}
