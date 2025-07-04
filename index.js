const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const resetBtn = document.querySelector(".reset-scores");
const themeToggle = document.querySelector(".theme-toggle");
const xScoreEl = document.getElementById("x-score");
const oScoreEl = document.getElementById("o-score");
const turnBadge = document.getElementById("turn-indicator");
const currentPlayerEl = document.getElementById("current-player");

let currentPlayer, gameGrid, xWins = 0, oWins = 0;

const moveSound = new Audio("assets/move.mp3");
const winSound = new Audio("assets/win.mp3");

const winningPositions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function initGame() {
  currentPlayer = "X";
  gameGrid = Array(9).fill("");
  boxes.forEach(box => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList.remove("win");
  });
  newGameBtn.classList.remove("active");
  updateInfo();
}

initGame();

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateInfo();
}

function updateInfo() {
  currentPlayerEl.textContent = currentPlayer;
  turnBadge.textContent = currentPlayer;
}

function checkGameOver() {
  let winner = "";
  winningPositions.forEach(pos => {
    if (
      gameGrid[pos[0]] !== "" &&
      gameGrid[pos[0]] === gameGrid[pos[1]] &&
      gameGrid[pos[1]] === gameGrid[pos[2]]
    ) {
      winner = gameGrid[pos[0]];
      boxes[pos[0]].classList.add("win");
      boxes[pos[1]].classList.add("win");
      boxes[pos[2]].classList.add("win");
      boxes.forEach(b => b.style.pointerEvents = "none");
    }
  });

  if (winner) {
    gameInfo.innerText = `🎉 Winner: ${winner}`;
    newGameBtn.classList.add("active");
    updateScore(winner);
    winSound.play();
    confetti();
    return;
  }

  if (!gameGrid.includes("")) {
    gameInfo.innerText = `😅 Game Tied!`;
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    moveSound.play();
    checkGameOver();
    if (!newGameBtn.classList.contains("active")) swapTurn();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});

newGameBtn.addEventListener("click", initGame);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

resetBtn.addEventListener("click", () => {
  xWins = 0; oWins = 0;
  updateScoreboard();
});

function updateScore(winner) {
  if (winner === "X") xWins++;
  if (winner === "O") oWins++;
  updateScoreboard();
}

function updateScoreboard() {
  xScoreEl.textContent = xWins;
  oScoreEl.textContent = oWins;
}
