import express from "express";

import TrackController from "../../controllers/trackController.js";

const router = express.Router();

router.get("/", TrackController.getTrack);
router.put("/", TrackController.updateTrack);
router.post("/", TrackController.createTrack);
router.delete("/", TrackController.deleteTrack);

export default router;
