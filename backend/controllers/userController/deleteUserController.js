import { deleteUserFromDB } from "../../models/Users.js";

export async function deleteUserController(req, res, next) {
  const id = req.params.id;

  try {
    const response = await deleteUserFromDB(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
