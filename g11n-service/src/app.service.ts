import { Injectable } from '@nestjs/common';
import { GlobalizedKeyRegisterRequest } from "@bridged.xyz/client-sdk/lib/g11n/api"
import { KeyModel } from "./app.entity"
import { nanoid } from 'nanoid';
import { registerVariantAsset, addVariantToAsset } from '@bridged.xyz/client-sdk/lib/assets/api'
@Injectable()
export class AppService {
  async registerNewKey(request: GlobalizedKeyRegisterRequest) {

    /**
     * create the variant asset to be linked with this key first.
     */
    const projectId = 'temp'
    const reservedLinkedAsset = await registerVariantAsset(projectId, {
      type: request.assetType,
    })


    const id = nanoid()
    const input = new KeyModel({
      id: id,
      projectId: projectId,
      keyName: request.keyName,
      type: request.assetType,
      linkedAssetId: reservedLinkedAsset,
      embeddable: request.embeddable ? request.embeddable : false,
    })



    const newKeyRecord = await input.save()
    console.log('new key created', newKeyRecord)
    return newKeyRecord
  }

  async deleteKey(id: string) {
    return await KeyModel.delete(id)
  }

  async udateKeyName(id: string, name: string) {
    const updatedRecrod = await KeyModel.update({ id: id }, {
      keyName: name
    })
    return updatedRecrod
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
  async updateTranslation(request: {
    newText: string
  }) {
    throw 'not implemented'
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
