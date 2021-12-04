const collision = (something, head) => {
  return head.x === something.x && head.y === something.y;
};

export default collision;
