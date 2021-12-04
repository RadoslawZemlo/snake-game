const wallsOn = (head, gridSize) => {
  return (
    head.x < 0 || head.x > gridSize - 1 || head.y < 0 || head.y > gridSize - 1
  );
};

const wallsOff = (head, gridSize) => {
  if (head.x < 0) {
    head.x = gridSize - 1;
  } else if (head.x > gridSize - 1) {
    head.x = 0;
  } else if (head.y < 0) {
    head.y = gridSize - 1;
  } else if (head.y > gridSize - 1) {
    head.y = 0;
  }

  return head;
};

export { wallsOn, wallsOff };
