import { Body, Controller, Request, Get, Post } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller("resource")
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) { }

    @Post('')
    async upload(@Request() req, @Body() message) {
        return await this.resourceService.upload(message);
    }
}
