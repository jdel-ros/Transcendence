import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { socket } from "../App";
import Error from "./Error";
import Navigation from "./Navigation";

const MatchMaking = (props) => {
	const [username, setUsername] = useState("test");
	const [opponent, setOpponent] = useState(null);
	const [opponentPic, setOpponentPic] = useState("../img/waiting_man.svg");
	const [queue, setQueue] = useState(false);


	useEffect(() => {
		if (['ranked','quickplay','footpong'].indexOf(props.match.params.matchtype) >= 0) {
		console.log("socket:");
		console.log(socket);
		if (!username)
			setUsername(prompt("enter username"))
		else {
			socket.game.emit('startMatchmaking', {
				matchtype: props.match.params.matchtype,
				username: username,
			});}}
	}, [username, props.match.params.matchtype])

	useEffect(() => {
		console.log('socket.id=',socket.id);
	}, [])

	socket.game.on("opponentFound", (socket) => {
		setOpponentPic("https://image.shutterstock.com/image-vector/found-grunge-rubber-stamp-on-260nw-197028626.jpg")
		setTimeout(() => setOpponent("found"), 1000);
	});

	socket.game.on("inQueue", (socket) => {
		setQueue(true);
	});
	useEffect(() => {
		if (queue)
			console.log("Subscribed to queue");
	}, [queue]);

	if (['ranked','quickplay','footpong'].indexOf(props.match.params.matchtype) < 0) {
		return (
			<div id="Error">
				<Error />
			</div>
		);}
	return (
		<div>
			<Navigation></Navigation>
			<div id="GameMenu" className="content">
				{ opponent ? <Redirect to ='/game' />: null }
				<div id="player1">
					<img src= "../img/manaccac.png" alt="you" className="player_img"/>
					<li id="name_player1">{ username }</li>
				</div>
				<div id="player2">
					<li>{ opponent ? opponent : "" }</li>
					<img src= {opponentPic} alt="opponent" className="player_img"/>
				</div>
				<li className="versus"></li>
			</div>
		</div>

	);
};

export default MatchMaking;

//<img src= "https://static-s.aa-cdn.net/img/ios/899287106/45820b5b6bba46c7fcd853a46d554a34?v=1" alt="you" width="40vw" height="40vh" id="player1_img"/>
// export default class MatchMaking extends React.Component {
//   render() {
//     return(
//       <div>
//         <h2>{this.props.match.params.matchtype}</h2>
//       </div>
//     )
//   }
// }
