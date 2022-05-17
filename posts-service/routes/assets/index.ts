import * as express from "express";
import multer from "multer";
import assert from "assert";
import { makeClient, upload, buildPath } from "../../lib";

const router = express.Router();

const m = multer({
  storage: multer.memoryStorage(),
});

router.post("/:id/upload", m.array("files", 25), async (req, res) => {
  const { id } = req.query as { id: string };
  const assets = req.files;

  const uploads: Array<Promise<any>> = [];

  if (assets && Array.isArray(assets)) {
    assets.forEach((asset) => {
      const { buffer, originalname, mimetype } = asset;
      uploads.push(
        upload(
          id,
          { body: buffer, mimetype: mimetype ?? "image/png" },
          originalname
        )
      );
    });
  }

  try {
    await Promise.all(uploads);
    res.json({
      status: "ok",
      post_id: id,
      asset_path: id + "/",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
});

// request the asset uploader client
router.get("/client", async (req, res) => {
  const { post } = req.query; // post id to link the asset to.
  const { post: _post, mimetype, key, encoding } = req.body;

  const postid = post ?? _post;
  assert(postid, '"post" is required');

  const path = buildPath(postid);
  const abskey = path + "/" + key;

  const expiresIn = 3600;
  const signedUrl = await makeClient(abskey, {
    encoding,
    mimetype,
  });

  res.json({
    url: signedUrl,
    expires_in: expiresIn,
    expires_at: new Date(Date.now() + expiresIn * 1000),
  });
});

export default router;
