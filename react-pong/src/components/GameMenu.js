import React from "react";
import { Link } from "react-router-dom";

const GameMenu = () => {

	return (
		<div id="GameMenu">
			<Link to="/matchmaking/ranked"><button>Ranked Game</button></Link>
			<Link to="/matchmaking/quickplay"><button>Ranked Game</button></Link>
			<Link to="/matchmaking/footpong"><button>Ranked Game</button></Link>
			<div className="liveGames">
			<div className='liveGame1'>Game1</div>
			<div className='liveGame2'>Game2</div>
			<div className='liveGame3'>Game3</div>
			<div className='liveGame4'>Game4</div>
			<div className='liveGame5'>Game5</div>
			<div className='liveGame6'>Game6</div>
			</div>
		</div>

	);
};

export default GameMenu;
