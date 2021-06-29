import * as dynamoose from "dynamoose";
import { nanoid } from "nanoid";

export const CorsRequestLogSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
    default: () => nanoid(),
  },
  app: {
    type: String,
    required: true,
    index: {
      name: "appIndex",
    },
  },
  ua: {
    type: String,
    required: false,
  },
  at: {
    type: Date,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  ip: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: true,
  },
  billed_duration: {
    type: Number,
    required: true,
  },
});

const CORS_REQUEST_LOG_TABLE_NAME = process.env
  .CORS_REQUEST_LOG_TABLE_NAME as string;

export const CorsRequestLogModel = dynamoose.model(
  CORS_REQUEST_LOG_TABLE_NAME,
  CorsRequestLogSchema,
  {
    create: true,
  }
);
