import { Player } from "../src/player.js";

test('each player has its own gameboard', () => {
  const human = Player("human");
  const computer = Player("Computer");

  expect(human.gameboard).not.toBe(computer.gameboard);
});


