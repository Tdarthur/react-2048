import React from 'react';
import '../styles/ScorePanel.css';

const Scoreboard = (props) => (
	<div className='score-panel panel'>
		<div className='score-display'>Score: {props.score}</div>
		<div className='high-score-display'>
			High Score: {props.highScore ? props.highScore : 0}
		</div>
	</div>
);

export default Scoreboard;
