import * as express from "express";
import * as multer from "multer";
import { uploadAssets, buildPath } from "../../lib";
import type { CreateDraftPostRequest } from "../../types";

const router = express.Router();

const m = multer({
  storage: multer.memoryStorage(),
});

router.get("/", (req, res) => {
  // 1. list posts as summary
});

router.post("/unlisted", (req, res) => {
  // 1. get all unlisted posts (non draft)
});

router.post("/scheduled", (req, res) => {
  // 1. get all scheduled posts (non draft)
});

router.get("/:id", (req, res) => {
  // 1. fetch post detail (for render & edit)
});

router.post("/:id/publish", (req, res) => {
  // 1. unlist a published post (only works for published posts)
});

router.post("/:id/unlist", (req, res) => {
  // 1. unlist a published post (only works for published posts)
});

router.post("/:id/visibility", (req, res) => {
  // 1. unlist a published post (only works for published posts)
});

router.post("/:id/title", (req, res) => {
  // 1. update the post title
});

router.put("/:id/body", (req, res) => {
  // 1. update the post body
});

router.put("/:id/tags", (req, res) => {
  // 1. update the post tags
});

router.post("/:id/schedule", (req, res) => {
  // 1. update the post schedule
});

router.put(`/:id`, m.array("assets"), async (req, res) => {
  const { id } = req.params;
  const assets = req.files;

  try {
    const path = buildPath("??", {
      post: id,
    });

    if (assets && Array.isArray(assets)) {
      const uploads: Array<Promise<any>> = [];
      assets.forEach((asset) => {
        const { buffer, originalname, mimetype } = asset;
        uploads.push(
          uploadAssets({
            path,
            file: { body: buffer, mimetype: mimetype ?? "image/png" },
            key: originalname,
          })
        );
      });
      const uploadedAssets = await Promise.all(uploads);
    }

    res.json({
      status: "ok",
      id: id,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
});

export default router;
