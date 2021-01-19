import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './providers/user/user.module';
import { OrganizationModule } from './providers/organization/organization.module';

@Module({
  imports: [UserModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
