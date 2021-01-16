import React from 'react';

import Cell from './Cell';

const Gameboard = (props) => {
	let key = 0;
	const boardWidth = Math.sqrt(props.board.length);

	let rowColumnTemplate = '';
	for (let i = 0; i < boardWidth; i++) {
		rowColumnTemplate += '100px ';
	}

	return (
		<div
			className='cells'
			style={{
				gridTemplateColumns: rowColumnTemplate,
				gridTemplateRows: rowColumnTemplate,
			}}
		>
			{props.board.map((value) => (
				<Cell key={key++} value={value} />
			))}
		</div>
	);
};

export default Gameboard;
