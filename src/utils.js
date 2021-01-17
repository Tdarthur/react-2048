import ShiftDirection from './ShiftDirection';

const shift = (board, rowStart, rowEnd, unitStep) => {
	let points = 0;
	let gap = 0;
	let combinedLast = false;

	for (let at = rowStart; at !== rowEnd + unitStep; at += unitStep) {
		if (board[at] === 0) {
			gap++;
		} else {
			const xDest = at - unitStep * gap;
			if (
				Math.abs(xDest - rowStart) > 0 &&
				board[xDest - unitStep] === board[at]
			) {
				combinedLast = true;
				points += board[at] * 2;
				board[xDest - unitStep] = board[at] * 2;
				board[at] = 0;
				gap++;
			} else if (gap > 0) {
				if (combinedLast) combinedLast = false;
				board[xDest] = board[at];
				board[at] = 0;
			}
		}
	}

	return points;
};

const shiftLeft = (board, boardWidth) => {
	let points = 0;

	for (let y = 0; y < boardWidth; y++) {
		const rowStart = y * boardWidth;
		const rowEnd = (y + 1) * boardWidth - 1;
		points += shift(board, rowStart, rowEnd, 1);
	}

	return points;
};

const shiftRight = (board, boardWidth) => {
	let points = 0;

	for (let y = 0; y < boardWidth; y++) {
		const rowStart = (y + 1) * boardWidth - 1;
		const rowEnd = y * boardWidth;
		points += shift(board, rowStart, rowEnd, -1);
	}

	return points;
};

const shiftUp = (board, boardWidth) => {
	let points = 0;

	for (let x = 0; x < boardWidth; x++) {
		const columnStart = x;
		const columnEnd = Math.pow(boardWidth, 2) - (boardWidth - x);
		points += shift(board, columnStart, columnEnd, boardWidth);
	}

	return points;
};

const shiftDown = (board, boardWidth) => {
	let points = 0;

	for (let x = 0; x < boardWidth; x++) {
		const columnStart = Math.pow(boardWidth, 2) - (boardWidth - x);
		const columnEnd = x;
		points += shift(board, columnStart, columnEnd, -boardWidth);
	}

	return points;
};

const utils = {
	initializeArray: (length, fill = 0) => {
		console.log(length);
		const array = [];
		array.length = length;
		array.fill(fill, 0, length + 1);
		return array;
	},

	arraysEqual: (array1, array2) => {
		if (array1.length === array2.length) {
			return array1.reduce(
				(same, value, index) => same && value === array2[index],
				true
			);
		}

		return false;
	},

	spawnCell: (board) => {
		const newBoard = [...board];

		if (board && board.includes(0)) {
			const emptyCells = [...board]
				.map((value, index) => (value === 0 ? index : -1))
				.filter((value) => value >= 0);

			newBoard[
				emptyCells[Math.floor(Math.random() * emptyCells.length)]
			] = Math.random() > 0.5 ? 2 : 4;
		}

		return newBoard;
	},

	shiftBoard: (board, direction) => {
		const boardWidth = Math.sqrt(board.length);

		let shiftedBoard = [...board];
		let points = 0;
		switch (direction) {
			case ShiftDirection.left:
				points = shiftLeft(shiftedBoard, boardWidth);
				break;
			case ShiftDirection.right:
				points = shiftRight(shiftedBoard, boardWidth);
				break;
			case ShiftDirection.up:
				points = shiftUp(shiftedBoard, boardWidth);
				break;
			case ShiftDirection.down:
				points = shiftDown(shiftedBoard, boardWidth);
				break;
			default:
				console.error('Invalid direction: ' + direction);
				break;
		}

		return { shiftedBoard, points };
	},

	validateBoard: (board) => {
		for (const direction in ShiftDirection) {
			const { shiftedBoard } = utils.shiftBoard(
				board,
				ShiftDirection[direction]
			);
			if (
				shiftedBoard.reduce(
					(valid, value, index) => valid || value !== board[index],
					false
				)
			) {
				return true;
			}
		}

		return false;
	},
};

export default utils;
