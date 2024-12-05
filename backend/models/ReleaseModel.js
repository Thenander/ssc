import pool from "../db.js";
import throwDbError from "../util/throwDbError.js";

const ReleaseModel = {
  getAllReleases: async () => {
    const sql = `SELECT  CONVERT(r.id,CHARACTER)   AS 'id'
                        ,r.title
                        ,t.text                    AS 'type'
                        ,CONVERT(r.year,CHARACTER) AS 'year'
                  FROM releases AS r
                  JOIN types AS t
                  ON r.format_type = t.sub_type
                  WHERE t.main_type = "RELEASE"
                  ORDER BY r.year, t.text ASC;`;
    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (error) {
      throwDbError(error);
    }
  },

  getReleaseById: async (id) => {
    const sql = `SELECT  CONVERT(id,CHARACTER)   AS 'id'
                        ,title
                        ,CONVERT(year,CHARACTER) AS 'year'
                        ,format_type             AS 'format'
                  FROM releases
                  WHERE id = ?;`;
    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (error) {
      throwDbError(error);
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
      throwDbError(error);
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
      throwDbError(error);
    }
  },

  deleteRelease: async (id) => {
    const sql = "DELETE FROM releases WHERE id = ?";
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      throwDbError(error);
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
      throwDbError(error);
    }
  },
};

export default ReleaseModel;
