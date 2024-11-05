import { addUserToDB, getUserByIdFromDB } from "../../models/Users.js";
import { formatUsers, handleDatabaseError } from "../helperFunctions.js";

export async function addUserController(req, res, next) {
  const userData = extractUserData(req);

  if (!userData) {
    res.status(200).json({ err: "Required fields are missing" });
    return;
  }
  try {
    const user = await createUserAndFetch(userData);
    res.status(201).json(user);
  } catch (error) {
    if (error.code) {
      handleDatabaseError(error, res);
    } else {
      next(error);
    }
  }
}

async function createUserAndFetch(userData) {
  const response = await addUserToDB(userData);
  const user = await getUserByIdFromDB(response.insertId);

  const formattedUser = formatUsers([user]);

  return formattedUser[0];
}

function extractUserData(req) {
  const { username, firstName, lastName, email, password } = req.body;

  const hasError = Object.entries({
    username,
    firstName,
    lastName,
    email,
    password,
  }).some(([key, value]) => {
    !value && console.error(`[${key}] is missing`);

    return !value;
  });

  if (hasError) {
    return null;
  } else {
    return { username, firstName, lastName, email, password };
  }
}
