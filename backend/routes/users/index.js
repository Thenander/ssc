import express from "express";

import deleteUser from "./deleteUser.js";
import getUser from "./getUser.js";
import getUsers from "./getUsers.js";
import updateUser from "./updateUser.js";

const router = express.Router();

router.use("/user", getUser);
router.use("/all", getUsers);
router.use("/delete", deleteUser);
router.use("/update", updateUser);

export default router;
