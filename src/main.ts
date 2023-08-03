import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { createServer } from 'http';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressApp));

  // Serve static files from the 'public' folder
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Enable CORS if needed
  app.enableCors();

  const httpServer = createServer(expressApp);
  await app.listen(3001);
}
bootstrap();
