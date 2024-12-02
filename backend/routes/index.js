import express from "express";
import authRoutes from "./auth/index.js";
import releaseRoutes from "./releases/index.js";
import trackRoutes from "./tracks/index.js";

const router = express.Router();

router.use("/api/V1/auth", authRoutes);
router.use("/api/V1/releases", releaseRoutes);
router.use("/api/V1/tracks", trackRoutes);

router.use((req, res, next) => {
  res.status(404).json({ err: "API path not found" });
});

export default router;
