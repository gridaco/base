import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  async getHello() {
    return 'service is running'
  }

  @Post('/keys')
  async postRegisterKey(@Body() request) {
    return await this.appService.registerNewKey(request)
  }

}
