const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const scoreHolder = document.querySelector("#score");

const gridSize = 20;

let tileSize, food, snake, dx, dy, turning, score;

const turn = key => {
  if (turning) return;
  turning = true;

  const [movingLeft, movingUp, movingRigth, movingDown] = [
    dx === -1,
    dy === -1,
    dx === 1,
    dy === 1
  ];

  if ((key === "ArrowLeft" || key === "a") && !movingRigth) {
    [dx, dy] = [-1, 0];
  } else if ((key === "ArrowUp" || key === "w") && !movingDown) {
    [dx, dy] = [0, -1];
  } else if ((key === "ArrowRight" || key === "d") && !movingLeft) {
    [dx, dy] = [1, 0];
  } else if ((key === "ArrowDown" || key === "s") && !movingUp) {
    [dx, dy] = [0, 1];
  }
};

const random = max => {
  return Math.floor(Math.random() * (max + 1));
};

const drawGame = () => {
  const [foodColor, snakeColor, stroke] = ["#c80e00", "#ffffff", "#555555"];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // DRAW FOOD
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  ctx.strokeStyle = stroke;
  ctx.strokeRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // DRAW SNAKE
  snake.forEach(part => {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);

    ctx.strokeStyle = stroke;
    ctx.strokeRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  });
};

const mainLoop = () => {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  turning = false;

  const hitWall =
    head.x < 0 || head.x > gridSize - 1 || head.y < 0 || head.y > gridSize - 1;

  if (hitWall) return;

  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreHolder.innerHTML = `Score: ${score}`;

    food = {
      x: random(gridSize - 1),
      y: random(gridSize - 1)
    };
  } else {
    snake.pop();
  }

  drawGame();

  setTimeout(mainLoop, 120);
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

  canvas.addEventListener("keydown", e => {
    if (e.defaultPrevented) return;
    turn(e.key);
  });

  mainLoop();
};

newGame();
