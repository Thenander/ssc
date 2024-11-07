import pool from "../db.js";

export async function registerUserInDB({
  firstName,
  lastName,
  username,
  password,
  email,
}) {
  const sql =
    "INSERT INTO users (first_name, last_name, username, password, email, role) VALUES (?, ?, ?, ?, ?, ?);";

  try {
    const [result] = await pool.query(sql, [
      firstName,
      lastName,
      username,
      password,
      email,
      "user",
    ]);
    const json = JSON.parse(JSON.stringify(result));

    if (json.affectedRows) {
      return json;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getUserByUsernameDB(username) {
  const sql = "SELECT * from users WHERE username = ?";

  const [result] = await pool.query(sql, [username]);
  const json = JSON.parse(JSON.stringify(result));

  return json[0];
}
