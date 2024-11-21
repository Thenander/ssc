import pool from "../db.js";

export const UserModel = {
  getAllUsers: async () => {
    try {
      const [results] = await pool.query("SELECT * FROM users");
      return results;
    } catch (err) {
      throw err;
    }
  },

  getUserById: async (id) => {
    try {
      const [results] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  // createUser: async (userData) => {
  //   const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  //   try {
  //     const [result] = await pool.query(sql, [
  //       userData.name,
  //       userData.email,
  //       userData.password,
  //     ]);
  //     return result.insertId;
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  // updateUser: async (id, userData) => {
  //   const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  //   try {
  //     const [result] = await pool.query(sql, [
  //       userData.name,
  //       userData.email,
  //       userData.password,
  //       id,
  //     ]);
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  // deleteUser: async (id) => {
  //   const sql = "DELETE FROM users WHERE id = ?";
  //   try {
  //     const [result] = await pool.query(sql, [id]);
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
};

// import pool from "../db.js";

// /**
//  * Get all users
//  * @returns json: Users array
//  */
// export async function getUsersFromDB() {
//   const sql = "SELECT * FROM users";

//   try {
//     const [result] = await pool.query(sql);

//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

// /**
//  * Get user by ID
//  * @param {Number} id ex. 1
//  * @returns json: User object
//  */
// export async function getUserByIdFromDB(id) {
//   const sql = "SELECT * FROM users where id = ?";

//   try {
//     const [result] = await pool.query(sql, [id]);

//     return result[0];
//   } catch (error) {
//     throw error;
//   }
// }

// /**
//  * Update user
//  * @param {Object} params {id, firstName, lastName, email}
//  * @returns json: Updated user object
//  */
// export async function updateUserFromDB({ id, firstName, lastName, email }) {
//   const fieldsToUpdate = { first_name: firstName, last_name: lastName, email };

//   const fields = Object.keys(fieldsToUpdate).filter(
//     (key) => fieldsToUpdate[key] !== undefined
//   );
//   const values = fields.map((key) => fieldsToUpdate[key]);

//   if (fields.length === 0) {
//     throw new Error("No fields to update");
//   }

//   values.push(id);

//   const sql = `UPDATE users SET ${fields
//     .map((field) => `${field} = ?`)
//     .join(", ")} WHERE id = ?`;

//   try {
//     const [result] = await pool.query(sql, values);
//     const json = JSON.parse(JSON.stringify(result));

//     if (json.affectedRows) {
//       return result;
//     } else {
//       return result;
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// /**
//  * Delete user
//  * @param {Number} id ex. 1
//  * @returns json: OK object
//  */
// export async function deleteUserFromDB(id) {
//   const sql = "DELETE FROM users WHERE id = ?";

//   try {
//     const [result] = await pool.query(sql, [id]);
//     const json = JSON.parse(JSON.stringify(result));

//     if (json.affectedRows) {
//       return { info: "User deleted" };
//     } else {
//       return { info: "Found no user" };
//     }
//   } catch (error) {
//     throw error;
//   }
// }
