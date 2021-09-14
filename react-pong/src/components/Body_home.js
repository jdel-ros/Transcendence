import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../App";

const Body_home = () => {
	const [chall1, setchall1] = useState('achivement-done');
	const [chall2, setchall2] = useState();
	const [chall3, setchall3] = useState();
	const [chall4, setchall4] = useState('achivement-done');
	const [game1, setGame1] = useState(null);
	const [game2, setGame2] = useState(null);
	const [game3, setGame3] = useState(null);

	useEffect(() => {
		socket.game.emit("isThereActiveGames");
	},[])
	useEffect(() => {
		if (game1)
			console.log("game1=",game1.scoreJ1);
	},[game1,game2,game3])

	socket.game.on("listActiveGames", (socket) => {
		if (socket.gameNumber === 1)
			setGame1(JSON.parse(JSON.stringify(socket)))
		if (socket.gameNumber === 2)
			setGame2(socket);
		if (socket.gameNumber === 3)
			setGame3(socket);
	})

	return (
		<div>
			<section class="content">
				<section id="leaderbord">
					<div id="box-leader">
						<div id="the-box">
							<div id="deuxieme-place">
								<li>JDEL</li>
								<li>48% Win Rate</li>
							</div>
							<div id="premiere-place">
								<li>MANACCAC</li>
								<li>70% Win Rate</li>
							</div>
							<div id="troisieme-place">
								<li>RPICHON</li>
								<li>37% Win Rate</li>
							</div>
						</div>
					</div>

				<div id="title-game">GAME</div>
				<div id="box-game">
					<div id="left-racket"></div>
					<div id="ball"></div>
					<div id="right-racket"></div>
				</div>
				<div id="choose-game">
					<Link to="/matchmaking/ranked" id="boutton-normal">Ranked</Link>
					<Link to="/matchmaking/quickplay" id="boutton-ranked">QuickPlay</Link>
					<Link to="/matchmaking/footpong" id="boutton-mod">FootPong</Link>
				</div>
			</section>

		<div id="box-challenge">
			<div id="challenge-bar">
				<div id="chall-nb">1/4</div>
			</div>

			<div id="chall-top-left" className={chall1}>
				<li>ce connecter</li>
			</div>
			<img src="../img/first_co.svg" alt="icon-first_co" className="pict-top-left"/>

			<div id="chall-top-right" className={chall2}>
				<li>win 5 match</li>
			</div>
			<img src="../img/five_win.svg" alt="icon-first_co" className="pict-top-right"/>

			<div id="chall-bot-left" className={chall3}>
				<li>atteindre le top 10 une fois</li>
			</div>
			<img src="../img/top-10.svg" alt="icon-first_co" className="pict-bot-left"/>

			<div id="chall-bot-right" className={chall4}>
				<li>atteindre le top 1 une fois</li>
			</div>
			<img src="../img/first_lead.svg" alt="icon-first_co" className="pict-bot-right"/>
		</div>

		<div id="Live-box">
			<li id="Title-live"> Live Game</li>
			{(() => {
      if (game1) {
        return (
					<Link to={"/spectate/" + game1.roomID}>
					<div id="Live-1" className="Live">
					<li className="namej1">{game1.nameP1}</li>
					<li className="score-j1">{game1.scoreJ1}</li>
					<li className="namej2">{game1.nameP2}</li>
					<li className="score-j2">{game1.scoreJ2}</li>
					<div style= {{backgroundImage: "url(../img/live-game.png)"}} className="Live-back"/>
					</div>
					</Link>
        )
      }
    })()}
		{(() => {
    if (game2) {
      return (
				<Link to={"/spectate/" + game2.roomID}>
				<div id="Live-2" className="Live">
				<li className="namej1">{game2.nameP1}</li>
				<li className="score-j1">{game2.scoreJ1}</li>
				<li className="namej2">{game2.nameP2}</li>
				<li className="score-j2">{game2.scoreJ2}</li>
				<div style= {{backgroundImage: "url(../img/live-game.png)"}} className="Live-back"/>
				</div>
				</Link>
      )
    }
  })()}
	{(() => {
    if (game3) {
      return (
				<Link to={"/spectate/" + game3.roomID}>
				<div id="Live-3" className="Live">
				<li className="namej1">{game3.nameP1}</li>
				<li className="score-j1">{game3.scoreJ1}</li>
				<li className="namej2">{game3.nameP2}</li>
				<li className="score-j2">{game3.scoreJ2}</li>
				<div style= {{backgroundImage: "url(../img/live-game.png)"}} className="Live-back"/>
				</div>
				</Link>
      )
    }
  })()}
		</div>

		</section>
		</div>
	);
};

export default Body_home;
