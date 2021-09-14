import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { GamingRoom } from "./game.service";
import { movePad } from "./interfaces/movePad.interface";

@Injectable()
export class RoomService {
	private _server: Server;
	private _rooms = new Map();
	// private _rooms : { [id: string]: GamingRoom } = {};

	public init(server: Server): void {
		this._server = server;
	}

	public createNewRoom(player1: Socket, player2: Socket) {
		let new_id;
		//check if roomId doesnt already exist
		do {
			new_id = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
		} while (this._server.adapter['rooms'].get(new_id));
		this._rooms.set(new_id, GamingRoom.create(player1.data.username, player2.data.username, new_id, this._server, player1, player2));
		return (new_id);
	}

	public	playerScored(player: Socket, roomId: string) {
		this._rooms.get(roomId).updateScore(player.data.username);
	}

	public getUsers(roomId: string) {
		console.log("in get users:",this._server.adapter['rooms'].get(roomId))
		return this._server.adapter['rooms'].get(roomId);
	}

	public startGame(roomId: string) {
		this._rooms.get(roomId).initGame()
	}

	public movePad(client: Socket, movePad: movePad, roomId: string) {
		this._rooms.get(roomId).movePad(client, movePad);
	}

	public spectateRequest(client: Socket, roomID) {
		if (this._server.adapter['rooms'].get(roomID)) { // Room exists, game on
			client.join(roomID);
		}
		else { //no room found
			client.emit("gameNotFound");
		}
	}

	public isThereActiveGames(client: Socket) {
		let i = 0;
		for (var [key, value] of this._rooms) {
			client.emit("listActiveGames", {
				gameNumber: ++i,
				nameP1: value._nameP1,
				nameP2: value._nameP2,
				scoreJ1: value._scoreP1,
				scoreJ2: value._scoreP2,
				roomID: value._roomId,
			})
			if (i === 3)
				break;
		}
	}
}
