import pool from "../db.js";

const ReleaseModel = {
  getAllReleases: async () => {
    const sql = `SELECT  r.id
                      ,r.title
                      ,t.text AS type
                      ,r.year
                FROM releases AS r
                JOIN types AS t
                ON r.format_type = t.sub_type
                WHERE t.main_type = "RELEASE"
                ORDER BY r.year, t.text ASC;`;

    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (error) {
      getError(error);
    }
  },

  getReleaseById: async (id) => {
    const sql = `SELECT  id
                      ,title
                      ,year
                      ,format_type AS format
                FROM releases
                WHERE id = ?`;

    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (error) {
      getError(error);
    }
  },

  createRelease: async ({ title, year, format }) => {
    const yearInt = parseInt(year, 10);

    if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
      throw new Error("Invalid year format. Year must be a 4-digit number.");
    }
    const sql =
      "INSERT INTO releases (title, year, format_type) VALUES (?, ?, ?);";

    try {
      const [result] = await pool.query(sql, [title, yearInt, format]);
      const json = JSON.parse(JSON.stringify(result));

      return json;
    } catch (error) {
      getError(error);
    }
  },

  updateRelease: async (id, { title, year, format }) => {
    const yearInt = parseInt(year, 10);

    if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
      throw new Error("Invalid year format. Year must be a 4-digit number.");
    }

    const sql = `UPDATE releases
        SET title = ?, year = ?, format_type = ?
        WHERE id = ?;`;

    try {
      const [result] = await pool.query(sql, [title, yearInt, format, id]);
      return result;
    } catch (error) {
      getError(error);
    }
  },

  deleteRelease: async (id) => {
    const sql = "DELETE FROM releases WHERE id = ?";
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      getError(error);
    }
  },

  getReleaseTypes: async () => {
    const sql = `SELECT  sub_type AS 'key'
                        ,text     AS 'value'
                  FROM types
                  WHERE main_type = 'RELEASE'
                  ORDER BY text;`;
    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (error) {
      getError(error);
    }
  },
};

export default ReleaseModel;

function getError(error) {
  if (error.code === "ECONNREFUSED") {
    console.error("Database connection was refused:", error);
    throw new Error(
      "Could not connect to the database. Please try again later."
    );
  } else {
    console.error("Database query failed:", error);
    throw new Error("An unexpected database error occurred.");
  }
}
