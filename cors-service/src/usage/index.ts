import * as express from "express";
// import * as dynamoose from "dynamoose";
// import { CorsRequestLogModel } from "./model";
/**
 *
 * @param req
 * @param res
 */
export function logRequest(req: express.Request, res: express.Response) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const timestamp = Date.now();
  //@ts-ignore (useragent is provided by above useragent.express())
  const _uaobj = req.useragent;
  const ua = _uaobj.source; // gives the raw ua string
  const url = res.get("x-request-url");
  const payload = res.get("content-length");
  const duration = Number(res.get("x-response-time"));
  const billedduration = Math.ceil(duration / 100) * 100; // billed duration is stepped by 100ms
  console.log(
    "request log",
    ip,
    ua,
    duration,
    billedduration,
    timestamp,
    payload,
    url
  );
}

// async function log() {
//   ///
//   const payload = new CorsRequestLogModel({});
//   payload.save();
// }
