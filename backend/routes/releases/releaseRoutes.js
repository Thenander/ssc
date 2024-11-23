import express from "express";

import ReleaseController from "../../controllers/releaseController.js";

const router = express.Router();

router.get("/", ReleaseController.getRelease);
router.put("/", ReleaseController.updateRelease);
router.post("/", ReleaseController.createRelease);
router.delete("/", ReleaseController.deleteRelease);

export default router;
