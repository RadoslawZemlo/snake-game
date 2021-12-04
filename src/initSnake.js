const initSnake = gridSize => {
  let snake = [];

  for (let i = 0; i < 5; i++) {
    snake.push({ x: gridSize / 2 - i, y: gridSize / 2 });
  }

  return snake;
};

export default initSnake;
