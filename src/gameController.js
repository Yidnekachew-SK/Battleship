import "./styles.css";
import { Player } from "./player.js";
import { renderBoard, enableShipPlacement } from "./domController.js";

const humanPlayer = Player("human");
const computerPlayer = Player("computer");

humanPlayer.gameboard.createGrid();
computerPlayer.gameboard.createGrid();

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");

let selectedShip = null;
let orientation = "horizontal";

document.querySelectorAll("#ship-controls button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#ship-controls button").forEach(b => b.classList.remove("active"));
    selectedShip = btn.dataset.ship;
    btn.classList.add("active");
  });
});

document.getElementById("toggle-orientation").addEventListener("click", () => {
  orientation = orientation === "horizontal" ? "vertical" : "horizontal";
  document.getElementById("toggle-orientation").textContent =
    `Orientation: ${orientation.charAt(0).toUpperCase() + orientation.slice(1)}`;
});

document.getElementById("reset-game").addEventListener("click", () => {
  humanPlayer.gameboard.reset();
  computerPlayer.gameboard.reset();
  updateBoards();
  selectedShip = null;
  orientation = "horizontal";
  document.querySelectorAll("#ship-controls button").forEach(b => {
    b.classList.remove("active");
    b.disabled = false;
  });
  document.getElementById("toggle-orientation").textContent = "Orientation: Horizontal";
});

function placeComputerShips() {
  const shipTypes = ["carrier","battleship","cruiser","submarine","destroyer"];

  shipTypes.forEach(type => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      placed = computerPlayer.gameboard.placeShip(type, [x, y], orientation);
    }
  });
}

placeComputerShips();

function updateBoards() {
  renderBoard(playerBoard, humanPlayer.gameboard, true);
  renderBoard(computerBoard, computerPlayer.gameboard, false, true, playerAttack);

  enableShipPlacement(playerBoard, humanPlayer.gameboard, () => selectedShip, () => orientation, updateBoards);
}

function playerAttack(x, y) {
  humanPlayer.attack(computerPlayer.gameboard, x, y);
  updateBoards();

  if (computerPlayer.gameboard.gameOver()) {
    alert("You win!");
    return;
  }

  setTimeout(() => {
    computerPlayer.computerAttack(humanPlayer.gameboard);
    updateBoards();

    if (humanPlayer.gameboard.gameOver()) {
      alert("Computer wins!");
      return;
    }
  }, 1000);
}

function allShipsPlaced() {
  return ["carrier","battleship","cruiser","submarine","destroyer"]
    .every(type => humanPlayer.gameboard.isShipPlaced(type));
}


updateBoards();


