import express from "express";
import getReleaseTypes from "./getReleaseTypes.js";
import getReleases from "./getReleases.js";

const router = express.Router();
router.use("/types", getReleaseTypes);
router.use("/", getReleases);

export default router;
