import * as express from "express";
import router_forms from "./forms";
import router_assets from "./assets";
import router_responses from "./responses";

const router = express.Router();

router.use("/", router_forms);
router.use("/responses", router_responses);
router.use("/assets", router_assets);

export default router;
