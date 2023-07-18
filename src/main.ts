import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule, {
    logger: ['error'],
  });
  // const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(3001);
}
bootstrap();
