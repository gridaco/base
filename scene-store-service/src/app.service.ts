import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk"
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

interface DynamoSceneTable {
  id: string
  cachedPreview: string
  fileId: string
  name: string
  path: string
  route: string
  layersId: string[]
  componentsId: string[]
  type: "screen" | "component"
  width: number
  height: number
}

// 1 - tree

interface Layer {
  id: string
  key: string
  cachedPreview: string
  parentSceneId: string
  thisSceneId?: string
  width: number
  height: number
  index: number
  node: object
}


@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to bridged hosting service. Learn more at https://github.com/bridgedxyz/services/';
  }


  putScene() {

  }

  putLayer() {

  }
}
