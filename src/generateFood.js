const generateFood = gridSize => {
  const food = {
    x: random(gridSize - 1),
    y: random(gridSize - 1)
  };

  return food;
};

const random = max => {
  return Math.floor(Math.random() * (max + 1));
};

export default generateFood;
