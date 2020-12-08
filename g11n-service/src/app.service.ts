import { Injectable } from '@nestjs/common';
import { GlobalizedKeyRegisterRequest } from "@bridged.xyz/client-sdk/lib/g11n/api"
import { KeyModel } from "./app.entity"
@Injectable()
export class AppService {
  async registerNewKey(request: GlobalizedKeyRegisterRequest) {
    const input = new KeyModel({
      projectId: 'temp',
      keyName: request.keyName,
      type: request.assetType,
      embeddable: request.embeddable,
    })

    const newKeyRecord = await input.save()
    console.log('new key created', newKeyRecord)
    return newKeyRecord
  }

  deleteKey() {

  }

  udateKeyName() {

  }

  registerVariant() {

  }

  removeVariant() {

  }
}
