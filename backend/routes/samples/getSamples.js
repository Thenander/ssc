import express from "express";
import { getSamplesController } from "../../controllers/sampleController/index.js";

const router = express.Router();

router.get("/", getSamplesController);

export default router;
