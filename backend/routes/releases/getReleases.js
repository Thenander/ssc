import express from "express";
import { getReleasesController } from "../../controllers/releaseController/index.js";

const router = express.Router();

router.get("/:id", getReleasesController);
router.get("/", getReleasesController);

export default router;
