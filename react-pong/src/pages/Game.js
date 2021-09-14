import React from 'react';
import Navigation from '../components/Navigation';

const Game = () => {
	console.count("render");
	return (
		<div>
			<Navigation></Navigation>
			<section className="content">
				<div id="Game-block"><img src="../img/versus.svg" alt="vs" className="versus"/></div>
			</section>
		</div>
	);
};

export default Game;