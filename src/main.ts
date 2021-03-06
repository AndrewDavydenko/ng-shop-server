import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParser = require('body-parser');
// tslint:disable-next-line:typedef
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  const options = new DocumentBuilder()
    .setTitle('ng-shop')
    .setDescription('The ng-shop API')
    .setVersion('1.0')
    .addTag('ng-shop')
    .build();
  app.use(
    bodyParser.json({
      limit: '50mb',
    })
  );

  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '50mb',
      parameterLimit: 100000,
    })
  );
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const configService: ConfigService = app.get(ConfigService);
  const port: string = configService.get('PORT') as string;
  await app.listen(process.env.PORT || port);
}
bootstrap();
