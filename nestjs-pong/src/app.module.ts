import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { RoomService } from './room.service';
import { SocketService } from './socket.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth/auth.module';
import { entities } from './authentication/typeorm';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development'}),
    AuthModule, 
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_DB_HOST,
      port: Number.parseInt(process.env.PG_DB_PORT),
      username: process.env.PG_DB_USER,
      password: process.env.PG_DB_PASS,
      database: process.env.PG_DB_NAME,
      entities,
      synchronize: true, 
    }),
  ],
  controllers: [AppController],
  providers: [GameGateway,SocketService,RoomService,AppService, ChatGateway],
})
export class AppModule {}