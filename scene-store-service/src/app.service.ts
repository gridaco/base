import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk"
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import * as dynamoose from "dynamoose";

const dynamodb = dynamoose.aws.ddb()
const TABLE = process.env.DYNAMODB_TABLE

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'Welcome to bridged hosting service. Learn more at https://github.com/bridgedxyz/services/';
  }


  async putScene() {
    // test

    const User = dynamoose.model(TABLE, { "id": Number, "name": String });
    const myUser = new User({
      "id": 1,
      "name": "Tim"
    });
    const saved = await myUser.save()
    console.log('saved', saved)
  }

  putLayer() {

  }
}
