import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { gameData } from "./interfaces/gameData.interface";
import { moveBall } from "./interfaces/moveBall.interface";
import { movePad } from "./interfaces/movePad.interface";
import { RoomService } from "./room.service";
import { _users } from "./game/game.gateway";

@Injectable()
export class SocketService {
	public constructor(
		private readonly roomService: RoomService,
	) {}

	private _server: Server;

	public init(server: Server): void {
		this._server = server;
		this.roomService.init(this._server);
	}

	public joinMatchMaking(client: Socket, message: { matchtype: string, username: string }): void {
		if (['ranked','quickplay','footpong'].indexOf(message.matchtype) < 0)
			return;
		if (client.data.inGame)
		{
			console.log("already in a game, cant start another one");
			return;
		}
		/*
		USERNAME SHOULD BE WRITTEN ON THE HANDLECONNECTION EVENT
		WAITING FOR JUAN'S WORK
		*/
		client.data.username = message.username;
		// if rooms exists, then there is already someone looking for a game

		// if (this._server.sockets.adapter.rooms.get(message.matchtype)){
		if (this._server.adapter['rooms'].get(message.matchtype)){
			let opponentId = this.roomService.getUsers(message.matchtype).values().next().value;
			let opponent = _users.find(obj => obj.socketid === opponentId).socket;
			let newRoomId = this.roomService.createNewRoom(opponent, client);
			//join new room and clear matchmaking room
			client.join(newRoomId);
			opponent.join(newRoomId);
			opponent.leave(message.matchtype);
			this._server.to(newRoomId).emit('opponentFound',"opponent found, game starting")
			setTimeout(() => opponent.emit('whichSide', { position: "1" }), 2000);
			setTimeout(() => client.emit('whichSide', { position: "2" }), 2000);
			client.data.inGame = true;
			client.data.gameRoomId = newRoomId;
			opponent.data.inGame = true;
			opponent.data.gameRoomId = newRoomId;
		}
		else {
			//join matchmaking queue and answer to client
			client.join(message.matchtype);
			client.emit('inQueue');
		}
		console.log("after adapter.rooms");
	}

	public sendGameData(client: Socket, gameData: gameData): void {
		client.broadcast.to(client.data.gameRoomId).emit('gameToClient', gameData);
	}

	public movePad(client: Socket, movePad: movePad): void {
		this.roomService.movePad(client, movePad, client.data.gameRoomId);
	}

	public moveBall(client: Socket, moveBall: moveBall): void {
		this._server.to(client.data.gameRoomId).emit('moveBallClient', moveBall);
		// console.log("before assignation:ballx=",moveBall.ballx,
		// 	"bally=",moveBall.bally,
		// 	"balldx=",moveBall.balldx,
		// 	"balldy=",moveBall.balldy,
		// 	"position=",moveBall.position,"\n")
	}

	public setPlayerReady(client: Socket): void {
		console.log("inSetPlayerReady");
		if (typeof client.data.ready === "undefined"){ // player already set as
			client.data.ready = true;
			let playerSocket;
			let players = Array.from(this._server.adapter['rooms'].get(client.data.gameRoomId));
			for (const socketId of players) {
				playerSocket =  _users.find(obj => obj.socketid === socketId).socket;
				if (client.id === players[1]) // P1 is ready
					{	console.log("player1");this._server.to(client.data.gameRoomId).emit('onePlayerReady', { position: "1"});}
				else
					{	this._server.to(client.data.gameRoomId).emit('onePlayerReady', { position: "2"});}
				if (typeof playerSocket.data.ready === "undefined")
				{
					console.log("return here");
					return;
				}
			}
			this._server.to(client.data.gameRoomId).emit('gameStarting');
			this.roomService.startGame(client.data.gameRoomId);
		}
	}

	public spectateRequest(client: Socket, roomID: string) {
		this.roomService.spectateRequest(client, roomID);
	}

	public isThereActiveGames(client: Socket) {
		this.roomService.isThereActiveGames(client);
	}
}
