import { Ship } from "./ship.js";

const GameBoard = function () {
  let grid = Array.from({ length: 10 }, () => new Array(10));
  let shipList = [];

  const shipLengths = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };

  const createGrid = function () {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        grid[i][j] = {
          isHit: null,
          shipType: null,
          ship: null
        };
      }
    }
  };

  const getShipLength = function (shipType) {
    return shipLengths[shipType];
  };

  const canPlaceShip = function (x, y, shipType, alignment) {
    const length = getShipLength(shipType);

    if (alignment === "horizontal") {
      if (y + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (grid[x][y + i].ship !== null) return false;
      }
    } else {
      if (x + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (grid[x + i][y].ship !== null) return false;
      }
    }
    return true;
  };

  const placeShip = function (shipType, coordinate, alignment) {
    const x = coordinate[0];
    const y = coordinate[1];
    const length = getShipLength(shipType);

    if (!canPlaceShip(x, y, shipType, alignment)) return false;

    const ship = Ship(length);
    ship.type = shipType;

    if (alignment === "horizontal") {
      for (let i = 0; i < length; i++) {
        grid[x][y + i].shipType = shipType;
        grid[x][y + i].ship = ship;
      }
    } else {
      for (let i = 0; i < length; i++) {
        grid[x + i][y].shipType = shipType;
        grid[x + i][y].ship = ship;
      }
    }

    shipList.push(ship);
    return true;
  };

  const recieveAttack = function (x, y) {
    if (grid[x][y].isHit !== null) return "already attacked";
    if (grid[x][y].ship) {
      grid[x][y].ship.hit();
      grid[x][y].isHit = "hit";
    } else {
      grid[x][y].isHit = "miss";
    }
  };

  const reset = function () {
    createGrid();
    shipList = [];
  };

  const isShipPlaced = function (shipType) {
    return shipList.some(ship => ship.type === shipType);
  };


  const gameOver = function () {
    return shipList.length > 0 && shipList.every(ship => ship.isSunk());
  };

  return { grid, createGrid, getShipLength, canPlaceShip, placeShip, recieveAttack, reset, gameOver, isShipPlaced };
};

export { GameBoard };
