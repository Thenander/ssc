import express from "express";
import { getSourceTypesController } from "../../controllers/sourceController/index.js";

const router = express.Router();

router.get("/", getSourceTypesController);

export default router;
