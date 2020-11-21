import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlShortenRequest, UrlShortenResult } from "@bridged.xyz/client-sdk/dist/url/types"

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

  @Post('/short')
  async postShort(@Body() req: UrlShortenRequest) {

  }
}
