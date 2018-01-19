import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);

	const options = new DocumentBuilder()
		.setTitle('Resize Photo Challenge')
		.setDescription('The resize photo challenge API')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/api', app, document);

	await app.listen(3000);
}
bootstrap();
