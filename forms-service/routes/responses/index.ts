import * as express from "express";
import * as multer from "multer";

const router = express.Router();

router.post("/session", (req, res) => {
  // create new response session for assets uploading & saving etc..
});

router.post("/:id/submit", (req, res) => {
  // submit (close) the response with session
});

router.post("/submit", (req, res) => {
  // submit the response (w/o session)
});

export default router;
