import { Injectable } from '@nestjs/common';
import { GlobalizedKeyRegisterRequest, TranslationUpdateRequest } from "@bridged.xyz/client-sdk/lib/g11n/api"
import { KeyModel, KeyRecord } from "./app.entity"
import { nanoid } from 'nanoid';
import { registerVariantAsset, getVariantAsset, } from '@bridged.xyz/client-sdk/lib/assets/api'
import { IGlobalizedKey } from '@bridged.xyz/client-sdk/lib/g11n';
const projectId = 'temp'

@Injectable()
export class AppService {
  async registerNewKey(request: GlobalizedKeyRegisterRequest) {

    /**
     * create the variant asset to be linked with this key first.
     */
    let reservedLinkedAsset
    try {
      reservedLinkedAsset = await registerVariantAsset(projectId, {
        type: request.assetType,
        initialAssets: request.initialVariants
      })
    } catch (_) {
      console.log('error', _)
      throw _
    }


    const id = nanoid()
    const input = new KeyModel({
      id: id,
      projectId: projectId,
      keyName: request.keyName,
      type: request.assetType,
      linkedAssetId: reservedLinkedAsset.id,
      embeddable: request.embeddable ? request.embeddable : false,
    })



    const newKeyRecord = await input.save()
    console.log('new key created', newKeyRecord)

    return await this.fetchTranslation(id)
  }

  async deleteKey(id: string) {
    return await KeyModel.delete(id)
  }

  async fetchKey(id: string) {
    return await KeyModel.get(id)
  }

  async udateKeyName(id: string, name: string) {
    const updatedRecrod = await KeyModel.update({ id: id }, {
      keyName: name
    })
    console.log('key name updated.', updatedRecrod)
    return await this.fetchTranslation(id)
  }

  async addTranslation(request: {
    projectId: string
    locale: string,
    key: string,
    text: string,
  }) {

    // addVariantToAsset(request.projectId, {
    // addVariantToAssetWithKey

    // })
    // putAsset
    // register new asset via asset service
  }

  /**
   * updates tranlation's text value
   */
  async updateTranslation(request: TranslationUpdateRequest) {
    const key = await KeyModel.get(request.keyId)

    // TODO - asset api - put raw asset with variant asset id
    const linkedAssetId = key.linkedAssetId
    throw 'not implemented'
  }

  async fetchTranslation(id: string): Promise<IGlobalizedKey> {
    console.log('fetching translations with key ', id)
    const key = await KeyModel.get(id) as any as KeyRecord
    const linkedAssetId = key.linkedAssetId
    const linkedAsset = (await getVariantAsset(projectId, linkedAssetId)).data

    return {
      id: key.id,
      key: key.keyName,
      translations: linkedAsset.assets
    }
  }

  /**
   * removes translation from key, removes linked asset to it if the asset is only linked to this key.
   * all related keys' assets key reference will be replaced with last cached value
   */
  async removeTranslation() {
    throw 'not implemented'
  }

  removeVariant() {
    throw 'not implemented'
  }

  fetchSingleAsset(keyId: string, locale: string) {
    throw 'not implemented'
  }
}
