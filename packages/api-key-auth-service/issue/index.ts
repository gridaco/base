import * as jwt from "jsonwebtoken";
import { secret } from "../secret";

function issue() {
  const payload = {};

  jwt.sign(payload, secret);
}
