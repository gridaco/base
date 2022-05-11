import * as express from "express";
import multer from "multer";
import { prisma, selectors } from "../../prisma-client";
import { uploadAssets, buildPath } from "../../lib";
import type { CreateDraftPostRequest } from "../../types";

const router = express.Router();

const m = multer({
  storage: multer.memoryStorage(),
});

// *PUBLIC
router.get("/", async (req, res) => {
  // 0. auth guard - publication permission
  // 1. list posts as summary
  // 2. paginate
  const posts = await prisma.post.findMany({
    where: {
      // published: true,
      isDraft: false,
      visibility: "public", // if authenticated, show all >> ? undefined
    },
    select: selectors.post_summary_select,
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  res.status(200).json(posts);
});

router.post("/unlisted", async (req, res) => {
  // 0. auth guard - post permission
  // 1. get all unlisted posts (non draft)
  const posts = await prisma.post.findMany({
    where: {
      // published: true,
      isDraft: false,
    },
    select: selectors.post_summary_select,
  });

  res.status(200).json({
    // TODO:
  });
});

router.post("/scheduled", async (req, res) => {
  // 1. get all scheduled posts (non draft)

  const posts = await prisma.post.findMany({
    where: {
      isDraft: false,
      // published: false,
      // postedAt is null
      scheduledAt: {
        gte: new Date(),
      },
    },
    select: selectors.post_summary_select,
  });

  res.status(200).json({
    // TODO:
  });
});

// *PUBLIC
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // 1. fetch post detail (for render & edit)

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  res.status(200).json({
    // TODO:
  });
});

router.post("/:id/publish", async (req, res) => {
  const { id } = req.params;
  const { visibility } = req.body;
  // 0. auth guard - post permission
  // 1. validate current data
  // 2. emmit event

  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      isDraft: false,
      postedAt: new Date(),
      visibility: visibility ?? "public",
      scheduledAt: null, // clear schedule
    },
  });

  res.status(200).json(post);
});

router.post("/:id/unlist", async (req, res) => {
  const { id } = req.params;

  // 0. auth guard - post permission
  // 1. unlist a published post (only works for published posts)
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      // TODO: remove published at?
      postedAt: null, // clear
      // published: false,
    },
  });

  res.status(200).json(post);
});

router.post("/:id/visibility", async (req, res) => {
  const { id } = req.params;
  const { visibility } = req.body; // as ??

  // 0. auth guard - post permission
  // 1. unlist a published post (only works for published posts)
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      visibility: visibility,
    },
  });

  res.status(200).json({
    // TODO:
  });
});

router.post("/:id/title", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // as ??

  // 0. auth guard - post permission
  // 1. update the post title
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });

  res.status(200).json(post);
});

router.post("/:id/summary", async (req, res) => {
  const { id } = req.params;
  const { title, summary } = req.body;
  // 0. auth guard - post permission
  // 1. update the post title
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title && title, // can also update title by summary update, but optional.
      summary: summary,
    },
  });

  res.status(200).json({
    id: post.id,
    title: post.title,
    summary: post.summary,
  });
});

router.put("/:id/body", async (req, res) => {
  const { id } = req.params;
  const { r } = req.query;
  const { blocks } = req.body; // as ??

  // 0. auth guard - post permission
  // 1. update the post body (with standard format)
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      body: {
        $scheme: "boring",
        blocks,
        // TODO:
      },
    },
  });

  switch (r) {
    case "*":
      res.status(200).json(post);
    case undefined:
    default:
      res.status(200).json({
        id,
        updated: {
          length: post.body["blocks"]?.length ?? 0,
        },
      });
  }
});

router.put("/:id/custom-body", async (req, res) => {
  const { id } = req.params;
  const { r } = req.query;
  const body = req.body; // as ??

  // 0. auth guard - post permission
  // 1. update the post body (with custom scheme)
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      body: body,
    },
  });

  switch (r) {
    case "*":
      res.status(200).json(post);
    case undefined:
    default:
      res.status(200).json({
        id,
        updated: {
          length: post.body["blocks"]?.length ?? 0,
        },
      });
  }
});

router.put("/:id/tags", async (req, res) => {
  const { id } = req.params;
  const { tags } = req.body;

  // 0. auth guard - post permission
  // 1. update the post tags
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      // TODO: filter the tag type (is it refernce or string?)
      tags: tags,
    },
  });
});

router.post("/:id/schedule", async (req, res) => {
  const { id } = req.params;
  const { at } = req.body; // as ??

  // 0. auth guard - post permission
  // 1. update the post schedule
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      scheduledAt: at,
    },
  });
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
