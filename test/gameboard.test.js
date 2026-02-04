import {Ship} from "../src/ship.js";
import {GameBoard} from "../src/gameboard.js";

let game;
beforeEach(() => {
  game = GameBoard();
  game.createGrid()
});

test('placing ships', () => {
  let ship = new Ship(3);
  game.placeShip(ship, [2,4], "horizontal");

  expect(game.grid[2][5].shipType).toBe(ship);
});

test('attacking ships', () => {
  let ship = new Ship(3);
  game.placeShip(ship, [2,4], "horizontal");
  game.recieveAttack(2,6);

  expect(ship.hits).toBe(1);
  expect(game.grid[2][6].isHit).toBe("hit");
});

test('attacking ships but missed', () => {
  let ship = new Ship(3);
  game.placeShip(ship, [2,4], "horizontal");
  game.recieveAttack(3,5);

  expect(game.grid[3][5].isHit).toBe("miss");
});

test('attacking the same place does not count', () => {
  let ship = new Ship(3);
  game.placeShip(ship, [2,4], "horizontal");
  game.recieveAttack(2,5);
  game.recieveAttack(2,5);

  expect(ship.hits).toBe(1);
  expect(game.grid[2][5].isHit).toBe("hit");
});


