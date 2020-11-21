import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { VariantAssetsService } from './variant-assets.service';
import { Asset, AssetRegisterRequest, AssetRegisterResponse } from "@bridged.xyz/client-sdk/lib"

@Controller('variant-assets')
export class VariantAssetsController {
    constructor(private readonly variantAssetsService: VariantAssetsService) { }

    @Post('/')
    async postVariantAsset(@Body() req: AssetRegisterRequest): Promise<any> {

    }

    @Get(':id')
    async getVariantAsset(@Param() p: { id: string }): Promise<any> {
        const id = p.id
    }
}
