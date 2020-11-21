import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { RawAssetsService } from './raw-assets.service';
import { Asset, AssetRegisterRequest, AssetRegisterResponse } from "@bridged.xyz/client-sdk/lib"

@Controller('raw-assets')
export class RawAssetsController {
    constructor(private readonly rawAssetsService: RawAssetsService) { }

    @Post('/')
    async postRawAsset(@Body() req: AssetRegisterRequest): Promise<AssetRegisterResponse> {
        const asset = await this.rawAssetsService.createRawAsset(req)

        return {
            success: true,
            data: asset,
            message: 'asset registered successfully',
        }
    }

    @Get(':id')
    async getRawAsset(@Param() p: { id: string }): Promise<Asset> {
        const id = p.id
        const asset = await this.rawAssetsService.getRawAsset(id)
        return asset
    }
}
