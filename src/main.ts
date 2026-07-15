import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { updateGlobalConfig } from 'nestjs-paginate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  updateGlobalConfig({
    defaultOrigin: undefined,
    defaultLimit: 20,
    defaultMaxLimit: 100,
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();