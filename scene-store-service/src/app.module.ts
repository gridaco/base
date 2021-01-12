import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScenesModule } from './scenes/scenes.module';

@Module({
  imports: [ScenesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
