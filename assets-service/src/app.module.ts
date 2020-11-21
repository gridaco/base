import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RawAssetsModule } from './raw-assets/raw-assets.module';
import { VariantAssetsModule } from './variant-assets/variant-assets.module';

@Module({
  imports: [RawAssetsModule, VariantAssetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
