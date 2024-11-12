import express from "express";
import { getTracksController } from "../../controllers/trackController/getTracksController.js";

const router = express.Router();

router.get("/", getTracksController);

export default router;
