const updateScore = (scoreHolder, score) => {
  score++;
  scoreHolder.innerHTML = `Score: ${score}`;

  return score;
};

export default updateScore;
