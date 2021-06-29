import * as express from "express";
// import * as dynamoose from "dynamoose";
// import * as moment from "moment";
import {
  CorsProxyApiRequest,
  CorsProxyApiRequestLog,
  CorsRequestLogModel,
} from "./model";
import { nanoid } from "nanoid";
/**
 *
 * @param req
 * @param res
 */
export async function logRequest(req: express.Request, res: express.Response) {
  const ip = (req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress) as string;
  const timestamp = new Date();
  //@ts-ignore (useragent is provided by above useragent.express())
  const _uaobj = req.useragent;
  const ua = _uaobj.source; // gives the raw ua string
  const url = res.get("x-request-url");
  const payload = Number(res.get("content-length"));
  const duration = Number(res.get("x-response-time"));
  await log({
    ip: ip,
    ua: ua,
    duration: duration,
    size: payload,
    at: timestamp,
    target: url,
    app: "anonymous",
  });
}

async function log(request: CorsProxyApiRequest) {
  const id = nanoid();
  const billedduration = Math.ceil(request.duration / 100) * 100; // billed duration is stepped by 100ms
  const payload = new CorsRequestLogModel(<CorsProxyApiRequestLog>{
    id: id,
    billed_duration: billedduration,
    ...request,
  });
  await payload.save();
}
