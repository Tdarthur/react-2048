import React, { useState } from 'react';

import Scoreboard from './Scoreboard';
import Gameboard from './Gameboard';
import ButtonPanel from './ButtonPanel';
import utils from '../utils';
import ShiftDirection from '../ShiftDirection';

const Game = (props) => {
	const { score, board, shiftBoard } = UseGameState(props);

	return (
		<>
			<Scoreboard score={score} />
			<div className='game-panel'>
				<div className='game-board'>
					<Gameboard board={board} playing={props.playing} />
					{!props.playing ? (
						<div class='game-over'>
							<label>Game Over</label>
							<button
								id='restart_game'
								class='button'
								onClick={props.restart}
							>
								New Game
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
				<ButtonPanel shiftBoard={shiftBoard} />
			</div>
		</>
	);
};

const UseGameState = (props) => {
	const [score, setScore] = useState(0);
	const boardSize = Math.pow(props.boardWidth, 2);
	const [board, setBoard] = useState(
		utils.spawnCell(utils.initializeArray(boardSize, 0))
	);

	const shiftBoard = (direction) => {
		const { shiftedBoard, points } = utils.shiftBoard(board, direction);
		if (!utils.arraysEqual(board, shiftedBoard)) {
			const newBoard = utils.spawnCell(shiftedBoard);
			setBoard(newBoard);
			setScore(score + points);
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

	return { score, board, shiftBoard };
};

export default Game;
