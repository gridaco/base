import * as express from "express";
import * as useragent from "express-useragent";
import router from "./routes";

const app = express();

app.use(useragent.express());

app.get("/", (req, res) => {
  res.redirect("https://grida.co");
});

app.use(router);

export { app };
