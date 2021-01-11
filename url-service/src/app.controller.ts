import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  UrlShortenRequest,
  UrlShortenResult,
} from '@bridged.xyz/client-sdk/dist/url/types';
import { checkIfValidUrl } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  @Redirect('https://bridged.xyz/', 302) // the default redirection
  async getRedirect(@Param() params) {
    const id = params.id;
    const redirect = await this.appService.getRedirect(id);
    return {
      url: redirect,
    };
  }

  @Post('/short')
  async postShort(@Body() req: UrlShortenRequest): Promise<UrlShortenResult> {
    const url = req.url;
    if (checkIfValidUrl(url)) {
      const result = await this.appService.createRecord(url);
      return result;
    }
    throw `the url: ${url} is not a valid url.`;
  }
}
