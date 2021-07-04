import * as express from "express";

/**
 * explicitly black listed origins. these are not registered to use base.
 */
const blacklisted_origin = [
  "REJECTME",
  "https://www.titronline.org",
  "https://www.titr.online",
  "http://showsport.xyz",
  "https://cdn14.esp-cdn.xyz",
  "http://www.digi-hdsport.com",
  "https://siunus.github.io",
];

const blacked401UnAuthorized = (origin: string) => {
  return {
    message: `CORS Proxy request from origin "${origin}" is not allowed. Request is unauthorized`,
    issue: "https://github.com/bridgedxyz/base/issues/23",
  };
};

export const blaklistoriginlimit = (
  req: express.Request,
  res: express.Response,
  next
) => {
  const origin = req.headers["origin"];

  if (origin) {
    if (blacked(origin)) {
      res.status(401).send(blacked401UnAuthorized(origin));
      return;
    }
  }
  next();
};

function blacked(origin: string): boolean {
  return blacklisted_origin.includes(origin);
}
