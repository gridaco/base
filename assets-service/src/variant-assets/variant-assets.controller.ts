import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VariantAssetsService } from './variant-assets.service';
import { VariantAssetRegisterRequest } from "@bridged.xyz/client-sdk/lib"

@Controller('variant-assets')
export class VariantAssetsController {
    constructor(private readonly variantAssetsService: VariantAssetsService) { }

    @Post('/')
    async postCreateVariantAsset(@Body() req: VariantAssetRegisterRequest): Promise<any> {
        const projectId = "temp"
        return await this.variantAssetsService.createVariantAsset(projectId, req)
    }


    @Get('/:id')
    async getVariantAsset(@Param() p: { id: string }): Promise<any> {
        const id = p.id
        const data = await this.variantAssetsService.getVariantAsset(id)
        return {
            data: data
        }
    }


    /**
     * get all variant assets in the project. project id provided in header
     */
    @Get('/')
    async getVariantAssets() {
        console.log('getting all variant assets in project')
        const projectId = 'demo'
        return this.variantAssetsService.getVariantAssetsInProject(projectId)
    }

    @Get('/from-key/:key')
    async getVariantAssetFromKey() {

    }


    @Patch('/:id/variant/:variant')
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

}
