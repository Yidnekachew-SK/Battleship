import {GameBoard} from "../src/gameboard.js";

const Player = function (playerType) {
	let gameboard = GameBoard();

	const attack = function (playerBoard, x, y) {
		return playerBoard.recieveAttack(x, y);
	};

	const computerAttack = function (playerBoard) {
		let x, y;
		do {
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * 10)
		} while(playerBoard.grid[x][y].isHit != null);

		return playerBoard.recieveAttack(x,y);
	};

	return { playerType, gameboard, attack, computerAttack };
}

export {Player};