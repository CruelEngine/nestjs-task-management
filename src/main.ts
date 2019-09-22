import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig: { port: number; origin: string } = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    console.log('env develop');
    app.enableCors();
  }
  // else{
  //   app.enableCors({origin : serverConfig.origin});
  //   logger.log(`Accepting requests from origin "${serverConfig.origin}" `);
  // }
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application Listening on port ${port}`);
}
bootstrap();
