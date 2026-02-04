import {Player} from "./player.js";
import {Ship} from "./ship.js";
import {renderBoard} from "./domController.js";

const humanPlayer = Player("human");
const computerPlayer = Player("computer");

humanPlayer.gameboard.createGrid();
computerPlayer.gameboard.createGrid();

humanPlayer.gameboard.placeShip(Ship(3), [0,0], "horizontal");
humanPlayer.gameboard.placeShip(Ship(2), [2,2], "vertical");

computerPlayer.gameboard.placeShip(Ship(3), [5,5], "horizontal");
computerPlayer.gameboard.placeShip(Ship(2), [7,1], "vertical");

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");

function updateBoards() {
  renderBoard(playerBoard, humanPlayer.gameboard, true);
  renderBoard(computerBoard, computerPlayer.gameboard, false, true, playerAttack);
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

updateBoards();
