import * as express from "express";
import * as useragent from "express-useragent";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import router from "./routes";

const app = express();

app.use(cors());

app.use(useragent.express());

app.use(bodyParser.json());

app.use(router);

export { app };
