const padding = 80;

const width = 800; // these must be the same as the canvas dimensions
const height = 800;

export const squareSize = (width - padding * 4) / 3;
export const stallSize =
  (Math.min(width - padding * 2, height - padding * 2 - squareSize) / 2) * 0.5;

export const order = "random";
export const alignments = [
  { name: "Chaotic Good" },
  { name: "Lawful Good" },
  { name: "Neutral Good" },
  { name: "Chaotic Evil" },
  { name: "Lawful Evil" },
  { name: "Neutral Evil" },
  { name: "Chaotic Neutral" },
  { name: "Lawful Neutral" },
  { name: "True Neutral" },
];

export const leftTable = {
  position: {
    x: width / 4 - squareSize / 2,
    y: (2 * height) / 5 - squareSize / 2,
  },
  size: squareSize,
};
export const rightTable = {
  position: {
    x: (3 * width) / 4 - squareSize / 2,
    y: (2 * height) / 5 - squareSize / 2,
  },
  size: squareSize,
};
export const bathroom = {
  position: { x: width / 2, y: (5 * height) / 6 - stallSize / 2 },
  size: squareSize / 2,
};

export const ascii = `
█▀█ █░█ █▄▄ █░░ █ █▀▀   █▀▀ ▀▄▀ █▀█ █▀▀ █▀█ █ █▀▄▀█ █▀▀ █▄░█ ▀█▀   ▄█
█▀▀ █▄█ █▄█ █▄▄ █ █▄▄   ██▄ █░█ █▀▀ ██▄ █▀▄ █ █░▀░█ ██▄ █░▀█ ░█░   ░█`;
