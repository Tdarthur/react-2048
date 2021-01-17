import React from 'react';

import ShiftDirection from '../ShiftDirection.js';

const DIRECTIONS = [
	ShiftDirection.left,
	ShiftDirection.right,
	ShiftDirection.up,
	ShiftDirection.down,
];

const ButtonArea = (props) => {
	return (
		<div className='button-panel'>
			{DIRECTIONS.map((direction) => (
				<button
					key={direction}
					className='button'
					id={direction.toLowerCase()}
					onClick={() => props.shiftBoard(direction)}
				></button>
			))}
		</div>
	);
};

export default ButtonArea;
