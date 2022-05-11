import * as express from "express";
import router_posts from "./posts";
import router_drafts from "./drafts";
import router_assets from "./assets";
import router_tags from "./tags";
import router_categories from "./categories";
import router_publications from "./publications";

const router = express.Router();

router.use("/", router_posts);
router.use("/drafts", router_drafts);
router.use("/assets", router_assets);
router.use("/tags", router_tags);
router.use("/categories", router_categories);
router.use("/publications", router_publications);

export default router;
