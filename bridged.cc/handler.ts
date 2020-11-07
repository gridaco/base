import { APIGatewayProxyHandler } from 'aws-lambda';
import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import * as AWS from "aws-sdk"
import { buildShortUrl, checkIfValidUrl, generateHash } from './utils';
import bodyParser from "body-parser"
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { UrlShortenRequest, UrlShortenResult } from "@bridged.xyz/client-sdk/lib/url/types"
import * as cors from "cors"

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const app = express();
app.use(cors());
app.use(bodyParser.json());


interface TBL_URL_SPEC {
  id: string,
  host: string,
  target: string
}


app.post('/short', async (req: Request, res: Response) => {
  const { url } = req.body as UrlShortenRequest;

  if (checkIfValidUrl(url)) {
    const hash = generateHash()
    const data: TBL_URL_SPEC = {
      id: hash,
      host: process.env.HOST,
      target: url,
    }
    const params: DocumentClient.PutItemInput = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: data,
    };
    await dynamoDb.put(params).promise()
    const newUrl = buildShortUrl(data.id, data.host)
    const result: UrlShortenResult = {
      id: data.id,
      url: newUrl,
      origin: url,
      host: data.host
    }
    res.json(result);
  } else {
    res.status(400).send(`the url: ${url} is not a valid url.`)
  }
});

// update
app.put('/short', (req, res) => {
  // todo update the url field in db
})



app.get('/status', (req: Request, res: Response) => {
  res.send({ message: 'Server is running' });
});

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  const param: DocumentClient.GetItemInput = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      'id': id
    },
  }
  const record = await dynamoDb.get(param).promise()
  const data = record.Item as TBL_URL_SPEC
  const origin = data.target
  res.status(301).header({
    Location: origin,
  }).send()
})



export const url: APIGatewayProxyHandler = serverless(app) as any;