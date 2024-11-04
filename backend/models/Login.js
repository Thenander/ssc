import pool from "../db.js";

export async function getUserByUsernameDB(username) {
  const sql = "SELECT * from users WHERE username = ?";

  const [result] = await pool.query(sql, [username]);
  const json = JSON.parse(JSON.stringify(result));

  return json[0];
}

/* export async function addUserToDB({ firstName, lastName, email }) {
  const sql =
    "INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?);";

  try {
    const [result] = await pool.query(sql, [firstName, lastName, email]);
    const json = JSON.parse(JSON.stringify(result));

    if (json.affectedRows) {
      return json;
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
} */
