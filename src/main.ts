import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Gunakan NestExpressApplication agar kita bisa memakai fitur bawaan expressJS
  // Seperti app.set app.engine
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Penggunaan cookieParser
  app.use(cookieParser('RAHASIA'));
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
