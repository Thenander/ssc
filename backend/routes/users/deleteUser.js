import express from "express";
import { deleteUserController } from "../../controllers/userController/index.js";

const router = express.Router();

router.delete("/:id", deleteUserController);

export default router;
