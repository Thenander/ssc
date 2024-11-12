import express from "express";
import getSampleTypes from "./getSampleTypes.js";

const router = express.Router();
router.use("/types", getSampleTypes);

export default router;
