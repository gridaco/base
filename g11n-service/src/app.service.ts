import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GlobalizedKeyRegisterRequest, TextTranslationAddRequest, TextTranslationPutRequest, TextTranslationUpdateRequest } from "@bridged.xyz/client-sdk/lib/g11n/api"
import { KeyModel, KeyRecord } from "./app.entity"
import { nanoid } from 'nanoid';
import { registerVariantAsset, getVariantAsset, addAvariant, putVariant, updateVariant, } from '@bridged.xyz/client-sdk/lib/assets/api'
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

  async addTranslation(request: TextTranslationAddRequest) {

    // get key's linked asset
    // fetch linked asset and variant -> check exsistence (No, asset service hanldes this.)

    addAvariant()

    // addVariantToAsset(request.projectId, {
    // addVariantToAssetWithKey

    // })
    // putAsset
    // register new asset via asset service
    throw new HttpException('translation already exists', HttpStatus.CONFLICT);
  }

  /**
   * updates tranlation's text value
   */
  async updateTranslation(request: TextTranslationUpdateRequest) {
    const key = await KeyModel.get(request.keyId)

    // updateVariant()

    // TODO - asset api - put raw asset with variant asset id
    const linkedAssetId = key.linkedAssetId
    throw 'not implemented'
  }

  async putTranslation(request: TextTranslationPutRequest) {
    // putVariant()

    // const exists = true
    // if (exists) {
    //   return this.updateTranslation({
    //     keyId: request.keyId,
    //     locale: request.locale,
    //     newText: request.text
    //   })
    // } else {
    //   return this.addTranslation(request)
    // }
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
}
