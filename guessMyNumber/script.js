//Math.floor(Math.random() * (max - min + 1) + min);

let secretNumber = Math.floor(Math.random() * (20 - 1 + 1) + 1);
let score = Number(document.querySelector(".score").textContent);
let highScore = Number(document.querySelector(".highscore").textContent);

function errorMessage() {
  document.querySelector(".message").textContent =
    "Write a number between 1 and 20";
}

function message(msg) {
  document.querySelector(".message").textContent = msg;
}

function updateHightScore() {
  if (score > highScore) {
    highScore = score;
    document.querySelector(".highscore").textContent = "" + score;
  }
}

function updateScore() {
  score--;
  if (score < 1) {
    message("You lost the game");
    document.querySelector(".score").textContent = 0;
  } else {
    document.querySelector(".score").textContent = score;
  }
}

document.querySelector(".check").addEventListener("click", () => {
  const inputNumber = Number(document.querySelector(".guess").value);

  if (!inputNumber) {
    errorMessage();
  } else if (inputNumber === secretNumber) {
    message("Well done!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".number").style.width = "30rem";
    updateHightScore();
  } else {
    if (inputNumber > 20 || inputNumber < 1) {
      errorMessage();
    } else if (inputNumber < secretNumber) {
      message("Go up!");
    } else {
      message("Go down!");
    }
    updateScore();
  }
});

document.querySelector(".again").addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * (20 - 1 + 1) + 1);
  document.querySelector(".score").textContent = "20";
  score = 20;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  message("Start guessing...");
  document.querySelector(".guess").value = "";
});
