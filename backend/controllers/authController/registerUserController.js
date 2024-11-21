// import bcrypt from "bcrypt";
// import { registerUserInDB } from "../../models/Auth.js";
// import { getUserByIdFromDB } from "../../models/Users.js";
// import { formatUsers, handleDatabaseError } from "../helperFunctions.js";
// import { createToken } from "../../JWT.js";

// export async function registerUserController(req, res, next) {
//   const userData = await extractUserData(req);

//   if (!userData) {
//     res.status(200).json({ err: "Required fields are missing" });
//     return;
//   }
//   try {
//     const user = await createUserAndFetch(userData);
//     res.status(201).json(user);
//   } catch (error) {
//     if (error.code) {
//       handleDatabaseError(error, res);
//     } else {
//       next(error);
//     }
//   }
// }

// async function createUserAndFetch(userData) {
//   const response = await registerUserInDB(userData);
//   const user = await getUserByIdFromDB(response.insertId);

//   const token = createToken(user);
//   const formattedUser = formatUsers([user])[0];

//   return { ...formattedUser, token };
// }

// async function extractUserData(req) {
//   const { username, firstName, lastName, email, password } = req.body;

//   if (
//     [username, firstName, lastName, email, password].some((el) => !el.trim())
//   ) {
//     return undefined;
//   }

//   const saltRounds = 10;
//   const hash = await bcrypt.hash(password, saltRounds);

//   const hasError = Object.entries({
//     username,
//     firstName,
//     lastName,
//     email,
//     password: hash,
//   }).some(([key, value]) => {
//     !value && console.error(`[${key}] is missing`);

//     return !value;
//   });

//   if (hasError) {
//     return undefined;
//   } else {
//     return { username, firstName, lastName, email, password: hash };
//   }
// }
