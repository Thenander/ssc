import express from "express";

import ReleaseController from "../../controllers/ReleaseController.js";

const router = express.Router();

router.get("/", ReleaseController.getAllReleases);
router.get("/:id", ReleaseController.getReleaseById);
// router.post("/", ReleaseController.createRelease);
// router.put("/:id", ReleaseController.updateRelease);
// router.delete("/:id", ReleaseController.deleteRelease);

export default router;
