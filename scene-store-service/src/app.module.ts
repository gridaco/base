import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScenesController } from './scenes/scenes.controller';

@Module({
  imports: [],
  controllers: [AppController, ScenesController],
  providers: [AppService],
})
export class AppModule { }
