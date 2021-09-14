import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
import { socket } from "../App";
import "../styles/components/_pong.css";
import Navigation from "./Navigation";
//import Score from "./Score";
//import Field from "./Field";

const ball = require("../utils/ball");

const Pong = () => {
	const canvas = useRef(null);
	const [score, setScore] = useState({scoreP1: 0, scoreP2: 0});
	const [gameWidth, setGameWidth] = useState(0);
	const [gameHeight, setGameHeight] = useState(0);
	const [gameStart, setGameStart] = useState(false);
	const [position, setPosition] = useState(false);
	const [isReady, setIsReady] = useState({P1: false, P2: false});
	const [winner, setWinner] = useState(0);

	window.addEventListener("resize", () => {
		calculateGameSize();
	})
	useEffect(() => {
		calculateGameSize();
	})

	function calculateGameSize() {
		console.log("in calculate Size");
		const fieldHeight = window.innerHeight * 0.8;
		const fieldWidth = window.innerWidth * 0.8;
		if ( fieldHeight * 16/9 < fieldWidth) {
			setGameWidth(16/9 * fieldHeight);
			setGameHeight(fieldHeight);
		}
		else {
			setGameHeight(fieldWidth * 9/16);
			setGameWidth(fieldWidth);
		}
	};

	useEffect(() => {
		if (winner === 0) {
		console.log("rerender animate ?; winner=",winner);
		var gameData = {
			username: 'prownie',//prompt("Enter your username"),
			direction: 1,
			balldx: gameStart ? gameWidth * 0.2 / 100 : 0,
			balldy: 0.00,
			radius: gameWidth / 100,
			width: gameWidth,
			height: gameHeight,
			speed: 0,
			ballx: gameWidth / 2,
			bally: gameHeight / 2,
			posRack1: gameHeight / 2 - gameHeight / 10,
			posRack2: gameHeight / 2 - gameHeight / 10,
			rackWidth: gameWidth / 50,
			rackHeight: gameHeight / 5,
			goup1: false,
			godown1: false,
			goup2: false,
			godown2: false,
			position: position,
			ctx: document.getElementById("canvas").getContext('2d'),
			socket: socket.game,
			ready: isReady,
			setReady: setIsReady,
			gameStart: gameStart,
			isPlayer: true,
		};
		socket.game.on("movePadClient", (socket) => {
			if (socket.position === 1){
				gameData.goup1 = socket.goup;
				gameData.godown1 = socket.godown
				gameData.posRack1 = socket.posRack * gameData.height;
			}
			else if (socket.position === 2){
				gameData.goup2 = socket.goup;
				gameData.godown2 = socket.godown
				gameData.posRack2 = socket.posRack * gameData.height;
			}
		});

		socket.game.on("updateGameData", (socket) => {
			gameData.ballx = socket.ballx * gameData.width;
			gameData.bally = socket.bally * gameData.height;
			gameData.dx = socket.balldx;
			gameData.dy = socket.balldy;
			gameData.speed = socket.speed * gameData.width;
			gameData.posRack1 = socket.posRack1 * gameData.height;
			gameData.posRack2 = socket.posRack2 * gameData.height;
		});

		if (winner === 0)
			ball.animate(gameData)
		console.count("in useEffect");
		// else {
		// 	console.log('in return 1');
		// 	return () => {
		// 		<div id="matchmaking">
		// 			Waiting for opponent
		// 		</div>
		// 	}
		// }
	}
	}, [score, gameHeight, gameWidth, position, gameStart, isReady, winner])

	socket.game.on("onePlayerReady", (socket) => {
		console.log("on onePlayerReady, position=",socket.position);
		if (socket.position === "1")
			setIsReady({...isReady, P1: true});
		else if (socket.position === "2")
			setIsReady({...isReady, P2: true});
	})
	socket.game.on("winnerIs", (socket) => {
		console.log("game is over, winner is player:", socket.winner)
		setWinner(socket.winner);
	})
	socket.game.on("updateScore", (socket) => {
		setScore({scoreP1: socket.scoreP1, scoreP2: socket.scoreP2})
	})
	socket.game.on("whichSide", (socket) => {
		setPosition(parseInt(socket.position));
	});
	socket.game.on("gameStarting", (socket) => {
		setGameStart(true);
	});

if (winner !== 0)
	return (
		<div>
			<Navigation/>
			<div id ="gameField">PLAYER { winner } WON</div>
		</div>
	);
else
  return (
		<div>
		<Navigation/>
			<div id="gameField" className="content">
				<div id="score" className="score" style={{ width: gameWidth, fontSize: gameHeight / 20, backgroundImage: "url(../img/tetris-bg.jpeg)" }}>
					<div id="dataP1" className="score" style={{width: gameWidth / 2 , height: gameHeight / 15}}>
						<img src="../img/grumpy_cat.jpeg" alt="p1" height={gameHeight / 15} width={gameHeight / 15}></img>
						TU FOUS {/* USERNAME OF P1*/}
						<div id="scoreP1" style={{width : gameHeight / 15, height : gameHeight / 15, fontSize: gameHeight / 15}}> { score.scoreP1 }</div>
					</div>
					<div id="dataP2" style={{width: gameWidth / 2, height: gameHeight / 15}}>
						<div id="scoreP2" style={{width : gameHeight / 15, height : gameHeight / 15, fontSize: gameHeight / 15}}> { score.scoreP2 }</div>
						QUOI {/* USERNAME OF P2*/}
						<img id="imgP2" src="../img/shrek.jpg" alt="p2" height={gameHeight / 15} width={gameHeight / 15}></img>
					</div>
				</div>
				<div id="pong" style={{
					width: gameWidth, height: gameHeight
				}}>
					<canvas id="canvas" ref={canvas} width={gameWidth} height={gameHeight} style={{backgroundImage: "url(../img/wtf.jpg)" }}>
						{/*{canvas.current&&<Field
							ctx={canvas.current.getContext('2d')}
							width={canvas.current.width}
							height={canvas.current.height}
							j1scored={j1scored}
							/>}*/}
					</canvas>
				</div>
			</div>
		</div>
  );
};


export default Pong;
