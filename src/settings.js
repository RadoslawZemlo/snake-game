const setSpeed = speedValue => {
  const speed = speedValue;
  return speed;
};

const setWall = wallValue => {
  const wall = wallValue;

  wall === 0
    ? (canvas.style.border = "10px solid #bcbcbc")
    : (canvas.style.border = "10px dashed #bcbcbc");

  return wall;
};

export { setSpeed, setWall };
