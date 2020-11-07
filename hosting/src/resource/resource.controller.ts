import { Body, Controller, Request, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller("resources")
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) { }

    @Post('/')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file) {
        return await this.resourceService.upload(file.buffer, file.originalname);
    }
}
