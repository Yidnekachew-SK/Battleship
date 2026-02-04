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

function enableShipPlacement(boardElement, gameboard, getSelectedShip, getOrientation, updateBoards) {
  const cells = boardElement.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    const x = Math.floor(index / 10);
    const y = index % 10;

    cell.addEventListener("mouseenter", () => {
      const shipType = getSelectedShip();
      if (!shipType) return;

      const btn = document.querySelector(`#ship-controls button[data-ship="${shipType}"]`);
      if (!btn || btn.disabled) return;

      cells.forEach(c => c.classList.remove("preview-valid", "preview-invalid"));

      const length = gameboard.getShipLength(shipType);
      const valid = gameboard.canPlaceShip(x, y, shipType, getOrientation());

      for (let i = 0; i < length; i++) {
        const targetIndex = getOrientation() === "horizontal"
          ? x * 10 + (y + i)
          : (x + i) * 10 + y;

        if (cells[targetIndex]) {
          cells[targetIndex].classList.add(valid ? "preview-valid" : "preview-invalid");
        }
      }
    });

    cell.addEventListener("mouseleave", () => {
      cells.forEach(c => c.classList.remove("preview-valid", "preview-invalid"));
    });

    cell.addEventListener("click", () => {
      const shipType = getSelectedShip();
      if (!shipType) return;

      const btn = document.querySelector(`#ship-controls button[data-ship="${shipType}"]`);
      if (!btn || btn.disabled) return;

      const placed = gameboard.placeShip(shipType, [x, y], getOrientation());
      if (placed) {
        updateBoards();
        cells.forEach(c => c.classList.remove("preview-valid", "preview-invalid"));

        if (btn) {
          btn.disabled = true;
          btn.classList.remove("active");
        }
      } else {
        alert("Invalid placement!");
      }
    });
  });
}


export { renderBoard, enableShipPlacement };
