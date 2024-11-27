import express from "express";
import tracks from "./trackRoutes.js";

const router = express.Router();

router.use("/", tracks);

export default router;
