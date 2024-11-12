import express from "express";
import { getSampleTypesController } from "../../controllers/sampleController/index.js";

const router = express.Router();

router.get("/", getSampleTypesController);

export default router;
