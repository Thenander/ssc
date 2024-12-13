import express from "express";
import sources from "./sourceRoutes.js";

const router = express.Router();

router.use("/", sources);

export default router;
