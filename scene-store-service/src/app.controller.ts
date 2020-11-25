import { StorableSceneType } from '@bridged.xyz/client-sdk/lib';
import { Body, Controller, Get, HttpCode, Param, Post, Query, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello() {
    return await this.appService.getHello();
  }
}