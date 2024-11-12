import express from "express";
import getSampleTypes from "./getSampleTypes.js";
import getSamples from "./getSamples.js";

const router = express.Router();
router.use("/types", getSampleTypes);
router.use("/", getSamples);

export default router;
