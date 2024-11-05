import { getUserByIdFromDB } from "../../models/Users.js";
import { formatUsers } from "./helperFunctions.js";

export async function getUserByIdController(req, res, next) {
  const id = req.params.id;

  try {
    const user = await getUserByIdFromDB(id);

    if (user) {
      const formattedUser = formatUsers([user]);
      return res.json(formattedUser);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
}
