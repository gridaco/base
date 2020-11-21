import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AssetRegisterRequest } from "@bridged.xyz/client-sdk/lib"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  async getRedirect(@Param() params) {

  }

  @Put('/raw')
  async putRawAsset(@Body() req: AssetRegisterRequest) {

  }

  @Patch('/raw/:id')
  async patchRawAsset(@Body() req: AssetRegisterRequest) {

  }
}
