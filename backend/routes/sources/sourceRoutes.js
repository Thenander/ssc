import express from "express";

import SourceController from "../../controllers/sourceController.js";

const router = express.Router();

router.get("/", SourceController.getSource);
// router.put("/", SourceController.updateSource);
// router.post("/", SourceController.createSource);
// router.delete("/", SourceController.deleteSource);

export default router;
