import * as express from "express";
import * as useragent from "express-useragent";
import * as corsProxy from "../lib/cors";
import * as responsetime from "response-time";
import * as https from "https";

import { logRequest } from "./usage";

const app = express();

const cors_proxy = corsProxy.createServer({
  // https://github.com/Rob--W/cors-anywhere/issues/39
  requireHeader: ["origin", "x-requested-with"],
  // requireHeader: [],
  removeHeaders: [
    "cookie",
    "cookie2",
    "x-request-start",
    "x-request-id",
    "via",
    "connect-time",
    "total-route-time",
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
  },
});

app.get("/", function(req, res) {
  res.redirect("https://app.cors.bridged.cc/");
});

app.use((req, res, next) => {
  const requrl = req.originalUrl.substring(1);
  const MB = 1048576;
  https
    .request(requrl, { method: "HEAD" }, _resp => {
      const len = Number(_resp.headers["content-length"]);
      if (len && len > MB * 30) {
        // reject if data larger than 30mb.
        // this is to save data transfer cost. And basically we should not use CORS Proxy to load large files.
        res.status(413).send({
          message: "Requested resource exceeds 30mb",
        });
      } else {
        // if content-length is undefined or less than 30mb, procceed.
        next();
      }
    })
    .on("error", err => {
      // ignore error for this
      // target, which is anonymous, might not support HEAD request.
      next();
    })
    .end();
});

app.use(
  responsetime({
    suffix: false,
  })
);

app.use(useragent.express());

// -- execution order matters --
// (1)
app.use((req, res, next) => {
  cors_proxy.emit("request", req, res);
  // next();
});

// (2)
/**
 * after response middleware
 */
// app.use((req, res) => {
//   res.on("finish", () => {
//     logRequest(req, res);
//   });
// });
// -- execution order matters --

/**
 * global error handler
 */
app.use(((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    message: "Internal Server Error",
  });
}) as express.ErrorRequestHandler);

export { app };
