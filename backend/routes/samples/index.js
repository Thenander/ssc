import express from "express";
import getSamples from "./getSamples.js";

const router = express.Router();
router.use("/samples", getSamples);

export default router;
