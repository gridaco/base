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

  @Get('/translations/:id')
  async getTranslation(@Param() p) {
    const id = p.id
    return await this.appService.fetchTranslation(id)
  }

  @Put('/translations/:id')
  async putTranslation(
    @Param() p: {
      id: string
    },
    @Body() body: {
      locale: string
      newText: string
    }) {
    // put raw asset to with target locale

  }


  @Patch('/translations/:id/:locale')
  async updateLocaleTranslation() {

  }


  @Post('/keys')
  async postRegisterKey(@Body() request) {
    return await this.appService.registerNewKey(request)
  }


  @Delete('/keys/:id')
  async deleteKey(@Param() p) {
    const id = p.id
    return await this.appService.fetchKey(id)
  }


  @Get('/keys/:id')
  async getKey(@Param() p) {
    const id = p.id
    return await this.appService.deleteKey(id)
  }


  @Patch('/keys/:id/name')
  async patchUpdateKeyName(@Param() p, @Body() request) {
    const id = p.id
    const keyName = request.keyName
    return await this.appService.udateKeyName(id, keyName)
  }

  @Patch('/keys/:id/translations/:locale')
  async updateTranslation(@Param() p, @Body() request) {
    const id = p.id
    const locale = p.locale
    const text = request.text
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
