import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello() {
    return await this.appService.getHello();
  }

  @Post('/')
  async postRegisterScene(@Body() body) {
    return await this.appService.registerScreen(body)
  }
}
