import * as express from "express";
import { prisma, selectors } from "../../prisma-client";
const router = express.Router();

/**
 * can be public
 */
router.get("/", async (req, res) => {
  // get publications from my workspace
  const workspace = ""; // TODO: get my workspace
  const publications = await prisma.publication.findMany({
    where: {
      //
    },
  });
  res.json(publications);
});

router.get("/:id", async (req, res) => {
  // get publication
  const { id } = req.params;

  const publication = await prisma.publication.findUnique({
    where: {
      id: id,
    },
  });

  res.json(publication);
});

router.get("/:id/posts", async (req, res) => {
  // get publication
  const { id } = req.params;

  const posts = await prisma.post.findMany({
    where: {
      publicationId: id,
    },
    select: selectors.post_summary_select,
  });

  res.json(posts);
});

router.post("/", async (req, res) => {
  const { name, workspace, slug } = req.body;

  // 0. auth user
  // 1. validate workspace ownership or authorization
  // slug
  // - 1. try to use user provided slug
  // - 2. try to use workspace slug
  // - 3. if both won't work, generate new slug (provide undefined for authgen cuid)
  // create new publication

  try {
    const publication = await prisma.publication.create({
      data: {
        name: name,
        workspace: workspace,
        slug: slug,
      },
    });

    res.status(201).json(publication);
  } catch (e) {
    console.error(e, { ...req.body });
    res.status(400).json({
      error: "cannot create new publication",
    });
  }
});

router.get("/:id/editors", async (req, res) => {
  const { id: publicationid } = req.params;
  // list all editors under :id publication.
  const editors = await prisma.editor.findMany({
    where: {
      publications: {
        some: {
          id: publicationid,
        },
      },
    },
    select: {
      uid: true,
      username: true,
      name: true,
      bio: true,
      avatar: true,
    },
  });

  res.json(editors);
});

router.post("/:id/editors", async (req, res) => {
  const { id: publicationid } = req.params;
  //
});

export default router;
