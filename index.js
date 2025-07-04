const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const themeToggle = document.querySelector(".theme-toggle");

let currentPlayer;
let gameGrid;

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
  gameInfo.innerText = `Current Player: ${currentPlayer}`;
}

initGame();

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameInfo.innerText = `Current Player: ${currentPlayer}`;
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
    checkGameOver();
    if (!newGameBtn.classList.contains("active")) {
      swapTurn();
    }
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});

newGameBtn.addEventListener("click", initGame);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
