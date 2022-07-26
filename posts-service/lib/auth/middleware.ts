import type { Request, Response, NextFunction } from "express";
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const _token = req.header("Authorization");
    const token = _token ? _token.split(" ")[1] : null; // remove "Bearer "

    if (token) {
      // TODO: verify token & get workspace info
      // parse token (jwt)
      // const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      // req.user = {};
      // req.workspace = {};
      next();
      return;
    }

    res
      .status(401)
      .send({ status: "Unauthorized", message: "No token provided" });
    return;
  } catch (e) {
    res.status(401).send("Unauthorized");
    return;
  }
}
