import express from "express";
import { getReleases } from "../../controllers/releaseController/index.js";

const router = express.Router();

router.get("/", getReleases);

export default router;
