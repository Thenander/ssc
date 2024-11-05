import pool from "../db.js";

/**
 * Add new user
 * @param {Object} params {firstName, lastName, email}
 * @returns json: new user object
 */
export async function addUserToDB({
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

/**
 * Get all users
 * @returns json: Users array
 */
export async function getUsersFromDB() {
  const sql = "SELECT * FROM users";

  try {
    const [result] = await pool.query(sql);

    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Get user by ID
 * @param {Number} id ex. 1
 * @returns json: User object
 */
export async function getUserByIdFromDB(id) {
  const sql = "SELECT * FROM users where id = ?";

  try {
    const [result] = await pool.query(sql, [id]);

    return result[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Update user
 * @param {Object} params {id, firstName, lastName, email}
 * @returns json: Updated user object
 */
export async function updateUserFromDB({ id, firstName, lastName, email }) {
  const fieldsToUpdate = { first_name: firstName, last_name: lastName, email };

  const fields = Object.keys(fieldsToUpdate).filter(
    (key) => fieldsToUpdate[key] !== undefined
  );
  const values = fields.map((key) => fieldsToUpdate[key]);

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);

  const sql = `UPDATE users SET ${fields
    .map((field) => `${field} = ?`)
    .join(", ")} WHERE id = ?`;

  try {
    const [result] = await pool.query(sql, values);
    const json = JSON.parse(JSON.stringify(result));

    if (json.affectedRows) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Delete user
 * @param {Number} id ex. 1
 * @returns json: OK object
 */
export async function deleteUserFromDB(id) {
  const sql = "DELETE FROM users WHERE id = ?";

  try {
    const [result] = await pool.query(sql, [id]);
    const json = JSON.parse(JSON.stringify(result));

    if (json.affectedRows) {
      return { info: "User deleted" };
    } else {
      return { info: "Found no user" };
    }
  } catch (error) {
    throw error;
  }
}

export async function registerUserInDB({
  username,
  firstName,
  lastName,
  email,
  password,
}) {
  const sql =
    "INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?);";

  try {
    const [result] = await pool.query(sql, [
      username,
      firstName,
      lastName,
      email,
      password,
    ]);
    const json = JSON.parse(JSON.stringify(result));

    if (json.affectedRows) {
      return json;
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
}
