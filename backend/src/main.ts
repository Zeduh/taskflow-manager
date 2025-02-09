import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Configura o nível de log global
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Habilita todos os níveis de log
  });

  app.enableCors();
  await app.listen(4000);
  
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();