import "./styles.css";
function renderBoard(boardElement, gameboard, showShips = false, isEnemy = false, onAttack = null) {
  boardElement.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const gridCell = gameboard.grid[i][j];

      if (gridCell.isHit === "hit") cell.classList.add("hit");
      if (gridCell.isHit === "miss") cell.classList.add("miss");
      if (showShips && gridCell.shipType) cell.classList.add("ship");

      if (isEnemy && onAttack) {
        cell.addEventListener("click", () => onAttack(i, j));
      }

      boardElement.appendChild(cell);
    }
  }
}

export {renderBoard}
