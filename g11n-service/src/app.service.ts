import { Injectable } from '@nestjs/common';
import { GlobalizedKeyRegisterRequest } from "@bridged.xyz/client-sdk/lib/g11n/api"
import { KeyModel } from "./app.entity"
import * as dynamoose from "dynamoose"
import { nanoid } from 'nanoid';

@Injectable()
export class AppService {
  async registerNewKey(request: GlobalizedKeyRegisterRequest) {
    const id = nanoid()
    const input = new KeyModel({
      id: id,
      projectId: 'temp',
      keyName: request.keyName,
      type: request.assetType,
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

  async registerTranslation(request: {
    locale: string,
    key: string,
    text: string,
  }) {
    // putAsset
    // register new asset via asset service
  }

  /**
   * updates tranlation's text value
   */
  async updateTranslation(request: {
    newText: string
  }) {

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

  }
}
