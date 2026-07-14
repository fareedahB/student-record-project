import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { AppModule } from './app.module';
import UserSeeder from './users/user.seeder';
import UserFactory from './users/user.factory';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const dataSource = appContext.get(DataSource);

  await runSeeders(dataSource, {
    seeds: [UserSeeder],
    factories: [UserFactory],
  });

  await appContext.close();
}

bootstrap();