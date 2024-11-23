import express from "express";

import ReleaseController from "../../controllers/releaseController.js";

const router = express.Router();

router.get("/", ReleaseController.getReleases);
// router.post("/", ReleaseController.createRelease);
// router.put("/:id", ReleaseController.updateRelease);
// router.delete("/:id", ReleaseController.deleteRelease);

export default router;
