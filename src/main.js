import showScreen from "./showScreen.js";
import { setSpeed, setWall } from "./settings.js";
import generateFood from "./generateFood.js";
import drawGame from "./drawGame.js";
import { left, up, right, down } from "./movingDirection.js";

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

const mainLoop = () => {
  turning = false;

  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  const hitWall =
    head.x < 0 || head.x > gridSize - 1 || head.y < 0 || head.y > gridSize - 1;

  if (wall === 0) {
    if (hitWall) return showScreen(canvas, menu, settings, gameOver, 3);
  } else if (wall === 1) {
    if (head.x < 0) {
      head.x = gridSize - 1;
    } else if (head.x > gridSize - 1) {
      head.x = 0;
    } else if (head.y < 0) {
      head.y = gridSize - 1;
    } else if (head.y > gridSize - 1) {
      head.y = 0;
    }
  }

  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y)
      return showScreen(canvas, menu, settings, gameOver, 3);
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreHolder.innerHTML = `Score: ${score}`;

    food = generateFood(gridSize);
  } else {
    snake.pop();
  }

  drawGame(ctx, food, snake, tileSize);

  setTimeout(mainLoop, speed);
};

const newGame = () => {
  tileSize = canvas.width / gridSize;

  food = generateFood(gridSize);

  snake = [];

  for (let i = 0; i < 5; i++) {
    snake.push({ x: gridSize / 2 - i, y: gridSize / 2 });
  }

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
