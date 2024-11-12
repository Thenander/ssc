import express from "express";

import getTracks from "./getTracks.js";

const router = express.Router();

router.use("/", getTracks);

export default router;
