import * as jwt from "jsonwebtoken";
import { secret } from "./secret";

interface AppApiKeyPayload {
  appid: string;
}

/** EG
 * const firebaseConfig = {
  projectId: "bridged-xyz",
  appId: "1:950487613542:web:75d26831172c4c326beda7",
  apiKey: "AIzaS00-9f25zcSD9bkw",
  storageBucket: "bridged-xyz.appspot.com",
  messagingSenderId: "950487613542",
  databaseURL: "https://bridged-xyz.firebaseio.com",
  measurementId: "G-M2EY2WB66R"
  authDomain: "bridged-xyz.firebaseapp.com",
};
 */

/**
 * issue new app's access token
 */

function verify(token: string): boolean {
  try {
    const decoded = jwt.verify(token, secret);
  } catch (_) {
    // invalid token
    return false;
  }
  return true;
}
