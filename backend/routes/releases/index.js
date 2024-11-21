import express from "express";
import releases from "./releaseRoutes.js";

const router = express.Router();

router.use("/", releases);

export default router;
