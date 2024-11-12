import express from "express";
import getSourceTypes from "./getSourceTypes.js";
import getSources from "./getSources.js";

const router = express.Router();
router.use("/types", getSourceTypes);
router.use("/", getSources);

export default router;
