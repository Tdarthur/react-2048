import React, { useState } from 'react';
import '../styles/index.css';

import Game from './Game';

const BOARD_WIDTH = 4;

const App = () => {
	const [playingGame, setPlayingGame] = useState(true);
	const [gameKey, setGameKey] = useState(0);

	const restartGame = () => {
		setPlayingGame(true);
		setGameKey(gameKey + 1);
	};

	const endGame = () => {
		setPlayingGame(false);
	};

	return (
		<>
			<Game
				key={gameKey}
				playing={playingGame}
				end={endGame}
				restart={restartGame}
				boardWidth={BOARD_WIDTH}
			/>
		</>
	);
};

export default App;
