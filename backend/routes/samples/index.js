import express from "express";
import samples from "./sampleRoutes.js";

const router = express.Router();

router.use("/", samples);

export default router;
