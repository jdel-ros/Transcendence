import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketService } from '../socket.service';
import { gameData } from '../interfaces/gameData.interface';
import { movePad } from 'src/interfaces/movePad.interface';
import { moveBall } from 'src/interfaces/moveBall.interface';

export var _users = [];

@WebSocketGateway(3001, { namespace: '/game' })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public constructor(
    private readonly socketService: SocketService,
  ) {}

  private _server: Server;
  private logger: Logger = new Logger('GameGateway');

  @SubscribeMessage('gameToServer')
  handleGameToServer(client: Socket, gameData: gameData){
    this.socketService.sendGameData(client, gameData);
  }

  @SubscribeMessage('movePad')
  handleMovePad(client: Socket, movePad: movePad){
    this.socketService.movePad(client, movePad);
  }

  @SubscribeMessage('moveBall')
  handleMoveBall(client: Socket, moveBall: moveBall){
    this.socketService.moveBall(client, moveBall);
  }

  @SubscribeMessage('startMatchmaking')
  handleStartMatchmaking(client: Socket, message: { matchtype: string, username: string })  {
    this.socketService.joinMatchMaking(client, message);
  }

  @SubscribeMessage('playerReady')
  handlePlayerReady(client: Socket){
    this.socketService.setPlayerReady(client);
  }

  afterInit(server: Server) {
    this._server = server;
    this.socketService.init(this._server);
    console.log("server=",this._server);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
    _users = _users.filter(id => id.socketid !== client.id)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    _users.push({socketid: client.id, socket: client, })
    _users.forEach((val, idx) => {
      console.log(idx, "|", val.socketid);
    })
  }

}
