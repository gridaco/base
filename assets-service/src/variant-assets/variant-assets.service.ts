import { Injectable } from '@nestjs/common';
import { RawAsset, RawAssetRegisterRequest, NestedAssetRegisterRequest, VariantAsset, VariantAssetRegisterRequest, AssetType } from "@bridged.xyz/client-sdk/lib";
import { nanoid } from 'nanoid';
import { RawAssetsService } from '../raw-assets/raw-assets.service';
import { VariantAssetTable, VariantAssetModel } from '../app.entity';
@Injectable()
export class VariantAssetsService {
    constructor(private readonly rawAssetsService: RawAssetsService) { }

    async updateVariantItem(args: {
        variantAssetId: string
        variant: string
        newValue: string
    }) {
        // find variant field's linked asset
        // update asset's value
        this.rawAssetsService.updateRawAsset()
        // return updated full assetVariant
    }

    async createVariantAsset(projectId: string, request: VariantAssetRegisterRequest): Promise<any> {
        const id = nanoid()

        // register assets first
        console.log('request.initialAssets', request.initialAssets)
        const initialAssetKeys = Object.keys(request.initialAssets)
        const registeredRawAssets: Array<RawAsset> = []
        for (const key of initialAssetKeys) {
            const minimizedAssetRegisterRequest: NestedAssetRegisterRequest = request.initialAssets[key]
            const fullAssetRegiisterRequest: RawAssetRegisterRequest = {
                name: minimizedAssetRegisterRequest.name,
                value: minimizedAssetRegisterRequest.value,
                tags: minimizedAssetRegisterRequest.tags,
                key: request.key,
                type: request.type,
            }

            // asset created
            const asset = await this.rawAssetsService.createRawAsset(fullAssetRegiisterRequest)
            registeredRawAssets.push(asset)
        }


        // make variant name : asset id map
        const assetIdMap = new Map<string, string>()
        const varaintNames = Object.keys(request.initialAssets)
        for (let i = 0; i < varaintNames.length; i++) {
            const variantName = varaintNames[i]
            const variantRawAsset = registeredRawAssets[i]
            assetIdMap[variantName] = variantRawAsset.id
        }

        const record = new VariantAssetModel(<VariantAssetTable>{
            id: id,
            key: request.key,
            projectId: projectId,
            name: request.name,
            type: request.type,
            // TODO fix this layer on. - https://github.com/dynamoose/dynamoose/issues/1073
            // tags: variantAsset.tags,
            description: request.description,
            assets: { ...assetIdMap }
        })
        const created = await record.save()

        const builtAssetMap = this.assetsToMap(assetIdMap, registeredRawAssets)

        return {
            ...created,
            assets: builtAssetMap
        }
    }

    async getVariantAsset(id: string): Promise<VariantAsset> {
        console.log('fetching variant asset with id', id)
        const variantAsset = await VariantAssetModel.get(id)
        // as VariantAssetTable

        const assetsInVariantAsset = variantAsset.assets
        console.log('assetsInVariantAsset', assetsInVariantAsset)

        // get assets
        const rawAssetIds = Object.keys(assetsInVariantAsset).map(function (key) {
            return assetsInVariantAsset[key];
        });
        const rawAssets = await this.rawAssetsService.getRawAssets(rawAssetIds)

        // convert `variant name: asset id` map to `variant name: asset`
        const assetMap = this.assetsToMap(assetsInVariantAsset, rawAssets)


        // transform record to variant asset
        const finalVariantAsset: VariantAsset = {
            id: variantAsset.id,
            projectId: variantAsset.projectId,
            key: variantAsset.key,
            description: variantAsset.description,
            name: variantAsset.name,
            type: variantAsset.type,
            // TODO fix this layer on. - https://github.com/dynamoose/dynamoose/issues/1073
            // tags: variantAsset.tags,
            assets: assetMap
        }

        return finalVariantAsset
    }

    /**
     * converts `variant name: asset id` map to `variant name: asset`
     * @param assetMap 
     * @param assets 
     */
    private assetsToMap(assetMap: Map<string, string>, assets: RawAsset[]): Map<string, RawAsset> {
        const result = new Map<string, RawAsset>()
        const assetKeys = Object.keys(assetMap)
        for (const key of assetKeys) {
            const assetId = assetMap[key]
            const asset = assets.find(a => a.id == assetId)

            result[key] = asset
        }

        return result
    }

    async getVariantAssetsInProject(projectId: string): Promise<Array<VariantAsset>> {
        const PROJECT_INDEX_NAME = 'projectIndex'
        const variantAssetRecords = await VariantAssetModel.query('projectId')
            .eq(projectId)
            .using(PROJECT_INDEX_NAME)
            .exec()

        const requests: Array<Promise<VariantAsset>> = []
        for (const variantAssetRecord of variantAssetRecords) {
            const variantAssetRequest = this.getVariantAsset(variantAssetRecord.id)
            requests.push(variantAssetRequest)
        }
        const results = Promise.all(requests)
        return results
    }
}
