import Draw from "./frontend-services/draw.js";
import {
  startGame,
  fetchGameState,
  drawGameState,
} from "./frontend-services/gameState.js";

let fetchInterval = 50;
let draw;

// initialize the sketch with async data
async function initSketch() {
  try {
    new p5((p) => mySketch(p));
  } catch (error) {
    console.error("Error initializing sketch:", error);
  }
}

const mySketch = (p) => {
  p.setup = () => {
    p.createCanvas(800, 800);
    draw = new Draw(p);
    startGame();
    fetchGameState();
    setInterval(fetchGameState, fetchInterval);
  };

  p.draw = () => {
    p.background(255);
    drawGameState(draw);
  };
};

initSketch();
