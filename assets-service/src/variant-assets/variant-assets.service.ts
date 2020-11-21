import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk"
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { Asset } from "@bridged.xyz/client-sdk/lib";
import { nanoid } from 'nanoid';
import { RawAssetsService } from 'src/raw-assets/raw-assets.service';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TBL_VARIANT_ASSETS = process.env.DYNAMODB_TABLE_VARIANT_ASSETS
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

    async createVariantAsset(request: any): Promise<any> {
        const id = nanoid()
    }

    async getVariantAsset(id: string): Promise<any> {

    }
}
