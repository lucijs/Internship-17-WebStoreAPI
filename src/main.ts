import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Web Store")
    .setDescription("API containing all information for web store")
    .setVersion("0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api',app, document);

  await app.listen(3008);
}
bootstrap();
