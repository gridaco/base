import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getInfo(): string {
    return `
bridged's quick look compiler service. now supports flutter code compile for web quicklook. goto https://bridged.xyz/github for more details
    `
  }

  @Post()
  compile() {
    return "not implemented"
  }
}
