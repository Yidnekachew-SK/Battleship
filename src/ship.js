const Ship = function(length) {
	let hits = 0;
	let sunk = false;

	const hit = () => {
		hits++;
		if (hits >= length) {
			sunk = true;
		}

		return hits;
	};

	const isSunk = () => {
		return sunk;
	};

	return { length, hit, isSunk, get hits() { return hits} };
}

export {Ship};