import express from "express";

import SampleController from "../../controllers/sampleController.js";

const router = express.Router();

router.get("/", SampleController.getSample);
router.put("/", SampleController.updateSample);
router.post("/", SampleController.createSample);
router.delete("/", SampleController.deleteSample);

export default router;
