import React, { useState } from 'react';

import ScorePanel from './ScorePanel';
import GamePanel from './GamePanel';
import SettingsPanel from './SettingsPanel';
import utils from '../utils';
import ShiftDirection from '../ShiftDirection';

const Game = (props) => {
	const { score, highScore, board, shiftBoard } = UseGameState(props);

	return (
		<>
			<ScorePanel score={score} highScore={highScore} />
			<GamePanel
				board={board}
				playing={props.playing}
				restart={props.restart}
				shiftBoard={shiftBoard}
			/>
			<SettingsPanel
				settings={props.settings}
				updateSettings={props.updateSettings}
			/>
		</>
	);
};

const UseGameState = (props) => {
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const boardSize = Math.pow(props.settings.boardWidth.value, 2);
	const [board, setBoard] = useState(
		utils.spawnCell(utils.initializeArray(boardSize, 0))
	);

	const shiftBoard = (direction) => {
		const { shiftedBoard, points } = utils.shiftBoard(board, direction);
		if (!utils.arraysEqual(board, shiftedBoard)) {
			const newBoard = utils.spawnCell(shiftedBoard);
			setBoard(newBoard);
			setScore(score + points);
			if (score + points > highScore) {
				setHighScore(score + points);
			}
			if (!utils.validateBoard(newBoard)) {
				props.end();
			}
		}
	};

	document.onkeydown = (e) => {
		switch (e.key) {
			case 'a':
			case 'ArrowLeft':
				shiftBoard(ShiftDirection.left);
				break;
			case 'd':
			case 'ArrowRight':
				shiftBoard(ShiftDirection.right);
				break;
			case 'w':
			case 'ArrowUp':
				shiftBoard(ShiftDirection.up);
				break;
			case 's':
			case 'ArrowDown':
				shiftBoard(ShiftDirection.down);
				break;
			case 'r':
				props.restart();
				break;
			default:
				break;
		}
	};

	return { score, highScore, board, shiftBoard };
};

export default Game;
