import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// tslint:disable-next-line:typedef
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('WOSIDO')
    .setDescription('The WOSIDO API')
    .setVersion('1.0')
    .addTag('wosido')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const configService: ConfigService = app.get(ConfigService);
  const port: string = configService.get('PORT') as string;
  await app.listen(port);
}
bootstrap();
