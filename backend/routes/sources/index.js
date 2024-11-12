import express from "express";
import getSourceTypes from "./getSourceTypes.js";

const router = express.Router();
router.use("/types", getSourceTypes);

export default router;
