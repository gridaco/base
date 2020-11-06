import { APIGatewayProxyHandler } from 'aws-lambda';
import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
const app = express();
app.get('/message', (req: Request, res: Response) => {
  res.send({ message: 'This is message route' });
});
app.use((req: Request, res: Response) => {
  res.send({ message: 'Server is running' });
});
export const hello: APIGatewayProxyHandler = serverless(app) as any;