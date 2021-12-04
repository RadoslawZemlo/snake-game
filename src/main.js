import showScreen from "./showScreen.js";
import { setSpeed, setWall } from "./settings.js";
import { wallsOn, wallsOff } from "./walls.js";
import generateFood from "./generateFood.js";
import initSnake from "./initSnake.js";
import drawGame from "./drawGame.js";
import { left, up, right, down } from "./movingDirection.js";
import collision from "./collision.js";
import updateScore from "./updateScore.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const menu = document.querySelector("#menu");
const gameOver = document.querySelector("#game-over");
const settings = document.querySelector("#setting");

// BUTTONS
const newGameBtn = document.querySelectorAll(".newgame-btn");
const settingsBtn = document.querySelectorAll(".settings-btn");

// INPUTS - RADIO
const speedSettings = document.getElementsByName("speed");
const wallSettings = document.getElementsByName("wall");

const scoreHolder = document.querySelector("#score");

const gridSize = 20;

let tileSize, food, snake, dx, dy, turning, speed, wall, score;

const turn = key => {
  if (turning) return;
  turning = true;

  if ((key === "ArrowLeft" || key === "a") && !right(dx)) {
    [dx, dy] = [-1, 0];
  } else if ((key === "ArrowUp" || key === "w") && !down(dy)) {
    [dx, dy] = [0, -1];
  } else if ((key === "ArrowRight" || key === "d") && !left(dx)) {
    [dx, dy] = [1, 0];
  } else if ((key === "ArrowDown" || key === "s") && !up(dy)) {
    [dx, dy] = [0, 1];
  }
};

const handleEat = () => {
  score = updateScore(scoreHolder, score);
  food = generateFood(gridSize);
};

const mainLoop = () => {
  turning = false;

  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  if (wall === 0) {
    if (wallsOn(head, gridSize))
      return showScreen(canvas, menu, settings, gameOver, 3);
  } else if (wall === 1) {
    wallsOff(head, gridSize);
  }

  // SELF COLLISION
  snake.forEach(part => {
    if (collision(part, head))
      return showScreen(canvas, menu, settings, gameOver, 3);
  });

  snake.unshift(head);
  collision(food, head) ? handleEat() : snake.pop();

  drawGame(ctx, food, snake, tileSize);

  setTimeout(mainLoop, speed);
};

const newGame = () => {
  tileSize = canvas.width / gridSize;

  food = generateFood(gridSize);
  snake = initSnake(gridSize);

  [dx, dy] = [1, 0];
  score = 0;

  showScreen(canvas, menu, settings, gameOver, 0);
  canvas.focus();

  canvas.addEventListener("keydown", e => {
    if (e.defaultPrevented) return;
    turn(e.key);
  });

  mainLoop();
};

const defaultSettings = () => {
  speedSettings[0].checked = true;
  speed = setSpeed(parseInt(speedSettings[0].value));

  wallSettings[0].checked = true;
  wall = setWall(parseInt(wallSettings[0].value));
};

const init = () => {
  defaultSettings();

  // CLICK EVENTS
  newGameBtn.forEach(btn => btn.addEventListener("click", () => newGame()));

  settingsBtn.forEach(btn =>
    btn.addEventListener("click", () =>
      showScreen(canvas, menu, settings, gameOver, 2)
    )
  );

  // SETTINGS INPUTS
  speedSettings.forEach(setting => {
    setting.addEventListener("click", () => {
      if (setting.checked) speed = setSpeed(parseInt(setting.value));
    });
  });

  wallSettings.forEach(setting => {
    setting.addEventListener("click", () => {
      if (setting.checked) wall = setWall(parseInt(setting.value));
    });
  });

  document.addEventListener("keydown", e => {
    if (gameOver.style.display === "block") {
      if (e.defaultPrevented) return;

      if (e.key === " ") newGame();
    }
  });
};

init();
