import React from 'react';

const Cell = (props) => {
	return (
		<div className={'cell cell-value-' + props.value}>
			{props.value > 0 ? props.value : ''}
		</div>
	);
};

export default Cell;
