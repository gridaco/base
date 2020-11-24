import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'Welcome to bridged hosting service. Learn more at https://github.com/bridgedxyz/services/';
  }

}
