import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { IsNotEmpty } from 'class-validator';

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


  @Delete('/keys/:id')
  async deleteKey(@Param() p) {
    const id = p.id
    return await this.appService.deleteKey(id)
  }


  @Patch('/keys/:id/name')
  async patchUpdateKeyName(@Param() p, @Body() request) {
    const id = p.id
    const keyName = request.keyName
    return await this.appService.udateKeyName(id, keyName)
  }


  @Put('/keys/:id/translations')
  async putTranslation(@Param() p, @Body() request: {
    locale: string,
    text: string
  }) {
    const id = p.id
    return await this.appService.registerTranslation({
      key: id,
      locale: request.locale,
      text: request.text
    })
  }

  @Patch('/keys/:id/translations/:locale')
  async updateTranslation(@Param() p, @Body() request) {
    const id = p.id
    const locale = p.locale
    const text = request.text
    // return await this.appService.udateKeyName(id, keyName)
  }


  @Put('/keys/:id/variants')
  async putVariant(@Param() p, @Body() request) {
    const id = p.id
    throw 'not implemented'
  }


  @Patch('/keys/:id/variants/:variant')
  async updateVariant(@Param() p, @Body() request) {
    const id = p.id
    throw 'not implemented'
  }

}
