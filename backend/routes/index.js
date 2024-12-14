import express from "express";
import authRoutes from "./auth/index.js";
import releaseRoutes from "./releases/index.js";
import trackRoutes from "./tracks/index.js";
import sourceRoutes from "./sources/index.js";
import sampleRoutes from "./samples/index.js";

const router = express.Router();

router.use("/api/V1/auth", authRoutes);
router.use("/api/V1/releases", releaseRoutes);
router.use("/api/V1/tracks", trackRoutes);
router.use("/api/V1/sources", sourceRoutes);
router.use("/api/V1/samples", sampleRoutes);

router.use((req, res, next) => {
  res.status(500).json({ err: "API path not found" });
});

export default router;
