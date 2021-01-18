import React, { useState } from 'react';
import '../styles/index.css';

import Game from './Game';

const DEFAULT_SETTINGS = {
	boardWidth: {
		value: 4,
		type: 'number',
		min: 3,
		max: 10,
		displayName: 'Board Width',
	},
	displayArrows: {
		value: false,
		type: 'checkbox',
		displayName: 'Display Arrows',
	},
	doNothing: {
		value: false,
		type: 'checkbox',
		displayName: 'Do Nothing',
	},
};

const App = () => {
	const [playingGame, setPlayingGame] = useState(true);
	const [gameKey, setGameKey] = useState(0);
	const [settings, setSettings] = useState(DEFAULT_SETTINGS);

	const restartGame = () => {
		setPlayingGame(true);
		setGameKey(gameKey + 1);
	};

	const endGame = () => {
		setPlayingGame(false);
	};

	const updateSettings = (newSettings) => {
		setSettings(newSettings);
		if (newSettings.boardWidth.value !== settings.boardWidth.value) {
			restartGame();
		}
	};

	return (
		<>
			<Game
				key={gameKey}
				playing={playingGame}
				end={endGame}
				restart={restartGame}
				settings={settings}
				updateSettings={updateSettings}
			/>
		</>
	);
};

export default App;
