import * as express from "express";

const router = express.Router();

// list all drafts (no pagination, max limit)
router.get("/", async (req, res) => {
  // 1. list all drafts (as summary)
});

// create new draft
router.post("/", async (req, res) => {
  // 1. create new draft
  // 2. return draft id
});

// create new draft
router.delete("/:id", async (req, res) => {
  // 1. check if draft
  // 2. delete draft
  // 3. delete associated assets
});

export default router;
