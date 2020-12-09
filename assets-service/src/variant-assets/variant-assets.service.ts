import { Injectable } from '@nestjs/common';
import { RawAsset, RawAssetRegisterRequest, NestedAssetRegisterRequest, VariantAsset, VariantAssetRegisterRequest } from "@bridged.xyz/client-sdk/lib";
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
        console.log('varaintNames', varaintNames)
        for (let i = 0; i < varaintNames.length; i++) {
            const variantName = varaintNames[i]
            const variantRawAsset = registeredRawAssets[i]
            console.log('variantName', variantName,)
            assetIdMap[variantName] = variantRawAsset.id
        }

        console.log(`assetIdMap`, assetIdMap)

        const record = new VariantAssetModel(<VariantAssetTable>{
            id: id,
            key: request.key,
            projectId: projectId,
            name: request.name,
            description: request.description,
            tags: request.tags,
            assets: assetIdMap
        })
        const created = await record.save()

        const builtAssetMap = this.assetsToMap(assetIdMap, registeredRawAssets)

        console.log('builtAssetMap', builtAssetMap)

        return <VariantAsset>{
            id: id,
            name: request.name,
            projectId: 'demo', // TODO - replace this
            description: request.description,
            tags: request.tags,
            key: request.key,
            assets: builtAssetMap
        }
    }

    async getVariantAsset(id: string): Promise<VariantAsset> {

        const variantAsset = await VariantAssetModel.get(id)
        // as VariantAssetTable

        console.log('fetched variantAsset', variantAsset)

        const assetsInVariantAsset = variantAsset.assets
        // get assets
        const rawAssetIds = Object.keys(assetsInVariantAsset).map(function (key) {
            return assetsInVariantAsset.assets[key];
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
            tags: variantAsset.tags,
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
        // const query: DocumentClient.QueryInput = {
        //     TableName: TBL_VARIANT_ASSETS,
        //     IndexName: 'projectIndex',
        //     KeyConditionExpression: "projectId = :projectId",
        //     ExpressionAttributeValues: {
        //         ":projectId": projectId
        //     }
        // }


        // const variantAssetRecords: VariantAssetTable[] = await (await dynamoDb.query(query).promise()).Items as VariantAssetTable[]
        const PROJECT_INDEX_NAME = 'projectIndex'
        const variantAssetRecords = await VariantAssetModel.query({
            projectId: projectId
        }).using(PROJECT_INDEX_NAME).exec()


        console.log('variantAssetRecords', variantAssetRecords)

        const requests: Array<Promise<VariantAsset>> = []
        for (const variantAssetRecord of variantAssetRecords) {
            const variantAssetRequest = this.getVariantAsset(variantAssetRecord.id)
            requests.push(variantAssetRequest)
        }
        const results = Promise.all(requests)
        return results
    }
}
