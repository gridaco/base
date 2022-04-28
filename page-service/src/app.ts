import * as express from "express";
import * as useragent from "express-useragent";

const app = express();

app.get("/", (req, res) => {
  res.redirect("https://grida.co");
});

app.get("files/:filekey", (req, res) => {
  const { filekey } = req.params;
  console.log("filekey", filekey);
});

app.use(useragent.express());

export { app };
