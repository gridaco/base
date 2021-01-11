import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphicsModule } from './graphics/graphics.module';
import { IconsModule } from './icons/icons.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    GraphicsModule,
    IconsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
