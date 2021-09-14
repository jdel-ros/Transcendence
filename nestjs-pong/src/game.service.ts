import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { gameData, gameDataClass } from "./interfaces/gameData.interface";
import { movePad } from "./interfaces/movePad.interface";

@Injectable()
export class GamingRoom {
	private _scoreP1: number;
	private _scoreP2: number;
	private _nameP1: string;
	private _nameP2: string;
	private _socketIdP1: string;
	private _socketIdP2: string;
	private _gameData: gameDataClass;
	private _roomId: string;
	private _server: Server;
	private _gameStarted: boolean;

	private constructor(p1: string, p2: string, roomId: string, server: Server, sock1: Socket, sock2: Socket) {
		this._nameP1 = p1;
		this._nameP2 = p2;
		this._scoreP1 = 0;
		this._scoreP2 = 0;
		this._roomId = roomId;
		this._gameData = new gameDataClass();
		this._server = server;
		this._socketIdP1 = sock1.id;
		this._socketIdP2 = sock2.id;
		this._gameStarted = false;
	}

	public static create(p1: string, p2: string, roomId: string, server: Server, sock1: Socket, sock2: Socket) {
		return new GamingRoom(p1, p2, roomId, server, sock1, sock2);
	}

	public updateScore(player: string) {
		if (this._nameP1 === player)
			this._scoreP1++;
		else if  (this._nameP2 === player)
			this._scoreP2++;
	}

	public movePad(client: Socket, movePad: movePad) {
		if (client.id === this._socketIdP1) {
			this._gameData.goup1 = movePad.goup;
			this._gameData.godown1 = movePad.godown;
			this._gameData.posRack1 = movePad.posRack * this._gameData.height;
			client.broadcast.to(this._roomId).emit('movePadClient',{
				position: 1,
				goup: this._gameData.goup1,
				godown: this._gameData.godown1,
				posRack: 	this._gameData.posRack1 / this._gameData.height,
			});
		}
		else if (client.id === this._socketIdP2) {
			this._gameData.goup2 = movePad.goup;
			this._gameData.godown2 = movePad.godown;
			this._gameData.posRack2 = movePad.posRack * this._gameData.height;
			client.broadcast.to(this._roomId).emit('movePadClient',{
				position: 2,
				goup: this._gameData.goup2,
				godown: this._gameData.godown2,
				posRack: 	this._gameData.posRack2 / this._gameData.height,
			});
		}
	}


	public initGame() {
		this._gameStarted = true;
		this._server.to(this._roomId).emit('startTimer');
		// setTimeout(() => {
		this._gameData.width = 160
		this._gameData.height = 90
		this._gameData.ballx = 	this._gameData.width / 2
		this._gameData.bally = this._gameData.height / 2
		this._gameData.balldx = this._gameData.width * 0.2 / 100
		this._gameData.balldy = Math.random() / 2
		this._gameData.speed = 1
		this._gameData.goup1 = false
		this._gameData.goup2 = false
		this._gameData.godown1 = false
		this._gameData.godown2 = false
		this._gameData.posRack1 = this._gameData.height / 2 - this._gameData.height / 10
		this._gameData.posRack2 = this._gameData.posRack1
		this._gameData.radius = this._gameData.width / 100
		this._gameData.rackWidth = this._gameData.width / 50
		this._gameData.rackHeight = this._gameData.height  / 5
		this._gameData.direction = 1;
		console.log("after init, speed =",this._gameData.speed);
		var game = setInterval(() => {
			if (this._scoreP1 >= 5 || this._scoreP2 >= 5) {
				clearInterval(game);
				this.gameOver();
			}
			else
				this.startGame(game);
		}, 17);
		// },3000);
	}
	public startGame(game: NodeJS.Timer) {
		this.sendDataToRoom(this._gameData);
		if (this._gameData.ballx + this._gameData.radius >= this._gameData.width) {
			this._scoreP1++;
			this._server.to(this._roomId).emit('updateScore',{scoreP1: this._scoreP1, scoreP2: this._scoreP2});
			clearInterval(game);
			this.initGame();
			return;
		}
		if (this._gameData.ballx - this._gameData.radius <= 0) {
			this._scoreP2++;
			this._server.to(this._roomId).emit('updateScore',{scoreP1: this._scoreP1, scoreP2: this._scoreP2});
			clearInterval(game);
			this.initGame();
			return;
		}
		if (this._gameData.bally + this._gameData.radius >= this._gameData.height || this._gameData.bally - this._gameData.radius <= 0) this._gameData.balldy *= -1;
		this._gameData.ballx += this._gameData.balldx;
		this._gameData.bally += this._gameData.balldy;
		if (this._gameData.goup1) this._gameData.posRack1 -= 1 * this._gameData.height / 100; if (this._gameData.posRack1 < 0) this._gameData.posRack1 = 0;
		if (this._gameData.godown1) this._gameData.posRack1 += 1 * this._gameData.height / 100; if (this._gameData.posRack1 + this._gameData.rackHeight >= this._gameData.height) this._gameData.posRack1 = this._gameData.height-this._gameData.rackHeight
		if (this._gameData.goup2) this._gameData.posRack2 -= 1 * this._gameData.height / 100; if (this._gameData.posRack2 < 0) this._gameData.posRack2 = 0;
		if (this._gameData.godown2) this._gameData.posRack2 += 1 * this._gameData.height / 100; if (this._gameData.posRack2 + this._gameData.rackHeight >= this._gameData.height) this._gameData.posRack2 = this._gameData.height-this._gameData.rackHeight

		this.checkCollision(this._gameData);
	}
	public checkCollision (gd) {
		var b: any = {};
		b.top = this._gameData.bally - this._gameData.radius;
		b.bottom = this._gameData.bally + this._gameData.radius;
		b.left = this._gameData.ballx - this._gameData.radius;
		b.right = this._gameData.ballx + this._gameData.radius;

		var p: any = {};
		p.top		= (this._gameData.ballx < this._gameData.width/2) ? this._gameData.posRack1 : this._gameData.posRack2;
		p.bottom= p.top + this._gameData.rackHeight;
		p.left	= (this._gameData.ballx < this._gameData.width/2) ? 0 : (this._gameData.width - this._gameData.rackWidth);
		p.right = p.left + this._gameData.rackWidth;

		if (b.right >= p.left && b.bottom >= p.top && b.left <= p.right && b.top <= p.bottom)
		{
			var collidePoint;
			if (this._gameData.ballx < this._gameData.width/2)
				collidePoint = (this._gameData.bally - (this._gameData.posRack1 + this._gameData.rackHeight/2));
			else
				collidePoint = (this._gameData.bally - (this._gameData.posRack2 + this._gameData.rackHeight/2));
			 collidePoint = collidePoint / (this._gameData.rackHeight/2);
			//now collide is almost between -1 and 1
			let angleRad = (Math.PI/4) * collidePoint;
			this._gameData.direction *= -1;
			this._gameData.balldx = this._gameData.direction * this._gameData.speed * Math.cos(angleRad);
			this._gameData.balldy = this._gameData.speed * Math.sin(angleRad);
			if (!(this._gameData.ballx + this._gameData.radius + this._gameData.balldx >= this._gameData.width || this._gameData.ballx - this._gameData.radius - this._gameData.balldx <= 0)) this._gameData.ballx += this._gameData.balldx;
			if (!(this._gameData.bally + this._gameData.radius + this._gameData.balldy >= this._gameData.height || this._gameData.bally - this._gameData.radius - this._gameData.balldy <= 0)) this._gameData.bally += this._gameData.balldy;
			if (this._gameData.speed / this._gameData.width <= 1 )
				this._gameData.speed += 0.1 * this._gameData.width / 100;
		}
	}

	public sendDataToRoom(gameData: gameData) {
		let gd = Object.assign({}, gameData);
		gd.ballx /= gd.width;
		gd.bally /= gd.height;
		gd.speed /= gd.width;
		gd.posRack1 /= gd.height;
		gd.posRack2 /= gd.height;
		this._server.to(this._roomId).emit('updateGameData',gd);
	}

	public gameOver() {
		this._server.to(this._roomId).emit('winnerIs',{winner: this._scoreP1 === 5 ? 2 : 1})
	}
}
