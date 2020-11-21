import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { VariantAssetsService } from './variant-assets.service';
import { Asset, AssetRegisterRequest, AssetRegisterResponse } from "@bridged.xyz/client-sdk/lib"

@Controller('variant-assets')
export class VariantAssetsController {
    constructor(private readonly variantAssetsService: VariantAssetsService) { }

    @Post('/')
    async postVariantAsset(@Body() req: AssetRegisterRequest): Promise<any> {

    }

    @Post('/:id/variant/:variant')
    async postVariantUpdate(@Param() p: {
        id: string
        variant: string
    }, @Body() req: {
        value: string
    }): Promise<any> {
        const updatedVariantAsset = await this.variantAssetsService.updateVariantItem({
            variantAssetId: p.id,
            variant: p.variant,
            newValue: req.value
        })

        return {
            data: updatedVariantAsset
        }
    }

    @Get(':id')
    async getVariantAsset(@Param() p: { id: string }): Promise<any> {
        const id = p.id
    }
}
