import express from "express";
import { getReleaseByIdController } from "../../controllers/releaseController/index.js";

const router = express.Router();

router.get("/", getReleaseByIdController);

export default router;
