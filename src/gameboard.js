import {Ship} from "./ship.js";

const GameBoard = function() {
	let grid = Array.from({ length: 10 }, () => new Array(10));
	let missedGrids = [];
	let shipList = [];

	const createGrid = function () {
		for (let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				grid[i][j] = {
					isHit: null,
					shipType: null
				};
			}
		}
	};

	const checkOutOfBound = function (ship, coordinate, alignment) {
		if (alignment === "horizontal") {
			if ((ship.length + coordinate[1]) > 10) {
				return false;
			}
		} else if (alignment === "vertical") {
			if ((ship.length + coordinate[0]) > 10) {
				return false;
			}
		}

		return true;
	}

	const placeShip = function (ship, coordinate, alignment) {
		let x = coordinate[0];
		let y = coordinate[1];

		if (checkOutOfBound(ship, coordinate, alignment) === false) {
			return "not allowed";
		};

		if (alignment === "horizontal" && grid[x][y].shipType === null) {
			for(let i = 0; i < ship.length; i++){
				grid[x][y + i].shipType = ship;
			}
			shipList.push(ship);
		} else if(alignment === "vertical" && grid[x][y].shipType === null){
			for(let i = 0; i < ship.length; i++){
				grid[x + i][y].shipType = ship;
			}
			shipList.push(ship);
		} else {
			return "not allowed";
		}
		
	};

	const recieveAttack = function (x,y) {
		if (grid[x][y].isHit !== null) { 
			return "already attacked";
		};
		if (grid[x][y].shipType != null) {
			grid[x][y].shipType.hit();
			grid[x][y].isHit = "hit";
		} else {
			grid[x][y].isHit = "miss";
			missedGrids.push([x,y]);
		}
	};

	const gameOver = function () {
		for(let i = 0; i < shipList.length; i++){
			if (shipList[i].isSunk === false) {
				return false;
			}

			return true;
		}
	};

	return { grid, createGrid, placeShip, recieveAttack, gameOver };
}

export {GameBoard};