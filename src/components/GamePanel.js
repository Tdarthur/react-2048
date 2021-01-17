import Gameboard from './Gameboard';
import ButtonArea from './ButtonArea';
import '../styles/GamePanel.css';

const GamePanel = (props) => (
	<div className='game-panel panel'>
		<div className='game-board'>
			<Gameboard board={props.board} playing={props.playing} />
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
		<ButtonArea shiftBoard={props.shiftBoard} />
	</div>
);

export default GamePanel;
