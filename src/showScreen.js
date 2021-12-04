const showScreen = (canvas, menu, settings, gameOver, screen) => {
  switch (screen) {
    case 0:
      canvas.style.display = "block";
      menu.style.display = "none";
      settings.style.display = "none";
      gameOver.style.display = "none";
      break;

    case 1:
      canvas.style.display = "none";
      menu.style.display = "block";
      settings.style.display = "none";
      gameOver.style.display = "none";
      break;

    case 2:
      canvas.style.display = "none";
      menu.style.display = "none";
      settings.style.display = "block";
      gameOver.style.display = "none";
      break;

    case 3:
      canvas.style.display = "none";
      menu.style.display = "none";
      settings.style.display = "none";
      gameOver.style.display = "block";
      break;
  }
};

export default showScreen;
