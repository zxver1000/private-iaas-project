import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

class Application {
  static instance: Application;
  private PORT: string;

  constructor(private server: NestExpressApplication) {
    if (Application.instance) return Application.instance;
    this.server = server;

    this.PORT = process.env.PORT || '3084';
    Application.instance = this;
  }

  async bootstrap() {
    this.server.enableCors();

    await this.server.listen(this.PORT);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  await app.bootstrap();
}

init().catch((error) => {
  new Logger('init').error(error);
});
