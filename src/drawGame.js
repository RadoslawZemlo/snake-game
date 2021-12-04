const drawGame = (ctx, food, snake, tileSize) => {
  const [foodColor, snakeColor, stroke] = ["#c80e00", "#ffffff", "#555555"];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // DRAW FOOD
  drawTile(ctx, food.x, food.y, foodColor, stroke, tileSize);

  // DRAW SNAKE
  snake.forEach(part => {
    drawTile(ctx, part.x, part.y, snakeColor, stroke, tileSize);
  });
};

const drawTile = (ctx, x, y, color, stroke, tileSize) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

  ctx.strokeStyle = stroke;
  ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
};

export default drawGame;
