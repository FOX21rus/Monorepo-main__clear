import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalAuthGuard } from './_common/core-nest/guards/user.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new GlobalAuthGuard(new ConfigService()));
  app.enableCors();
  await app.listen(3000);

}
bootstrap();
