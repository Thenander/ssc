import express from "express";
import { getSourcesController } from "../../controllers/sourceController/index.js";

const router = express.Router();

router.get("/", getSourcesController);

export default router;
