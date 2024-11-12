import express from "express";
import { getReleaseTypesController } from "../../controllers/releaseController/index.js";

const router = express.Router();

router.get("/", getReleaseTypesController);

export default router;
