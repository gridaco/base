import { DesignPlatform, SdkVersion, StorableLayerType, StorableSceneType } from '@bridged.xyz/client-sdk';
import { Injectable } from '@nestjs/common';
import * as dynamoose from "dynamoose";
import { NestedLayerRecord, Scene, SceneRecord } from "./app.entity"


// Create new DynamoDB instance
const ddb = new dynamoose.aws.sdk.DynamoDB({});
// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);


@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'Welcome to bridged hosting service. Learn more at https://github.com/bridgedxyz/services/';
  }


  async registerScreen(request) {

    const sdkVer = SdkVersion.v2020_0
    const layer = <NestedLayerRecord>{
      nodeId: "",
      key: undefined,
      index: 0,
      name: "",
      sdkVersion: sdkVer,
      node: {},
      type: StorableLayerType.vanilla,
      layers: undefined,
      componentId: undefined,
      width: 0,
      height: 0,
    }

    const sceneTable = dynamoose.model(process.env.DYNAMODB_TABLE, Scene)
    const scene = new sceneTable(<SceneRecord>{
      id: "test",
      projectId: "demo",
      fileId: "test",
      nodeId: "test",
      sdkVersion: sdkVer,
      designPlatform: DesignPlatform.figma,
      cachedPreview: "https://example.com/dog.png",
      sceneType: StorableSceneType.screen,
      route: "",
      path: "",
      name: "",
      description: "",
      tags: ["1", "2"],
      alias: "",
      variant: "",
      layers: [layer],
      width: 100,
      height: 100,
    });

    const saved = await scene.save()
    console.log('screen registered', saved)
  }

  putLayer() {

  }
}
