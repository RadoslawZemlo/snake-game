const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;

let tileSize, food, snake, dx, dy, score;

const random = max => {
  return Math.floor(Math.random() * (max + 1));
};

const newGame = () => {
  tileSize = canvas.width / gridSize;

  food = {
    x: random(gridSize - 1),
    y: random(gridSize - 1)
  };

  snake = [];

  for (let i = 0; i < 5; i++) {
    snake.push({ x: gridSize / 2 - i, y: gridSize / 2 });
  }

  [dx, dy] = [1, 0];
  score = 0;

  canvas.focus();

  mainLoop();
};

const mainLoop = () => {};
