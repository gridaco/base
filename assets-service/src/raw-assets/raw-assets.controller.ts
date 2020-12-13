import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { RawAssetsService } from './raw-assets.service';
import { RawAsset, RawAssetRegisterRequest, RawAssetRegisterResponse } from "@bridged.xyz/client-sdk/lib/assets"

@Controller('raw-assets')
export class RawAssetsController {
    constructor(private readonly rawAssetsService: RawAssetsService) { }

    @Post('/')
    async postRawAsset(@Body() req: RawAssetRegisterRequest): Promise<RawAssetRegisterResponse> {
        const asset = await this.rawAssetsService.createRawAsset(req)

        return {
            success: true,
            data: asset,
            message: 'asset registered successfully',
        }
    }

    @Get(':id')
    async getRawAsset(@Param() p: { id: string }): Promise<RawAsset> {
        const id = p.id
        const asset = await this.rawAssetsService.fetchRawAsset(id)
        return asset
    }
}
