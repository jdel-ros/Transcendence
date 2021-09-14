import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);

  app.setGlobalPrefix('api');
  app.use(
    session({
      cookie: {
        maxAge: 3600000 * 24,
      },
      secret: 'iuhasdoiufghpcduvhiubhdfev',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000); // Start on port 3000
}
bootstrap();
