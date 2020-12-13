import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { IsNotEmpty } from 'class-validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  /**
   * the root api getter, check if function is running properly. used for pulse checking.
   */
  @Get('/')
  async getHello() {
    return 'service is running'
  }


  /**
   * register new key. initial assets are optional
   * @param request 
   */
  @Post('/keys')
  async postRegisterKey(@Body() request) {
    return await this.appService.registerNewKey(request)
  }


  /**
   * deletes the key with givven path id
   * @param p 
   */
  @Delete('/keys/:id')
  async deleteKey(@Param() p) {
    const id = p.id
    return await this.appService.fetchKey(id)
  }


  /**
   * fetches the key with givven parameter id
   * @param p 
   */
  @Get('/keys/:id')
  async getKey(@Param() p) {
    const id = p.id
    return await this.appService.deleteKey(id)
  }


  /**
   * updates the key's key name with givven parameter id, and the request body's `keyName` property
   * @param p 
   * @param request 
   */
  @Patch('/keys/:id/name')
  async patchUpdateKeyName(@Param() p, @Body() request) {
    const id = p.id
    const keyName = request.keyName
    return await this.appService.udateKeyName(id, keyName)
  }


  /**
   * bulk get translations with query parameter
   * @param p 
   */
  @Get('/translations')
  async getTranslations(@Query() q) {
  }


  /**
   * get single translation. 
   * id is a id of key, wich indicates to the translation map (variant asset)
   * @param p 
   */
  @Get('/translations/:id')
  async getTranslation(@Param() p: {
    id: string
  }) {
    const id = p.id
    return await this.appService.fetchTranslation(id)
  }


  /**
   * adds a new translation. if already exists, throws 409 conflict
   * id is a id of key, wich indicates to the translation map (variant asset)
   * @param p 
   */
  @HttpCode(200)
  @HttpCode(409)
  @HttpCode(400)
  @Post('/translations/:id/:locale')
  async addTranslation(
    @Param() p: {
      id: string
      locale: string
    },
    @Body() body: {
    }
  ) {
    const { id, locale } = p
  }


  /**
   * puts translation with key id, and locale
   * @param p 
   * @param body 
   */
  @HttpCode(200)
  @HttpCode(400)
  @Put('/translations/:id/:locale')
  async putTranslation(
    @Param() p: {
      id: string
      locale: string
    },
    @Body() body: {
      newText: string
    }) {
    // put raw asset to with target locale
    const { id, locale } = p
  }


  /**
   *  updates translation with key id, and locale. if no locale was added previously, throws 404
   * @param p 
   * @param request 
   */
  @HttpCode(200)
  @HttpCode(404)
  @HttpCode(400)
  @Patch('/translations/:id/:locale')
  async updateTranslation(
    @Param() p: {
      id: string
      locale: string
    }, @Body() request) {
    const { id, locale } = p
  }
}
