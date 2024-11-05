import { updateUserFromDB, getUserByIdFromDB } from "../../models/Users.js";
import { handleDatabaseError } from "../helperFunctions.js";

export async function updateUserController(req, res, next) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    const result = await updateUserAndFetch({ id, firstName, lastName, email });
    res.json(result);
  } catch (error) {
    handleDatabaseError(error, res, next);
  }
}

async function updateUserAndFetch({ id, firstName, lastName, email }) {
  const response = await updateUserFromDB({ id, firstName, lastName, email });
  if (response.affectedRows) {
    return await getUserByIdFromDB(id);
  } else {
    return { info: "Found no user" };
  }
}
