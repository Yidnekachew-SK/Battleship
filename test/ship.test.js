import {Ship} from '../src/ship';

let ship;
beforeEach(() => {
	ship = new Ship(3);
});

test("ship starts with given length", () => {
	expect(ship.length).toBe(3);
});

test("ship takes hits", () => {
	ship.hit();
	expect(ship.hits).toBe(1);
});

test("ship sunk after 3 hits", () => {
	ship.hit();
	ship.hit();
	ship.hit();
	expect(ship.isSunk()).toBe(true);
});